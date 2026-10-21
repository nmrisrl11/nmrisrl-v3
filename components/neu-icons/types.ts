import type { ComponentProps } from "react";

/**
 * Shared props interface for Neubrutalist accent SVG icons.
 * Extends native SVG element attributes with optional size shorthand.
 */
export interface NeuIconProps extends ComponentProps<"svg"> {
	/**
	 * Numeric or string dimension (sets both width and height).
	 * Defaults to 24 (paired with `size-6` class).
	 */
	size?: number | string;
}
