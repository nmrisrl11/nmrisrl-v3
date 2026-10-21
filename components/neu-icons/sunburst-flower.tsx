import type { NeuIconProps } from "@/components/neu-icons/types";
import { cn } from "@/lib/utils";

/**
 * Neubrutalist 8-petal blooming sunburst daisy flower icon.
 */
export function SunburstFlowerIcon({
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
			viewBox="0 0 426 426"
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
			<path d="M426 216.9C426 194.4 395.5 174.3 347.7 161.1C373.4 116.8 381.4 79.9 365.1 63.6C349 47.5 312.6 55.2 268.9 80.3C255.7 31.3 235.4 0 212.6 0C190.2 0 170.1 30.3 156.9 77.8C113.2 52.8 76.9 45.1 60.9 61.2C44.4 77.7 52.9 115.5 79.5 160.8C31 173.9 0 194.2 0 216.9C0 239.4 30.5 259.5 78.3 272.7C55.1 314.6 48.3 349.3 63.9 364.8C79.6 380.5 114.8 373.5 157.3 349.7C170.5 396.3 190.4 426 212.5 426C235.1 426 255.2 395.3 268.5 347.2C311.1 371.1 346.3 378.2 362.1 362.4C377.4 347.1 371.2 313.4 348.9 272.4C396 259.2 426 239.2 426 216.9Z" />
		</svg>
	);
}
