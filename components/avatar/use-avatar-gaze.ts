"use client";

import { useEffect, useRef, type RefObject } from "react";
import { avatarStore } from "./avatar-store";
import { ACTION_CLIPS, LOOK_CLIPS, type AvatarAction } from "./types";

interface UseAvatarGazeOptions {
	stageRef: RefObject<HTMLElement | null>;
	waveVideoRef: RefObject<HTMLVideoElement | null>;
	idleVideoRef: RefObject<HTMLVideoElement | null>;
	lookVideoRefs: RefObject<(HTMLVideoElement | null)[]>;
	actionVideoRefs: RefObject<Record<string, HTMLVideoElement | null>>;
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
	idleVideoRef,
	lookVideoRefs,
	actionVideoRefs,
	enabled = true,
}: UseAvatarGazeOptions) {
	const isWavePlayingRef = useRef(true);
	const activeActionRef = useRef<AvatarAction>("idle");

	useEffect(() => {
		if (typeof window === "undefined" || !enabled) return;

		const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		const supportsHover = window.matchMedia("(hover: hover)").matches;

		const stage = stageRef.current;
		const waveVideo = waveVideoRef.current;
		const idleVideo = idleVideoRef.current;
		const lookElements = lookVideoRefs.current;
		const actionElements = actionVideoRefs.current;
		if (!stage || !waveVideo || !lookElements || lookElements.length === 0) return;

		// Pointer tracking across window
		const pointer = { x: 0, y: 0, active: false };
		let idleTimer: number | null = null;
		let idleLeaveTimer: number | null = null;
		let idlePauseTimer: number | null = null;
		let waveCleanupTimer: number | null = null;

		// Active ended event listener tracker to prevent memory leak and accumulation
		let activeEndedListener: { vid: HTMLVideoElement; handler: () => void } | null = null;

		const clearActiveEndedListener = () => {
			if (activeEndedListener) {
				activeEndedListener.vid.removeEventListener("ended", activeEndedListener.handler);
				activeEndedListener.vid.removeEventListener("error", activeEndedListener.handler);
				activeEndedListener = null;
			}
		};

		const resetIdleTimer = () => {
			if (idleTimer) {
				window.clearTimeout(idleTimer);
				idleTimer = null;
			}

			// Thinking should ONLY trigger when pointer is actively focused INSIDE the page.
			// Never schedule thinking when pointer is outside window, unfocused, mobile, or reduced-motion.
			if (!pointer.active || isReducedMotion || !supportsHover) return;

			// If idle thinking action was active and pointer moved, resume immediately
			if (avatarStore.getState().activeAction === "thinking") {
				avatarStore.clearAction("thinking");
			}

			idleTimer = window.setTimeout(() => {
				// Only trigger thinking if pointer is still actively inside window, tab is active, wave finished, and avatar is idle
				if (
					pointer.active &&
					!document.hidden &&
					!isWavePlayingRef.current &&
					avatarStore.getState().activeAction === "idle"
				) {
					avatarStore.requestAction("thinking", {
						priority: "idle",
						source: "idle-timer",
					});
				}
			}, 8000);
		};

		const onPointerMove = (e: PointerEvent) => {
			pointer.x = e.clientX;
			pointer.y = e.clientY;
			pointer.active = true;

			if (idleLeaveTimer) {
				window.clearTimeout(idleLeaveTimer);
				idleLeaveTimer = null;
			}

			// Option B: Cursor entered window -> smoothly fade out idle video back to gaze tracking
			if (supportsHover && idleVideo && idleVideo.style.opacity !== "0") {
				idleVideo.style.transitionDuration = "260ms";
				idleVideo.style.opacity = "0";

				if (idlePauseTimer) window.clearTimeout(idlePauseTimer);
				idlePauseTimer = window.setTimeout(() => {
					if (pointer.active && idleVideo) {
						idleVideo.pause();
					}
				}, 300);
			}

			resetIdleTimer();
		};

		const onPointerLeave = () => {
			pointer.active = false;
			if (idleTimer) {
				window.clearTimeout(idleTimer);
				idleTimer = null;
			}

			// If thinking was active when leaving, clear it immediately
			if (avatarStore.getState().activeAction === "thinking") {
				avatarStore.clearAction("thinking");
			}

			if (idleLeaveTimer) window.clearTimeout(idleLeaveTimer);

			// Option B: Cursor left window -> after 500ms of absence, smoothly fade in living idle video
			// The avatar stays in living idle and will NEVER switch to thinking while out of focus
			if (
				supportsHover &&
				!isWavePlayingRef.current &&
				activeActionRef.current === "idle" &&
				!isReducedMotion &&
				idleVideo
			) {
				idleLeaveTimer = window.setTimeout(() => {
					if (!pointer.active && activeActionRef.current === "idle" && idleVideo) {
						idleVideo.currentTime = 0;
						idleVideo.play().catch(() => {});
						idleVideo.style.transitionDuration = "350ms";
						idleVideo.style.opacity = "1";
					}
				}, 500);
			}
		};

		const onVisibilityChange = () => {
			if (document.hidden) {
				if (idleTimer) {
					window.clearTimeout(idleTimer);
					idleTimer = null;
				}
				if (idleLeaveTimer) {
					window.clearTimeout(idleLeaveTimer);
					idleLeaveTimer = null;
				}
				if (idleVideo) idleVideo.pause();
			} else {
				if (pointer.active) {
					resetIdleTimer();
				}
				if ((!supportsHover || !pointer.active) && !isReducedMotion && idleVideo) {
					idleVideo.play().catch(() => {});
				}
			}
		};

		if (supportsHover && !isReducedMotion) {
			window.addEventListener("pointermove", onPointerMove, { passive: true });
			document.addEventListener("mouseleave", onPointerLeave);
			document.documentElement.addEventListener("pointerleave", onPointerLeave);
			window.addEventListener("blur", onPointerLeave);
			document.addEventListener("visibilitychange", onVisibilityChange);
		} else if (!supportsHover && !isReducedMotion) {
			document.addEventListener("visibilitychange", onVisibilityChange);
		}

		// Initial wave completion handler
		const completeWave = () => {
			if (!isWavePlayingRef.current) return;
			isWavePlayingRef.current = false;

			// Fade out initial wave to reveal the idle video or resting idle poster underneath
			waveVideo.style.transitionDuration = "380ms";
			waveVideo.style.opacity = "0";

			if (waveCleanupTimer) window.clearTimeout(waveCleanupTimer);
			waveCleanupTimer = window.setTimeout(() => {
				waveVideo.pause();
				waveVideo.style.display = "none";
				waveVideo.style.zIndex = "-1";

				// Option A: Mobile devices without mouse cursor -> loop avatar-idle.webm naturally
				if (!supportsHover && !isReducedMotion && idleVideo && activeActionRef.current === "idle") {
					idleVideo.currentTime = 0;
					idleVideo.play().catch(() => {});
					idleVideo.style.transitionDuration = "380ms";
					idleVideo.style.opacity = "1";
				} else if (
					supportsHover &&
					!pointer.active &&
					!isReducedMotion &&
					idleVideo &&
					activeActionRef.current === "idle"
				) {
					// Option B: Desktop on load when cursor has not entered the window yet
					idleVideo.currentTime = 0;
					idleVideo.play().catch(() => {});
					idleVideo.style.transitionDuration = "380ms";
					idleVideo.style.opacity = "1";
				}

				if (pointer.active) {
					resetIdleTimer();
				}
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
			// Gaze is disabled during active action gestures or when pointer is inactive
			if (!pointer.active || activeActionRef.current !== "idle") {
				return { clip: -1, amount: 0 };
			}

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
			if (dy < -45) {
				const amount = smoothstep(0, 1, Math.min(1, Math.max(0, (-dy - 45) / 125)));
				return { clip: 2, amount };
			}

			// 2. BOTTOM ZONE (Look Down - LOOK_CLIPS[3])
			const isUnderAvatar = dx > -100 && dx < 70 && dy > 160;
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
			if (dx > 55) {
				const amount = smoothstep(0, 1, Math.min(1, Math.max(0, (dx - 55) / 260)));
				return { clip: 1, amount };
			}

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

		// Action layer state management
		let currentActionVideo: HTMLVideoElement | null = null;
		let outgoingActionVideo: HTMLVideoElement | null = null;
		let actionCleanupTimer: number | null = null;
		let pendingActionCleanup: (() => void) | null = null;

		const handleActionChange = (nextAction: AvatarAction) => {
			if (nextAction === activeActionRef.current) return;
			activeActionRef.current = nextAction;

			// If switching to an active non-wave action while initial wave is still playing,
			// complete the wave immediately so the wave video dissolves and action videos render clearly
			if (nextAction !== "idle" && nextAction !== "wave" && isWavePlayingRef.current) {
				completeWave();
			}

			// Run any pending outgoing video cleanup immediately before replacing it
			if (pendingActionCleanup) {
				if (actionCleanupTimer) {
					window.clearTimeout(actionCleanupTimer);
					actionCleanupTimer = null;
				}
				pendingActionCleanup();
				pendingActionCleanup = null;
			}

			clearActiveEndedListener();

			// If switching to an active action variant (coding, thumbsup, fingerheart, thinking, wave)
			if (nextAction !== "idle") {
				const incomingVid = nextAction === "wave" ? waveVideo : actionElements[nextAction];
				if (!incomingVid) return;

				// Prepare incoming video
				incomingVid.currentTime = 0;
				incomingVid.style.display = "block";
				incomingVid.style.zIndex = "4";
				incomingVid.style.transitionDuration = "240ms";
				incomingVid.style.opacity = "1";

				// Handle non-looping clips (thumbsup, fingerheart, wave)
				const clipDef = ACTION_CLIPS[nextAction];
				const guardedRelease = () => {
					clearActiveEndedListener();
					if (avatarStore.getState().activeAction === nextAction) {
						avatarStore.clearAction(nextAction);
					}
				};

				if (clipDef && !clipDef.loop) {
					incomingVid.addEventListener("ended", guardedRelease, { once: true });
					incomingVid.addEventListener("error", guardedRelease, { once: true });
					activeEndedListener = { vid: incomingVid, handler: guardedRelease };
				}

				incomingVid.play().catch(() => {
					if (clipDef && !clipDef.loop) {
						guardedRelease();
					}
				});

				// If there was another action playing, crossfade out of it
				if (currentActionVideo && currentActionVideo !== incomingVid) {
					outgoingActionVideo = currentActionVideo;
					outgoingActionVideo.style.zIndex = "3"; // stay underneath incoming action during crossfade

					const cleanup = () => {
						if (outgoingActionVideo) {
							outgoingActionVideo.style.transitionDuration = "0ms";
							outgoingActionVideo.style.opacity = "0";
							outgoingActionVideo.style.zIndex = "0";
							outgoingActionVideo.pause();
							outgoingActionVideo.currentTime = 0;
							outgoingActionVideo = null;
						}
						pendingActionCleanup = null;
						actionCleanupTimer = null;
					};

					pendingActionCleanup = cleanup;
					actionCleanupTimer = window.setTimeout(cleanup, 240);
				}

				currentActionVideo = incomingVid;
			} else {
				// Returning to idle / gaze
				if (currentActionVideo) {
					const vidToHide = currentActionVideo;
					currentActionVideo = null;

					vidToHide.style.transitionDuration = "240ms";
					vidToHide.style.opacity = "0";

					const cleanup = () => {
						vidToHide.style.zIndex = "0";
						vidToHide.pause();
						vidToHide.currentTime = 0;
						pendingActionCleanup = null;
						actionCleanupTimer = null;
					};

					pendingActionCleanup = cleanup;
					actionCleanupTimer = window.setTimeout(cleanup, 240);
				}

				// On mobile or when pointer is outside window, ensure idle video is smoothly active
				if (
					(!supportsHover || !pointer.active) &&
					!isReducedMotion &&
					idleVideo &&
					idleVideo.style.opacity !== "1"
				) {
					idleVideo.currentTime = 0;
					idleVideo.play().catch(() => {});
					idleVideo.style.transitionDuration = "300ms";
					idleVideo.style.opacity = "1";
				}

				if (pointer.active) {
					resetIdleTimer();
				}
			}
		};

		// Subscribe to avatarStore changes
		const unsubscribeStore = avatarStore.subscribe(() => {
			handleActionChange(avatarStore.getState().activeAction);
		});

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

			const isActionActive = activeActionRef.current !== "idle";
			const target = computeGaze();
			const hasDirectionConflict =
				activeClip !== -1 && target.clip !== -1 && target.clip !== activeClip;

			// When an action is active, gaze progress reverses smoothly to neutral (0)
			const desiredProgress = isActionActive
				? 0
				: hasDirectionConflict
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

			// Activation from idle (only when no action is active and hover is supported)
			if (activeClip === -1 && !isActionActive && supportsHover) {
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

					// Return to base idle poster/video when cursor is idle or an action took over
					if ((target.clip === -1 || isActionActive) && currentProgress <= 0.01 && !outgoingClip) {
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
			unsubscribeStore();
			clearActiveEndedListener();
			if (idleTimer) window.clearTimeout(idleTimer);
			if (idleLeaveTimer) window.clearTimeout(idleLeaveTimer);
			if (idlePauseTimer) window.clearTimeout(idlePauseTimer);
			if (actionCleanupTimer) window.clearTimeout(actionCleanupTimer);
			if (pendingActionCleanup) {
				pendingActionCleanup();
				pendingActionCleanup = null;
			}
			if (waveCleanupTimer) window.clearTimeout(waveCleanupTimer);
			window.clearTimeout(safetyTimer);
			window.removeEventListener("pointermove", onPointerMove);
			document.removeEventListener("mouseleave", onPointerLeave);
			document.documentElement.removeEventListener("pointerleave", onPointerLeave);
			window.removeEventListener("blur", onPointerLeave);
			document.removeEventListener("visibilitychange", onVisibilityChange);
			waveVideo.removeEventListener("ended", completeWave);
			waveVideo.removeEventListener("error", completeWave);
			if (idleVideo) {
				idleVideo.style.opacity = "0";
				idleVideo.pause();
			}
			lookElements.forEach((vid) => {
				if (vid) {
					vid.style.opacity = "0";
					vid.style.zIndex = "0";
				}
			});
			Object.values(actionElements).forEach((vid) => {
				if (vid) {
					vid.style.opacity = "0";
					vid.style.zIndex = "0";
					vid.pause();
				}
			});
		};
	}, [enabled, stageRef, waveVideoRef, idleVideoRef, lookVideoRefs, actionVideoRefs]);
}
