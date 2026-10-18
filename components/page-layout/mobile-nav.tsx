"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "./nav-items";
import { useScrollSpy } from "./use-scroll-spy";

const SECTION_IDS = NAV_ITEMS.map((item) => item.id);

export function MobileNav() {
	const activeId = useScrollSpy(SECTION_IDS, "hero");

	const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
		e.preventDefault();
		const targetId = href.replace("#", "");
		const element = document.getElementById(targetId);
		if (element) {
			element.scrollIntoView({ behavior: "smooth", block: "start" });
			window.history.pushState(null, "", href);
		}
	};

	return (
		<nav
			aria-label="Mobile section navigation"
			className="fixed bottom-4 left-1/2 z-40 flex max-w-[calc(100vw-2rem)] -translate-x-1/2 items-center gap-1 overflow-x-auto rounded-2xl border-brutal border-ink bg-canvas/95 p-1.5 shadow-brutal backdrop-blur-lg corner-squircle supports-[corner-shape:squircle]:rounded-3xl xl:hidden"
		>
			{NAV_ITEMS.map((item) => {
				const Icon = item.icon;
				const isActive = activeId === item.id;

				return (
					<a
						key={item.id}
						href={item.href}
						onClick={(e) => handleScrollTo(e, item.href)}
						aria-current={isActive ? "true" : undefined}
						title={item.label}
						className={cn(
							"relative flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 font-mono text-xs font-semibold transition-all corner-squircle active:scale-95 supports-[corner-shape:squircle]:rounded-2xl",
							isActive
								? "border-subtle border-ink bg-yellow font-bold text-ink shadow-brutal-xs"
								: "text-ink/70 hover:bg-white hover:text-ink",
						)}
					>
						{isActive && (
							<motion.span
								layoutId="active-mobile-pill"
								transition={{ type: "spring", stiffness: 400, damping: 30 }}
								className="absolute inset-0 -z-10 rounded-xl bg-yellow corner-squircle supports-[corner-shape:squircle]:rounded-2xl"
							/>
						)}

						<Icon className="size-3.5" />
						<span className="hidden sm:inline-block">{item.label}</span>
						<span className="inline-block text-[10px] sm:hidden">{item.number}</span>
					</a>
				);
			})}
		</nav>
	);
}
