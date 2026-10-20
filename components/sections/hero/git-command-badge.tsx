import { cn } from "@/lib/utils";

interface GitCommandBadgeProps {
	command?: string;
	className?: string;
}

export function GitCommandBadge({
	command = 'git commit -m "feat"',
	className,
}: GitCommandBadgeProps) {
	return (
		<div
			aria-hidden="true"
			className={cn(
				"inline-flex items-center gap-2 rounded-xl border-subtle border-ink bg-surface px-3 py-1.5 shadow-brutal-xs select-none",
				"-rotate-1 transition-transform duration-200 hover:scale-105 hover:rotate-0 hover:shadow-brutal",
				"corner-squircle supports-[corner-shape:squircle]:rounded-full",
				className,
			)}
		>
			{/* Terminal Prompt Glyph */}
			<span className="font-mono text-xs font-black text-coral">&gt;_</span>

			{/* Git Command */}
			<div className="flex items-center gap-1.5 font-mono text-[11px] font-bold text-ink">
				<span>{command}</span>
			</div>
		</div>
	);
}
