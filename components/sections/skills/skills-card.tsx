import { DiamondStarIcon } from "@/components/neu-icons";
import type { StackAndSkillsDataProps } from "@/constants/stack-and-skills-data";
import { cn } from "@/lib/utils";
import { memo } from "react";
import { TechBadge } from "./tech-badge";

interface SkillsCardProps {
	category: StackAndSkillsDataProps;
	className?: string;
	colSpan?: string;
}

export const SkillsCard = memo(function SkillsCard({
	category,
	className,
	colSpan,
}: SkillsCardProps) {
	return (
		<div
			className={cn(
				"relative flex flex-col justify-between overflow-hidden squircle-card bg-surface p-4 sm:p-5 lg:p-6",
				"transition-all duration-200 hover:-translate-y-1 hover:shadow-brutal-lg",
				colSpan ?? category.colSpan,
				className,
			)}
		>
			{/* Top Area: Blueprint Header & Title */}
			<div>
				{/* Blueprint Card Eyebrow */}
				<div className="mb-3 flex items-center justify-between gap-2 border-b border-ink/15 pb-3 sm:mb-4 sm:pb-3.5">
					<div className="flex items-center gap-1.5 font-mono text-xs font-bold tracking-wide text-ink uppercase sm:gap-2">
						<DiamondStarIcon size={12} className="size-3 shrink-0 text-coral" />
						<span>{category.kicker}</span>
					</div>
					<span className="text-right font-mono text-2xs font-bold tracking-wider text-ink/40 uppercase">
						{category.tag}
					</span>
				</div>

				{/* Category Heading */}
				<h3 className="mb-3 font-heading text-base font-black tracking-tight text-ink sm:mb-4 sm:text-lg lg:text-xl">
					{category.title}
				</h3>

				{/* Skill Badges Cluster */}
				<div className="flex flex-wrap gap-2 sm:gap-2.5">
					{category.items.map((tech) => (
						<TechBadge key={tech.label} item={tech} />
					))}
				</div>
			</div>

			{/* Bottom Blueprint Spec Footer */}
			<div className="mt-5 flex items-center justify-between border-t border-ink/10 pt-3 font-mono text-2xs text-ink/50 uppercase select-none">
				<span>SPEC // {category.id}</span>
				<span className="font-bold text-ink/70">{category.items.length} units</span>
			</div>
		</div>
	);
});
