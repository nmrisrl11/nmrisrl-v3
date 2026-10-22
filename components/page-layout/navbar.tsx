"use client";

import { DiamondStarIcon } from "@/components/neu-icons";
import { Button } from "@/components/ui/button";
import { Data } from "@/constants/data";
import { useRoughNotation } from "@/hooks/use-rough-notation";
import { cn } from "@/lib/utils";
import { MenuIcon, XIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { RoughNotation } from "react-rough-notation";
import { NAV_ITEMS } from "./nav-items";

export function Navbar() {
	const router = useRouter();
	const [isOpen, setIsOpen] = useState(false);
	const [isScrolled, setIsScrolled] = useState(false);
	// Always initialize to null on both server and client to prevent SSR hydration mismatch
	const [activeSection, setActiveSection] = useState<string | null>(null);
	const [hoveredHref, setHoveredHref] = useState<string | null>(null);
	const scrollSuppressionUntil = useRef(0);

	const { ready: notationReady, reducedMotion } = useRoughNotation();

	// Scroll spy for dynamic active section tracking & scrolled state
	useEffect(() => {
		const sectionIds = ["about", "experience", "skills", "projects", "contact"];

		// Sync initial active state from URL hash on client mount
		if (window.location.hash) {
			const hash = window.location.hash;
			if (sectionIds.includes(hash.replace("#", ""))) {
				queueMicrotask(() => {
					setActiveSection(hash);
				});
			}
		}

		const syncHash = (newHash: string | null) => {
			if (typeof window === "undefined") return;
			const currentHash = window.location.hash;
			if (newHash) {
				if (currentHash !== newHash) {
					window.history.replaceState(null, "", newHash);
				}
			} else if (currentHash) {
				window.history.replaceState(null, "", window.location.pathname + window.location.search);
			}
		};

		const handleScroll = () => {
			setIsScrolled(window.scrollY > 20);

			// If smooth scrolling was initiated by a click, suppress scroll-spy active-section overrides
			if (Date.now() < scrollSuppressionUntil.current) {
				return;
			}

			// Near top of page: in hero section, clear active section
			if (window.scrollY < 180) {
				setActiveSection(null);
				syncHash(null);
				return;
			}

			// Near bottom of document: snap to contact
			const isBottom =
				window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 60;
			if (isBottom) {
				setActiveSection("#contact");
				syncHash("#contact");
				return;
			}

			// Reading attention line at ~35% of the viewport height
			const targetY = window.innerHeight * 0.35;
			let currentSection: string | null = null;

			for (const id of sectionIds) {
				const el = document.getElementById(id);
				if (el) {
					const rect = el.getBoundingClientRect();
					if (rect.top <= targetY && rect.bottom >= targetY) {
						currentSection = `#${id}`;
						break;
					}
				}
			}

			if (currentSection) {
				setActiveSection(currentSection);
				syncHash(currentSection);
			}
		};

		handleScroll();
		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const handleScrollTo = useCallback(
		(e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
			e.preventDefault();
			setIsOpen(false);
			setActiveSection(href);
			if (!reducedMotion) {
				scrollSuppressionUntil.current = Date.now() + 800;
			}
			const targetId = href.replace("#", "");
			const element = document.getElementById(targetId);
			if (element) {
				element.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
				window.history.pushState(null, "", href);
			} else {
				router.push(`/${href}`);
			}
		},
		[reducedMotion, router],
	);

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
					onClick={() => setActiveSection(null)}
					className="group inline-flex items-center gap-1.5 font-display text-lg font-black tracking-tight text-ink transition-transform active:scale-95 sm:text-xl"
				>
					<span>{Data.cleanUrl.split(".")[0]}</span>
					<span className="inline-flex -rotate-3 items-center rounded-md border-subtle border-ink bg-coral px-1.5 py-0.5 font-mono text-xs font-black tracking-normal text-white shadow-brutal-xs transition-transform duration-150 corner-squircle group-hover:rotate-0 supports-[corner-shape:squircle]:rounded-full">
						.{Data.cleanUrl.split(".")[1]}
					</span>
				</Link>

				{/* Navigation Items (Center - Desktop) */}
				<nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
					{NAV_ITEMS.map((item) => {
						const isActive = activeSection === item.href;
						const isHovered = hoveredHref === item.href;

						return (
							<a
								key={item.href}
								href={item.href}
								onClick={(e) => handleScrollTo(e, item.href)}
								onMouseEnter={() => setHoveredHref(item.href)}
								onMouseLeave={() => setHoveredHref(null)}
								onFocus={() => setHoveredHref(item.href)}
								onBlur={() => setHoveredHref(null)}
								aria-current={isActive ? "location" : undefined}
								className={cn(
									"group relative rounded-lg px-3 py-1.5 font-body text-sm font-bold transition-all duration-150 corner-squircle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink supports-[corner-shape:squircle]:rounded-full",
									isActive
										? "text-ink"
										: "text-ink/75 hover:-translate-y-0.5 hover:text-ink active:translate-y-0.5",
								)}
							>
								<span className="relative inline-block">
									{isActive ? (
										<RoughNotation
											key={`highlight-${item.href}`}
											type="highlight"
											show={notationReady}
											color="color-mix(in srgb, var(--color-yellow) 75%, transparent)"
											multiline={true}
											iterations={1}
											padding={[2, 6]}
											animate={!reducedMotion}
											animationDuration={400}
										>
											{item.label}
										</RoughNotation>
									) : (
										<RoughNotation
											key={`underline-${item.href}`}
											type="underline"
											show={isHovered && notationReady}
											color="var(--color-coral)"
											strokeWidth={2.5}
											iterations={2}
											padding={[0, 2, 2, 2]}
											animate={!reducedMotion}
											animationDuration={250}
										>
											{item.label}
										</RoughNotation>
									)}
								</span>
							</a>
						);
					})}
				</nav>

				{/* CTA Button (Right - Desktop) & Hamburger (Mobile) */}
				<div className="flex items-center gap-2">
					<Button
						variant="default"
						size="sm"
						shape="squircle"
						asChild
						className={cn(
							"hidden shadow-brutal-xs hover:shadow-brutal md:inline-flex",
							activeSection === "#contact" && "shadow-brutal ring-2 ring-coral ring-offset-2",
						)}
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
						className="inline-flex size-9 items-center justify-center rounded-lg bg-canvas text-ink shadow-brutal-xs ring-2 ring-ink transition-transform corner-squircle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink active:translate-y-0.5 supports-[corner-shape:squircle]:rounded-full md:hidden"
					>
						{isOpen ? <XIcon className="size-4" /> : <MenuIcon className="size-4" />}
					</button>
				</div>

				{/* Mobile Dropdown Menu (Floating Squircle Card attached under island) */}
				{isOpen && (
					<div className="absolute inset-x-0 top-full mt-2 rounded-2xl bg-surface/98 p-4 shadow-brutal ring-2 ring-ink backdrop-blur-md corner-squircle supports-[corner-shape:squircle]:rounded-3xl md:hidden">
						<nav aria-label="Mobile navigation">
							<ul className="flex flex-col gap-1.5">
								{NAV_ITEMS.map((item) => {
									const isActive = activeSection === item.href;
									const isHovered = hoveredHref === item.href;

									return (
										<li key={item.href}>
											<a
												href={item.href}
												onClick={(e) => handleScrollTo(e, item.href)}
												onMouseEnter={() => setHoveredHref(item.href)}
												onMouseLeave={() => setHoveredHref(null)}
												aria-current={isActive ? "location" : undefined}
												className={cn(
													"group flex items-center justify-between rounded-xl px-4 py-2.5 font-body text-base font-bold transition-all duration-150 corner-squircle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink supports-[corner-shape:squircle]:rounded-2xl",
													isActive
														? "bg-canvas text-ink shadow-brutal-xs ring-2 ring-ink"
														: "text-ink/75 hover:bg-canvas/50 hover:text-ink active:bg-canvas-subtle",
												)}
											>
												<span className="relative inline-block">
													{isActive ? (
														<RoughNotation
															key={`mobile-highlight-${item.href}`}
															type="highlight"
															show={notationReady}
															color="color-mix(in srgb, var(--color-yellow) 75%, transparent)"
															multiline={true}
															iterations={1}
															padding={[2, 6]}
															animate={!reducedMotion}
															animationDuration={400}
														>
															{item.label}
														</RoughNotation>
													) : (
														<RoughNotation
															key={`mobile-underline-${item.href}`}
															type="underline"
															show={isHovered && notationReady}
															color="var(--color-coral)"
															strokeWidth={2}
															iterations={2}
															padding={[0, 2, 2, 2]}
															animate={!reducedMotion}
															animationDuration={250}
														>
															{item.label}
														</RoughNotation>
													)}
												</span>

												{isActive ? (
													<DiamondStarIcon
														className="size-4 text-coral motion-safe:animate-spin"
														style={{ animationDuration: "12s" }}
													/>
												) : (
													<span
														aria-hidden="true"
														className="size-1.5 rounded-full bg-ink/20 transition-all duration-150 group-hover:scale-125 group-hover:bg-coral"
													/>
												)}
											</a>
										</li>
									);
								})}
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
