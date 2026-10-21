import type { NeuIconProps } from "@/components/neu-icons/types";
import { cn } from "@/lib/utils";

/**
 * Neubrutalist 4-blade curved propeller star icon.
 */
export function PropellerStarIcon({
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
			viewBox="0 0 353 352"
			width={resolvedWidth}
			height={resolvedHeight}
			fill={fill}
			aria-hidden={hasAccessibleName ? undefined : "true"}
			role={hasAccessibleName ? "img" : undefined}
			className={cn(
				"inline-block shrink-0 fill-current select-none",
				size === 24 && !width && !height && "size-6",
				className,
			)}
			{...props}
		>
			<path d="M342.855 11.8564C318.255 -12.7436 250.455 13.3564 177.755 71.1564C103.755 11.5564 34.2548 -15.7436 9.25483 9.25641C-15.7452 34.2564 11.5548 103.856 71.2548 177.756C13.9548 250.156 -11.9452 317.556 12.5548 342.056C37.1548 366.656 104.955 340.556 177.655 282.756C249.055 338.656 315.155 363.556 339.355 339.356C363.555 315.156 338.655 249.056 282.855 177.656C341.155 104.756 367.555 36.5564 342.855 11.8564Z" />
		</svg>
	);
}
