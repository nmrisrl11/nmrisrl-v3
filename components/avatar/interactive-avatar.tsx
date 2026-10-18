"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type ActionName =
	| "idle"
	| "wave"
	| "think"
	| "thumbsup"
	| "coding"
	| "heart"
	| "lookleft"
	| "lookright"
	| "lookup"
	| "lookdown";

interface ActionItem {
	id: ActionName;
	label: string;
	emoji: string;
	src: string;
	isGesture?: boolean;
}

const GESTURE_ACTIONS: ActionItem[] = [
	{ id: "wave", label: "Wave", emoji: "👋", src: "/avatar/avatar-wave.webm", isGesture: true },
	{
		id: "think",
		label: "Think",
		emoji: "🤔",
		src: "/avatar/avatar-thinking.webm",
		isGesture: true,
	},
	{
		id: "thumbsup",
		label: "Thumbs Up",
		emoji: "👍",
		src: "/avatar/avatar-thumbsup.webm",
		isGesture: true,
	},
	{
		id: "coding",
		label: "Code",
		emoji: "💻",
		src: "/avatar/avatar-coding-v2.webm",
		isGesture: true,
	},
	{
		id: "heart",
		label: "Heart",
		emoji: "🫰",
		src: "/avatar/avatar-fingerheart.webm",
		isGesture: true,
	},
];

const DIRECTION_ACTIONS: ActionItem[] = [
	{ id: "lookleft", label: "Left", emoji: "👀", src: "/avatar/look-left.webm" },
	{ id: "lookright", label: "Right", emoji: "👀", src: "/avatar/look-right.webm" },
	{ id: "lookup", label: "Up", emoji: "👀", src: "/avatar/look-up.webm" },
	{ id: "lookdown", label: "Down", emoji: "👀", src: "/avatar/look-down.webm" },
];

const ALL_ACTIONS: ActionItem[] = [...GESTURE_ACTIONS, ...DIRECTION_ACTIONS];

export function InteractiveAvatar() {
	const [activeAction, setActiveAction] = useState<ActionName>("idle");
	const [physicsEnabled, setPhysicsEnabled] = useState(true);
	const [gazeStatus, setGazeStatus] = useState("Center (Idle)");

	const videoStageRef = useRef<HTMLDivElement>(null);
	const idleVideoRef = useRef<HTMLVideoElement>(null);
	const actionVideoRefs = useRef<Record<string, HTMLVideoElement | null>>({});

	// Physics engine state references
	const currentActionRef = useRef<ActionName>("idle");
	const physicsEnabledRef = useRef(true);
	const springFactorRef = useRef(0.08);
	const targetXRef = useRef(0);
	const targetYRef = useRef(0);
	const currentXRef = useRef(0);
	const currentYRef = useRef(0);
	const lastRenderedTimeRef = useRef(-1);

	useEffect(() => {
		currentActionRef.current = activeAction;
		physicsEnabledRef.current = physicsEnabled;
	}, [activeAction, physicsEnabled]);

	const transitionToIdle = useCallback(() => {
		setActiveAction("idle");
		currentActionRef.current = "idle";

		if (idleVideoRef.current) {
			idleVideoRef.current.style.opacity = "1";
			void idleVideoRef.current.play().catch(() => {});
		}

		for (const key of Object.keys(actionVideoRefs.current)) {
			const vid = actionVideoRefs.current[key];
			if (vid) {
				vid.style.opacity = "0";
				vid.pause();
			}
		}
		setGazeStatus("Center (Idle)");
	}, []);

	const playAction = useCallback(
		(action: ActionName) => {
			if (action === "idle") {
				transitionToIdle();
				return;
			}

			setActiveAction(action);
			currentActionRef.current = action;

			if (idleVideoRef.current) {
				idleVideoRef.current.style.opacity = "0";
			}

			for (const [key, vid] of Object.entries(actionVideoRefs.current)) {
				if (!vid) continue;
				if (key === action) {
					vid.style.opacity = "1";
					vid.currentTime = 0;
					void vid.play().catch(() => {});
				} else {
					vid.style.opacity = "0";
					vid.pause();
				}
			}
		},
		[transitionToIdle],
	);

	// Mouse pointer gaze tracking
	useEffect(() => {
		const handlePointerMove = (e: PointerEvent) => {
			if (currentActionRef.current !== "idle" || !videoStageRef.current) return;

			const rect = videoStageRef.current.getBoundingClientRect();
			const centerX = rect.left + rect.width / 2;
			const faceY = rect.top + rect.height * 0.35; // centered around character face

			const rawX = (e.clientX - centerX) / 380;
			const rawY = (e.clientY - faceY) / 320;

			targetXRef.current = Math.max(-1, Math.min(1, rawX));
			targetYRef.current = Math.max(-1, Math.min(1, rawY));
		};

		const handlePointerLeave = () => {
			targetXRef.current = 0;
			targetYRef.current = 0;
		};

		window.addEventListener("pointermove", handlePointerMove, { passive: true });
		window.addEventListener("pointerleave", handlePointerLeave);

		return () => {
			window.removeEventListener("pointermove", handlePointerMove);
			window.removeEventListener("pointerleave", handlePointerLeave);
		};
	}, []);

	// RequestAnimationFrame physics simulation loop
	useEffect(() => {
		let animId: number;

		const updatePhysicsLoop = () => {
			if (currentActionRef.current === "idle" && physicsEnabledRef.current) {
				const spring = springFactorRef.current;
				currentXRef.current += (targetXRef.current - currentXRef.current) * spring;
				currentYRef.current += (targetYRef.current - currentYRef.current) * spring;

				const mag = Math.hypot(currentXRef.current, currentYRef.current);
				const deadZone = 0.16;

				const lookLeftVid = actionVideoRefs.current.lookleft;
				const lookRightVid = actionVideoRefs.current.lookright;
				const lookUpVid = actionVideoRefs.current.lookup;
				const lookDownVid = actionVideoRefs.current.lookdown;
				const idleVid = idleVideoRef.current;

				if (mag < deadZone) {
					// Center forward gaze
					if (
						lookLeftVid?.style.opacity === "1" ||
						lookRightVid?.style.opacity === "1" ||
						lookUpVid?.style.opacity === "1" ||
						lookDownVid?.style.opacity === "1"
					) {
						if (lookLeftVid) lookLeftVid.style.opacity = "0";
						if (lookRightVid) lookRightVid.style.opacity = "0";
						if (lookUpVid) lookUpVid.style.opacity = "0";
						if (lookDownVid) lookDownVid.style.opacity = "0";
						if (idleVid) idleVid.style.opacity = "1";
					}
					setGazeStatus("Center (Idle)");
				} else {
					// Directional gaze active
					if (idleVid) idleVid.style.opacity = "0";
					const absX = Math.abs(currentXRef.current);
					const absY = Math.abs(currentYRef.current);

					let activeVid: HTMLVideoElement | null = null;
					let dirName = "";

					// Vertical vs horizontal dominance
					if (absY * 1.15 > absX) {
						if (currentYRef.current < 0) {
							activeVid = lookUpVid ?? null;
							dirName = "Up ⬆️";
							if (lookLeftVid) lookLeftVid.style.opacity = "0";
							if (lookRightVid) lookRightVid.style.opacity = "0";
							if (lookDownVid) lookDownVid.style.opacity = "0";
						} else {
							activeVid = lookDownVid ?? null;
							dirName = "Down ⬇️";
							if (lookLeftVid) lookLeftVid.style.opacity = "0";
							if (lookRightVid) lookRightVid.style.opacity = "0";
							if (lookUpVid) lookUpVid.style.opacity = "0";
						}
					} else {
						if (currentXRef.current < 0) {
							activeVid = lookLeftVid ?? null;
							dirName = "Left ⬅️";
							if (lookRightVid) lookRightVid.style.opacity = "0";
							if (lookUpVid) lookUpVid.style.opacity = "0";
							if (lookDownVid) lookDownVid.style.opacity = "0";
						} else {
							activeVid = lookRightVid ?? null;
							dirName = "Right ➡️";
							if (lookLeftVid) lookLeftVid.style.opacity = "0";
							if (lookUpVid) lookUpVid.style.opacity = "0";
							if (lookDownVid) lookDownVid.style.opacity = "0";
						}
					}

					if (activeVid) {
						activeVid.style.opacity = "1";
						const progress = Math.min(1, Math.max(0, (mag - deadZone) / (1.0 - deadZone)));
						const targetTime = progress * 2.5;

						if (Math.abs(targetTime - lastRenderedTimeRef.current) > 0.015) {
							activeVid.currentTime = targetTime;
							lastRenderedTimeRef.current = targetTime;
						}

						setGazeStatus(`${dirName} (${Math.round(progress * 100)}%)`);
					}
				}
			}

			animId = requestAnimationFrame(updatePhysicsLoop);
		};

		animId = requestAnimationFrame(updatePhysicsLoop);

		return () => {
			cancelAnimationFrame(animId);
		};
	}, []);

	return (
		<div className="relative flex flex-col items-center justify-center">
			{/* Top Floating Badge (Interactive Avatar Trigger) */}
			<button
				type="button"
				onClick={() => playAction("wave")}
				className="absolute -top-3 right-2 z-20 inline-flex -rotate-3 cursor-pointer items-center gap-1.5 rounded-xl border-brutal border-ink bg-sky px-3 py-1.5 font-heading text-xs font-black text-ink shadow-brutal transition-transform select-none hover:-translate-y-0.5 hover:rotate-6 sm:-top-5 sm:right-6 sm:text-sm"
				title="Click to interact with avatar!"
			>
				⚡ Interactive Avatar
			</button>

			{/* Video Stage with Avatar Mask Feathering */}
			<div
				ref={videoStageRef}
				className="relative aspect-2/3 w-full max-w-[380px] sm:max-w-[420px] lg:max-w-[440px]"
			>
				{/* Idle Video (Base Background Loop) */}
				<video
					ref={idleVideoRef}
					src="/avatar/avatar-idle.webm"
					poster="/avatar/avatar-idle.webp"
					autoPlay
					loop
					muted
					playsInline
					preload="auto"
					className="pointer-events-none absolute inset-0 size-full avatar-blend-mask object-contain transition-opacity duration-300"
					style={{ opacity: 1, zIndex: 1 }}
				/>

				{/* Action & Gesture WebM Videos */}
				{ALL_ACTIONS.map((item) => (
					<video
						key={item.id}
						ref={(el) => {
							actionVideoRefs.current[item.id] = el;
						}}
						src={item.src}
						muted
						playsInline
						preload="auto"
						onEnded={transitionToIdle}
						onTimeUpdate={(e) => {
							const vid = e.currentTarget;
							// Gesture clips return to idle near the end
							if (item.isGesture && vid.currentTime >= 4.7 && vid.style.opacity === "1") {
								transitionToIdle();
							}
						}}
						className="pointer-events-none absolute inset-0 size-full avatar-blend-mask object-contain transition-opacity duration-300"
						style={{ opacity: 0, zIndex: 2 }}
					/>
				))}

				{/* Fallback Static Image (Hidden when videos load) */}
				<Image
					src="/avatar/avatar-idle.webp"
					alt="Nomer Israel Avatar Character"
					fill
					priority
					className="pointer-events-none -z-10 size-full avatar-blend-mask object-contain"
				/>
			</div>

			{/* Interactive Action Chips Dock */}
			<div className="mt-4 flex w-full max-w-md flex-col items-center gap-2.5 px-2">
				{/* Gesture Action Chips */}
				<div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
					{GESTURE_ACTIONS.map((act) => {
						const isActive = activeAction === act.id;
						return (
							<button
								key={act.id}
								type="button"
								onClick={() => playAction(act.id)}
								className={cn(
									"inline-flex cursor-pointer items-center gap-1 rounded-lg border-2 border-ink px-2.5 py-1 font-heading text-xs font-black shadow-brutal-xs transition-all select-none",
									isActive
										? "translate-x-0.5 translate-y-0.5 bg-ink text-white shadow-none"
										: "bg-surface text-ink hover:-translate-y-0.5 hover:shadow-brutal-sm",
								)}
							>
								<span>{act.emoji}</span>
								<span>{act.label}</span>
							</button>
						);
					})}

					{/* Return to Idle Button */}
					<button
						type="button"
						onClick={transitionToIdle}
						className={cn(
							"inline-flex cursor-pointer items-center gap-1 rounded-lg border-2 border-ink px-2.5 py-1 font-heading text-xs font-black shadow-brutal-xs transition-all select-none",
							activeAction === "idle"
								? "bg-mint font-black text-ink"
								: "bg-surface text-ink hover:-translate-y-0.5 hover:shadow-brutal-sm",
						)}
					>
						<span>☕</span>
						<span>Idle</span>
					</button>
				</div>

				{/* Physics & Head Turn Status Bar */}
				<div className="inline-flex flex-wrap items-center justify-center gap-2 rounded-full border-2 border-ink bg-surface px-3 py-1 text-[11px] font-bold text-ink shadow-brutal-xs">
					<button
						type="button"
						onClick={() => {
							const next = !physicsEnabled;
							setPhysicsEnabled(next);
							physicsEnabledRef.current = next;
							if (!next) {
								transitionToIdle();
							}
						}}
						className={cn(
							"cursor-pointer rounded-full border border-ink px-2 py-0.5 font-heading text-[10px] font-black uppercase transition-colors",
							physicsEnabled ? "bg-canvas text-ink" : "bg-rose-100 text-rose-800",
						)}
					>
						{physicsEnabled ? "🌊 Head Turn (ON)" : "⏸️ Head Turn (OFF)"}
					</button>

					<span className="font-mono text-[10px] text-ink-muted">{gazeStatus}</span>
				</div>
			</div>
		</div>
	);
}
