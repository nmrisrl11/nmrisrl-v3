"use client";

import { useEffect, useRef, useState } from "react";

interface TrendRadarProps {
	className?: string;
}

// Telemetry Targets Configuration
const TARGETS = {
	TOOLING: {
		id: "tooling",
		short: "MODERN TOOLING",
		color: "#0284c7",
	},
	STANDARDS: {
		id: "standards",
		short: "WEB STANDARDS",
		color: "#16a34a",
	},
	EMERGING: {
		id: "emerging",
		short: "EMERGING TECH",
		color: "#7c3aed",
	},
} as const;

export function TrendRadar({ className }: TrendRadarProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const dishHeadRef = useRef<SVGGElement>(null);
	const hudFocusRef = useRef<SVGTextElement>(null);
	const activeTargetRef = useRef<string | null>(null);
	const [isVisible, setIsVisible] = useState(false);

	// Viewport Observer: Pause CSS animations and telemetry loop when off-screen
	useEffect(() => {
		const el = containerRef.current;
		if (!el) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				setIsVisible(entry.isIntersecting);
			},
			{ rootMargin: "120px" },
		);

		observer.observe(el);
		return () => observer.disconnect();
	}, []);

	// Live Telemetry Sync: 0 React re-renders, 0 React-Scan flashes, 60 FPS buttery smooth
	useEffect(() => {
		if (!isVisible) return;

		let rafId: number;
		const dishHead = dishHeadRef.current;
		const hudFocus = hudFocusRef.current;

		function getDishAngle(): number {
			if (!dishHead) return -22;

			// Method 1: Web Animations API (direct live CSS animation clock)
			const anims = dishHead.getAnimations ? dishHead.getAnimations() : [];
			if (anims && anims.length > 0 && typeof anims[0].currentTime === "number") {
				const duration = 6800;
				const progress = (anims[0].currentTime % duration) / duration;
				return -22 * Math.cos(progress * 2 * Math.PI);
			}

			// Method 2: Live Computed Transform Matrix fallback
			const style = window.getComputedStyle(dishHead);
			const tr =
				style.transform || (style as unknown as { webkitTransform?: string }).webkitTransform;
			if (tr && tr !== "none") {
				if (tr.startsWith("matrix(")) {
					const parts = tr.slice(7, -1).split(",");
					const a = parseFloat(parts[0]);
					const b = parseFloat(parts[1]);
					if (!isNaN(a) && !isNaN(b)) {
						return Math.atan2(b, a) * (180 / Math.PI);
					}
				} else if (tr.startsWith("matrix3d(")) {
					const parts = tr.slice(9, -1).split(",");
					const a = parseFloat(parts[0]);
					const b = parseFloat(parts[1]);
					if (!isNaN(a) && !isNaN(b)) {
						return Math.atan2(b, a) * (180 / Math.PI);
					}
				}
			}
			return -22;
		}

		function syncTelemetry() {
			const angle = getDishAngle();
			let target;

			// Real-time synchronization with physical radar rotation:
			// Dish sweeps from -22deg (pointing left at Target 1) to +22deg (pointing right at Target 3)
			if (angle < -7) {
				target = TARGETS.TOOLING;
			} else if (angle > 7) {
				target = TARGETS.EMERGING;
			} else {
				target = TARGETS.STANDARDS;
			}

			if (target.id !== activeTargetRef.current) {
				activeTargetRef.current = target.id;
				if (hudFocus) {
					hudFocus.textContent = target.short;
					hudFocus.setAttribute("fill", target.color);
				}
			}

			rafId = requestAnimationFrame(syncTelemetry);
		}

		syncTelemetry();

		return () => {
			if (rafId) cancelAnimationFrame(rafId);
		};
	}, [isVisible]);

	return (
		<div
			ref={containerRef}
			className={`relative flex w-full items-center justify-center overflow-visible py-1 select-none ${className ?? ""}`}
		>
			<svg
				viewBox="35 15 670 490"
				className={`h-auto w-full max-w-68 overflow-visible drop-shadow-sm sm:max-w-84 md:max-w-92 lg:max-w-96 ${
					!isVisible ? "radar-paused" : ""
				}`}
				role="img"
				aria-label="Orbital Trend Radar tracking modern frontend trends including Turbopack, Vite, View Transitions, and AI agents"
			>
				<defs>
					<filter id="radar-emitter-glow" x="-50%" y="-50%" width="200%" height="200%">
						<feGaussianBlur in="SourceGraphic" stdDeviation="4" />
					</filter>

					<clipPath id="radar-target-1-clip">
						<rect x="0" y="0" width="160" height="58" rx="10" />
					</clipPath>
					<clipPath id="radar-target-2-clip">
						<rect x="0" y="0" width="160" height="58" rx="10" />
					</clipPath>
					<clipPath id="radar-target-3-clip">
						<rect x="0" y="0" width="160" height="58" rx="10" />
					</clipPath>
					<clipPath id="radar-hud-clip">
						<rect x="0" y="0" width="168" height="118" rx="10" />
					</clipPath>

					<linearGradient id="radar-dish-interior-grad" x1="0%" y1="0%" x2="100%" y2="100%">
						<stop offset="0%" stopColor="#ffffff" />
						<stop offset="35%" stopColor="#f8fafc" />
						<stop offset="70%" stopColor="#e2e8f0" />
						<stop offset="100%" stopColor="#cbd5e1" />
					</linearGradient>

					<linearGradient id="radar-dish-back-grad" x1="0%" y1="0%" x2="0%" y2="100%">
						<stop offset="0%" stopColor="#475569" />
						<stop offset="50%" stopColor="#334155" />
						<stop offset="100%" stopColor="#1e293b" />
					</linearGradient>

					<linearGradient id="radar-scanner-beam-grad" x1="0%" y1="100%" x2="0%" y2="0%">
						<stop offset="0%" stopColor="#38bdf8" stopOpacity="0.50" />
						<stop offset="55%" stopColor="#86efac" stopOpacity="0.22" />
						<stop offset="100%" stopColor="#38bdf8" stopOpacity="0.0" />
					</linearGradient>
					<style>
						{
							"\n            /* Pure Compositor Animations: 0 DOM mutations, 0 layout reflows */\n            .radar-paused * {\n              animation-play-state: paused !important;\n            }\n\n            @keyframes radar-dish-sweep {\n              0%, 100% {\n                transform: rotate(-22deg);\n              }\n              50% {\n                transform: rotate(22deg);\n              }\n            }\n\n            @keyframes radar-pulse-expand-1 {\n              0% {\n                transform: scale(0.2) translateY(0px);\n                opacity: 0.95;\n              }\n              75% {\n                opacity: 0.6;\n              }\n              100% {\n                transform: scale(1.6) translateY(-50px);\n                opacity: 0;\n              }\n            }\n\n            @keyframes radar-pulse-expand-2 {\n              0% {\n                transform: scale(0.2) translateY(0px);\n                opacity: 0.95;\n              }\n              75% {\n                opacity: 0.55;\n              }\n              100% {\n                transform: scale(1.6) translateY(-50px);\n                opacity: 0;\n              }\n            }\n\n            @keyframes radar-pulse-expand-3 {\n              0% {\n                transform: scale(0.2) translateY(0px);\n                opacity: 0.95;\n              }\n              75% {\n                opacity: 0.5;\n              }\n              100% {\n                transform: scale(1.6) translateY(-50px);\n                opacity: 0;\n              }\n            }\n\n            @keyframes badge-float-subtle-1 {\n              0%, 100% { transform: translateY(0px); }\n              50% { transform: translateY(-4px); }\n            }\n\n            @keyframes badge-float-subtle-2 {\n              0%, 100% { transform: translateY(0px); }\n              50% { transform: translateY(-5px); }\n            }\n\n            @keyframes badge-float-subtle-3 {\n              0%, 100% { transform: translateY(0px); }\n              50% { transform: translateY(-4px); }\n            }\n\n            @keyframes hud-float-subtle {\n              0%, 100% { transform: translateY(0px); }\n              50% { transform: translateY(-3px); }\n            }\n\n            @keyframes beam-shimmer {\n              0%, 100% { opacity: 0.45; }\n              50% { opacity: 0.7; }\n            }\n\n            @keyframes diode-pulse {\n              0%, 100% { transform: scale(1); opacity: 1; }\n              50% { transform: scale(1.25); opacity: 0.75; }\n            }\n\n            .dish-sweep-anim {\n              animation: radar-dish-sweep 6.8s ease-in-out infinite;\n              transform-origin: 380px 305px;\n              will-change: transform;\n            }\n\n            .radar-pulse-wave-1 {\n              animation: radar-pulse-expand-1 3.2s cubic-bezier(0.15, 0.6, 0.4, 1) infinite;\n              transform-origin: 380px 226px;\n              will-change: transform, opacity;\n            }\n\n            .radar-pulse-wave-2 {\n              animation: radar-pulse-expand-2 3.2s cubic-bezier(0.15, 0.6, 0.4, 1) -1.06s infinite;\n              transform-origin: 380px 226px;\n              will-change: transform, opacity;\n            }\n\n            .radar-pulse-wave-3 {\n              animation: radar-pulse-expand-3 3.2s cubic-bezier(0.15, 0.6, 0.4, 1) -2.13s infinite;\n              transform-origin: 380px 226px;\n              will-change: transform, opacity;\n            }\n\n            .target-badge-anim-1 {\n              animation: badge-float-subtle-1 4.0s ease-in-out infinite;\n              will-change: transform;\n            }\n\n            .target-badge-anim-2 {\n              animation: badge-float-subtle-2 4.4s ease-in-out -1.4s infinite;\n              will-change: transform;\n            }\n\n            .target-badge-anim-3 {\n              animation: badge-float-subtle-3 3.8s ease-in-out -2.6s infinite;\n              will-change: transform;\n            }\n\n            .hud-float-anim {\n              animation: hud-float-subtle 4.2s ease-in-out infinite;\n              will-change: transform;\n            }\n\n            .beam-glow {\n              animation: beam-shimmer 2.2s ease-in-out infinite;\n            }\n\n            .diode-beacon {\n              animation: diode-pulse 1.6s ease-in-out infinite;\n              transform-origin: 380px 223px;\n            }\n\n            @media (prefers-reduced-motion: reduce) {\n              .dish-sweep-anim,\n              .radar-pulse-wave-1,\n              .radar-pulse-wave-2,\n              .radar-pulse-wave-3,\n              .target-badge-anim-1,\n              .target-badge-anim-2,\n              .target-badge-anim-3,\n              .hud-float-anim,\n              .beam-glow,\n              .diode-beacon {\n                animation: none !important;\n              }\n            }\n"
						}
					</style>
				</defs>

				<g id="plinth-fluted-feet">
					<g transform="translate(172, 424)">
						<ellipse
							cx="0"
							cy="0"
							rx="14"
							ry="6"
							fill="#383a4e"
							stroke="#18181b"
							strokeWidth="1.6"
						/>
						<path
							d="M -14,0 L -14,14 C -14,18 14,18 14,14 L 14,0 Z"
							fill="#383a4e"
							stroke="#18181b"
							strokeWidth="1.6"
							strokeLinejoin="round"
						/>

						<g stroke="#18181b" strokeWidth="1.3">
							<line x1="-10" y1="2" x2="-10" y2="15.5" />
							<line x1="-6" y1="3.5" x2="-6" y2="17" />
							<line x1="-2" y1="4.2" x2="-2" y2="17.8" />
							<line x1="2" y1="4.2" x2="2" y2="17.8" />
							<line x1="6" y1="3.5" x2="6" y2="17" />
							<line x1="10" y1="2" x2="10" y2="15.5" />
						</g>

						<path d="M -4,4 L 4,4 L 4,17.5 L -4,17.5 Z" fill="#44465a" opacity="0.4" />

						<ellipse
							cx="0"
							cy="14"
							rx="14"
							ry="5.5"
							fill="none"
							stroke="#18181b"
							strokeWidth="1.6"
						/>
						<ellipse cx="0" cy="16" rx="11" ry="4" fill="#18181b" />
					</g>

					<g transform="translate(588, 424)">
						<ellipse
							cx="0"
							cy="0"
							rx="14"
							ry="6"
							fill="#383a4e"
							stroke="#18181b"
							strokeWidth="1.6"
						/>
						<path
							d="M -14,0 L -14,14 C -14,18 14,18 14,14 L 14,0 Z"
							fill="#383a4e"
							stroke="#18181b"
							strokeWidth="1.6"
							strokeLinejoin="round"
						/>

						<g stroke="#18181b" strokeWidth="1.3">
							<line x1="-10" y1="2" x2="-10" y2="15.5" />
							<line x1="-6" y1="3.5" x2="-6" y2="17" />
							<line x1="-2" y1="4.2" x2="-2" y2="17.8" />
							<line x1="2" y1="4.2" x2="2" y2="17.8" />
							<line x1="6" y1="3.5" x2="6" y2="17" />
							<line x1="10" y1="2" x2="10" y2="15.5" />
						</g>

						<path d="M -4,4 L 4,4 L 4,17.5 L -4,17.5 Z" fill="#44465a" opacity="0.4" />

						<ellipse
							cx="0"
							cy="14"
							rx="14"
							ry="5.5"
							fill="none"
							stroke="#18181b"
							strokeWidth="1.6"
						/>
						<ellipse cx="0" cy="16" rx="11" ry="4" fill="#18181b" />
					</g>

					<g transform="translate(380, 480)">
						<ellipse
							cx="0"
							cy="0"
							rx="16"
							ry="6.5"
							fill="#383a4e"
							stroke="#18181b"
							strokeWidth="1.6"
						/>
						<path
							d="M -16,0 L -16,14 C -16,19 16,19 16,14 L 16,0 Z"
							fill="#383a4e"
							stroke="#18181b"
							strokeWidth="1.6"
							strokeLinejoin="round"
						/>

						<g stroke="#18181b" strokeWidth="1.4">
							<line x1="-12" y1="2.5" x2="-12" y2="16" />
							<line x1="-7" y1="4.5" x2="-7" y2="18" />
							<line x1="-2.5" y1="5.5" x2="-2.5" y2="19" />
							<line x1="2.5" y1="5.5" x2="2.5" y2="19" />
							<line x1="7" y1="4.5" x2="7" y2="18" />
							<line x1="12" y1="2.5" x2="12" y2="16" />
						</g>

						<path d="M -5,5 L 5,5 L 5,19 L -5,19 Z" fill="#44465a" opacity="0.45" />

						<ellipse cx="0" cy="14" rx="16" ry="6" fill="none" stroke="#18181b" strokeWidth="1.6" />
						<ellipse cx="0" cy="16" rx="13" ry="4.5" fill="#18181b" />
					</g>
				</g>

				<g id="plinth-lower-foundation">
					<path
						d="M 158,430 C 158,458 254,478 380,478 C 506,478 602,458 602,430 L 602,444 C 602,472 506,492 380,492 C 254,492 158,472 158,444 Z"
						fill="#09090b"
						stroke="#18181b"
						strokeWidth="1.8"
						strokeLinejoin="round"
					/>

					<path
						d="M 158,428 C 158,402 254,378 380,378 C 506,378 602,402 602,428 C 602,454 506,476 380,476 C 254,476 158,454 158,428 Z"
						fill="#1e2230"
						stroke="#18181b"
						strokeWidth="1.8"
					/>
				</g>

				<g id="plinth-console-body">
					<path
						d="M 166,422 C 166,446 256,469 380,469 C 504,469 594,446 594,422 L 594,438 C 594,462 504,485 380,485 C 256,485 166,462 166,438 Z"
						fill="#b8a88a"
						stroke="#18181b"
						strokeWidth="1.8"
						strokeLinejoin="round"
					/>

					<path
						d="M 240,460 C 310,472 450,472 520,460 L 520,476 C 450,488 310,488 240,476 Z"
						fill="#ded2bb"
						stroke="#18181b"
						strokeWidth="1.8"
						strokeLinejoin="round"
					/>

					<path
						d="M 166,420 C 166,394 260,373 380,373 C 500,373 594,394 594,420 C 594,446 500,467 380,467 C 260,467 166,446 166,420 Z"
						fill="#ded2bb"
						stroke="#18181b"
						strokeWidth="1.8"
						strokeLinejoin="round"
					/>

					<g transform="translate(340, 463.25)">
						<rect x="0" y="0" width="80" height="6.5" rx="3.25" fill="#18181b" />

						<circle cx="26" cy="3.25" r="2.0" fill="#86efac" />
						<circle cx="40" cy="3.25" r="2.0" fill="#38bdf8" />
						<circle cx="54" cy="3.25" r="2.0" fill="#fde047" />
					</g>
				</g>

				<g id="plinth-top-deck">
					<path
						d="M 176,418 C 176,396 268,377 380,377 C 492,377 584,396 584,418 C 584,440 492,459 380,459 C 268,459 176,440 176,418 Z"
						fill="#9bbfa8"
						stroke="#18181b"
						strokeWidth="1.8"
						strokeLinejoin="round"
					/>

					<path
						d="M 186,418 C 186,399 274,382 380,382 C 486,382 574,399 574,418 C 574,437 486,454 380,454 C 274,454 186,437 186,418 Z"
						fill="none"
						stroke="#18181b"
						strokeWidth="1.1"
						opacity="0.30"
					/>
				</g>

				<g id="turntable-well">
					<ellipse cx="380" cy="421" rx="124" ry="35" fill="#18181b" opacity="0.22" />

					<ellipse
						cx="380"
						cy="419"
						rx="120"
						ry="33"
						fill="#ede6d8"
						stroke="#18181b"
						strokeWidth="1.6"
					/>

					<ellipse
						cx="380"
						cy="418"
						rx="108"
						ry="29"
						fill="#1e2230"
						stroke="#18181b"
						strokeWidth="1.6"
					/>

					<g stroke="#38bdf8" strokeWidth="1.2" opacity="0.65">
						<line x1="276" y1="418" x2="284" y2="418" />
						<line x1="484" y1="418" x2="476" y2="418" />
						<line x1="380" y1="391" x2="380" y2="397" />
						<line x1="380" y1="445" x2="380" y2="439" />
						<line x1="306" y1="400" x2="312" y2="403" />
						<line x1="454" y1="400" x2="448" y2="403" />
						<line x1="306" y1="436" x2="312" y2="433" />
						<line x1="454" y1="436" x2="448" y2="433" />
					</g>
				</g>

				<g id="turntable-hub">
					<path
						d="M 314,408 C 314,426 446,426 446,408 L 446,416 C 446,434 314,434 314,416 Z"
						fill="#111827"
						stroke="#18181b"
						strokeWidth="1.8"
					/>

					<g stroke="#38bdf8" strokeWidth="1.2" opacity="0.75">
						<line x1="336" y1="421" x2="336" y2="414" />
						<line x1="354" y1="423" x2="354" y2="416" />
						<line x1="372" y1="424" x2="372" y2="417" />
						<line x1="390" y1="424" x2="390" y2="417" />
						<line x1="408" y1="423" x2="408" y2="416" />
						<line x1="426" y1="421" x2="426" y2="414" />
					</g>

					<ellipse
						cx="380"
						cy="408"
						rx="66"
						ry="18"
						fill="#383a4e"
						stroke="#18181b"
						strokeWidth="1.8"
					/>

					<ellipse
						cx="380"
						cy="408"
						rx="54"
						ry="14.5"
						fill="#1e293b"
						stroke="#18181b"
						strokeWidth="1.6"
					/>
					<ellipse
						cx="380"
						cy="407"
						rx="44"
						ry="11.5"
						fill="#334155"
						stroke="#18181b"
						strokeWidth="1.2"
					/>

					<circle cx="338" cy="408" r="1.6" fill="#fde047" stroke="#18181b" strokeWidth="0.8" />
					<circle cx="352" cy="415" r="1.6" fill="#fde047" stroke="#18181b" strokeWidth="0.8" />
					<circle cx="408" cy="415" r="1.6" fill="#fde047" stroke="#18181b" strokeWidth="0.8" />
					<circle cx="422" cy="408" r="1.6" fill="#fde047" stroke="#18181b" strokeWidth="0.8" />
					<circle cx="380" cy="407" r="4.5" fill="#18181b" />
				</g>

				<g id="gimbal-assembly">
					<path
						d="M 322,406 C 322,419 438,419 438,406 L 438,413 C 438,426 322,426 322,413 Z"
						fill="#1e293b"
						stroke="#18181b"
						strokeWidth="1.8"
						strokeLinejoin="round"
					/>
					<path
						d="M 322,405 C 322,417 438,417 438,405 L 438,409 C 438,421 322,421 322,409 Z"
						fill="#475569"
						stroke="#18181b"
						strokeWidth="1.4"
						strokeLinejoin="round"
					/>

					<polygon
						points="344,365 368,407 334,407 334,365"
						fill="#334155"
						stroke="#18181b"
						strokeWidth="1.6"
						strokeLinejoin="round"
					/>
					<polygon
						points="344,365 368,407 362,407 340,365"
						fill="#64748b"
						stroke="#18181b"
						strokeWidth="1.2"
						strokeLinejoin="round"
					/>

					<polygon
						points="416,365 392,407 426,407 426,365"
						fill="#334155"
						stroke="#18181b"
						strokeWidth="1.6"
						strokeLinejoin="round"
					/>
					<polygon
						points="416,365 392,407 398,407 420,365"
						fill="#64748b"
						stroke="#18181b"
						strokeWidth="1.2"
						strokeLinejoin="round"
					/>

					<g id="central-pitch-ram">
						<rect
							x="372"
							y="396"
							width="16"
							height="12"
							rx="2"
							fill="#0f172a"
							stroke="#18181b"
							strokeWidth="1.4"
						/>

						<rect
							x="374"
							y="340"
							width="12"
							height="58"
							rx="3"
							fill="#1e293b"
							stroke="#18181b"
							strokeWidth="1.6"
						/>

						<rect
							x="377"
							y="312"
							width="6"
							height="32"
							rx="1.5"
							fill="#38bdf8"
							stroke="#18181b"
							strokeWidth="1.2"
						/>
					</g>

					<g id="left-yoke-stanchion">
						<path
							d="M 314,407 L 316,305 L 326,295 L 342,295 L 348,407 Z"
							fill="#1e293b"
							stroke="#18181b"
							strokeWidth="1.8"
							strokeLinejoin="round"
						/>

						<path
							d="M 322,407 L 324,302 L 344,302 L 348,407 Z"
							fill="#475569"
							stroke="#18181b"
							strokeWidth="1.8"
							strokeLinejoin="round"
						/>
						<path
							d="M 326,405 L 328,305 L 342,305 L 344,405 Z"
							fill="#64748b"
							stroke="#18181b"
							strokeWidth="1.2"
							strokeLinejoin="round"
						/>

						<rect
							x="331"
							y="326"
							width="6"
							height="48"
							rx="3"
							fill="#0f172a"
							stroke="#18181b"
							strokeWidth="1"
						/>

						<rect
							x="304"
							y="295"
							width="16"
							height="20"
							rx="3.5"
							fill="#0f172a"
							stroke="#18181b"
							strokeWidth="1.5"
						/>
						<line x1="304" y1="301" x2="320" y2="301" stroke="#38bdf8" strokeWidth="1.1" />
						<line x1="304" y1="305" x2="320" y2="305" stroke="#38bdf8" strokeWidth="1.1" />
						<line x1="304" y1="309" x2="320" y2="309" stroke="#38bdf8" strokeWidth="1.1" />

						<circle cx="332" cy="305" r="14" fill="#1e293b" stroke="#18181b" strokeWidth="1.8" />
						<circle cx="332" cy="305" r="9" fill="#fde047" stroke="#18181b" strokeWidth="1.3" />
						<circle cx="332" cy="305" r="4" fill="#18181b" />
					</g>

					<g id="right-yoke-stanchion">
						<path
							d="M 446,407 L 444,305 L 434,295 L 418,295 L 412,407 Z"
							fill="#1e293b"
							stroke="#18181b"
							strokeWidth="1.8"
							strokeLinejoin="round"
						/>

						<path
							d="M 438,407 L 436,302 L 416,302 L 412,407 Z"
							fill="#475569"
							stroke="#18181b"
							strokeWidth="1.8"
							strokeLinejoin="round"
						/>
						<path
							d="M 434,405 L 432,305 L 418,305 L 416,405 Z"
							fill="#64748b"
							stroke="#18181b"
							strokeWidth="1.2"
							strokeLinejoin="round"
						/>

						<rect
							x="423"
							y="326"
							width="6"
							height="48"
							rx="3"
							fill="#0f172a"
							stroke="#18181b"
							strokeWidth="1"
						/>

						<circle cx="428" cy="305" r="14" fill="#1e293b" stroke="#18181b" strokeWidth="1.8" />
						<circle cx="428" cy="305" r="9" fill="#fde047" stroke="#18181b" strokeWidth="1.3" />
						<circle cx="428" cy="305" r="4" fill="#18181b" />
					</g>

					<line
						x1="332"
						y1="305"
						x2="428"
						y2="305"
						stroke="#18181b"
						strokeWidth="6.5"
						strokeLinecap="round"
					/>
					<line
						x1="332"
						y1="305"
						x2="428"
						y2="305"
						stroke="#94a3b8"
						strokeWidth="2.8"
						strokeLinecap="round"
					/>

					<path
						d="M 380,305 C 358,342 360,378 380,406"
						fill="none"
						stroke="#18181b"
						strokeWidth="4.5"
						strokeLinecap="round"
					/>
					<path
						d="M 380,305 C 358,342 360,378 380,406"
						fill="none"
						stroke="#38bdf8"
						strokeWidth="1.6"
						strokeLinecap="round"
					/>
				</g>

				<g id="radar-head" ref={dishHeadRef} className="dish-sweep-anim">
					<g id="dish-rear-structure">
						<circle cx="380" cy="305" r="16" fill="#18181b" />
						<circle cx="380" cy="305" r="12" fill="#334155" stroke="#18181b" strokeWidth="1.4" />
						<circle cx="380" cy="305" r="5" fill="#fde047" />

						<line
							x1="380"
							y1="305"
							x2="280"
							y2="262"
							stroke="#18181b"
							strokeWidth="3.2"
							strokeLinecap="round"
						/>
						<line
							x1="380"
							y1="305"
							x2="480"
							y2="262"
							stroke="#18181b"
							strokeWidth="3.2"
							strokeLinecap="round"
						/>
						<line
							x1="380"
							y1="305"
							x2="380"
							y2="198"
							stroke="#18181b"
							strokeWidth="3.2"
							strokeLinecap="round"
						/>
						<line
							x1="380"
							y1="305"
							x2="380"
							y2="334"
							stroke="#18181b"
							strokeWidth="3.2"
							strokeLinecap="round"
						/>
					</g>

					<g id="dish-reflector-face">
						<path
							d="M 262,262 C 262,336 498,336 498,262 C 498,350 262,350 262,262 Z"
							fill="url(#radar-dish-back-grad)"
							stroke="#18181b"
							strokeWidth="2"
							strokeLinejoin="round"
						/>

						<ellipse cx="384" cy="266" rx="118" ry="68" fill="#18181b" />

						<ellipse
							cx="380"
							cy="262"
							rx="118"
							ry="68"
							fill="#e2e8f0"
							stroke="#18181b"
							strokeWidth="2.2"
						/>

						<ellipse
							cx="380"
							cy="262"
							rx="110"
							ry="60"
							fill="url(#radar-dish-interior-grad)"
							stroke="#18181b"
							strokeWidth="1.8"
						/>

						<ellipse
							cx="380"
							cy="262"
							rx="82"
							ry="44"
							fill="none"
							stroke="#18181b"
							strokeWidth="1.2"
							strokeDasharray="4 4"
							opacity="0.45"
						/>
						<ellipse
							cx="380"
							cy="262"
							rx="55"
							ry="30"
							fill="none"
							stroke="#18181b"
							strokeWidth="1.2"
							opacity="0.4"
						/>
						<ellipse
							cx="380"
							cy="262"
							rx="28"
							ry="15"
							fill="none"
							stroke="#18181b"
							strokeWidth="1.2"
							opacity="0.4"
						/>

						<line
							x1="280"
							y1="262"
							x2="480"
							y2="262"
							stroke="#18181b"
							strokeWidth="1.1"
							strokeDasharray="2 4"
							opacity="0.35"
						/>
						<line
							x1="380"
							y1="206"
							x2="380"
							y2="318"
							stroke="#18181b"
							strokeWidth="1.1"
							strokeDasharray="2 4"
							opacity="0.35"
						/>

						<ellipse
							cx="380"
							cy="262"
							rx="13"
							ry="7.5"
							fill="#0f172a"
							stroke="#18181b"
							strokeWidth="1.4"
						/>
						<ellipse cx="380" cy="262" rx="6.5" ry="3.8" fill="#38bdf8" />
					</g>

					<g id="feed-horn-tripod">
						<line
							x1="380"
							y1="204"
							x2="380"
							y2="228"
							stroke="#18181b"
							strokeWidth="2.4"
							strokeLinecap="round"
						/>
						<line
							x1="298"
							y1="294"
							x2="380"
							y2="228"
							stroke="#18181b"
							strokeWidth="2.4"
							strokeLinecap="round"
						/>
						<line
							x1="462"
							y1="294"
							x2="380"
							y2="228"
							stroke="#18181b"
							strokeWidth="2.4"
							strokeLinecap="round"
						/>

						<path
							d="M 380,262 Q 358,244 380,228"
							fill="none"
							stroke="#fde047"
							strokeWidth="2.4"
							strokeLinecap="round"
						/>

						<ellipse
							cx="380"
							cy="228"
							rx="12"
							ry="7"
							fill="#18181b"
							stroke="#18181b"
							strokeWidth="1.3"
						/>
						<ellipse
							cx="380"
							cy="226"
							rx="10.5"
							ry="6"
							fill="#0284c7"
							stroke="#18181b"
							strokeWidth="1.1"
						/>
						<ellipse cx="380" cy="226" rx="6.5" ry="3.5" fill="#bae6fd" />

						<g className="diode-beacon">
							<circle cx="380" cy="223" r="3.6" fill="#ffffff" filter="url(#radar-emitter-glow)" />
							<circle cx="380" cy="223" r="2" fill="#ffffff" />
						</g>
					</g>

					<g id="radar-pulse-emissions" style={{ pointerEvents: "none" }}>
						<ellipse
							className="radar-pulse-wave-1"
							cx="380"
							cy="226"
							rx="40"
							ry="19"
							fill="none"
							stroke="#86efac"
							strokeWidth="2.4"
						/>

						<ellipse
							className="radar-pulse-wave-2"
							cx="380"
							cy="226"
							rx="58"
							ry="27"
							fill="none"
							stroke="#38bdf8"
							strokeWidth="2.0"
						/>

						<ellipse
							className="radar-pulse-wave-3"
							cx="380"
							cy="226"
							rx="76"
							ry="35"
							fill="none"
							stroke="#c084fc"
							strokeWidth="1.6"
						/>
					</g>

					<g id="scanner-beam-cone" className="beam-glow" style={{ pointerEvents: "none" }}>
						<polygon points="380,226 230,50 530,50" fill="url(#radar-scanner-beam-grad)" />
					</g>
				</g>

				<g transform="translate(65, 80)">
					<g className="target-badge-anim-1">
						<rect x="3" y="3" width="160" height="58" rx="10" fill="#18181b" />

						<g clipPath="url(#radar-target-1-clip)">
							<rect x="0" y="0" width="160" height="58" fill="#ffffff" />

							<rect x="0" y="0" width="160" height="22" fill="#bae6fd" />

							<line x1="0" y1="22" x2="160" y2="22" stroke="#18181b" strokeWidth="1.6" />

							<circle cx="14" cy="11" r="3" fill="#0284c7" />
							<text
								x="24"
								y="14.5"
								fontFamily="monospace"
								fontSize="8"
								fontWeight="900"
								fill="#0369a1"
								letterSpacing="0.5"
							>
								01 // TOOLING
							</text>

							<rect
								x="122"
								y="5"
								width="30"
								height="12"
								rx="3"
								fill="#ffffff"
								stroke="#18181b"
								strokeWidth="1"
							/>
							<text
								x="137"
								y="13.5"
								fontFamily="monospace"
								fontSize="6.5"
								fontWeight="900"
								fill="#0284c7"
								textAnchor="middle"
							>
								LOCK
							</text>

							<text
								x="12"
								y="37"
								fontFamily="monospace"
								fontSize="10.5"
								fontWeight="900"
								fill="#18181b"
							>
								TURBOPACK / VITE
							</text>
							<text
								x="12"
								y="50"
								fontFamily="monospace"
								fontSize="7.5"
								fontWeight="700"
								fill="#64748b"
								letterSpacing="0.3"
							>
								SUB-MILLISECOND HMR
							</text>
						</g>

						<rect
							x="0"
							y="0"
							width="160"
							height="58"
							rx="10"
							fill="none"
							stroke="#18181b"
							strokeWidth="1.8"
						/>

						<polygon points="80,58 85,64 75,64" fill="#18181b" />
						<circle cx="80" cy="67" r="2.2" fill="#0284c7" />
					</g>
				</g>

				<g transform="translate(300, 26)">
					<g className="target-badge-anim-2">
						<rect x="3" y="3" width="160" height="58" rx="10" fill="#18181b" />

						<g clipPath="url(#radar-target-2-clip)">
							<rect x="0" y="0" width="160" height="58" fill="#ffffff" />

							<rect x="0" y="0" width="160" height="22" fill="#86efac" />

							<line x1="0" y1="22" x2="160" y2="22" stroke="#18181b" strokeWidth="1.6" />

							<circle cx="14" cy="11" r="3" fill="#15803d" />
							<text
								x="24"
								y="14.5"
								fontFamily="monospace"
								fontSize="8"
								fontWeight="900"
								fill="#166534"
								letterSpacing="0.5"
							>
								02 // STANDARDS
							</text>

							<rect
								x="122"
								y="5"
								width="30"
								height="12"
								rx="3"
								fill="#ffffff"
								stroke="#18181b"
								strokeWidth="1"
							/>
							<text
								x="137"
								y="13.5"
								fontFamily="monospace"
								fontSize="6.5"
								fontWeight="900"
								fill="#15803d"
								textAnchor="middle"
							>
								LOCK
							</text>

							<text
								x="12"
								y="37"
								fontFamily="monospace"
								fontSize="10.5"
								fontWeight="900"
								fill="#18181b"
							>
								VIEW TRANSITIONS
							</text>
							<text
								x="12"
								y="50"
								fontFamily="monospace"
								fontSize="7.5"
								fontWeight="700"
								fill="#64748b"
								letterSpacing="0.3"
							>
								W3C SPEC // MODERN CSS
							</text>
						</g>

						<rect
							x="0"
							y="0"
							width="160"
							height="58"
							rx="10"
							fill="none"
							stroke="#18181b"
							strokeWidth="1.8"
						/>

						<polygon points="80,58 85,64 75,64" fill="#18181b" />
						<circle cx="80" cy="67" r="2.2" fill="#15803d" />
					</g>
				</g>

				<g transform="translate(535, 80)">
					<g className="target-badge-anim-3">
						<rect x="3" y="3" width="160" height="58" rx="10" fill="#18181b" />

						<g clipPath="url(#radar-target-3-clip)">
							<rect x="0" y="0" width="160" height="58" fill="#ffffff" />

							<rect x="0" y="0" width="160" height="22" fill="#ebe6ff" />

							<line x1="0" y1="22" x2="160" y2="22" stroke="#18181b" strokeWidth="1.6" />

							<circle cx="14" cy="11" r="3" fill="#7c3aed" />
							<text
								x="24"
								y="14.5"
								fontFamily="monospace"
								fontSize="8"
								fontWeight="900"
								fill="#6b21a8"
								letterSpacing="0.5"
							>
								03 // EMERGING
							</text>

							<rect
								x="122"
								y="5"
								width="30"
								height="12"
								rx="3"
								fill="#ffffff"
								stroke="#18181b"
								strokeWidth="1"
							/>
							<text
								x="137"
								y="13.5"
								fontFamily="monospace"
								fontSize="6.5"
								fontWeight="900"
								fill="#7c3aed"
								textAnchor="middle"
							>
								LOCK
							</text>

							<text
								x="12"
								y="37"
								fontFamily="monospace"
								fontSize="10.5"
								fontWeight="900"
								fill="#18181b"
							>
								AI AGENTS & RUNTIMES
							</text>
							<text
								x="12"
								y="50"
								fontFamily="monospace"
								fontSize="7.5"
								fontWeight="700"
								fill="#64748b"
								letterSpacing="0.3"
							>
								LOCAL-FIRST PATTERNS
							</text>
						</g>

						<rect
							x="0"
							y="0"
							width="160"
							height="58"
							rx="10"
							fill="none"
							stroke="#18181b"
							strokeWidth="1.8"
						/>

						<polygon points="80,58 85,64 75,64" fill="#18181b" />
						<circle cx="80" cy="67" r="2.2" fill="#7c3aed" />
					</g>
				</g>

				<g transform="translate(42, 332)">
					<g className="hud-float-anim">
						<rect x="3" y="3" width="168" height="118" rx="10" fill="#18181b" />

						<g clipPath="url(#radar-hud-clip)">
							<rect x="0" y="0" width="168" height="118" fill="#ffffff" />

							<rect x="0" y="0" width="168" height="22" fill="#18181b" />
							<circle cx="14" cy="11" r="3" fill="#22c55e" />
							<text
								x="24"
								y="14.5"
								fontFamily="monospace"
								fontSize="7.8"
								fontWeight="900"
								fill="#ffffff"
								letterSpacing="0.5"
							>
								TREND RADAR // v4.0
							</text>

							<g transform="translate(12, 38)">
								<text
									x="0"
									y="0"
									fontFamily="monospace"
									fontSize="7.0"
									fontWeight="bold"
									fill="#71717a"
								>
									RADAR SWEEP
								</text>
								<text
									id="hud-azimuth-readout"
									x="144"
									y="0"
									fontFamily="monospace"
									fontSize="7.5"
									fontWeight="900"
									fill="#0284c7"
									textAnchor="end"
								>
									AZIMUTH ±22°
								</text>
							</g>

							<g transform="translate(12, 58)">
								<text
									x="0"
									y="0"
									fontFamily="monospace"
									fontSize="7.0"
									fontWeight="bold"
									fill="#71717a"
								>
									SIGNAL HEALTH
								</text>

								<g id="signal-bars" transform="translate(114, -9)">
									<rect x="0" y="5" width="4" height="6" rx="1" fill="#22c55e" />
									<rect x="6.5" y="3" width="4" height="8" rx="1" fill="#22c55e" />
									<rect x="13" y="1" width="4" height="10" rx="1" fill="#22c55e" />
									<rect x="19.5" y="-1" width="4" height="12" rx="1" fill="#22c55e" />
									<rect x="26" y="-3" width="4" height="14" rx="1" fill="#38bdf8" />
								</g>
							</g>

							<g transform="translate(12, 78)">
								<text
									x="0"
									y="0"
									fontFamily="monospace"
									fontSize="7.0"
									fontWeight="bold"
									fill="#71717a"
								>
									ACTIVE FOCUS
								</text>
								<text
									id="hud-focus-readout"
									ref={hudFocusRef}
									x="144"
									y="0"
									fontFamily="monospace"
									fontSize="7.0"
									fontWeight="900"
									fill="#0284c7"
									textAnchor="end"
								>
									MODERN TOOLING
								</text>
							</g>

							<g transform="translate(10, 92)">
								<rect
									x="0"
									y="0"
									width="148"
									height="18"
									rx="4.5"
									fill="#f4f4f5"
									stroke="#18181b"
									strokeWidth="1"
								/>
								<circle cx="10" cy="9" r="2.5" fill="#22c55e" />
								<text
									x="20"
									y="12.5"
									fontFamily="monospace"
									fontSize="6.8"
									fontWeight="900"
									fill="#18181b"
									letterSpacing="0.3"
								>
									HORIZON RADAR // ACTIVE
								</text>
							</g>
						</g>

						<rect
							x="0"
							y="0"
							width="168"
							height="118"
							rx="10"
							fill="none"
							stroke="#18181b"
							strokeWidth="1.8"
						/>
					</g>
				</g>
			</svg>
		</div>
	);
}
