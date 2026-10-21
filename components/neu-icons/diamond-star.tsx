import type { NeuIconProps } from "@/components/neu-icons/types";
import { cn } from "@/lib/utils";

/**
 * Neubrutalist 8-point faceted diamond sparkle star icon.
 */
export function DiamondStarIcon({
	className,
	size = 24,
	width,
	height,
	fill = "currentColor",
	...props
}: NeuIconProps) {
	const hasAccessibleName = Boolean(props["aria-label"] || props["aria-labelledby"]);
	const resolvedWidth = width ?? size;
	const resolvedHeight = height ?? size;

	return (
		<svg
			viewBox="0 0 410 410"
			width={resolvedWidth}
			height={resolvedHeight}
			fill={fill}
			aria-hidden={hasAccessibleName ? undefined : "true"}
			role={hasAccessibleName ? "img" : undefined}
			className={cn(
				"inline-block shrink-0 select-none",
				fill === "currentColor" && "fill-current",
				size === 24 && !width && !height && "size-6",
				className,
			)}
			{...props}
		>
			<path d="M132.5 132.5L205 0L277.5 132.5L410 205L277.5 277.5L205 410L132.5 277.5L0 205L132.5 132.5Z" />
		</svg>
	);
}
