"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "./nav-items";
import { useScrollSpy } from "./use-scroll-spy";

const SECTION_IDS = NAV_ITEMS.map((item) => item.id);

export function SideNav() {
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
		<aside
			aria-label="Section navigation"
			className="fixed top-1/2 left-4 z-40 hidden -translate-y-1/2 xl:flex 2xl:left-8"
		>
			<nav className="flex flex-col gap-2 rounded-2xl border-brutal border-ink bg-canvas/80 p-2.5 shadow-brutal backdrop-blur-md corner-squircle supports-[corner-shape:squircle]:rounded-3xl">
				<div className="border-b-subtle border-ink/20 px-2 pt-1 pb-1.5 text-center font-mono text-[10px] font-bold tracking-widest text-ink/60 uppercase">
					Index
				</div>

				<ul className="flex flex-col gap-1.5 pt-1">
					{NAV_ITEMS.map((item) => {
						const isActive = activeId === item.id;

						return (
							<li key={item.id}>
								<a
									href={item.href}
									onClick={(e) => handleScrollTo(e, item.href)}
									aria-current={isActive ? "true" : undefined}
									className={cn(
										"group relative flex items-center gap-2.5 rounded-xl px-3 py-1.5 font-mono text-xs font-semibold transition-all duration-150 corner-squircle active:translate-x-0.5 active:translate-y-0.5 supports-[corner-shape:squircle]:rounded-2xl",
										isActive
											? "border-subtle border-ink bg-yellow font-bold text-ink shadow-brutal-xs"
											: "text-ink/70 hover:border-subtle hover:border-ink/40 hover:bg-white hover:text-ink",
									)}
								>
									{/* Active spring pill indicator */}
									{isActive && (
										<motion.span
											layoutId="active-side-pill"
											transition={{ type: "spring", stiffness: 380, damping: 30 }}
											className="absolute inset-0 -z-10 rounded-xl bg-yellow corner-squircle supports-[corner-shape:squircle]:rounded-2xl"
										/>
									)}

									{/* Number badge */}
									<span
										className={cn(
											"inline-flex size-5 items-center justify-center rounded-md font-mono text-[10px] font-bold transition-colors",
											isActive
												? "bg-ink text-canvas"
												: "bg-ink/10 text-ink/70 group-hover:bg-ink group-hover:text-canvas",
										)}
									>
										{item.number}
									</span>

									{/* Label */}
									<span className="tracking-wide">{item.label}</span>
								</a>
							</li>
						);
					})}
				</ul>
			</nav>
		</aside>
	);
}
