"use client";

import { RoundedCrossIcon } from "@/components/neu-icons";
import { Badge } from "@/components/ui/badge";
import type { TechStack } from "@/constants/stack-and-skills-data";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { memo, useState } from "react";
import { BESPOKE_SKILL_ICONS } from "./skills-icons";

interface TechBadgeProps {
	item: TechStack;
	className?: string;
}

export const TechBadge = memo(function TechBadge({ item, className }: TechBadgeProps) {
	const [hasImageError, setHasImageError] = useState(false);
	const BespokeIcon = BESPOKE_SKILL_ICONS[item.label];

	return (
		<Badge variant="default" className={cn("px-2.5 sm:gap-2 sm:px-3 sm:py-1.5", className)}>
			{/* Icon Resolution: 1) Bespoke SVG, 2) Simple Icons CDN, 3) Monospace Blueprint Glyph */}
			{BespokeIcon ? (
				<BespokeIcon
					aria-hidden="true"
					className="size-3.5 shrink-0 text-ink select-none sm:size-4"
				/>
			) : item.icon && !hasImageError ? (
				<Image
					src={`https://cdn.simpleicons.org/${item.icon}`}
					alt=""
					width={16}
					height={16}
					unoptimized
					className="size-3.5 shrink-0 object-contain select-none sm:size-4"
					loading="lazy"
					decoding="async"
					draggable={false}
					onError={() => setHasImageError(true)}
				/>
			) : (
				<RoundedCrossIcon
					aria-hidden="true"
					className="size-3.5 -rotate-45 text-coral select-none sm:size-4"
				/>
			)}

			{/* Label */}
			<span className="whitespace-nowrap">{item.label}</span>
		</Badge>
	);
});
