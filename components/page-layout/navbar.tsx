"use client";

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
			element.scrollIntoView({ behavior: "smooth", block: "start" });
			window.history.pushState(null, "", href);
		}
	};

	return (
		<header className="pointer-events-none sticky top-0 z-50 flex w-full justify-center px-4 sm:px-6">
			<div
				className={cn(
					"pointer-events-auto relative flex h-14 w-full items-center justify-between sm:h-16",
					"transition-all duration-300 ease-out",
					isScrolled
						? "max-w-2xl translate-y-3 rounded-2xl bg-surface/95 px-4 shadow-brutal ring-2 ring-ink backdrop-blur-md corner-squircle supports-[corner-shape:squircle]:rounded-full sm:translate-y-4 sm:px-5"
						: "max-w-6xl translate-y-0 rounded-none bg-transparent px-4 shadow-none ring-0 ring-transparent backdrop-blur-none sm:px-8",
				)}
			>
				{/* Brand Logo (Left) */}
				<Link
					href="/"
					className="group inline-flex items-center gap-1 font-display text-xl font-extrabold tracking-tight text-ink transition-transform active:scale-95 sm:text-2xl"
				>
					<span>nmrisrl</span>
					<span className="text-coral transition-colors group-hover:text-ink">.dev</span>
				</Link>

				{/* Navigation Items (Right - Desktop) */}
				<nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
					{NAV_ITEMS.map((item) => (
						<a
							key={item.href}
							href={item.href}
							onClick={(e) => handleScrollTo(e, item.href)}
							className="rounded-lg px-3.5 py-1.5 font-body text-sm font-bold text-ink/75 transition-all duration-150 corner-squircle hover:bg-canvas hover:text-ink active:translate-y-0.5 supports-[corner-shape:squircle]:rounded-full"
						>
							{item.label}
						</a>
					))}
				</nav>

				{/* Mobile Hamburger Toggle (Right - Mobile) */}
				<button
					type="button"
					onClick={() => setIsOpen(!isOpen)}
					aria-label={isOpen ? "Close menu" : "Open menu"}
					aria-expanded={isOpen}
					className="inline-flex size-9 items-center justify-center rounded-lg border-subtle border-ink bg-canvas text-ink shadow-brutal-xs transition-transform corner-squircle active:translate-y-0.5 supports-[corner-shape:squircle]:rounded-full md:hidden"
				>
					{isOpen ? <XIcon className="size-4" /> : <MenuIcon className="size-4" />}
				</button>

				{/* Mobile Dropdown Menu (Floating Squircle Card attached under island) */}
				{isOpen && (
					<div className="absolute inset-x-3 top-full mt-2 rounded-2xl bg-surface/98 p-4 shadow-brutal ring-2 ring-ink backdrop-blur-md corner-squircle supports-[corner-shape:squircle]:rounded-3xl sm:inset-x-0 md:hidden">
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
						</nav>
					</div>
				)}
			</div>
		</header>
	);
}
