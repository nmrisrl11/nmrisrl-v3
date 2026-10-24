import { TrendRadar } from "./trend-radar";

/** 04 // CONTINUOUS LEARNING & TRENDS (Orbital Trend Radar) */
export function InnovationCard() {
	return (
		<div className="relative flex flex-col justify-between overflow-hidden squircle-card bg-surface p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-brutal-lg sm:p-7 md:col-span-1 lg:col-span-6">
			{/* Header */}
			<div className="flex items-center justify-between gap-2 border-b border-ink/10 pb-4">
				<div className="inline-flex items-center gap-2 font-mono text-xs font-bold tracking-wide text-ink uppercase">
					<span>04 // INNOVATION</span>
				</div>
				<span className="font-mono text-[10px] font-bold tracking-wider text-ink/40">
					RADAR // HORIZON
				</span>
			</div>

			{/* Centered 3D Animated Orbital Trend Radar Model */}
			<div className="flex w-full flex-1 items-center justify-center py-2 sm:py-3">
				<TrendRadar />
			</div>

			{/* Copy */}
			<div className="flex flex-col gap-2.5 pt-2">
				<h3 className="font-heading text-xl font-black tracking-tight text-ink sm:text-2xl">
					Staying active on modern trends.
				</h3>
				<p className="font-body text-sm leading-relaxed text-ink/80 sm:text-base">
					Continuously learning and keeping pace with emerging technologies, modern web standards,
					and evolving frontend patterns to deliver future-ready digital experiences.
				</p>
			</div>
		</div>
	);
}
