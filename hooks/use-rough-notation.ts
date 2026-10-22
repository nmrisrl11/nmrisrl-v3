"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

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

/**
 * Reusable hook to subscribe to prefers-reduced-motion without cascading renders.
 */
export function useReducedMotion(): boolean {
	return useSyncExternalStore(
		subscribeReducedMotion,
		getReducedMotionSnapshot,
		getReducedMotionServerSnapshot,
	);
}

/**
 * Reusable hook to delay annotation activation until custom web fonts
 * have loaded and layout calculations have settled.
 */
export function useRoughNotationReady(settleDelayMs = 200): boolean {
	const [ready, setReady] = useState(false);

	useEffect(() => {
		let active = true;

		if (typeof document !== "undefined" && document.fonts) {
			document.fonts.ready.then(() => {
				if (active) {
					setTimeout(() => {
						if (active) setReady(true);
					}, settleDelayMs);
				}
			});
		} else {
			const timer = setTimeout(() => {
				if (active) setReady(true);
			}, settleDelayMs + 100);

			return () => {
				active = false;
				clearTimeout(timer);
			};
		}

		return () => {
			active = false;
		};
	}, [settleDelayMs]);

	return ready;
}

/**
 * Combined helper providing both font readiness and reduced motion preference
 * for RoughNotation consumers across the application.
 */
export function useRoughNotation(settleDelayMs = 200) {
	const ready = useRoughNotationReady(settleDelayMs);
	const reducedMotion = useReducedMotion();

	return { ready, reducedMotion };
}
