"use client";

import { Data } from "@/constants/data";
import { useEffect, useState, useSyncExternalStore } from "react";
import { RoughNotation, RoughNotationGroup } from "react-rough-notation";

function subscribeReducedMotion(callback: () => void) {
	if (typeof window === "undefined") return () => {};
	const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
	mediaQuery.addEventListener("change", callback);
	return () => mediaQuery.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
	if (typeof window === "undefined") return false;
	return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot() {
	return false;
}

export function HeroNarrative() {
	const [showAnnotations, setShowAnnotations] = useState(false);
	const reducedMotion = useSyncExternalStore(
		subscribeReducedMotion,
		getReducedMotionSnapshot,
		getReducedMotionServerSnapshot,
	);

	useEffect(() => {
		let active = true;

		// Ensure custom fonts have loaded before measuring text bounding rects
		if (typeof document !== "undefined" && document.fonts) {
			document.fonts.ready.then(() => {
				if (active) {
					// Small tick to ensure layout and line wrapping have settled
					setTimeout(() => {
						if (active) setShowAnnotations(true);
					}, 250);
				}
			});
		} else {
			const timer = setTimeout(() => {
				if (active) setShowAnnotations(true);
			}, 350);
			return () => {
				active = false;
				clearTimeout(timer);
			};
		}

		return () => {
			active = false;
		};
	}, []);

	return (
		<p className="max-w-xl font-body text-base leading-relaxed font-medium text-balance text-ink/80 sm:text-lg">
			<RoughNotationGroup show={showAnnotations}>
				Hi, I&apos;m{" "}
				<span className="relative inline-block font-bold text-ink">
					<RoughNotation
						type="underline"
						order={1}
						color="var(--color-coral)"
						strokeWidth={2.5}
						iterations={2}
						padding={[0, 2, 2, 2]}
						animate={!reducedMotion}
						animationDuration={600}
					>
						{Data.firstName}
					</RoughNotation>
				</span>{" "}
				— a{" "}
				<span className="relative inline-block font-semibold text-ink">
					<RoughNotation
						type="highlight"
						order={2}
						color="color-mix(in srgb, var(--color-yellow) 75%, transparent)"
						multiline={true}
						iterations={1}
						padding={[2, 6]}
						animate={!reducedMotion}
						animationDuration={700}
					>
						{Data.position.toLowerCase()}
					</RoughNotation>
				</span>{" "}
				turning complex ideas into fast, accessible, and delightful web applications.
			</RoughNotationGroup>
		</p>
	);
}
