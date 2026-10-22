"use client";

import {
	CrossStarIcon,
	DiamondStarIcon,
	DoubleCapsuleIcon,
	PropellerStarIcon,
	SunburstFlowerIcon,
	TrefoilCloudIcon,
} from "@/components/neu-icons";
import { GridSection } from "@/components/page-layout/grid-section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Data } from "@/constants/data";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowUpRight, Home, Search } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const FUN_EXCUSES = [
	"This page decided to take an unscheduled coffee break.",
	"A tiny typo might have sneaked into the address bar on the way here.",
	"This link was probably moved to a shiny new address.",
	"This page is playing hide and seek — and winning.",
	"It might have been cleaned up during our latest spring cleaning.",
	"The requested link vanished into thin air.",
] as const;

interface NavigationCard {
	number: string;
	title: string;
	kicker: string;
	description: string;
	href: string;
	badge: string;
	badgeVariant: "coral" | "yellow" | "lavender" | "sky" | "mint";
	icon: typeof DiamondStarIcon;
}

const NAVIGATION_CARDS: readonly NavigationCard[] = [
	{
		number: "01",
		title: "Main Welcome",
		kicker: "HOME",
		description: "Meet the interactive 3D avatar and see an overview of my portfolio.",
		href: "/",
		badge: "START",
		badgeVariant: "coral",
		icon: DiamondStarIcon,
	},
	{
		number: "02",
		title: "Background & Bio",
		kicker: "ABOUT ME",
		description: "Read about my 7+ years of experience, design philosophy, and journey.",
		href: "/#about",
		badge: "BIO",
		badgeVariant: "lavender",
		icon: TrefoilCloudIcon,
	},
	{
		number: "03",
		title: "Tools & Technologies",
		kicker: "SKILLS",
		description: "Explore the modern frontend frameworks and libraries I build with.",
		href: "/#skills",
		badge: "STACK",
		badgeVariant: "sky",
		icon: DoubleCapsuleIcon,
	},
	{
		number: "04",
		title: "Get in Touch",
		kicker: "CONTACT",
		description: "Have a project in mind or want to say hello? Send me a message!",
		href: "/#contact",
		badge: "CHAT",
		badgeVariant: "mint",
		icon: SunburstFlowerIcon,
	},
] as const;

export function NotFoundSection() {
	const pathname = usePathname();
	const router = useRouter();

	const [excuseIndex, setExcuseIndex] = useState(0);

	const handleNextExcuse = () => {
		setExcuseIndex((prev) => (prev + 1) % FUN_EXCUSES.length);
	};

	const handleGoBack = () => {
		if (typeof window !== "undefined" && window.history.length > 1) {
			router.back();
		} else {
			router.push("/");
		}
	};

	return (
		<div className="w-full min-w-0">
			{/* 01 // MAIN 404 HERO STAGE */}
			<GridSection id="not-found-hero" className="pt-8 pb-14 sm:pt-12 sm:pb-16 lg:pt-16 lg:pb-20">
				<div className="mx-auto flex max-w-2xl flex-col items-center text-center">
					{/* 0. CENTERED BLUEPRINT FIGURE HEADER */}
					<div className="mb-6 flex flex-wrap items-center justify-center gap-1.5 font-mono text-[10px] font-bold tracking-wider text-ink/60 uppercase select-none sm:gap-2 sm:text-[11px] sm:tracking-widest">
						<DiamondStarIcon size={12} className="size-3 text-coral" />
						<span>FIG. 404 // ROUTE EXCEPTION</span>
						<span className="text-ink/25">•</span>
						<span>NOT FOUND</span>
						<span className="text-ink/25">•</span>
						<span>DETOUR ACTIVE</span>
					</div>

					{/* 1. GIANT POP 404 GRAPHIC HEADING */}
					<div className="relative flex items-center justify-center gap-2 select-none sm:gap-3">
						<span className="font-display text-7xl font-black tracking-tighter text-ink sm:text-8xl md:text-9xl">
							4
						</span>

						{/* Graphic Central Neubrutalist 0 with Spinning Accent Star */}
						<div className="relative flex size-20 items-center justify-center rounded-2xl bg-coral text-white shadow-brutal ring-2 ring-ink corner-squircle supports-[corner-shape:squircle]:rounded-3xl sm:size-24 md:size-28">
							<CrossStarIcon
								size={46}
								className="size-11 animate-spin text-white drop-shadow-brutal-xs [animation-duration:12s] motion-reduce:animate-none sm:size-12 md:size-14"
							/>
							<span
								aria-hidden="true"
								className="absolute -top-2.5 -right-2.5 rounded-md border-subtle border-ink bg-yellow px-1.5 py-0.5 font-mono text-[10px] font-black text-ink shadow-brutal-xs corner-squircle supports-[corner-shape:squircle]:rounded-full"
							>
								OOPS!
							</span>
						</div>

						<span className="font-display text-7xl font-black tracking-tighter text-ink sm:text-8xl md:text-9xl">
							4
						</span>
					</div>

					{/* 2. TITLE */}
					<h1 className="mt-5 font-heading text-2xl font-black tracking-tight text-ink sm:text-3xl md:text-4xl">
						Uh oh! This page doesn&apos;t exist.
					</h1>

					{/* 3. DESCRIPTION */}
					<p className="mt-2 max-w-xl font-body text-base leading-relaxed text-ink/80 md:text-lg">
						Looks like you followed a broken link or typed a URL that isn&apos;t here anymore.
						Don&apos;t worry, you haven&apos;t broken anything — let&apos;s get you back on track!
					</p>

					{/* 4. MACOS-STYLE WINDOW CARD */}
					<div className="relative mt-8 w-full squircle-card bg-surface p-4 text-left shadow-brutal ring-2 ring-ink sm:p-5">
						{/* macOS Window Top Bar */}
						<div className="flex items-center justify-between border-b border-ink/10 pb-2.5">
							<div className="flex items-center gap-1.5">
								<span className="size-2.5 rounded-full bg-coral ring-1 ring-ink/40" />
								<span className="size-2.5 rounded-full bg-yellow ring-1 ring-ink/40" />
								<span className="size-2.5 rounded-full bg-mint ring-1 ring-ink/40" />
								<span className="ml-2 font-mono text-[11px] font-bold text-ink/60 uppercase">
									PAGE INFO // QUICK DETAILS
								</span>
							</div>

							<span className="font-mono text-[10px] font-bold text-ink/40">HTTP 404</span>
						</div>

						{/* Missing Link Summary with Robust Long-URL Truncation */}
						<div className="mt-3 flex flex-col gap-2 font-mono text-xs text-ink/90 sm:flex-row sm:items-center sm:justify-between">
							<div className="flex min-w-0 flex-1 items-center gap-2">
								<Search className="size-3.5 shrink-0 text-coral" />
								<span className="shrink-0 text-ink/50">Looking for:</span>
								<span
									className="min-w-0 truncate font-bold text-coral"
									title={pathname || "/unknown-page"}
								>
									{pathname || "/unknown-page"}
								</span>
							</div>

							<div className="flex shrink-0 items-center gap-1.5 sm:border-l sm:border-ink/15 sm:pl-3">
								<span className="text-ink/50">Status:</span>
								<span className="font-bold text-ink">404 • Not Found</span>
							</div>
						</div>

						{/* Lighthearted Reason Box */}
						<div className="mt-3 rounded-lg border-subtle border-ink/15 bg-canvas-subtle p-3 corner-squircle supports-[corner-shape:squircle]:rounded-xl">
							<div className="flex items-center justify-between gap-3">
								<div className="min-w-0 flex-1 space-y-1">
									<p className="font-mono text-[10px] font-bold tracking-wider text-ink/50 uppercase">
										Fun guess why it&apos;s missing:
									</p>
									<p className="font-body text-xs font-medium text-ink sm:text-sm">
										&ldquo;{FUN_EXCUSES[excuseIndex]}&rdquo;
									</p>
								</div>

								{/* Utilize pre-built Button component with PropellerStarIcon */}
								<Button
									type="button"
									variant="secondary"
									size="sm"
									shape="squircle"
									onClick={handleNextExcuse}
									className="group shrink-0 shadow-brutal-xs hover:bg-yellow hover:shadow-brutal active:translate-y-0.5"
									title="Shuffle another friendly reason"
								>
									<PropellerStarIcon
										size={14}
										className="text-coral drop-shadow-brutal-xs transition-transform duration-300 group-hover:rotate-180"
									/>
									<span>Shuffle</span>
								</Button>
							</div>
						</div>
					</div>

					{/* 5. PRIMARY CTA BUTTONS */}
					<div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
						<Button
							variant="default"
							size="lg"
							shape="squircle"
							asChild
							className="w-full shadow-brutal hover:shadow-brutal-lg sm:w-auto"
						>
							<Link href="/">
								<Home className="size-4" />
								<span>Take Me Home</span>
							</Link>
						</Button>

						<Button
							variant="secondary"
							size="lg"
							shape="squircle"
							onClick={handleGoBack}
							className="w-full shadow-brutal hover:shadow-brutal-lg sm:w-auto"
						>
							<ArrowLeft className="size-4" />
							<span>Go Back</span>
						</Button>
					</div>
				</div>
			</GridSection>

			{/* 02 // POPULAR DESTINATIONS (USER-FRIENDLY BENTO) */}
			<GridSection
				id="explore-sections"
				figure="FIG. 02 // WHERE TO NEXT?"
				figureMeta={["QUICK LINKS", "EXPLORE PORTFOLIO"]}
				title="Looking for something specific?"
				description="Jump directly to one of the main sections of the website:"
				marker="diamond-star"
				showMarker={false}
				className="border-b-0 pb-20"
			>
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
					{NAVIGATION_CARDS.map((card) => {
						const IconComponent = card.icon;
						return (
							<Link
								key={card.number}
								href={card.href}
								className={cn(
									"group relative flex flex-col justify-between overflow-hidden squircle-card bg-surface p-5 text-ink",
									"transition-all duration-200 hover:-translate-y-1 hover:shadow-brutal-lg active:translate-y-0.5",
									"focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink",
								)}
							>
								{/* Card Header & Arrow */}
								<div>
									<div className="flex items-center justify-between border-b border-ink/10 pb-3">
										<Badge variant={card.badgeVariant} className="text-[10px]">
											{card.badge}
										</Badge>
										<div className="flex size-7 items-center justify-center rounded-lg border-subtle border-ink bg-canvas transition-colors corner-squircle group-hover:bg-coral group-hover:text-white supports-[corner-shape:squircle]:rounded-xl">
											<ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
										</div>
									</div>

									{/* Main Content */}
									<div className="mt-4 space-y-1.5">
										<p className="font-mono text-[10px] font-bold tracking-wider text-ink/50 uppercase">
											{card.kicker}
										</p>
										<h3 className="font-heading text-lg font-bold tracking-tight text-ink transition-colors group-hover:text-coral">
											{card.title}
										</h3>
										<p className="font-body text-xs leading-relaxed text-ink/75">
											{card.description}
										</p>
									</div>
								</div>

								{/* Bottom Accent */}
								<div className="mt-5 flex items-center justify-between border-t border-ink/10 pt-3">
									<span className="font-mono text-xs font-bold text-coral">{card.number} //</span>
									<IconComponent
										size={20}
										className="text-ink/30 drop-shadow-brutal-xs transition-transform duration-200 group-hover:scale-110 group-hover:text-ink"
									/>
								</div>
							</Link>
						);
					})}
				</div>

				{/* Simple, Friendly Footer Bar */}
				<div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-ink/15 pt-5 font-mono text-[11px] font-bold tracking-wider text-ink/60 uppercase">
					<div className="flex items-center gap-2">
						<span className="size-2 rounded-full bg-mint ring-1 ring-ink" />
						<span>
							{Data.fullName} — {Data.position}
						</span>
					</div>
					<div className="flex items-center gap-3">
						<Link
							href="/"
							className="inline-flex items-center gap-1 transition-colors hover:text-ink"
						>
							<Home className="size-3" />
							<span>Homepage</span>
						</Link>
						<span className="text-ink/30">•</span>
						<span>{Data.cleanUrl}</span>
					</div>
				</div>
			</GridSection>
		</div>
	);
}
