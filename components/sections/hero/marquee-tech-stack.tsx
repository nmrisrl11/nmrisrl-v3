"use client";

import { DiamondStarIcon } from "@/components/neu-icons";
import { GridMarker, type GridMarkerVariant } from "@/components/page-layout/grid-marker";
import { ProfileCoreTech } from "@/constants/stack-and-skills-data";
import { motion } from "motion/react";
import Image from "next/image";
import type { ReactElement, ReactNode } from "react";

interface TechItemProps {
	label: string;
	icon: string;
}

function TechItem({ label, icon }: TechItemProps) {
	return (
		<div className="flex shrink-0 items-center gap-2 px-4 py-2 md:gap-2.5 md:px-6 md:py-2.5">
			<Image
				src={`https://cdn.simpleicons.org/${icon}`}
				alt={`${label} logo`}
				width={18}
				height={18}
				unoptimized
				className="size-4 object-contain opacity-90 md:size-4.5"
				loading="lazy"
				decoding="async"
				draggable={false}
			/>
			<span className="font-heading text-xs font-bold tracking-wider whitespace-nowrap text-ink uppercase">
				{label}
			</span>
			<DiamondStarIcon size={10} className="ml-3 size-2.5 text-ink/30 select-none md:ml-4" />
		</div>
	);
}

interface TranslateWrapperProps {
	children: ReactNode;
	reverse?: boolean;
	duration?: number;
}

function TranslateWrapper({ children, reverse = false, duration = 32 }: TranslateWrapperProps) {
	return (
		<motion.div
			initial={{ translateX: reverse ? "-100%" : "0%" }}
			animate={{ translateX: reverse ? "0%" : "-100%" }}
			transition={{ duration, repeat: Infinity, ease: "linear" }}
			className="flex shrink-0 items-center"
		>
			{children}
		</motion.div>
	);
}

interface MarqueeTechStackProps {
	/** Visual marker variant or custom ReactElement override (defaults to 'squircle') */
	marker?: GridMarkerVariant | ReactElement;
	/** Optional class string applied to the corner markers */
	markerClassName?: string;
	/** Whether to display markers at top corner intersections (defaults to true) */
	showMarkers?: boolean;
}

export function MarqueeTechStack({
	marker = "squircle",
	markerClassName,
	showMarkers = true,
}: MarqueeTechStackProps = {}) {
	const reversedCoreTech = [...ProfileCoreTech].reverse();

	return (
		<div
			aria-hidden="true"
			className="relative w-full border-t border-ink/20 bg-surface select-none"
		>
			{/* Left & Right Soft Edge Gradient Masks */}
			<div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-linear-to-r from-surface to-transparent md:w-20" />
			<div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-linear-to-l from-surface to-transparent md:w-20" />

			{/* Top Left & Top Right Intersection Corner Markers (z-20 / rendered above gradient masks) */}
			{showMarkers && (
				<>
					<GridMarker
						variant={typeof marker === "string" ? marker : undefined}
						position="top-left"
						className={markerClassName}
					>
						{typeof marker !== "string" ? marker : undefined}
					</GridMarker>
					<GridMarker
						variant={typeof marker === "string" ? marker : undefined}
						position="top-right"
						className={markerClassName}
					>
						{typeof marker !== "string" ? marker : undefined}
					</GridMarker>
				</>
			)}

			{/* Top Track (Translates Left) */}
			<div className="relative flex overflow-hidden border-b border-ink/15">
				<TranslateWrapper duration={28}>
					<div className="flex shrink-0 items-center">
						{ProfileCoreTech.map((tech) => (
							<TechItem key={tech.label} label={tech.label} icon={tech.icon} />
						))}
					</div>
				</TranslateWrapper>
				<TranslateWrapper duration={28}>
					<div className="flex shrink-0 items-center">
						{ProfileCoreTech.map((tech) => (
							<TechItem key={`${tech.label}-dup1`} label={tech.label} icon={tech.icon} />
						))}
					</div>
				</TranslateWrapper>
				<TranslateWrapper duration={28}>
					<div className="flex shrink-0 items-center">
						{ProfileCoreTech.map((tech) => (
							<TechItem key={`${tech.label}-dup2`} label={tech.label} icon={tech.icon} />
						))}
					</div>
				</TranslateWrapper>
				<TranslateWrapper duration={28}>
					<div className="flex shrink-0 items-center">
						{ProfileCoreTech.map((tech) => (
							<TechItem key={`${tech.label}-dup3`} label={tech.label} icon={tech.icon} />
						))}
					</div>
				</TranslateWrapper>
			</div>

			{/* Bottom Track (Translates Right / Reverse) */}
			<div className="relative flex overflow-hidden">
				<TranslateWrapper reverse duration={32}>
					<div className="flex shrink-0 items-center">
						{reversedCoreTech.map((tech) => (
							<TechItem key={tech.label} label={tech.label} icon={tech.icon} />
						))}
					</div>
				</TranslateWrapper>
				<TranslateWrapper reverse duration={32}>
					<div className="flex shrink-0 items-center">
						{reversedCoreTech.map((tech) => (
							<TechItem key={`${tech.label}-dup1`} label={tech.label} icon={tech.icon} />
						))}
					</div>
				</TranslateWrapper>
				<TranslateWrapper reverse duration={32}>
					<div className="flex shrink-0 items-center">
						{reversedCoreTech.map((tech) => (
							<TechItem key={`${tech.label}-dup2`} label={tech.label} icon={tech.icon} />
						))}
					</div>
				</TranslateWrapper>
				<TranslateWrapper reverse duration={32}>
					<div className="flex shrink-0 items-center">
						{reversedCoreTech.map((tech) => (
							<TechItem key={`${tech.label}-dup3`} label={tech.label} icon={tech.icon} />
						))}
					</div>
				</TranslateWrapper>
			</div>
		</div>
	);
}
