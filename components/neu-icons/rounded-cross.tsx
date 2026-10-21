import type { NeuIconProps } from "@/components/neu-icons/types";
import { cn } from "@/lib/utils";

/**
 * Neubrutalist rounded Greek cross / plus icon.
 */
export function RoundedCrossIcon({
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
			viewBox="0 0 415 415"
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
			<path d="M334.6 127.3H287.3V80C287.3 35.8 251.5 0 207.3 0C163.1 0 127.3 35.8 127.3 80V127.3H80C35.8 127.3 0 163.1 0 207.3C0 251.5 35.8 287.3 80 287.3H127.3V334.7C127.3 378.9 163.1 414.7 207.3 414.7C251.5 414.7 287.3 378.9 287.3 334.7V287.3H334.7C378.9 287.3 414.7 251.5 414.7 207.3C414.6 163.1 378.8 127.3 334.6 127.3Z" />
		</svg>
	);
}
