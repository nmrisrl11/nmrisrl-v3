import { InteractiveAvatar } from "@/components/avatar/interactive-avatar";
import { DiamondStarIcon } from "@/components/neu-icons";
import { GridSection } from "@/components/page-layout/grid-section";
import { Button } from "@/components/ui/button";
import { BauhausAccent } from "./bauhaus-accent";
import { GitCommandBadge } from "./git-command-badge";
import { HeroNarrative } from "./hero-narrative";
import { MarqueeTechStack } from "./marquee-tech-stack";
import { NpmDevBadge } from "./npm-dev-badge";
import { RotatingSeal } from "./rotating-seal";

export function HeroSection() {
	return (
		<GridSection id="hero" className="flex flex-col justify-between px-0! py-0">
			{/* Top Area: Avatar on Left, Contents on Right */}
			<div className="grid flex-1 grid-cols-1 items-end gap-8 px-4 pt-6 sm:px-8 md:pt-10 lg:grid-cols-12 lg:gap-12 lg:px-12">
				{/* Avatar on Left with Graphic Geometry Accents (Touches bottom marquee directly with zero margin) */}
				<div className="order-2 flex items-end justify-center self-end lg:order-1 lg:col-span-5">
					{/* Inner Avatar Stage: Hugs the avatar body so badges stay properly anchored at all viewports */}
					<div className="relative w-full max-w-65 sm:max-w-85 md:max-w-95 lg:max-w-100">
						{/* Rotating Neubrutalist Seal Stamp (Top-Left / Framing the Avatar) */}
						<div className="absolute -top-6 -left-3 z-20 hidden sm:flex lg:-top-8 lg:-left-6">
							<RotatingSeal />
						</div>

						{/* Isometric / Bauhaus Geometric Accent Pill (Bottom-Left / Waist of Avatar) */}
						<div className="absolute bottom-20 -left-3 z-20 hidden sm:inline-flex lg:bottom-24 lg:-left-4">
							<BauhausAccent />
						</div>

						{/* Common Git Command Badge (Lower Waist of Avatar) */}
						<div className="absolute bottom-6 left-2 z-20 hidden sm:inline-flex lg:bottom-8 lg:left-4">
							<GitCommandBadge />
						</div>

						{/* Npm Dev Command Badge (Bottom-Right / Wrist of Avatar) */}
						<div className="absolute -right-2 bottom-12 z-20 hidden sm:inline-flex lg:-right-3 lg:bottom-14">
							<NpmDevBadge />
						</div>

						{/* Interactive 3D Avatar Engine */}
						<InteractiveAvatar />
					</div>
				</div>

				{/* Contents on Right */}
				<div className="order-1 my-auto flex flex-col justify-center gap-5 py-6 text-center lg:order-2 lg:col-span-7 lg:py-10 lg:text-left">
					{/* Architectural Grid Coordinates & Blueprint Markers */}
					<div className="flex flex-wrap items-center justify-center gap-1.5 font-mono text-[10px] font-bold tracking-wider text-ink/60 uppercase select-none sm:gap-2 sm:text-[11px] sm:tracking-widest lg:justify-start">
						<DiamondStarIcon size={12} className="size-3 text-coral" />
						<span>FIG. 01 // OVERVIEW</span>
						<span className="text-ink/25">•</span>
						<span>14°35&apos;N 120°58&apos;E</span>
						<span className="text-ink/25">•</span>
						<span>MNL, PH</span>
					</div>

					{/* Pre-Header Kicker Pill */}
					<div className="flex items-center justify-center lg:justify-start">
						<div className="inline-flex items-center gap-2 rounded-md border-subtle border-ink bg-surface px-3 py-1 font-mono text-xs font-bold tracking-wide text-ink shadow-brutal-xs corner-squircle supports-[corner-shape:squircle]:rounded-full">
							<span className="size-2 animate-pulse rounded-full bg-mint ring-1 ring-ink motion-reduce:animate-none" />
							<span>AVAILABLE FOR WORK</span>
						</div>
					</div>

					{/* Main Headline */}
					<h1 className="font-display text-3xl leading-[1.15] font-black tracking-tight text-ink sm:text-5xl lg:text-5xl xl:text-6xl">
						I build software that works{" "}
						<span className="inline-block -rotate-1 bg-yellow px-2 py-0.5 text-ink shadow-brutal ring-2 ring-ink sm:px-3 sm:shadow-brutal-lg">
							beyond the code.
						</span>
					</h1>

					{/* Narrative Subtitle */}
					<HeroNarrative />

					{/* Action Buttons (Dual CTAs) */}
					<div className="flex flex-wrap items-center justify-center gap-3.5 pt-1 lg:justify-start">
						<Button
							variant="default"
							size="default"
							shape="squircle"
							asChild
							className="shadow-brutal hover:shadow-brutal-lg"
						>
							<a href="#projects">Explore Projects</a>
						</Button>

						<Button
							variant="secondary"
							size="default"
							shape="squircle"
							asChild
							className="shadow-brutal hover:shadow-brutal-lg"
						>
							<a href="#contact">
								<span>Get in Touch</span>
							</a>
						</Button>
					</div>
				</div>
			</div>

			{/* Marquee at the bottom of avatar colliding without any padding or margin, contained inside the grid line */}
			<MarqueeTechStack />
		</GridSection>
	);
}
