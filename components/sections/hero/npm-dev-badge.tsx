import { cn } from "@/lib/utils";

interface NpmDevBadgeProps {
	className?: string;
}

export function NpmDevBadge({ className }: NpmDevBadgeProps) {
	return (
		<div
			aria-hidden="true"
			className={cn(
				"inline-flex items-center gap-2 rounded-xl border-subtle border-ink bg-surface px-3 py-1.5 shadow-brutal-xs select-none",
				"rotate-2 transition-transform duration-200 hover:scale-105 hover:rotate-0 hover:shadow-brutal",
				"corner-squircle supports-[corner-shape:squircle]:rounded-full",
				className,
			)}
		>
			{/* Terminal Prompt Glyph */}
			<span className="font-mono text-xs font-black text-coral">&gt;_</span>

			{/* Dev Script Command */}
			<div className="flex items-center gap-1.5 font-mono text-[11px] font-bold text-ink">
				<span>npm run dev</span>
			</div>
		</div>
	);
}

export { NpmDevBadge as DevCommandBadge };
