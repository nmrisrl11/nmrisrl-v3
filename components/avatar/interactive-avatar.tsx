"use client";

import { Data } from "@/constants/data";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRef } from "react";
import { LOOK_CLIPS } from "./types";
import { useAvatarGaze } from "./use-avatar-gaze";

interface InteractiveAvatarProps {
	className?: string;
}

export function InteractiveAvatar({ className }: InteractiveAvatarProps) {
	const stageRef = useRef<HTMLDivElement>(null);
	const waveVideoRef = useRef<HTMLVideoElement>(null);
	const lookVideoRefs = useRef<(HTMLVideoElement | null)[]>([]);

	useAvatarGaze({
		stageRef,
		waveVideoRef,
		lookVideoRefs,
		enabled: true,
	});

	return (
		<div
			ref={stageRef}
			className={cn(
				"relative aspect-2/3 w-full max-w-65 select-none sm:max-w-85 md:max-w-95 lg:max-w-100",
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

			{/* Welcome Wave Greeting (Plays once on page load, then smoothly dissolves out to reveal the idle poster) */}
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
				style={{ zIndex: 3, opacity: 1 }}
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
					className="pointer-events-none absolute inset-0 size-full object-contain object-bottom opacity-0"
					style={{ opacity: 0, zIndex: 0 }}
				/>
			))}
		</div>
	);
}
