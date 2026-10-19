import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const customTwMerge = extendTailwindMerge({
	extend: {
		classGroups: {
			"border-w": ["border-brutal", "border-subtle", "border-thick"],
			"border-w-b": ["border-b-brutal", "border-b-subtle", "border-b-thick"],
			"border-w-t": ["border-t-brutal", "border-t-subtle", "border-t-thick"],
			"border-w-x": ["border-x-brutal", "border-x-subtle", "border-x-thick"],
			"border-w-y": ["border-y-brutal", "border-y-subtle", "border-y-thick"],
			shadow: [
				"shadow-brutal-xs",
				"shadow-brutal-sm",
				"shadow-brutal",
				"shadow-brutal-lg",
				"shadow-brutal-xl",
			],
		},
	},
});

export function cn(...inputs: ClassValue[]) {
	return customTwMerge(clsx(inputs));
}
