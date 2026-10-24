import { About_Data } from "@/constants/data";
import { CreativeLab } from "./creative-lab";

/** 06 // BEYOND THE TERMINAL (Off-Duty Passions) */
export function InterestsCard() {
	return (
		<div className="relative flex flex-col justify-between overflow-hidden squircle-card bg-surface p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-brutal-lg sm:p-7 md:col-span-2 lg:col-span-7">
			{/* Blueprint Header */}
			<div className="flex items-center justify-between gap-2 border-b border-ink/15 pb-4">
				<div className="inline-flex items-center gap-2 font-mono text-xs font-bold tracking-wide text-ink uppercase">
					<span>{About_Data.interests.kicker}</span>
				</div>
				<span className="font-mono text-2xs font-bold tracking-wider text-ink/40">
					{About_Data.interests.tag}
				</span>
			</div>

			{/* Centered 3D Animated Specimen Laboratory Model */}
			<div className="flex w-full flex-1 items-center justify-center py-2 sm:py-3">
				<CreativeLab />
			</div>

			{/* Copywriting */}
			<div className="flex flex-col gap-2.5 pt-2">
				<h3 className="font-heading text-xl font-black tracking-tight text-ink sm:text-2xl">
					{About_Data.interests.title}
				</h3>
				<p className="font-body text-sm leading-relaxed text-ink/80 sm:text-base">
					{About_Data.interests.description}
				</p>
			</div>
		</div>
	);
}
