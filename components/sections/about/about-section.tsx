import {
	DiamondStarIcon,
	DoubleCapsuleIcon,
	PropellerStarIcon,
	ScallopRosetteIcon,
	SlantedLoopIcon,
	TrefoilCloudIcon,
} from "@/components/neu-icons";
import { GridSection } from "@/components/page-layout/grid-section";
import { Footprints, Gamepad2, Palette } from "lucide-react";
import { NextjsIcon, ReactIcon, TailwindIcon, TypeScriptIcon } from "./about-icons";

export function AboutSection() {
	return (
		<GridSection
			id="about"
			figure="FIG. 02 // IDENTITY & BACKGROUND"
			figureMeta={["SPECIALIZATION", "CRAFT & SYSTEMS"]}
			title="About Me"
			description="Front-end developer crafting tactile, high-performance web applications and modular design systems."
		>
			<div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-12">
				<SpecializationCard />
				<ExperienceCard />
				<ArchitectureCard />
				<InnovationCard />
				<NorthStarCard />
				<InterestsCard />
			</div>
		</GridSection>
	);
}

/* -------------------------------------------------------------------------- */
/*                                 BENTO CARDS                                */
/* -------------------------------------------------------------------------- */

/** 01 // INTRO & REACT ECOSYSTEM (Large Anchor Card) */
function SpecializationCard() {
	return (
		<div className="relative flex flex-col justify-between overflow-hidden squircle-card bg-surface p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-brutal-lg sm:p-7 md:col-span-2 lg:col-span-7">
			{/* Blueprint Header */}
			<div className="flex items-center justify-between gap-2 border-b border-ink/10 pb-4">
				<div className="inline-flex items-center gap-2 font-mono text-xs font-bold tracking-wide text-ink uppercase">
					<span>01 // SPECIALIZATION</span>
				</div>
				<span className="font-mono text-[10px] font-bold tracking-wider text-ink/40">
					CORE // STACK
				</span>
			</div>

			{/* Copywriting */}
			<div className="my-5 flex flex-col gap-3">
				<h3 className="font-heading text-xl font-black tracking-tight text-ink sm:text-2xl">
					Front-end developer building polished, accessible web apps.
				</h3>
				<p className="font-body text-sm leading-relaxed text-ink/80 sm:text-base">
					Deeply rooted in the React ecosystem with hands-on architectural experience. I translate
					ambitious product visions into clean component abstractions, fluid micro-interactions, and
					robust type-safe codebases engineered for speed and scale.
				</p>
			</div>

			{/* Sprinkled Squircles & Tech Accents */}
			<div className="flex flex-wrap items-center justify-between gap-4 border-t border-ink/10 pt-4">
				{/* Squircle Shapes containing Tech Icons */}
				<div className="flex items-center gap-2 sm:gap-2.5">
					{/* React Squircle */}
					<div
						title="React 19"
						className="relative flex size-10 -rotate-3 items-center justify-center rounded-xl border-subtle border-ink bg-sky text-ink shadow-brutal-xs transition-transform duration-200 corner-squircle hover:rotate-0 hover:shadow-brutal supports-[corner-shape:squircle]:rounded-2xl sm:size-11"
					>
						<ReactIcon className="size-5" />
					</div>

					{/* Next.js Squircle */}
					<div
						title="Next.js 16"
						className="relative flex size-10 rotate-3 items-center justify-center rounded-xl border-subtle border-ink bg-surface-muted text-ink shadow-brutal-xs transition-transform duration-200 corner-squircle hover:rotate-0 hover:shadow-brutal supports-[corner-shape:squircle]:rounded-2xl sm:size-11"
					>
						<NextjsIcon className="size-5" />
					</div>

					{/* TypeScript Squircle */}
					<div
						title="TypeScript"
						className="relative flex size-10 -rotate-2 items-center justify-center rounded-xl border-subtle border-ink bg-yellow text-ink shadow-brutal-xs transition-transform duration-200 corner-squircle hover:rotate-0 hover:shadow-brutal supports-[corner-shape:squircle]:rounded-2xl sm:size-11"
					>
						<TypeScriptIcon className="size-5" />
					</div>

					{/* Tailwind Squircle */}
					<div
						title="Tailwind CSS v4"
						className="relative flex size-10 rotate-2 items-center justify-center rounded-xl border-subtle border-ink bg-mint text-ink shadow-brutal-xs transition-transform duration-200 corner-squircle hover:rotate-0 hover:shadow-brutal supports-[corner-shape:squircle]:rounded-2xl sm:size-11"
					>
						<TailwindIcon className="size-5" />
					</div>
				</div>

				{/* Subtle Neu-Icon Sparkle */}
				<div className="flex items-center gap-1.5 font-mono text-xs font-bold text-ink-muted">
					<DiamondStarIcon className="size-4 text-coral" />
					<span>CORE FOCUS</span>
				</div>
			</div>
		</div>
	);
}

/** 02 // CRAFT & DESIGN INTUITION (Stat & Rosette Stamp) */
function ExperienceCard() {
	return (
		<div className="relative flex flex-col justify-between overflow-hidden squircle-card bg-surface p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-brutal-lg sm:p-7 md:col-span-2 lg:col-span-5">
			{/* Header */}
			<div className="flex items-center justify-between gap-2 border-b border-ink/10 pb-4">
				<div className="inline-flex items-center gap-2 font-mono text-xs font-bold tracking-wide text-ink uppercase">
					<span>02 // EXPERIENCE</span>
				</div>
				<span className="font-mono text-[10px] font-bold tracking-wider text-ink/40">
					EST. 2019
				</span>
			</div>

			{/* Main Stat & Scallop Rosette Stamp */}
			<div className="my-5 flex items-center justify-between gap-4">
				<div>
					<div className="font-display text-5xl font-black tracking-tight text-ink sm:text-6xl">
						7<span className="text-coral">+</span>
					</div>
					<div className="mt-1 font-mono text-xs font-bold tracking-wider text-ink-muted uppercase">
						Years Crafting UI
					</div>
				</div>

				{/* Scallop Rosette Neubrutalist Seal Stamp */}
				<div
					title="Craft Stamp"
					className="relative flex size-15 rotate-3 items-center justify-center rounded-2xl border-subtle border-ink bg-yellow shadow-brutal-xs transition-transform duration-300 corner-squircle hover:rotate-12 hover:shadow-brutal supports-[corner-shape:squircle]:rounded-3xl sm:size-16"
				>
					<ScallopRosetteIcon className="size-9 fill-ink text-ink" />
				</div>
			</div>

			{/* Descriptive Copy */}
			<div className="border-t border-ink/10 pt-3">
				<h4 className="font-heading text-base font-bold text-ink">
					Engineered with a designer&apos;s intuition.
				</h4>
				<p className="mt-1 font-body text-xs leading-relaxed text-ink/75 sm:text-sm">
					Merging 7 years of development depth with design sensibilities to deliver tactile,
					intuitive user interfaces that feel alive.
				</p>
			</div>
		</div>
	);
}

/** 03 // ARCHITECTURE & SCALABILITY (Schematic Layers) */
function ArchitectureCard() {
	return (
		<div className="relative flex flex-col justify-between overflow-hidden squircle-card bg-surface p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-brutal-lg sm:p-7 md:col-span-1 lg:col-span-6">
			{/* Header */}
			<div className="flex items-center justify-between gap-2 border-b border-ink/10 pb-4">
				<div className="inline-flex items-center gap-2 font-mono text-xs font-bold tracking-wide text-ink uppercase">
					<span>03 // ARCHITECTURE</span>
				</div>
				<DoubleCapsuleIcon className="size-5 text-ink/70" />
			</div>

			{/* Copy */}
			<div className="my-4 flex flex-col gap-2">
				<h3 className="font-heading text-lg font-black tracking-tight text-ink sm:text-xl">
					Modular, scalable systems.
				</h3>
				<p className="font-body text-xs leading-relaxed text-ink/80 sm:text-sm">
					Architecting secure, high-performance web applications. Establishing clean layer
					boundaries, strict type contracts, and zero-debt maintainability.
				</p>
			</div>

			{/* Visual Blueprint Schema Sprinkles */}
			<div className="flex flex-col gap-1.5 pt-2">
				<div className="flex items-center gap-2 rounded-lg border-subtle border-ink bg-mint/30 px-3 py-1.5 font-mono text-xs font-bold text-ink shadow-brutal-xs corner-squircle supports-[corner-shape:squircle]:rounded-xl">
					<span className="size-2 rounded-full border-subtle border-ink bg-coral" />
					<span>FSD // Feature-Sliced Design</span>
				</div>
				<div className="flex items-center gap-2 rounded-lg border-subtle border-ink bg-surface-muted px-3 py-1.5 font-mono text-xs font-bold text-ink shadow-brutal-xs corner-squircle supports-[corner-shape:squircle]:rounded-xl">
					<span className="size-2 rounded-full border-subtle border-ink bg-mint" />
					<span>Clean Architecture</span>
				</div>
				<div className="flex items-center gap-2 rounded-lg border-subtle border-ink bg-lavender/50 px-3 py-1.5 font-mono text-xs font-bold text-ink shadow-brutal-xs corner-squircle supports-[corner-shape:squircle]:rounded-xl">
					<span className="size-2 rounded-full border-subtle border-ink bg-sky" />
					<span>DDD // Domain-Driven Design</span>
				</div>
			</div>
		</div>
	);
}

/** 04 // CONTINUOUS LEARNING & TRENDS (Live Radar) */
function InnovationCard() {
	return (
		<div className="relative flex flex-col justify-between overflow-hidden squircle-card bg-surface p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-brutal-lg sm:p-7 md:col-span-1 lg:col-span-6">
			{/* Header */}
			<div className="flex items-center justify-between gap-2 border-b border-ink/10 pb-4">
				<div className="inline-flex items-center gap-2 font-mono text-xs font-bold tracking-wide text-ink uppercase">
					<span>04 // INNOVATION</span>
				</div>
				<div className="inline-flex items-center gap-2 rounded-full border-subtle border-ink bg-mint/40 px-2.5 py-0.5 font-mono text-[10px] font-bold text-ink">
					<span className="size-2 animate-pulse rounded-full bg-ink motion-reduce:animate-none" />
					<span>TREND PULSE</span>
				</div>
			</div>

			{/* Copy */}
			<div className="my-4 flex flex-col gap-2">
				<h3 className="font-heading text-lg font-black tracking-tight text-ink sm:text-xl">
					Staying active on modern trends.
				</h3>
				<p className="font-body text-xs leading-relaxed text-ink/80 sm:text-sm">
					Continuously learning and keeping pace with emerging technologies, modern web standards,
					and evolving frontend patterns to deliver future-ready digital experiences.
				</p>
			</div>

			{/* SlantedLoop Neu-Icon & Emerging Tech Badges */}
			<div className="flex items-center justify-between gap-3 pt-2">
				<div className="flex flex-wrap gap-2">
					<span className="squircle-badge bg-lavender px-2.5 py-1 font-mono text-xs font-bold text-ink">
						Web Standards
					</span>
					<span className="squircle-badge bg-sky px-2.5 py-1 font-mono text-xs font-bold text-ink">
						Modern Tooling
					</span>
					<span className="squircle-badge bg-surface-muted px-2.5 py-1 font-mono text-xs font-bold text-ink">
						Emerging Trends
					</span>
				</div>

				{/* Slanted Loop Neu-Icon */}
				<div
					title="Continuous Iteration"
					className="relative flex size-11 shrink-0 -rotate-6 items-center justify-center rounded-xl border-subtle border-ink bg-lavender text-ink shadow-brutal-xs transition-transform duration-200 corner-squircle hover:rotate-0 hover:shadow-brutal supports-[corner-shape:squircle]:rounded-2xl"
				>
					<SlantedLoopIcon className="size-6 fill-ink text-ink" />
				</div>
			</div>
		</div>
	);
}

/** 05 // NORTH STAR & PHILOSOPHY (Purpose & Value) */
function NorthStarCard() {
	return (
		<div className="relative flex flex-col justify-between overflow-hidden squircle-card bg-surface p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-brutal-lg sm:p-7 md:col-span-2 lg:col-span-5">
			{/* Header */}
			<div className="flex items-center justify-between gap-2 border-b border-ink/10 pb-4">
				<div className="inline-flex items-center gap-2 font-mono text-xs font-bold tracking-wide text-ink uppercase">
					<span>05 // THE NORTH STAR</span>
				</div>
				<PropellerStarIcon className="size-5 animate-spin text-ink [animation-duration:16s] motion-reduce:animate-none" />
			</div>

			{/* Copy */}
			<div className="my-4 flex flex-col gap-2">
				<h3 className="font-heading text-lg font-black tracking-tight text-ink sm:text-xl">
					Engineering undeniable value.
				</h3>
				<p className="font-body text-xs leading-relaxed text-ink/80 sm:text-sm">
					Driven by high-impact craft, ownership, and building software that genuinely matters —
					striving toward total creative and financial freedom.
				</p>
			</div>

			{/* Highlighter Sticker */}
			<div className="pt-2">
				<div className="inline-flex -rotate-1 items-center gap-2 rounded-lg border-subtle border-ink bg-yellow px-3.5 py-2 font-mono text-xs font-black tracking-wide text-ink shadow-brutal-xs corner-squircle supports-[corner-shape:squircle]:rounded-xl">
					<span className="text-coral">✦</span>
					<span>PURPOSE // MASTERY // FREEDOM</span>
				</div>
			</div>
		</div>
	);
}

/** 06 // BEYOND THE TERMINAL (Off-Duty Passions) */
function InterestsCard() {
	return (
		<div className="relative flex flex-col justify-between overflow-hidden squircle-card bg-surface p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-brutal-lg sm:p-7 md:col-span-2 lg:col-span-7">
			{/* Header */}
			<div className="flex items-center justify-between gap-2 border-b border-ink/10 pb-4">
				<div className="inline-flex items-center gap-2 font-mono text-xs font-bold tracking-wide text-ink uppercase">
					<span>06 // OFF-DUTY & INTERESTS</span>
				</div>
				<TrefoilCloudIcon className="size-5 fill-lavender text-ink/70" />
			</div>

			{/* Copy */}
			<div className="my-4 flex flex-col gap-2">
				<h3 className="font-heading text-lg font-black tracking-tight text-ink sm:text-xl">
					Beyond the terminal.
				</h3>
				<p className="font-body text-xs leading-relaxed text-ink/80 sm:text-sm">
					Grounding myself through a consistent running routine, alongside an enduring creative
					fascination for indie game development and 2D character art that I continue to admire.
				</p>
			</div>

			{/* 3 Interactive Activity Chips */}
			<div className="grid grid-cols-1 gap-2.5 pt-2 sm:grid-cols-3">
				{/* Road Running */}
				<div className="flex items-center gap-2.5 rounded-xl border-subtle border-ink bg-coral/15 p-2.5 shadow-brutal-xs transition-transform duration-150 corner-squircle hover:-translate-y-0.5 hover:shadow-brutal supports-[corner-shape:squircle]:rounded-2xl">
					<div className="flex size-8 shrink-0 items-center justify-center rounded-lg border-subtle border-ink bg-surface shadow-brutal-xs">
						<Footprints className="size-4 text-ink" />
					</div>
					<div className="min-w-0">
						<div className="font-heading text-xs font-bold text-ink">Running</div>
						<div className="font-mono text-[10px] text-ink-muted">Active Routine</div>
					</div>
				</div>

				{/* Game Dev */}
				<div className="flex items-center gap-2.5 rounded-xl border-subtle border-ink bg-sky/20 p-2.5 shadow-brutal-xs transition-transform duration-150 corner-squircle hover:-translate-y-0.5 hover:shadow-brutal supports-[corner-shape:squircle]:rounded-2xl">
					<div className="flex size-8 shrink-0 items-center justify-center rounded-lg border-subtle border-ink bg-surface shadow-brutal-xs">
						<Gamepad2 className="size-4 text-ink" />
					</div>
					<div className="min-w-0">
						<div className="font-heading text-xs font-bold text-ink">Game Dev</div>
						<div className="font-mono text-[10px] text-ink-muted">Enduring Passion</div>
					</div>
				</div>

				{/* 2D Character Design */}
				<div className="flex items-center gap-2.5 rounded-xl border-subtle border-ink bg-lavender/60 p-2.5 shadow-brutal-xs transition-transform duration-150 corner-squircle hover:-translate-y-0.5 hover:shadow-brutal supports-[corner-shape:squircle]:rounded-2xl">
					<div className="flex size-8 shrink-0 items-center justify-center rounded-lg border-subtle border-ink bg-surface shadow-brutal-xs">
						<Palette className="size-4 text-ink" />
					</div>
					<div className="min-w-0">
						<div className="font-heading text-xs font-bold text-ink">Character Art</div>
						<div className="font-mono text-[10px] text-ink-muted">Creative Interest</div>
					</div>
				</div>
			</div>
		</div>
	);
}
