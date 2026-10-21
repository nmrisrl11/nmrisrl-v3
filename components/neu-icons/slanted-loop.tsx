import type { NeuIconProps } from "@/components/neu-icons/types";
import { cn } from "@/lib/utils";

/**
 * Neubrutalist slanted infinity loop / peanut silhouette icon.
 */
export function SlantedLoopIcon({
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
			viewBox="0 0 409 343"
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
			<path d="M373.74 108.285C324.94 23.7849 243.54 -20.5151 191.84 9.28485C176.34 18.1849 165.34 32.7849 158.74 51.0849C117.94 18.9849 73.14 7.98486 40.34 26.9849C-11.36 56.7849 -13.66 149.485 35.14 233.985C83.94 318.485 165.34 362.785 217.04 332.985C232.54 324.085 243.54 309.485 250.14 291.185C290.94 323.285 335.74 334.285 368.54 315.285C420.24 285.485 422.54 192.785 373.74 108.285Z" />
		</svg>
	);
}
