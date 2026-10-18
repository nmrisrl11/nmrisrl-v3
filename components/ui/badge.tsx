import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
	"inline-flex items-center gap-1.5 px-3 py-1 font-mono text-xs font-bold tracking-tight transition-colors border-subtle border-ink shadow-brutal-xs",
	{
		variants: {
			variant: {
				default: "bg-surface text-ink",
				coral: "bg-coral text-white",
				yellow: "bg-yellow text-ink",
				lavender: "bg-lavender text-ink",
				sky: "bg-sky text-ink",
				mint: "bg-mint text-ink",
				outline: "bg-transparent text-ink",
			},
			shape: {
				squircle: "rounded-md corner-squircle supports-[corner-shape:squircle]:rounded-full",
				rounded: "rounded-full",
			},
		},
		defaultVariants: {
			variant: "default",
			shape: "squircle",
		},
	},
);

export interface BadgeProps
	extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, shape, ...props }: BadgeProps) {
	return <div className={cn(badgeVariants({ variant, shape }), className)} {...props} />;
}

export { Badge, badgeVariants };
