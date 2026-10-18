import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GridSectionProps {
	id?: string;
	number?: string;
	title?: string;
	description?: string;
	children: ReactNode;
	className?: string;
	showBottomCrosshairs?: boolean;
	showTopCrosshairs?: boolean;
}

export function GridSection({
	id,
	number,
	title,
	description,
	children,
	className,
	showBottomCrosshairs = true,
	showTopCrosshairs = false,
}: GridSectionProps) {
	return (
		<section
			id={id}
			className={cn("relative border-b border-ink/15 px-4 py-16 md:px-8 lg:px-12", className)}
		>
			{/* Top Intersection Corner Crosshairs */}
			{showTopCrosshairs && (
				<>
					<span
						aria-hidden="true"
						className="pointer-events-none absolute -top-2 -left-2 z-10 inline-flex size-4 items-center justify-center font-mono text-xs leading-none font-bold text-ink/40 select-none"
					>
						+
					</span>
					<span
						aria-hidden="true"
						className="pointer-events-none absolute -top-2 -right-2 z-10 inline-flex size-4 items-center justify-center font-mono text-xs leading-none font-bold text-ink/40 select-none"
					>
						+
					</span>
				</>
			)}

			{/* Section Header (if title or number provided) */}
			{(title || number) && (
				<header className="mb-8">
					<div className="flex items-center gap-2.5">
						{number && (
							<span className="font-mono text-sm font-bold tracking-tight text-coral">
								{number} //
							</span>
						)}
						{title && (
							<h2 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">
								{title}
							</h2>
						)}
					</div>
					{description && (
						<p className="mt-2 max-w-2xl font-body text-base text-ink/80 md:text-lg">
							{description}
						</p>
					)}
				</header>
			)}

			{/* Content */}
			{children}

			{/* Bottom Intersection Corner Crosshairs */}
			{showBottomCrosshairs && (
				<>
					<span
						aria-hidden="true"
						className="pointer-events-none absolute -bottom-2 -left-2 z-10 inline-flex size-4 items-center justify-center font-mono text-xs leading-none font-bold text-ink/40 select-none"
					>
						+
					</span>
					<span
						aria-hidden="true"
						className="pointer-events-none absolute -right-2 -bottom-2 z-10 inline-flex size-4 items-center justify-center font-mono text-xs leading-none font-bold text-ink/40 select-none"
					>
						+
					</span>
				</>
			)}
		</section>
	);
}
