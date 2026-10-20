import { cn } from "@/lib/utils";

interface RotatingSealProps {
	className?: string;
}

export function RotatingSeal({ className }: RotatingSealProps) {
	return (
		<div
			aria-hidden="true"
			className={cn(
				"relative flex size-24 items-center justify-center select-none sm:size-28",
				"transition-transform duration-300 hover:scale-105",
				className,
			)}
		>
			{/* Rotating Outer SVG Text Ring */}
			<svg
				viewBox="0 0 100 100"
				className="size-full animate-spin motion-reduce:animate-none"
				style={{ animationDuration: "20s" }}
			>
				<defs>
					<path
						id="hero-seal-text-path"
						d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
						fill="none"
					/>
				</defs>
				<text xmlSpace="preserve" className="fill-ink font-mono text-[7px] font-bold uppercase">
					<textPath
						href="#hero-seal-text-path"
						startOffset="0%"
						textLength="232.5"
						lengthAdjust="spacing"
					>
						{"NOMER ISRAEL ✦ FRONTEND ✦ CRAFTED WITH CARE ✦ 2026 ✦\u00A0"}
					</textPath>
				</text>
			</svg>

			{/* Center Yellow Pastel Chip with Solid Filled Geometric Star */}
			<div className="absolute inset-0 m-auto flex size-11 items-center justify-center rounded-full border-subtle border-ink bg-yellow shadow-brutal-xs">
				<svg viewBox="0 0 24 24" className="size-5 fill-ink" aria-hidden="true">
					<path d="M12 1.5L14.7 8.9L22.5 12L14.7 15.1L12 22.5L9.3 15.1L1.5 12L9.3 8.9L12 1.5Z" />
				</svg>
			</div>
		</div>
	);
}
