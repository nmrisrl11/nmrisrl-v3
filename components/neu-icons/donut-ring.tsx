import type { NeuIconProps } from "@/components/neu-icons/types";
import { cn } from "@/lib/utils";

/**
 * Neubrutalist circular donut ring / target torus icon.
 */
export function DonutRingIcon({
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
			viewBox="0 0 371 371"
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
			<path d="M185.5 0C83.1 0 0 83 0 185.5C0 288 83 371 185.5 371C288 371 371 288 371 185.5C371 83 287.9 0 185.5 0ZM185.5 263.1C142.6 263.1 107.9 228.3 107.9 185.5C107.9 142.7 142.7 107.9 185.5 107.9C228.4 107.9 263.1 142.7 263.1 185.5C263.1 228.3 228.4 263.1 185.5 263.1Z" />
		</svg>
	);
}
