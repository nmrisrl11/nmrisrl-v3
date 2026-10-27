"use client";

import { avatarStore } from "@/components/avatar/avatar-store";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

interface BauhausAccentProps {
	className?: string;
}

export function BauhausAccent({ className }: BauhausAccentProps) {
	const timerRef = useRef<number | null>(null);

	const handleClick = () => {
		if (timerRef.current) {
			window.clearTimeout(timerRef.current);
		}
		avatarStore.requestAction("coding", {
			priority: "click",
			source: "bauhaus-accent",
		});
		timerRef.current = window.setTimeout(() => {
			avatarStore.clearAction("bauhaus-accent");
			timerRef.current = null;
		}, 3000);
	};

	useEffect(() => {
		return () => {
			if (timerRef.current) {
				window.clearTimeout(timerRef.current);
			}
			avatarStore.clearAction("bauhaus-accent");
		};
	}, []);

	return (
		<button
			type="button"
			onClick={handleClick}
			aria-label="Trigger avatar coding gesture with system craft accent"
			className={cn(
				"inline-flex cursor-pointer items-center gap-2 rounded-xl border-subtle border-ink bg-surface px-3 py-1.5 shadow-brutal-xs select-none",
				"-rotate-3 transition-transform duration-200 hover:rotate-0 hover:shadow-brutal active:scale-95",
				"corner-squircle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink supports-[corner-shape:squircle]:rounded-full",
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
		</button>
	);
}
