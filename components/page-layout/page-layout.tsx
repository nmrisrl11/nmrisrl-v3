import type { ReactNode } from "react";
import { Header } from "./header";
import { MobileNav } from "./mobile-nav";
import { SideNav } from "./side-nav";

interface PageLayoutProps {
	children: ReactNode;
}

export function PageLayout({ children }: PageLayoutProps) {
	return (
		<div className="relative min-h-screen bg-canvas text-ink">
			{/* Top Sticky Header */}
			<Header />

			{/* Desktop Side Navigation Dock (Gutter on xl+ screens) */}
			<SideNav />

			{/* Mobile Floating Bottom Dock (Screens < xl) */}
			<MobileNav />

			{/* Main Content Area */}
			<main className="mx-auto max-w-6xl px-4 py-8 pb-24 md:px-8 xl:pb-12">{children}</main>
		</div>
	);
}
