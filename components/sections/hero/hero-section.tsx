import { GridSection } from "@/components/page-layout";
import { MarqueeTechStack } from "./marquee-tech-stack";

export function HeroSection() {
	return (
		<GridSection id="hero" className="flex flex-col justify-between px-0! py-0">
			{/* Top Area: Avatar on Left, Contents on Right */}
			<div className="grid flex-1 grid-cols-1 items-end gap-8 px-4 pt-8 sm:px-8 md:pt-12 lg:grid-cols-12 lg:gap-12 lg:px-12">
				{/* Avatar on Left (Touches the bottom marquee directly with zero margin) */}
				<div className="order-2 flex items-end justify-center self-end lg:order-1 lg:col-span-5">
					<div className="relative aspect-2/3 w-full max-w-75 sm:max-w-85 md:max-w-95 lg:max-w-100">
						<video
							autoPlay
							loop
							muted
							playsInline
							preload="auto"
							poster="/avatar/avatar-idle.webp"
							className="pointer-events-none size-full avatar-blend-mask object-contain object-bottom"
						>
							<source src="/avatar/avatar-idle.webm" type="video/webm" />
						</video>
					</div>
				</div>

				{/* Contents on Right */}
				<div className="order-1 my-auto flex flex-col justify-center gap-5 py-6 text-center lg:order-2 lg:col-span-7 lg:py-10 lg:text-left">
					<h1 className="font-display text-4xl leading-[1.12] font-black tracking-tight text-ink sm:text-5xl lg:text-[48px] xl:text-[56px]">
						I build software that works{" "}
						<span className="inline-block -rotate-1 border-brutal border-ink bg-yellow px-3 py-0.5 text-ink shadow-brutal">
							beyond the code.
						</span>
					</h1>

					<p className="max-w-xl font-body text-base leading-relaxed font-medium text-balance text-ink/80 sm:text-lg">
						Hi, I&apos;m Nomer — a front-end developer and engineer turning complex ideas into fast,
						accessible, and delightful web applications.
					</p>
				</div>
			</div>

			{/* Marquee at the bottom of avatar colliding without any padding or margin, contained inside the grid line */}
			<MarqueeTechStack />
		</GridSection>
	);
}
