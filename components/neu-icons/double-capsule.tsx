import type { NeuIconProps } from "@/components/neu-icons/types";
import { cn } from "@/lib/utils";

/**
 * Neubrutalist dual vertical capsule / cassette pill icon.
 */
export function DoubleCapsuleIcon({
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
			viewBox="0 0 385 328"
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
			<path d="M282 0C243.1 0 209.3 34.7 192.1 85.9C174.8 34.8 141 0 102.2 0C45.7 0 0 73.3 0 163.8C0 254.3 45.8 327.6 102.2 327.6C141.1 327.6 174.9 292.9 192.1 241.7C209.4 292.8 243.2 327.6 282 327.6C338.5 327.6 384.2 254.3 384.2 163.8C384.2 73.3 338.5 0 282 0Z" />
		</svg>
	);
}
