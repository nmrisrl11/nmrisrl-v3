"use client";

import { DiamondStarIcon } from "@/components/neu-icons";
import { Button } from "@/components/ui/button";
import { SKILL_FILTERS, type SkillFilterId } from "@/hooks/use-skills-filter";
import { cn } from "@/lib/utils";

interface SkillsFilterProps {
	activeFilter: SkillFilterId;
	onFilterChange: (id: SkillFilterId) => void;
	visibleCount: number;
	totalCount: number;
	visibleUnits: number;
	isPending?: boolean;
	className?: string;
}

export function SkillsFilter({
	activeFilter,
	onFilterChange,
	visibleCount,
	totalCount,
	visibleUnits,
	isPending = false,
	className,
}: SkillsFilterProps) {
	return (
		<div
			className={cn(
				"mb-6 flex flex-col gap-3 squircle-card bg-surface/60 p-3 sm:mb-8 sm:p-4",
				className,
			)}
		>
			{/* Micro Blueprint Header */}
			<div className="flex flex-wrap items-center justify-between gap-2 border-b border-ink/15 pb-2.5 font-mono text-2xs font-bold tracking-wider text-ink/60 uppercase">
				<div className="flex items-center gap-1.5 text-ink">
					<DiamondStarIcon size={12} className="size-3 shrink-0 text-coral" />
					<span>FIG. 04.A // FILTER_MATRIX</span>
				</div>
				<div className="flex items-center gap-1.5">
					<span>STATUS:</span>
					{isPending ? (
						<span className="animate-pulse font-mono font-bold text-coral motion-reduce:animate-none">
							COMPILING_MATRIX...
						</span>
					) : (
						<span className="font-mono font-black text-ink">
							{visibleCount}/{totalCount} DOMAINS [{visibleUnits} UNITS]
						</span>
					)}
				</div>
			</div>

			{/* Filter Chips Bar */}
			<div
				role="toolbar"
				aria-label="Filter tech stack by domain"
				className="flex flex-wrap items-center gap-2 sm:gap-2.5"
			>
				{SKILL_FILTERS.map((filter) => {
					const isActive = activeFilter === filter.id;
					const count = filter.id === "all" ? totalCount : filter.categoryIds.length;

					return (
						<Button
							key={filter.id}
							type="button"
							size="sm"
							shape="squircle"
							variant={isActive ? "yellow" : "secondary"}
							onClick={() => onFilterChange(filter.id)}
							aria-pressed={isActive}
							className={cn(
								"h-8 gap-2 px-3 font-mono text-2xs font-bold tracking-tight transition-all sm:h-9 sm:px-3.5 sm:text-xs",
								!isActive && "opacity-80 shadow-brutal-xs hover:opacity-100",
								isActive && "shadow-brutal ring-2 ring-ink",
							)}
						>
							<span>{filter.label}</span>
							<span
								className={cn(
									"rounded-full px-1.5 py-0.5 font-mono text-2xs font-black",
									isActive ? "bg-ink text-surface" : "bg-ink/10 text-ink/70",
								)}
							>
								{count}
							</span>
						</Button>
					);
				})}
			</div>
		</div>
	);
}
