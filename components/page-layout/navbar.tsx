"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MenuIcon, XIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { NAV_ITEMS } from "./nav-items";

export function Navbar() {
	const [isOpen, setIsOpen] = useState(false);
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 20);
		};

		handleScroll();
		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
		e.preventDefault();
		setIsOpen(false);
		const targetId = href.replace("#", "");
		const element = document.getElementById(targetId);
		if (element) {
			const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
			element.scrollIntoView({ behavior: isReducedMotion ? "auto" : "smooth", block: "start" });
			window.history.pushState(null, "", href);
		}
	};

	return (
		<header className="pointer-events-none sticky top-0 z-50 flex w-full justify-center px-3 py-3 sm:px-6 sm:py-4">
			<div
				className={cn(
					"pointer-events-auto relative flex w-full items-center justify-between rounded-2xl bg-surface/95 px-4 shadow-brutal ring-2 ring-ink backdrop-blur-md corner-squircle supports-[corner-shape:squircle]:rounded-full sm:px-5",
					"transition-all duration-300 ease-out motion-reduce:transition-none",
					isScrolled ? "h-12 max-w-3xl sm:h-14" : "h-14 max-w-4xl sm:h-16",
				)}
			>
				{/* Brand Logo (Left) */}
				<Link
					href="/"
					className="group inline-flex items-center gap-1.5 font-display text-lg font-black tracking-tight text-ink transition-transform active:scale-95 sm:text-xl"
				>
					<span>nmrisrl</span>
					<span className="inline-flex -rotate-3 items-center rounded-md border-subtle border-ink bg-coral px-1.5 py-0.5 font-mono text-xs font-black tracking-normal text-white shadow-brutal-xs transition-transform duration-150 corner-squircle group-hover:rotate-0 supports-[corner-shape:squircle]:rounded-full">
						.dev
					</span>
				</Link>

				{/* Navigation Items (Center - Desktop) */}
				<nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
					{NAV_ITEMS.map((item) => (
						<a
							key={item.href}
							href={item.href}
							onClick={(e) => handleScrollTo(e, item.href)}
							className="rounded-lg px-3 py-1.5 font-body text-sm font-bold text-ink/75 transition-all duration-150 corner-squircle hover:-translate-y-0.5 hover:bg-canvas hover:text-ink hover:shadow-brutal-xs hover:ring-2 hover:ring-ink active:translate-y-0.5 supports-[corner-shape:squircle]:rounded-full"
						>
							{item.label}
						</a>
					))}
				</nav>

				{/* CTA Button (Right - Desktop) & Hamburger (Mobile) */}
				<div className="flex items-center gap-2">
					<Button
						variant="default"
						size="sm"
						shape="squircle"
						asChild
						className="hidden shadow-brutal-xs hover:shadow-brutal md:inline-flex"
					>
						<a href="#contact" onClick={(e) => handleScrollTo(e, "#contact")}>
							Let&apos;s Talk
						</a>
					</Button>

					{/* Mobile Hamburger Toggle */}
					<button
						type="button"
						onClick={() => setIsOpen(!isOpen)}
						aria-label={isOpen ? "Close menu" : "Open menu"}
						aria-expanded={isOpen}
						className="inline-flex size-9 items-center justify-center rounded-lg bg-canvas text-ink shadow-brutal-xs ring-2 ring-ink transition-transform corner-squircle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink focus-visible:outline-none active:translate-y-0.5 supports-[corner-shape:squircle]:rounded-full md:hidden"
					>
						{isOpen ? <XIcon className="size-4" /> : <MenuIcon className="size-4" />}
					</button>
				</div>

				{/* Mobile Dropdown Menu (Floating Squircle Card attached under island) */}
				{isOpen && (
					<div className="absolute inset-x-0 top-full mt-2 rounded-2xl bg-surface/98 p-4 shadow-brutal ring-2 ring-ink backdrop-blur-md corner-squircle supports-[corner-shape:squircle]:rounded-3xl md:hidden">
						<nav aria-label="Mobile navigation">
							<ul className="flex flex-col gap-1.5">
								{NAV_ITEMS.map((item) => (
									<li key={item.href}>
										<a
											href={item.href}
											onClick={(e) => handleScrollTo(e, item.href)}
											className="block rounded-xl px-3.5 py-2.5 font-body text-base font-bold text-ink transition-colors hover:bg-canvas active:bg-canvas-subtle"
										>
											{item.label}
										</a>
									</li>
								))}
							</ul>
							<div className="mt-3 border-t border-ink/15 pt-3">
								<Button
									variant="default"
									size="default"
									shape="squircle"
									asChild
									className="w-full justify-center shadow-brutal-xs"
								>
									<a href="#contact" onClick={(e) => handleScrollTo(e, "#contact")}>
										Let&apos;s Talk
									</a>
								</Button>
							</div>
						</nav>
					</div>
				)}
			</div>
		</header>
	);
}
