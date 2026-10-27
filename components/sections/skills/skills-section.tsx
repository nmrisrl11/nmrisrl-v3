"use client";

import { GridSection } from "@/components/page-layout/grid-section";
import { Skills_Section_Data } from "@/constants/data";
import { useReducedMotion } from "@/hooks/use-rough-notation";
import { getFilteredColSpan, useSkillsFilter } from "@/hooks/use-skills-filter";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { SkillsCard } from "./skills-card";
import { SkillsFilter } from "./skills-filter";
import { SkillsSkeleton } from "./skills-skeleton";

interface SkillsSectionProps {
	isLoading?: boolean;
}

export function SkillsSection({ isLoading = false }: SkillsSectionProps) {
	const {
		activeFilter,
		setActiveFilter,
		visibleCategories,
		visibleUnits,
		totalDomains,
		isPending,
	} = useSkillsFilter();
	const shouldReduceMotion = useReducedMotion();

	return (
		<GridSection
			id="skills"
			figure={Skills_Section_Data.figure}
			figureMeta={Skills_Section_Data.figureMeta}
			title={Skills_Section_Data.title}
			description={Skills_Section_Data.description}
		>
			{/* Filter Control Bar */}
			<SkillsFilter
				activeFilter={activeFilter}
				onFilterChange={setActiveFilter}
				visibleCount={visibleCategories.length}
				totalCount={totalDomains}
				visibleUnits={visibleUnits}
				isPending={isPending}
			/>

			{/* Bento Grid or Blueprint Skeleton */}
			{isLoading ? (
				<SkillsSkeleton />
			) : (
				<div
					className={cn(
						"grid grid-cols-1 gap-4 transition-opacity duration-150 sm:gap-5 md:grid-cols-2 lg:grid-cols-12",
						isPending && "opacity-70",
					)}
				>
					{/* initial={false} ensures SSR HTML renders at opacity: 1, eliminating the blank initial load flash */}
					<AnimatePresence initial={false} mode="sync">
						{visibleCategories.map((category) => {
							const colSpan = getFilteredColSpan(
								activeFilter,
								visibleCategories.length,
								category.colSpan,
							);

							return (
								<motion.div
									key={category.id}
									initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
									animate={{ opacity: 1, y: 0 }}
									exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
									transition={{ duration: 0.18, ease: "easeOut" }}
									className={cn(colSpan, "h-full")}
								>
									<SkillsCard category={category} colSpan="" className="h-full w-full" />
								</motion.div>
							);
						})}
					</AnimatePresence>
				</div>
			)}
		</GridSection>
	);
}
