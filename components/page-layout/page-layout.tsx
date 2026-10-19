import type { ReactNode } from "react";
import { Navbar } from "./navbar";

interface PageLayoutProps {
	children: ReactNode;
}

export function PageLayout({ children }: PageLayoutProps) {
	return (
		<div className="relative min-h-dvh text-ink">
			{/* Main Architectural Grid Column (Continuous Vertical Border-X Rails pushing all the way to the top edge) */}
			<div className="relative mx-auto min-h-dvh max-w-6xl border-x border-ink/15">
				{/* Sticky Top Navbar */}
				<Navbar />

				{/* Border-t on the first section (NO crosshairs) */}
				<div className="border-t border-ink/15">
					<main>{children}</main>
				</div>
			</div>
		</div>
	);
}
