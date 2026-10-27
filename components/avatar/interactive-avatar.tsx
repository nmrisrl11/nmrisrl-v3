"use client";

import { Data } from "@/constants/data";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRef } from "react";
import { avatarStore } from "./avatar-store";
import { ACTION_CLIPS, ACTION_KEYS, LOOK_CLIPS } from "./types";
import { useAvatarGaze } from "./use-avatar-gaze";

interface InteractiveAvatarProps {
	className?: string;
}

export function InteractiveAvatar({ className }: InteractiveAvatarProps) {
	const stageRef = useRef<HTMLDivElement>(null);
	const waveVideoRef = useRef<HTMLVideoElement>(null);
	const idleVideoRef = useRef<HTMLVideoElement>(null);
	const lookVideoRefs = useRef<(HTMLVideoElement | null)[]>([]);
	const actionVideoRefs = useRef<Record<string, HTMLVideoElement | null>>({});

	useAvatarGaze({
		stageRef,
		waveVideoRef,
		idleVideoRef,
		lookVideoRefs,
		actionVideoRefs,
		enabled: true,
	});

	// Delighted easter egg: clicking avatar triggers K-pop finger heart gesture
	const handleAvatarClick = () => {
		avatarStore.requestAction("fingerheart", {
			priority: "click",
			source: "avatar-click",
		});
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter" || e.key === " ") {
			e.preventDefault();
			handleAvatarClick();
		}
	};

	return (
		<div
			ref={stageRef}
			role="button"
			tabIndex={0}
			aria-label={`Interact with ${Data.fullName}'s avatar`}
			onClick={handleAvatarClick}
			onKeyDown={handleKeyDown}
			className={cn(
				"relative aspect-2/3 w-full max-w-65 cursor-pointer select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink sm:max-w-85 md:max-w-95 lg:max-w-100",
				className,
			)}
		>
			{/* Permanent Default Base Poster (Resting idle pose shown when unfocused, idle, or between interactions) */}
			<Image
				src="/avatar/avatar-idle.webp"
				alt={`${Data.fullName} Avatar Character`}
				fill
				priority
				sizes="(max-width: 640px) 260px, (max-width: 768px) 340px, (max-width: 1024px) 380px, 400px"
				className="pointer-events-none z-0 size-full object-contain object-bottom"
			/>

			{/* Living Idle Video (Loops on mobile and smoothly fades in on desktop when cursor leaves the window) */}
			<video
				ref={idleVideoRef}
				src="/avatar/avatar-idle.webm"
				poster="/avatar/avatar-idle.webp"
				muted
				playsInline
				loop
				preload="auto"
				aria-hidden="true"
				className="pointer-events-none absolute inset-0 size-full object-contain object-bottom opacity-0 transition-opacity"
				style={{ opacity: 0, zIndex: 1 }}
			/>

			{/* Welcome Wave Greeting (Plays once on page load, then smoothly dissolves out to reveal the idle poster / video) */}
			<video
				ref={waveVideoRef}
				src="/avatar/avatar-wave.webm"
				poster="/avatar/avatar-idle.webp"
				autoPlay
				muted
				playsInline
				preload="auto"
				aria-hidden="true"
				className="pointer-events-none absolute inset-0 size-full object-contain object-bottom transition-opacity"
				style={{ zIndex: 5, opacity: 1 }}
			/>

			{/* 4 Directional Look Videos (Left, Right, Up, Down - smoothly scrubbed via spring solver) */}
			{LOOK_CLIPS.map((clip, idx) => (
				<video
					key={clip.id}
					ref={(el) => {
						lookVideoRefs.current[idx] = el;
					}}
					src={clip.src}
					muted
					playsInline
					preload="auto"
					aria-hidden="true"
					className="pointer-events-none absolute inset-0 size-full object-contain object-bottom opacity-0 transition-opacity"
					style={{ opacity: 0, zIndex: 0 }}
				/>
			))}

			{/* Contextual Action Videos (coding, thumbsup, fingerheart, thinking) */}
			{ACTION_KEYS.map((actionKey) => {
				const clip = ACTION_CLIPS[actionKey];
				return (
					<video
						key={clip.id}
						ref={(el) => {
							actionVideoRefs.current[actionKey] = el;
						}}
						src={clip.src}
						muted
						playsInline
						preload="auto"
						loop={clip.loop}
						aria-hidden="true"
						className="pointer-events-none absolute inset-0 size-full object-contain object-bottom opacity-0 transition-opacity"
						style={{ opacity: 0, zIndex: 0 }}
					/>
				);
			})}
		</div>
	);
}
