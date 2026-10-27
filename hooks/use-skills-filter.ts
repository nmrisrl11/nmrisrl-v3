"use client";

import { StackAndSkillsData } from "@/constants/stack-and-skills-data";
import { useCallback, useMemo, useState, useTransition } from "react";

export type SkillFilterId = "all" | "frontend" | "backend" | "ai" | "workflow" | "design";

export interface SkillFilterOption {
	id: SkillFilterId;
	label: string;
	categoryIds: string[];
}

export const SKILL_FILTERS: SkillFilterOption[] = [
	{
		id: "all",
		label: "ALL",
		categoryIds: [
			"core-tech",
			"ui-styling",
			"state-ecosystem",
			"backend-db",
			"devops-infra",
			"testing-quality",
			"architecture-methods",
			"ai-assisted",
			"monitoring-analytics",
			"design-assets",
		],
	},
	{
		id: "frontend",
		label: "FRONTEND & UI",
		categoryIds: ["core-tech", "ui-styling", "state-ecosystem"],
	},
	{
		id: "backend",
		label: "BACKEND & CLOUD",
		categoryIds: ["backend-db", "devops-infra"],
	},
	{
		id: "ai",
		label: "AI & AGENTS",
		categoryIds: ["ai-assisted"],
	},
	{
		id: "workflow",
		label: "ARCHITECTURE & QA",
		categoryIds: ["architecture-methods", "testing-quality", "monitoring-analytics"],
	},
	{
		id: "design",
		label: "DESIGN & CREATIVE",
		categoryIds: ["design-assets"],
	},
];

/**
 * Dynamically resolves responsive column spans for the 12-column Bento Grid.
 * When "all" is active, returns the bespoke asymmetric layout;
 * when filtered, dynamically expands fewer cards to prevent empty gaps.
 */
export function getFilteredColSpan(
	filter: SkillFilterId,
	totalVisible: number,
	defaultColSpan: string,
): string {
	if (filter === "all") return defaultColSpan;
	if (totalVisible === 1) return "lg:col-span-12";
	if (totalVisible === 2) return "lg:col-span-6";
	if (totalVisible === 3) return "lg:col-span-4";
	return defaultColSpan;
}

/**
 * Reusable hook managing technical domain filter state, active presets,
 * visible category subsets, concurrent transitions, and real-time skill unit counts.
 */
export function useSkillsFilter(initialFilter: SkillFilterId = "all") {
	const [activeFilter, setActiveFilterState] = useState<SkillFilterId>(initialFilter);
	const [isPending, startTransition] = useTransition();

	const setActiveFilter = useCallback((id: SkillFilterId) => {
		startTransition(() => {
			setActiveFilterState(id);
		});
	}, []);

	const activeFilterConfig = useMemo(
		() => SKILL_FILTERS.find((f) => f.id === activeFilter) ?? SKILL_FILTERS[0],
		[activeFilter],
	);

	const visibleCategories = useMemo(() => {
		if (activeFilter === "all") return StackAndSkillsData;
		return StackAndSkillsData.filter((cat) => activeFilterConfig.categoryIds.includes(cat.id));
	}, [activeFilter, activeFilterConfig]);

	const visibleUnits = useMemo(
		() => visibleCategories.reduce((acc, cat) => acc + cat.items.length, 0),
		[visibleCategories],
	);

	return {
		activeFilter,
		setActiveFilter,
		visibleCategories,
		visibleUnits,
		totalDomains: StackAndSkillsData.length,
		isPending,
	};
}
