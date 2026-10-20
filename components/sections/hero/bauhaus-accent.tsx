import { cn } from "@/lib/utils";

interface BauhausAccentProps {
	className?: string;
}

export function BauhausAccent({ className }: BauhausAccentProps) {
	return (
		<div
			aria-hidden="true"
			className={cn(
				"inline-flex items-center gap-2 rounded-xl border-subtle border-ink bg-surface px-3 py-1.5 shadow-brutal-xs select-none",
				"-rotate-3 transition-transform duration-200 hover:rotate-0 hover:shadow-brutal",
				"corner-squircle supports-[corner-shape:squircle]:rounded-full",
				className,
			)}
		>
			{/* Bauhaus Geometry Trio: Circle (Coral), Triangle (Yellow), Square (Sky) */}
			<div className="flex items-center gap-1.5">
				{/* Circle */}
				<span className="size-2.5 rounded-full border-subtle border-ink bg-coral" />

				{/* Triangle */}
				<svg className="size-3 fill-yellow stroke-ink" strokeWidth="1.5" viewBox="0 0 24 24">
					<polygon points="12,3 22,21 2,21" />
				</svg>

				{/* Square */}
				<span className="size-2.5 rounded-xs border-subtle border-ink bg-sky" />
			</div>

			<span className="h-3 w-px bg-ink/20" />

			<span className="font-mono text-xs font-bold tracking-tight text-ink">SYS.V3 // CRAFT</span>
		</div>
	);
}
