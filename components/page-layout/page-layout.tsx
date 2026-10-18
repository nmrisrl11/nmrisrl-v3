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

			{/* Main Content Container */}
			<main className="mx-auto max-w-6xl px-4 py-8 md:px-8">{children}</main>
		</div>
	);
}
