import {
	CrossStarIcon,
	DiamondStarIcon,
	DonutRingIcon,
	DoubleCapsuleIcon,
	PropellerStarIcon,
	RoundedCrossIcon,
	ScallopRosetteIcon,
	SlantedLoopIcon,
	SunburstFlowerIcon,
	TrefoilCloudIcon,
} from "@/components/neu-icons";
import { cn } from "@/lib/utils";
import type { ComponentProps, ReactNode } from "react";

export type GridMarkerVariant =
	| "squircle"
	| "box"
	| "crosshair"
	| "diamond-star"
	| "cross-star"
	| "rounded-cross"
	| "propeller-star"
	| "donut-ring"
	| "double-capsule"
	| "trefoil-cloud"
	| "sunburst-flower"
	| "scallop-rosette"
	| "slanted-loop";

type GridMarkerPosition = "top-left" | "top-right" | "bottom-left" | "bottom-right";

interface GridMarkerProps extends ComponentProps<"div"> {
	/**
	 * Visual shape variant of the grid line marker:
	 * - 'squircle' (default) / 'box': tactile CAD junction box with squircle progressive fallback
	 * - 'crosshair': architectural font-mono '+' character
	 * - neu-icons: 'diamond-star' | 'cross-star' | 'rounded-cross' | 'propeller-star' | 'donut-ring' etc.
	 */
	variant?: GridMarkerVariant;
	/** Optional architectural corner anchor placement */
	position?: GridMarkerPosition;
	/** Custom element or icon override */
	children?: ReactNode;
}

const positionClasses: Record<GridMarkerPosition, string> = {
	"top-left": "top-0 left-0 -translate-x-1/2 -translate-y-1/2",
	"top-right": "top-0 right-0 translate-x-1/2 -translate-y-1/2",
	"bottom-left": "bottom-0 left-0 -translate-x-1/2 translate-y-1/2",
	"bottom-right": "bottom-0 right-0 translate-x-1/2 translate-y-1/2",
};

/**
 * GridMarker
 * Architectural junction anchor rendered on grid lines and section intersections.
 * Supports squircle boxes with continuous G2 curvature and progressive fallback,
 * classic architectural crosshairs, and dynamic handcrafted Neu-Icons.
 */
export function GridMarker({
	variant = "squircle",
	position,
	className,
	children,
	...props
}: GridMarkerProps) {
	const positionClass = position ? positionClasses[position] : "";

	const isSvgVariant = variant !== "squircle" && variant !== "box" && variant !== "crosshair";
	// On SVG icons, CSS box-shadow casts on the rectangular bounding box.
	// Auto-map shadow-brutal to drop-shadow-brutal so shadows contour to the icon's silhouette.
	const resolvedClassName =
		isSvgVariant && className
			? className.replace(/\bshadow-brutal(-xs|-sm|-lg|-xl)?\b/g, (_match, suffix) => {
					return suffix === "-xl" ? "drop-shadow-brutal-lg" : `drop-shadow-brutal${suffix ?? ""}`;
				})
			: className;

	const renderContent = () => {
		if (children) {
			return children;
		}

		switch (variant) {
			case "squircle":
			case "box":
				return (
					<span
						aria-hidden="true"
						className={cn(
							"inline-block size-2.5 rounded-xs border border-ink/40 bg-surface shadow-xs corner-squircle supports-[corner-shape:squircle]:rounded-full",
							className,
						)}
					/>
				);

			case "crosshair":
				return (
					<span
						aria-hidden="true"
						className={cn(
							"inline-flex size-4 items-center justify-center font-mono text-xs leading-none font-bold text-ink/40 select-none",
							className,
						)}
					>
						+
					</span>
				);

			case "diamond-star":
				return (
					<DiamondStarIcon size={14} className={cn("size-3.5 text-ink/50", resolvedClassName)} />
				);

			case "cross-star":
				return (
					<CrossStarIcon size={14} className={cn("size-3.5 text-ink/50", resolvedClassName)} />
				);

			case "rounded-cross":
				return (
					<RoundedCrossIcon size={14} className={cn("size-3.5 text-ink/50", resolvedClassName)} />
				);

			case "propeller-star":
				return (
					<PropellerStarIcon size={14} className={cn("size-3.5 text-ink/50", resolvedClassName)} />
				);

			case "donut-ring":
				return (
					<DonutRingIcon size={14} className={cn("size-3.5 text-ink/50", resolvedClassName)} />
				);

			case "double-capsule":
				return (
					<DoubleCapsuleIcon size={14} className={cn("size-3.5 text-ink/50", resolvedClassName)} />
				);

			case "trefoil-cloud":
				return (
					<TrefoilCloudIcon size={14} className={cn("size-3.5 text-ink/50", resolvedClassName)} />
				);

			case "sunburst-flower":
				return (
					<SunburstFlowerIcon size={14} className={cn("size-3.5 text-ink/50", resolvedClassName)} />
				);

			case "scallop-rosette":
				return (
					<ScallopRosetteIcon size={14} className={cn("size-3.5 text-ink/50", resolvedClassName)} />
				);

			case "slanted-loop":
				return (
					<SlantedLoopIcon size={14} className={cn("size-3.5 text-ink/50", resolvedClassName)} />
				);

			default:
				return null;
		}
	};

	return (
		<div
			aria-hidden="true"
			className={cn(
				"pointer-events-none z-10 flex items-center justify-center select-none",
				position && "absolute",
				positionClass,
			)}
			{...props}
		>
			{renderContent()}
		</div>
	);
}
