"use client";

import type { WorkExperienceItem } from "@/constants/work-experience-data";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import type { KeyboardEvent } from "react";
import { ExperienceLogo } from "./experience-logo";
import { ExperiencePulse } from "./experience-pulse";

interface ExperienceCardProps {
	item: WorkExperienceItem;
	onSelect: () => void;
}

export function ExperienceCard({ item, onSelect }: ExperienceCardProps) {
	const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
		if (e.key === "Enter" || e.key === " ") {
			e.preventDefault();
			onSelect();
		}
	};

	return (
		<div
			id={`experience-card-${item.id}`}
			role="button"
			tabIndex={0}
			onClick={onSelect}
			onKeyDown={handleKeyDown}
			className={cn(
				"group relative flex w-full cursor-pointer items-center justify-between gap-4 squircle-card bg-surface p-4 sm:p-6",
				"transition-all duration-200 hover:-translate-y-1 hover:shadow-brutal-lg",
				"focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink",
			)}
			aria-label={`View details for ${item.position} at ${item.companyName}`}
		>
			{/* Left & Middle Identity Block */}
			<div className="flex min-w-0 flex-1 items-center gap-3.5 sm:gap-5">
				{/* Company Logo Stamp */}
				<div className="shrink-0">
					<ExperienceLogo logo={item.logo} companyName={item.companyName} size="md" />
				</div>

				{/* Info Block */}
				<div className="flex min-w-0 flex-1 flex-col gap-1 text-left">
					{/* Company Name + Pulse Dot */}
					<div className="flex flex-wrap items-center gap-2">
						<h3 className="font-heading text-base font-black tracking-tight text-ink sm:text-lg">
							{item.companyName}
						</h3>
						{item.isCurrent && (
							<div className="shrink-0">
								<ExperiencePulse />
							</div>
						)}
					</div>

					{/* Role / Position */}
					<p className="font-heading text-sm font-semibold text-ink/80 sm:text-base">
						{item.position}
					</p>

					{/* Metadata Ribbon */}
					<div className="flex flex-wrap items-center gap-1.5 font-mono text-2xs text-ink/65 sm:gap-2 sm:text-xs">
						<span>{item.jobType}</span>
						<span className="text-ink/30">•</span>
						<span>{item.location}</span>
						<span className="text-ink/30">•</span>
						<span className="font-bold text-ink/80">
							{item.startDate} — {item.endDate}
						</span>
					</div>
				</div>
			</div>

			{/* Right Interactive Arrow Button - Hidden on mobile, flex-aligned on sm+ */}
			<div
				className="hidden size-9 shrink-0 items-center justify-center rounded-lg border-subtle border-ink bg-surface shadow-brutal-xs transition-all duration-200 corner-squircle group-hover:scale-105 group-hover:bg-yellow group-hover:shadow-brutal supports-[corner-shape:squircle]:rounded-full sm:flex"
				aria-hidden="true"
			>
				<ArrowUpRight className="size-4 text-ink transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
			</div>
		</div>
	);
}
