import { DroneAssembly } from "./drone-assembly";

/** 05 // PHILOSOPHY (Craft, Purpose & Value Engineering) */
export function PhilosophyCard() {
	return (
		<div className="relative flex flex-col justify-between overflow-hidden squircle-card bg-surface p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-brutal-lg sm:p-7 md:col-span-2 lg:col-span-5">
			{/* Blueprint Header */}
			<div className="flex items-center justify-between gap-2 border-b border-ink/10 pb-4">
				<div className="inline-flex items-center gap-2 font-mono text-xs font-bold tracking-wide text-ink uppercase">
					<span>05 // PHILOSOPHY</span>
				</div>
				<span className="font-mono text-[10px] font-bold tracking-wider text-ink/40">
					CRAFT // VALUE
				</span>
			</div>

			{/* Centered 3D Animated Drone Construction Assembly Model */}
			<div className="flex w-full flex-1 items-center justify-center py-2 sm:py-3">
				<DroneAssembly />
			</div>

			{/* Copywriting */}
			<div className="flex flex-col gap-2.5 pt-2">
				<h3 className="font-heading text-xl font-black tracking-tight text-ink sm:text-2xl">
					Engineering undeniable value.
				</h3>
				<p className="font-body text-sm leading-relaxed text-ink/80 sm:text-base">
					Driven by high-impact craft, ownership, and building software that genuinely matters —
					striving toward total creative and financial freedom.
				</p>
			</div>
		</div>
	);
}
