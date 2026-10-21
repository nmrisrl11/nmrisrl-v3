import type { NeuIconProps } from "@/components/neu-icons/types";
import { cn } from "@/lib/utils";

/**
 * Neubrutalist 4-lobed scallop rosette / flower badge icon.
 */
export function ScallopRosetteIcon({
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
			viewBox="0 0 361 361"
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
			<path d="M335.925 215.925C316.325 196.325 316.325 164.525 335.925 144.825C369.025 111.725 369.025 57.925 335.925 24.825C302.825 -8.275 249.025 -8.275 215.925 24.825C196.325 44.425 164.525 44.425 144.825 24.825C111.725 -8.275 57.925 -8.275 24.825 24.825C-8.275 57.925 -8.275 111.725 24.825 144.825C44.425 164.425 44.425 196.225 24.825 215.925C-8.275 249.025 -8.275 302.825 24.825 335.925C57.925 369.025 111.725 369.025 144.825 335.925C164.425 316.325 196.225 316.325 215.925 335.925C249.025 369.025 302.825 369.025 335.925 335.925C369.025 302.825 369.025 249.125 335.925 215.925Z" />
		</svg>
	);
}
