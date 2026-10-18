import type { ReactNode } from "react";
import { Navbar } from "./navbar";

interface PageLayoutProps {
	children: ReactNode;
}

export function PageLayout({ children }: PageLayoutProps) {
	return (
		<div className="relative min-h-screen bg-canvas text-ink">
			{/* Simple & Clean Sticky Top Navbar */}
			<Navbar />

			{/* Main Architectural Grid Column (Continuous Vertical Border-X Rails) */}
			<div className="relative mx-auto max-w-6xl border-x border-ink/15">
				{/* Top Intersection Corner Crosshairs (At the navbar seam) */}
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

				<main>{children}</main>
			</div>
		</div>
	);
}
