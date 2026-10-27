"use client";

import { avatarStore } from "@/components/avatar/avatar-store";
import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";

export function HeroCtaButtons() {
	const debounceTimerRef = useRef<number | null>(null);

	const triggerAction = (action: "coding" | "thumbsup", source: string) => {
		if (debounceTimerRef.current) {
			window.clearTimeout(debounceTimerRef.current);
		}
		// 80ms intentional hover debounce to prevent accidental flashes during rapid mouse sweeps
		debounceTimerRef.current = window.setTimeout(() => {
			avatarStore.requestAction(action, {
				priority: "hover",
				source,
			});
		}, 80);
	};

	const cancelAction = (source: string) => {
		if (debounceTimerRef.current) {
			window.clearTimeout(debounceTimerRef.current);
			debounceTimerRef.current = null;
		}
		avatarStore.clearAction(source);
	};

	useEffect(() => {
		return () => {
			if (debounceTimerRef.current) {
				window.clearTimeout(debounceTimerRef.current);
			}
			avatarStore.clearAction("cta-projects");
			avatarStore.clearAction("cta-contact");
		};
	}, []);

	return (
		<div className="flex flex-wrap items-center justify-center gap-3.5 pt-1 lg:justify-start">
			<Button
				variant="default"
				size="default"
				shape="squircle"
				asChild
				className="shadow-brutal hover:shadow-brutal-lg"
				onMouseEnter={() => triggerAction("coding", "cta-projects")}
				onMouseLeave={() => cancelAction("cta-projects")}
				onFocus={() => triggerAction("coding", "cta-projects")}
				onBlur={() => cancelAction("cta-projects")}
			>
				<a href="#projects">Explore Projects</a>
			</Button>

			<Button
				variant="secondary"
				size="default"
				shape="squircle"
				asChild
				className="shadow-brutal hover:shadow-brutal-lg"
				onMouseEnter={() => triggerAction("thumbsup", "cta-contact")}
				onMouseLeave={() => cancelAction("cta-contact")}
				onFocus={() => triggerAction("thumbsup", "cta-contact")}
				onBlur={() => cancelAction("cta-contact")}
			>
				<a href="#contact">
					<span>Get in Touch</span>
				</a>
			</Button>
		</div>
	);
}
