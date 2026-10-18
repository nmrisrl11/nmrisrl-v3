"use client";

import { useEffect, useRef, type RefObject } from "react";
import { LOOK_CLIPS } from "./types";

interface UseAvatarGazeOptions {
	stageRef: RefObject<HTMLElement | null>;
	waveVideoRef: RefObject<HTMLVideoElement | null>;
	lookVideoRefs: RefObject<(HTMLVideoElement | null)[]>;
	enabled?: boolean;
}

const SEEK_TOLERANCE = 0.02;

const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
const smoothstep = (min: number, max: number, x: number) => {
	const r = clamp01((x - min) / (max - min));
	return r * r * (3 - 2 * r);
};

// Critically-damped harmonic oscillator spring solver
const solveSpring = (
	current: number,
	velocity: number,
	target: number,
	dt: number,
	omega = 7.0,
): [number, number] => {
	const overshoot = target + (target - 0.5) * 2 * 0.08;
	let newVel = velocity + (omega * omega * (overshoot - current) - 2 * omega * velocity) * dt;
	newVel = Math.max(-2.8, Math.min(2.8, newVel));
	let newPos = clamp01(current + newVel * dt);
	if ((newPos === 0 && newVel < 0) || (newPos === 1 && newVel > 0)) {
		newVel = 0;
	}
	return [newPos, newVel];
};

export function useAvatarGaze({
	stageRef,
	waveVideoRef,
	lookVideoRefs,
	enabled = true,
}: UseAvatarGazeOptions) {
	const isWavePlayingRef = useRef(true);

	useEffect(() => {
		if (typeof window === "undefined" || !enabled) return;

		const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		const supportsHover = window.matchMedia("(hover: hover)").matches;

		const stage = stageRef.current;
		const waveVideo = waveVideoRef.current;
		const lookElements = lookVideoRefs.current;
		if (!stage || !waveVideo || !lookElements || lookElements.length === 0) return;

		// Pointer tracking across window
		const pointer = { x: 0, y: 0, active: false };

		const onPointerMove = (e: PointerEvent) => {
			pointer.x = e.clientX;
			pointer.y = e.clientY;
			pointer.active = true;
		};

		const onPointerLeave = () => {
			pointer.active = false;
		};

		if (supportsHover && !isReducedMotion) {
			window.addEventListener("pointermove", onPointerMove, { passive: true });
			document.addEventListener("mouseleave", onPointerLeave);
			document.documentElement.addEventListener("pointerleave", onPointerLeave);
			window.addEventListener("blur", onPointerLeave);
		}

		// Initial wave completion handler
		const completeWave = () => {
			if (!isWavePlayingRef.current) return;
			isWavePlayingRef.current = false;

			// Fade out initial wave to reveal the resting idle poster underneath
			waveVideo.style.transitionDuration = "380ms";
			waveVideo.style.opacity = "0";
			window.setTimeout(() => {
				waveVideo.pause();
				waveVideo.style.display = "none";
				waveVideo.style.zIndex = "-1";
			}, 400);
		};

		waveVideo.addEventListener("ended", completeWave);
		waveVideo.addEventListener("error", completeWave);

		// Safety timeout: complete wave after 5.5s max
		const safetyTimer = window.setTimeout(completeWave, 5500);

		// Safe video seeking throttled to frame rate
		const seekVideo = (vid: HTMLVideoElement | null, targetSec: number) => {
			if (!vid || vid.readyState < 1 || !Number.isFinite(vid.duration)) return;
			const clamped = Math.max(0, Math.min(vid.duration - 0.05, targetSec));
			if (Math.abs(vid.currentTime - clamped) > SEEK_TOLERANCE) {
				vid.currentTime = clamped;
			}
		};

		// Accurate spatial directional tracking
		const computeGaze = (): { clip: number; amount: number } => {
			if (!pointer.active) return { clip: -1, amount: 0 };

			const stageEl = stageRef.current;
			if (!stageEl) return { clip: -1, amount: 0 };

			const rect = stageEl.getBoundingClientRect();
			const centerX = rect.left + rect.width * 0.5;
			const faceY = rect.top + rect.height * 0.28; // centered at avatar eyes

			const dx = pointer.x - centerX;
			const dy = pointer.y - faceY;
			const dist = Math.hypot(dx, dy);

			// Dead zone directly around face / nose
			if (dist <= 50) {
				return { clip: -1, amount: 0 };
			}

			// 1. TOP ZONE (Look Up - LOOK_CLIPS[2])
			// Gaze at upper screen (navbar, tabs, top margin) triggers Look Up
			if (dy < -45) {
				const amount = smoothstep(0, 1, Math.min(1, Math.max(0, (-dy - 45) / 125)));
				return { clip: 2, amount };
			}

			// 2. BOTTOM ZONE (Look Down - LOOK_CLIPS[3])
			// Condition A: Moving vertically down past the waist within the avatar's body column (not triggered near chin/chest)
			const isUnderAvatar = dx > -100 && dx < 70 && dy > 160;
			// Condition B: At the bottom marquee or scrolled down into lower content (when downward angle dominates)
			const isAtBottomFold = pointer.y > rect.bottom - 20 && dy > Math.max(60, Math.abs(dx) * 0.7);

			if (isUnderAvatar || isAtBottomFold) {
				const downDist = isUnderAvatar ? dy - 160 : pointer.y - (rect.bottom - 20);
				const amount = smoothstep(0, 1, Math.min(1, Math.max(0, downDist / 130)));
				return { clip: 3, amount };
			}

			// 3. HORIZONTAL EYE-LEVEL & CONTENT ZONES:
			// LOOK LEFT (LOOK_CLIPS[0])
			if (dx < -40) {
				const amount = smoothstep(0, 1, Math.min(1, Math.max(0, (-dx - 40) / 180)));
				return { clip: 0, amount };
			}

			// LOOK RIGHT (LOOK_CLIPS[1])
			// Looking right at headline text, description, buttons
			if (dx > 55) {
				const amount = smoothstep(0, 1, Math.min(1, Math.max(0, (dx - 55) / 260)));
				return { clip: 1, amount };
			}

			// Resting neutral pose (chest/upper body area)
			return { clip: -1, amount: 0 };
		};

		let activeClip = -1;
		let currentProgress = 0;
		let velocity = 0;
		let outgoingClip: {
			index: number;
			amount: number;
			velocity: number;
			hideAt: number;
		} | null = null;
		let lastFrameTime = performance.now();
		let animId: number;

		// 60FPS / 120FPS RAF physics loop
		const tick = (now: number) => {
			const dt = Math.min(0.05, (now - lastFrameTime) / 1000);
			lastFrameTime = now;

			// Before initial wave completes, lock pointer gaze tracking
			if (isWavePlayingRef.current) {
				if (waveVideo.currentTime >= 4.5 || waveVideo.ended) {
					completeWave();
				}
				animId = requestAnimationFrame(tick);
				return;
			}

			const target = computeGaze();
			const hasDirectionConflict =
				activeClip !== -1 && target.clip !== -1 && target.clip !== activeClip;

			// If switching directions or returning to idle, progress reverses toward 0
			const desiredProgress = hasDirectionConflict
				? 0
				: target.clip === activeClip
					? target.amount
					: 0;

			// Solve critically-damped spring physics
			[currentProgress, velocity] = solveSpring(
				currentProgress,
				velocity,
				desiredProgress,
				dt,
				desiredProgress < currentProgress ? 8.5 : 7.0, // snappy reversal
			);

			// Activation from idle
			if (activeClip === -1) {
				if (target.clip !== -1 && target.amount > 0.03) {
					const nextClip = target.clip;
					const nextEl = lookElements[nextClip];
					if (nextEl && nextEl.readyState >= 1) {
						activeClip = nextClip;
						currentProgress = 0;
						velocity = 0;
						nextEl.currentTime = 0;

						nextEl.style.zIndex = "2";
						nextEl.style.transitionDuration = "220ms";
						nextEl.style.opacity = "1";
					}
				}
			} else if (hasDirectionConflict && currentProgress <= 0.15 && !outgoingClip) {
				// Smooth Reversal Switch:
				// Current clip has reversed close to neutral frame 0 (<= 15% scrub)
				const prevIndex = activeClip;
				const nextIndex = target.clip;
				const nextEl = lookElements[nextIndex];
				const prevEl = lookElements[prevIndex];

				if (nextEl && nextEl.readyState >= 1) {
					// 1. Incoming clip takes top zIndex 2 and fades in 0 -> 1 over 220ms
					nextEl.style.zIndex = "2";
					nextEl.style.transitionDuration = "220ms";
					nextEl.style.opacity = "1";
					nextEl.currentTime = 0;

					// 2. Outgoing clip stays at zIndex 1 and REMAINS 100% OPAQUE!
					// Keeping it opaque underneath incoming clip prevents any see-through flash or blink.
					if (prevEl) {
						prevEl.style.zIndex = "1";
					}

					outgoingClip = {
						index: prevIndex,
						amount: currentProgress,
						velocity: velocity,
						hideAt: now + 220,
					};

					activeClip = nextIndex;
					currentProgress = 0;
					velocity = Math.abs(velocity) * 0.5;
				}
			}

			// Outgoing clip smooth decay & cleanup
			if (outgoingClip) {
				const [newAmount, newVel] = solveSpring(
					outgoingClip.amount,
					outgoingClip.velocity,
					0,
					dt,
					9.0,
				);
				outgoingClip.amount = newAmount;
				outgoingClip.velocity = newVel;

				const oldVid = lookElements[outgoingClip.index];
				if (oldVid) {
					seekVideo(oldVid, outgoingClip.amount * LOOK_CLIPS[outgoingClip.index].maxTurnTime);
				}

				// Only hide outgoing clip once incoming clip is 100% opaque (after 220ms crossfade)
				if (now >= outgoingClip.hideAt) {
					if (oldVid) {
						oldVid.style.transitionDuration = "0ms";
						oldVid.style.opacity = "0";
						oldVid.style.zIndex = "0";
						oldVid.currentTime = 0;
					}
					outgoingClip = null;
				}
			}

			// Active clip video scrubbing
			if (activeClip !== -1) {
				const activeVid = lookElements[activeClip];
				if (activeVid) {
					seekVideo(activeVid, currentProgress * LOOK_CLIPS[activeClip].maxTurnTime);

					// Return to base idle poster when cursor is idle and progress reached 0
					if (target.clip === -1 && currentProgress <= 0.01 && !outgoingClip) {
						activeVid.style.transitionDuration = "220ms";
						activeVid.style.opacity = "0";
						activeVid.style.zIndex = "0";
						activeVid.currentTime = 0;
						activeClip = -1;
					}
				}
			}

			animId = requestAnimationFrame(tick);
		};

		animId = requestAnimationFrame(tick);

		return () => {
			cancelAnimationFrame(animId);
			window.clearTimeout(safetyTimer);
			window.removeEventListener("pointermove", onPointerMove);
			document.removeEventListener("mouseleave", onPointerLeave);
			document.documentElement.removeEventListener("pointerleave", onPointerLeave);
			window.removeEventListener("blur", onPointerLeave);
			waveVideo.removeEventListener("ended", completeWave);
			waveVideo.removeEventListener("error", completeWave);
			lookElements.forEach((vid) => {
				if (vid) {
					vid.style.opacity = "0";
					vid.style.zIndex = "0";
				}
			});
		};
	}, [enabled, stageRef, waveVideoRef, lookVideoRefs]);
}
