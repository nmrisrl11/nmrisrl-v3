"use client";

import { avatarStore } from "@/components/avatar/avatar-store";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

interface NpmDevBadgeProps {
	className?: string;
}

export function NpmDevBadge({ className }: NpmDevBadgeProps) {
	const timerRef = useRef<number | null>(null);

	const handleClick = () => {
		if (timerRef.current) {
			window.clearTimeout(timerRef.current);
		}
		avatarStore.requestAction("coding", {
			priority: "click",
			source: "npm-badge",
		});
		timerRef.current = window.setTimeout(() => {
			avatarStore.clearAction("npm-badge");
			timerRef.current = null;
		}, 3000);
	};

	useEffect(() => {
		return () => {
			if (timerRef.current) {
				window.clearTimeout(timerRef.current);
			}
			avatarStore.clearAction("npm-badge");
		};
	}, []);

	return (
		<button
			type="button"
			onClick={handleClick}
			aria-label="Trigger avatar coding gesture with npm run dev"
			className={cn(
				"inline-flex cursor-pointer items-center gap-2 rounded-xl border-subtle border-ink bg-surface px-3 py-1.5 shadow-brutal-xs select-none",
				"rotate-2 transition-transform duration-200 hover:scale-105 hover:rotate-0 hover:shadow-brutal active:scale-95",
				"corner-squircle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink supports-[corner-shape:squircle]:rounded-full",
				className,
			)}
		>
			{/* Terminal Prompt Glyph */}
			<span className="font-mono text-xs font-black text-coral">&gt;_</span>

			{/* Dev Script Command */}
			<div className="flex items-center gap-1.5 font-mono text-[11px] font-bold text-ink">
				<span>npm run dev</span>
			</div>
		</button>
	);
}

export { NpmDevBadge as DevCommandBadge };
