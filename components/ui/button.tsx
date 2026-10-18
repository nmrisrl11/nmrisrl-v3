import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
	"inline-flex items-center justify-center gap-2 whitespace-nowrap font-body font-bold text-sm tracking-wide transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-canvas disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
	{
		variants: {
			variant: {
				default:
					"bg-coral text-white border-2 border-ink shadow-brutal-sm hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal active:translate-x-0.5 active:translate-y-0.5 active:shadow-brutal-xs",
				secondary:
					"bg-surface text-ink border-2 border-ink shadow-brutal-sm hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal active:translate-x-0.5 active:translate-y-0.5 active:shadow-brutal-xs",
				yellow:
					"bg-yellow text-ink border-2 border-ink shadow-brutal-sm hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal active:translate-x-0.5 active:translate-y-0.5 active:shadow-brutal-xs",
				lavender:
					"bg-lavender text-ink border-2 border-ink shadow-brutal-sm hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal active:translate-x-0.5 active:translate-y-0.5 active:shadow-brutal-xs",
				sky: "bg-sky text-ink border-2 border-ink shadow-brutal-sm hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal active:translate-x-0.5 active:translate-y-0.5 active:shadow-brutal-xs",
				outline:
					"bg-transparent text-ink border-2 border-ink shadow-brutal-sm hover:bg-surface/50 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal active:translate-x-0.5 active:translate-y-0.5 active:shadow-brutal-xs",
				ghost: "border-transparent text-ink hover:bg-canvas-subtle hover:border-ink/20",
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
