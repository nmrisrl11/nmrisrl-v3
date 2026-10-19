import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const buttonVariants = cva(
	"inline-flex items-center justify-center gap-2 whitespace-nowrap font-body font-bold text-sm tracking-wide transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
	{
		variants: {
			variant: {
				default:
					"bg-coral text-white ring-2 ring-ink shadow-brutal hover:-translate-y-0.5 hover:shadow-brutal-lg active:translate-y-0.5 active:shadow-brutal-xs",
				secondary:
					"bg-surface text-ink ring-2 ring-ink shadow-brutal hover:-translate-y-0.5 hover:shadow-brutal-lg active:translate-y-0.5 active:shadow-brutal-xs",
				yellow:
					"bg-yellow text-ink ring-2 ring-ink shadow-brutal hover:-translate-y-0.5 hover:shadow-brutal-lg active:translate-y-0.5 active:shadow-brutal-xs",
				lavender:
					"bg-lavender text-ink ring-2 ring-ink shadow-brutal hover:-translate-y-0.5 hover:shadow-brutal-lg active:translate-y-0.5 active:shadow-brutal-xs",
				sky: "bg-sky text-ink ring-2 ring-ink shadow-brutal hover:-translate-y-0.5 hover:shadow-brutal-lg active:translate-y-0.5 active:shadow-brutal-xs",
				outline:
					"bg-transparent text-ink ring-2 ring-ink shadow-brutal hover:bg-surface/50 hover:-translate-y-0.5 hover:shadow-brutal-lg active:translate-y-0.5 active:shadow-brutal-xs",
				ghost:
					"text-ink hover:bg-canvas-subtle hover:ring-2 hover:ring-ink/20 active:translate-y-0.5",
			},
			shape: {
				squircle: "rounded-lg corner-squircle supports-[corner-shape:squircle]:rounded-full",
				rounded: "rounded-xl",
			},
			size: {
				default: "h-11 px-5 py-2.5",
				sm: "h-9 px-3.5 text-xs",
				lg: "h-13 px-8 text-base",
				icon: "size-11 p-0",
			},
		},
		defaultVariants: {
			variant: "default",
			shape: "squircle",
			size: "default",
		},
	},
);

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
	asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, shape, size, asChild = false, children, ...props }, ref) => {
		const classes = cn(buttonVariants({ variant, shape, size, className }));

		if (asChild && React.isValidElement(children)) {
			const child = children as React.ReactElement<{ className?: string }>;
			return React.cloneElement(child, {
				...props,
				...child.props,
				className: cn(classes, child.props.className),
			});
		}

		return (
			<button className={classes} ref={ref} {...props}>
				{children}
			</button>
		);
	},
);
Button.displayName = "Button";

export { Button, buttonVariants };
