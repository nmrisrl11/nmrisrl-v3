"use client";

import { avatarStore } from "@/components/avatar/avatar-store";
import { CrossStarIcon } from "@/components/neu-icons";
import { Data } from "@/constants/data";
import { cn } from "@/lib/utils";

interface RotatingSealProps {
	className?: string;
}

export function RotatingSeal({ className }: RotatingSealProps) {
	const handleClick = () => {
		avatarStore.requestAction("thumbsup", {
			priority: "click",
			source: "seal-badge",
		});
	};

	return (
		<button
			type="button"
			onClick={handleClick}
			aria-label="Seal of verification - click to interact with Nomer's avatar"
			className={cn(
				"relative flex size-24 cursor-pointer items-center justify-center select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink sm:size-28",
				"transition-transform duration-300 hover:scale-105 active:scale-95",
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
						{`${Data.fullName.toUpperCase()} ✦ FRONTEND ✦ CRAFTED WITH CARE ✦ 2026 ✦\u00A0`}
					</textPath>
				</text>
			</svg>

			{/* Center Yellow Pastel Chip with Neubrutalist Cross Star Stamp */}
			<div className="absolute inset-0 m-auto flex size-11 items-center justify-center rounded-full border-subtle border-ink bg-yellow shadow-brutal-xs">
				<CrossStarIcon size={22} className="size-5.5 text-ink" />
			</div>
		</button>
	);
}
