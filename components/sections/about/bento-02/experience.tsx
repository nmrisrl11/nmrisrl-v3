import { About_Data } from "@/constants/data";
import { ExperienceHologram } from "./experience-hologram";

/** 02 // CRAFT & DESIGN INTUITION (Hologram Emitter 3D Model) */
export function ExperienceCard() {
	return (
		<div className="relative flex flex-col justify-between overflow-hidden squircle-card bg-surface p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-brutal-lg sm:p-7 md:col-span-2 lg:col-span-5">
			{/* Header */}
			<div className="flex items-center justify-between gap-2 border-b border-ink/15 pb-4">
				<div className="inline-flex items-center gap-2 font-mono text-xs font-bold tracking-wide text-ink uppercase">
					<span>{About_Data.experience.kicker}</span>
				</div>
				<span className="font-mono text-2xs font-bold tracking-wider text-ink/40">
					{About_Data.experience.tag}
				</span>
			</div>

			{/* Centered 3D Hologram Emitter Model */}
			<div className="flex w-full flex-1 items-center justify-center py-2 sm:py-3">
				<ExperienceHologram />
			</div>

			{/* Descriptive Copy */}
			<div className="flex flex-col gap-2.5 pt-2">
				<h3 className="font-heading text-xl font-black tracking-tight text-ink sm:text-2xl">
					{About_Data.experience.title}
				</h3>
				<p className="font-body text-sm leading-relaxed text-ink/80 sm:text-base">
					{About_Data.experience.description}
				</p>
			</div>
		</div>
	);
}
