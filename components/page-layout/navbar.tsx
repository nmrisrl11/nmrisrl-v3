"use client";

import { useState } from "react";
import Link from "next/link";
import { MenuIcon, XIcon } from "lucide-react";
import { NAV_ITEMS } from "./nav-items";

export function Navbar() {
	const [isOpen, setIsOpen] = useState(false);

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
		<header className="sticky top-0 z-50 w-full border-b-brutal border-ink bg-canvas/90 backdrop-blur-md">
			<div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-8">
				{/* Brand Logo (Left) */}
				<Link
					href="/"
					className="group inline-flex items-center gap-1 font-display text-2xl font-extrabold tracking-tight text-ink transition-transform active:scale-95"
				>
					<span>nmrisrl</span>
					<span className="text-coral transition-colors group-hover:text-ink">.dev</span>
				</Link>

				{/* Navigation Items (Right - Desktop) */}
				<nav className="hidden items-center gap-1 md:flex">
					{NAV_ITEMS.map((item) => (
						<a
							key={item.href}
							href={item.href}
							onClick={(e) => handleScrollTo(e, item.href)}
							className="rounded-lg px-3.5 py-1.5 font-body text-sm font-semibold text-ink/75 transition-colors hover:bg-ink/5 hover:text-ink active:scale-95"
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
					className="inline-flex size-9 items-center justify-center rounded-lg border-subtle border-ink bg-white text-ink transition-transform active:scale-95 md:hidden"
				>
					{isOpen ? <XIcon className="size-4" /> : <MenuIcon className="size-4" />}
				</button>
			</div>

			{/* Mobile Dropdown Menu */}
			{isOpen && (
				<nav
					aria-label="Mobile navigation"
					className="border-t-subtle border-ink/20 bg-canvas px-4 py-4 md:hidden"
				>
					<ul className="flex flex-col gap-1.5">
						{NAV_ITEMS.map((item) => (
							<li key={item.href}>
								<a
									href={item.href}
									onClick={(e) => handleScrollTo(e, item.href)}
									className="block rounded-lg px-3 py-2 font-body text-base font-semibold text-ink transition-colors hover:bg-white"
								>
									{item.label}
								</a>
							</li>
						))}
					</ul>
				</nav>
			)}
		</header>
	);
}
