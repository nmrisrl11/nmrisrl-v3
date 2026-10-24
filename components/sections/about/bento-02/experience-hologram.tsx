"use client";

import React, { useEffect, useRef, useState, useSyncExternalStore } from "react";

// SSR-Safe dynamic year calculation (Zero hydration mismatch, zero React 19 purity warnings)
const emptySubscribe = () => () => {};
const getClientYear = () => new Date().getFullYear();
const getServerYear = () => 2026;

function useCurrentYear() {
	return useSyncExternalStore(emptySubscribe, getClientYear, getServerYear);
}

const EXPERIENCES = [
	"DESIGNER'S INTUITION",
	"MODULAR ARCHITECTURE",
	"TACTILE INTERACTIONS",
	"DESIGN SYSTEMS CRAFT",
	"ACCESSIBLE & SCALABLE",
	"CONTINUOUS SHIPMENT",
];

export function ExperienceHologram() {
	const currentYear = useCurrentYear();
	const elapsedYears = Math.max(1, currentYear - 2019);

	const containerRef = useRef<HTMLDivElement>(null);
	const tickerRef = useRef<SVGTextElement>(null);
	const [isVisible, setIsVisible] = useState(false);

	// Viewport Observer: Pause CSS animations and intervals when off-screen
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

	// Low-frequency text ticker: only cycles when visible in viewport
	useEffect(() => {
		if (!isVisible) return;

		let expIndex = 0;
		const ticker = tickerRef.current;
		const interval = setInterval(() => {
			expIndex = (expIndex + 1) % EXPERIENCES.length;
			if (ticker) {
				ticker.style.opacity = "0";
				setTimeout(() => {
					ticker.textContent = EXPERIENCES[expIndex];
					ticker.style.opacity = "1";
				}, 140);
			}
		}, 2600);

		return () => clearInterval(interval);
	}, [isVisible]);

	return (
		<div
			ref={containerRef}
			className="relative flex w-full items-center justify-center overflow-visible py-1 select-none"
		>
			<svg
				viewBox="120 70 520 480"
				className={`xs:max-w-[240px] h-auto w-full max-w-[220px] overflow-visible drop-shadow-sm sm:max-w-[265px] md:max-w-[285px] lg:max-w-[290px] ${
					!isVisible ? "hologram-paused" : ""
				}`}
				role="img"
				aria-label="Tactile Hologram Emitter Experience Model"
			>
				<defs>
					<style>{`
            .hologram-paused * {
              animation-play-state: paused !important;
            }

            @keyframes holo-float {
              0%, 100% {
                transform: translate3d(380px, 186px, 0);
              }
              50% {
                transform: translate3d(380px, 194px, 0);
              }
            }
            .holo-floating {
              animation: holo-float 4.2s ease-in-out infinite;
              will-change: transform;
            }

            @keyframes ray-stream {
              from {
                stroke-dashoffset: 0;
              }
              to {
                stroke-dashoffset: -24;
              }
            }
            .laser-ray-stream {
              animation: ray-stream 0.6s linear infinite;
            }

            /* Front Diode Laser Ray Sweep */
            @keyframes sweep-front-diode {
              0%, 100% {
                transform: rotate(-10deg);
              }
              50% {
                transform: rotate(10deg);
              }
            }
            .ray-sweep-front {
              animation: sweep-front-diode 2.24s ease-in-out infinite;
              will-change: transform;
            }

            /* Left Diode Laser Ray Vertical Sweep (Scans up and down left HUD border) */
            @keyframes sweep-left-line {
              0%, 100% {
                transform: scaleY(1.196);
              }
              50% {
                transform: scaleY(0.804);
              }
            }
            @keyframes sweep-left-dot {
              0%, 100% {
                transform: translate3d(0, -32px, 0);
              }
              50% {
                transform: translate3d(0, 32px, 0);
              }
            }
            .ray-scale-left {
              transform-origin: 0px 0px;
              animation: sweep-left-line 2.62s ease-in-out infinite;
              will-change: transform;
            }
            .ray-dot-left {
              animation: sweep-left-dot 2.62s ease-in-out infinite;
              will-change: transform;
            }

            /* Right Diode Laser Ray Vertical Sweep (Scans up and down right HUD border) */
            @keyframes sweep-right-line {
              0%, 100% {
                transform: scaleY(0.804);
              }
              50% {
                transform: scaleY(1.196);
              }
            }
            @keyframes sweep-right-dot {
              0%, 100% {
                transform: translate3d(0, 32px, 0);
              }
              50% {
                transform: translate3d(0, -32px, 0);
              }
            }
            .ray-scale-right {
              transform-origin: 0px 0px;
              animation: sweep-right-line 2.62s ease-in-out infinite;
              will-change: transform;
            }
            .ray-dot-right {
              animation: sweep-right-dot 2.62s ease-in-out infinite;
              will-change: transform;
            }

            /* Volumetric Light Beam Flicker */
            @keyframes beam-flicker-anim {
              0%, 100% { opacity: 0.68; }
              50% { opacity: 0.78; }
            }
            .beam-anim {
              animation: beam-flicker-anim 1.8s ease-in-out infinite;
              will-change: opacity;
            }

            /* Ascending 3D Scan Rings */
            @keyframes holo-ring-rise {
              0% {
                transform: translateY(0);
                opacity: 0;
              }
              50% {
                opacity: 0.65;
              }
              100% {
                transform: translateY(-130px);
                opacity: 0;
              }
            }
            .ring-rise-1 {
              animation: holo-ring-rise 3.25s linear infinite;
              will-change: transform, opacity;
            }
            .ring-rise-2 {
              animation: holo-ring-rise 3.25s linear -1.08s infinite;
              will-change: transform, opacity;
            }
            .ring-rise-3 {
              animation: holo-ring-rise 3.25s linear -2.16s infinite;
              will-change: transform, opacity;
            }

            /* Sweeping Scanline on Glass Screen */
            @keyframes scanline-sweep {
              0% {
                transform: translateY(0px);
              }
              100% {
                transform: translateY(146px);
              }
            }
            .scanline-anim {
              animation: scanline-sweep 3.24s linear infinite;
              will-change: transform;
            }

            /* Telemetry Beacon Blink */
            @keyframes beacon-blink {
              0%, 48% { opacity: 1; }
              50%, 98% { opacity: 0.25; }
            }
            .beacon-blink-anim {
              animation: beacon-blink 1.05s steps(1) infinite;
            }

            .holo-glow {
              filter: drop-shadow(0 0 10px rgba(56, 189, 248, 0.35));
            }
            .ticker-fade {
              transition: opacity 0.14s ease-in-out;
            }
          `}</style>

					{/* Volumetric Laser Beam Gradient */}
					<linearGradient id="holo-beam-gradient" x1="0%" y1="100%" x2="0%" y2="0%">
						<stop offset="0%" stopColor="#38bdf8" stopOpacity="0.85" />
						<stop offset="35%" stopColor="#38bdf8" stopOpacity="0.35" />
						<stop offset="85%" stopColor="var(--color-sky, #bae6fd)" stopOpacity="0.12" />
						<stop offset="100%" stopColor="var(--color-mint, #86efac)" stopOpacity="0" />
					</linearGradient>

					{/* Laser Scanline Sweep Gradient */}
					<linearGradient id="holo-scan-strip" x1="0%" y1="0%" x2="0%" y2="100%">
						<stop offset="0%" stopColor="#38bdf8" stopOpacity="0" />
						<stop offset="50%" stopColor="#38bdf8" stopOpacity="0.38" />
						<stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
					</linearGradient>
				</defs>

				{/* 1. Exact Circular Diorama Platform + Emitter Base */}
				<g
					id="diorama-platform"
					dangerouslySetInnerHTML={{
						__html: `<ellipse cx="380.0" cy="445.2" rx="195" ry="98" fill="#18181b" opacity="0.14" filter="blur(16px)"/><path d="M395.2 356.2L388.2 358.3L388.2 346.5L395.2 344.3Z" fill="#383a4e" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M388.2 358.3L380.0 359.1L380.0 347.2L388.2 346.5Z" fill="#383a4e" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M380.0 359.1L371.8 358.3L371.8 346.5L380.0 347.2Z" fill="#383a4e" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M371.8 358.3L364.8 356.2L364.8 344.3L371.8 346.5Z" fill="#383a4e" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M364.8 356.2L360.1 352.9L360.1 341.0L364.8 344.3Z" fill="#383a4e" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M360.1 352.9L358.5 349.0L358.5 337.1L360.1 341.0Z" fill="#383a4e" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M358.5 349.0L360.1 345.1L360.1 333.2L358.5 337.1Z" fill="#383a4e" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M399.9 352.9L395.2 356.2L395.2 344.3L399.9 341.0Z" fill="#383a4e" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M395.2 344.3L388.2 346.5L380.0 347.2L371.8 346.5L364.8 344.3L360.1 341.0L358.5 337.1L360.1 333.2L364.8 330.0L371.8 327.8L380.0 327.0L388.2 327.8L395.2 330.0L399.9 333.2L401.5 337.1L399.9 341.0L395.2 344.3Z" fill="#44465a" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M593.3 449.1L586.3 451.3L586.3 439.4L593.3 437.3Z" fill="#383a4e" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M586.3 451.3L578.1 452.1L578.1 440.2L586.3 439.4Z" fill="#383a4e" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M578.1 452.1L569.8 451.3L569.8 439.4L578.1 440.2Z" fill="#383a4e" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M569.8 451.3L562.8 449.1L562.8 437.3L569.8 439.4Z" fill="#383a4e" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M562.8 449.1L558.2 445.9L558.2 434.0L562.8 437.3Z" fill="#383a4e" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M558.2 445.9L556.5 442.0L556.5 430.1L558.2 434.0Z" fill="#383a4e" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M556.5 442.0L558.2 438.1L558.2 426.2L556.5 430.1Z" fill="#383a4e" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M598.0 445.9L593.3 449.1L593.3 437.3L598.0 434.0Z" fill="#383a4e" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M593.3 437.3L586.3 439.4L578.1 440.2L569.8 439.4L562.8 437.3L558.2 434.0L556.5 430.1L558.2 426.2L562.8 422.9L569.8 420.8L578.1 420.0L586.3 420.8L593.3 422.9L598.0 426.2L599.6 430.1L598.0 434.0L593.3 437.3Z" fill="#44465a" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M197.2 449.1L190.2 451.3L190.2 439.4L197.2 437.3Z" fill="#383a4e" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M190.2 451.3L181.9 452.1L181.9 440.2L190.2 439.4Z" fill="#383a4e" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M181.9 452.1L173.7 451.3L173.7 439.4L181.9 440.2Z" fill="#383a4e" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M173.7 451.3L166.7 449.1L166.7 437.3L173.7 439.4Z" fill="#383a4e" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M166.7 449.1L162.0 445.9L162.0 434.0L166.7 437.3Z" fill="#383a4e" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M162.0 445.9L160.4 442.0L160.4 430.1L162.0 434.0Z" fill="#383a4e" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M160.4 442.0L162.0 438.1L162.0 426.2L160.4 430.1Z" fill="#383a4e" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M201.8 445.9L197.2 449.1L197.2 437.3L201.8 434.0Z" fill="#383a4e" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M197.2 437.3L190.2 439.4L181.9 440.2L173.7 439.4L166.7 437.3L162.0 434.0L160.4 430.1L162.0 426.2L166.7 422.9L173.7 420.8L181.9 420.0L190.2 420.8L197.2 422.9L201.8 426.2L203.5 430.1L201.8 434.0L197.2 437.3Z" fill="#44465a" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M395.2 542.1L388.2 544.3L388.2 532.4L395.2 530.2Z" fill="#383a4e" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M388.2 544.3L380.0 545.1L380.0 533.2L388.2 532.4Z" fill="#383a4e" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M380.0 545.1L371.8 544.3L371.8 532.4L380.0 533.2Z" fill="#383a4e" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M371.8 544.3L364.8 542.1L364.8 530.2L371.8 532.4Z" fill="#383a4e" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M364.8 542.1L360.1 538.9L360.1 527.0L364.8 530.2Z" fill="#383a4e" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M360.1 538.9L358.5 535.0L358.5 523.1L360.1 527.0Z" fill="#383a4e" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M358.5 535.0L360.1 531.1L360.1 519.2L358.5 523.1Z" fill="#383a4e" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M399.9 538.9L395.2 542.1L395.2 530.2L399.9 527.0Z" fill="#383a4e" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M395.2 530.2L388.2 532.4L380.0 533.2L371.8 532.4L364.8 530.2L360.1 527.0L358.5 523.1L360.1 519.2L364.8 515.9L371.8 513.7L380.0 513.0L388.2 513.7L395.2 515.9L399.9 519.2L401.5 523.1L399.9 527.0L395.2 530.2Z" fill="#44465a" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M524.8 498.1L500.3 507.9L500.3 486.4L524.8 476.7Z" fill="#e2dacb" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M500.3 507.9L472.9 515.7L472.9 494.3L500.3 486.4Z" fill="#e2dacb" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M472.9 515.7L443.3 521.5L443.3 500.1L472.9 494.3Z" fill="#e2dacb" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M443.3 521.5L412.0 525.0L412.0 503.6L443.3 500.1Z" fill="#e2dacb" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M412.0 525.0L380.0 526.2L380.0 504.8L412.0 503.6Z" fill="#e2dacb" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M380.0 526.2L348.0 525.0L348.0 503.6L380.0 504.8Z" fill="#e2dacb" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M348.0 525.0L316.7 521.5L316.7 500.1L348.0 503.6Z" fill="#e2dacb" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M316.7 521.5L287.1 515.7L287.1 494.3L316.7 500.1Z" fill="#e2dacb" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M287.1 515.7L259.7 507.9L259.7 486.4L287.1 494.3Z" fill="#e2dacb" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M259.7 507.9L235.2 498.1L235.2 476.7L259.7 486.4Z" fill="#e2dacb" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M235.2 498.1L214.4 486.6L214.4 465.2L235.2 476.7Z" fill="#e2dacb" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M214.4 486.6L197.6 473.7L197.6 452.3L214.4 465.2Z" fill="#e2dacb" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M197.6 473.7L185.3 459.8L185.3 438.4L197.6 452.3Z" fill="#e2dacb" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M185.3 459.8L177.8 445.1L177.8 423.7L185.3 438.4Z" fill="#e2dacb" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M177.8 445.1L175.3 430.1L175.3 408.7L177.8 423.7Z" fill="#e2dacb" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M175.3 430.1L177.8 415.1L177.8 393.7L175.3 408.7Z" fill="#d5cbb8" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M177.8 415.1L185.3 400.4L185.3 379.0L177.8 393.7Z" fill="#d5cbb8" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M185.3 400.4L197.6 386.5L197.6 365.1L185.3 379.0Z" fill="#d5cbb8" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M197.6 386.5L214.4 373.6L214.4 352.2L197.6 365.1Z" fill="#c4b9a5" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M214.4 373.6L235.2 362.1L235.2 340.7L214.4 352.2Z" fill="#c4b9a5" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M235.2 362.1L259.7 352.4L259.7 330.9L235.2 340.7Z" fill="#c4b9a5" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M259.7 352.4L287.1 344.5L287.1 323.1L259.7 330.9Z" fill="#c4b9a5" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M287.1 344.5L316.7 338.7L316.7 317.3L287.1 323.1Z" fill="#c4b9a5" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M316.7 338.7L348.0 335.2L348.0 313.8L316.7 317.3Z" fill="#c4b9a5" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M348.0 335.2L380.0 334.0L380.0 312.6L348.0 313.8Z" fill="#c4b9a5" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M380.0 334.0L412.0 335.2L412.0 313.8L380.0 312.6Z" fill="#c4b9a5" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M412.0 335.2L443.3 338.7L443.3 317.3L412.0 313.8Z" fill="#c4b9a5" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M443.3 338.7L472.9 344.5L472.9 323.1L443.3 317.3Z" fill="#c4b9a5" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M472.9 344.5L500.3 352.4L500.3 330.9L472.9 323.1Z" fill="#c4b9a5" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M500.3 352.4L524.8 362.1L524.8 340.7L500.3 330.9Z" fill="#c4b9a5" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M524.8 362.1L545.6 373.6L545.6 352.2L524.8 340.7Z" fill="#c4b9a5" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M545.6 373.6L562.4 386.5L562.4 365.1L545.6 352.2Z" fill="#c4b9a5" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M562.4 386.5L574.7 400.4L574.7 379.0L562.4 365.1Z" fill="#c4b9a5" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M574.7 400.4L582.2 415.1L582.2 393.7L574.7 379.0Z" fill="#c4b9a5" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M582.2 415.1L584.7 430.1L584.7 408.7L582.2 393.7Z" fill="#c4b9a5" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M584.7 430.1L582.2 445.1L582.2 423.7L584.7 408.7Z" fill="#c4b9a5" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M582.2 445.1L574.7 459.8L574.7 438.4L582.2 423.7Z" fill="#d5cbb8" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M574.7 459.8L562.4 473.7L562.4 449.3L574.7 438.4Z" fill="#d5cbb8" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M562.4 473.7L545.6 486.6L545.6 465.2L562.4 452.3Z" fill="#d5cbb8" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M545.6 486.6L524.8 498.1L524.8 476.7L545.6 465.2Z" fill="#d5cbb8" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M524.8 476.7L500.3 486.4L495.6 478.6L519.0 469.2Z" fill="#ede6d8" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M500.3 486.4L472.9 494.3L469.3 486.2L495.6 478.6Z" fill="#ede6d8" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M472.9 494.3L443.3 500.1L440.8 491.7L469.3 486.2Z" fill="#ede6d8" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M443.3 500.1L412.0 503.6L410.8 495.1L440.8 491.7Z" fill="#ede6d8" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M412.0 503.6L380.0 504.8L380.0 496.3L410.8 495.1Z" fill="#ede6d8" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M380.0 504.8L348.0 503.6L349.2 495.1L380.0 496.3Z" fill="#ede6d8" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M348.0 503.6L316.7 500.1L319.2 491.7L349.2 495.1Z" fill="#ede6d8" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M316.7 500.1L287.1 494.3L290.7 486.2L319.2 491.7Z" fill="#ede6d8" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M287.1 494.3L259.7 486.4L264.4 478.6L290.7 486.2Z" fill="#ede6d8" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M259.7 486.4L235.2 476.7L241.0 469.2L264.4 478.6Z" fill="#ede6d8" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M235.2 476.7L214.4 465.2L220.9 458.2L241.0 469.2Z" fill="#ede6d8" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M214.4 465.2L197.6 452.3L204.8 445.8L220.9 458.2Z" fill="#ede6d8" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M197.6 452.3L185.3 438.4L193.0 432.5L204.8 445.8Z" fill="#ede6d8" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M185.3 438.4L177.8 423.7L185.8 418.4L193.0 432.5Z" fill="#ede6d8" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M177.8 423.7L175.3 408.7L183.4 403.9L185.8 418.4Z" fill="#ede6d8" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M175.3 408.7L177.8 393.7L185.8 389.5L183.4 403.9Z" fill="#dfd6c4" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M177.8 393.7L185.3 379.0L193.0 375.4L185.8 389.5Z" fill="#dfd6c4" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M185.3 379.0L197.6 365.1L204.8 362.0L193.0 375.4Z" fill="#dfd6c4" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M197.6 365.1L214.4 352.2L220.9 349.7L204.8 362.0Z" fill="#dfd6c4" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M214.4 352.2L235.2 340.7L241.0 338.7L220.9 349.7Z" fill="#dfd6c4" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M235.2 340.7L259.7 330.9L264.4 329.3L241.0 338.7Z" fill="#dfd6c4" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M259.7 330.9L287.1 323.1L290.7 321.7L264.4 329.3Z" fill="#dfd6c4" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M287.1 323.1L316.7 317.3L319.2 316.1L290.7 321.7Z" fill="#dfd6c4" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M316.7 317.3L348.0 313.8L349.2 312.8L319.2 316.1Z" fill="#dfd6c4" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M348.0 313.8L380.0 312.6L380.0 311.6L349.2 312.8Z" fill="#dfd6c4" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M380.0 312.6L412.0 313.8L410.8 312.8L380.0 311.6Z" fill="#dfd6c4" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M412.0 313.8L443.3 317.3L440.8 316.1L410.8 312.8Z" fill="#dfd6c4" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M443.3 317.3L472.9 323.1L469.3 321.7L440.8 316.1Z" fill="#dfd6c4" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M472.9 323.1L500.3 330.9L495.6 329.3L469.3 321.7Z" fill="#dfd6c4" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M500.3 330.9L524.8 340.7L519.0 338.7L495.6 329.3Z" fill="#dfd6c4" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M524.8 340.7L545.6 352.2L539.1 349.7L519.0 338.7Z" fill="#dfd6c4" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M545.6 352.2L562.4 365.1L555.2 362.0L539.1 349.7Z" fill="#dfd6c4" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M562.4 365.1L574.7 379.0L567.0 375.4L555.2 362.0Z" fill="#dfd6c4" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M574.7 379.0L582.2 393.7L574.2 389.5L567.0 375.4Z" fill="#dfd6c4" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M582.2 393.7L584.7 408.7L576.6 403.9L574.2 389.5Z" fill="#dfd6c4" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M584.7 408.7L582.2 423.7L574.2 418.4L576.6 403.9Z" fill="#dfd6c4" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M582.2 423.7L574.7 438.4L567.0 432.5L574.2 418.4Z" fill="#dfd6c4" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M574.7 438.4L562.4 452.3L555.2 445.8L567.0 432.5Z" fill="#dfd6c4" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M562.4 452.3L545.6 465.2L539.1 458.2L555.2 445.8Z" fill="#dfd6c4" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M545.6 465.2L524.8 476.7L519.0 469.2L539.1 458.2Z" fill="#ede6d8" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M519.0 469.2L495.6 478.6L469.3 486.2L440.8 491.7L410.8 495.1L380.0 496.3L349.2 495.1L319.2 491.7L290.7 486.2L264.4 478.6L241.0 469.2L220.9 458.2L204.8 445.8L193.0 432.5L185.8 418.4L183.4 403.9L185.8 389.5L193.0 375.4L204.8 362.0L220.9 349.7L241.0 338.7L264.4 329.3L290.7 321.7L319.2 316.1L349.2 312.8L380.0 311.6L410.8 312.8L440.8 316.1L469.3 321.7L495.6 329.3L519.0 338.7L539.1 349.7L555.2 362.0L567.0 375.4L574.2 389.5L576.6 403.9L574.2 418.4L567.0 432.5L555.2 445.8L539.1 458.2L519.0 469.2Z" fill="#9bbfa8" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M509.5 464.3L487.7 473.0L463.2 480.1L436.6 485.2L408.7 488.4L380.0 489.5L351.3 488.4L323.4 485.2L296.8 480.1L272.3 473.0L250.5 464.3L231.8 454.0L216.8 442.5L205.8 430.0L199.1 416.9L196.8 403.5L199.1 390.0L205.8 376.9L216.8 364.4L231.8 352.9L250.5 342.7L272.3 333.9L296.8 326.8L323.4 321.7L351.3 318.5L380.0 317.5L408.7 318.5L436.6 321.7L463.2 326.8L487.7 333.9L509.5 342.7L528.2 352.9L543.2 364.4L554.2 376.9L560.9 390.0L563.2 403.5L560.9 416.9L554.2 430.0L543.2 442.5L528.2 454.0L509.5 464.3Z" fill="none" stroke="#18181b" stroke-width="1.2" opacity="0.35"/><line x1="510.5" y1="464.5" x2="517.1" y2="467.6" stroke="#18181b" stroke-width="1.5" opacity="0.75"/><line x1="488.5" y1="473.3" x2="491.6" y2="475.4" stroke="#18181b" stroke-width="1" opacity="0.35"/><line x1="463.8" y1="480.4" x2="466.2" y2="482.7" stroke="#18181b" stroke-width="1" opacity="0.35"/><line x1="437.0" y1="485.6" x2="438.7" y2="488.0" stroke="#18181b" stroke-width="1" opacity="0.35"/><line x1="408.9" y1="488.8" x2="409.7" y2="491.3" stroke="#18181b" stroke-width="1" opacity="0.35"/><line x1="380.0" y1="489.8" x2="380.0" y2="494.3" stroke="#18181b" stroke-width="1.5" opacity="0.75"/><line x1="351.1" y1="488.8" x2="350.3" y2="491.3" stroke="#18181b" stroke-width="1" opacity="0.35"/><line x1="323.0" y1="485.6" x2="321.3" y2="488.0" stroke="#18181b" stroke-width="1" opacity="0.35"/><line x1="296.2" y1="480.4" x2="293.8" y2="482.7" stroke="#18181b" stroke-width="1" opacity="0.35"/><line x1="271.5" y1="473.3" x2="268.4" y2="475.4" stroke="#18181b" stroke-width="1" opacity="0.35"/><line x1="249.5" y1="464.5" x2="242.9" y2="467.6" stroke="#18181b" stroke-width="1.5" opacity="0.75"/><line x1="230.7" y1="454.1" x2="226.4" y2="455.6" stroke="#18181b" stroke-width="1" opacity="0.35"/><line x1="215.6" y1="442.6" x2="210.8" y2="443.7" stroke="#18181b" stroke-width="1" opacity="0.35"/><line x1="204.5" y1="430.0" x2="199.4" y2="430.8" stroke="#18181b" stroke-width="1" opacity="0.35"/><line x1="197.8" y1="416.8" x2="192.4" y2="417.2" stroke="#18181b" stroke-width="1" opacity="0.35"/><line x1="195.5" y1="403.2" x2="186.1" y2="403.2" stroke="#18181b" stroke-width="1.5" opacity="0.75"/><line x1="197.8" y1="389.7" x2="192.4" y2="389.3" stroke="#18181b" stroke-width="1" opacity="0.35"/><line x1="204.5" y1="376.5" x2="199.4" y2="375.7" stroke="#18181b" stroke-width="1" opacity="0.35"/><line x1="215.6" y1="363.9" x2="210.8" y2="362.8" stroke="#18181b" stroke-width="1" opacity="0.35"/><line x1="230.7" y1="352.3" x2="226.4" y2="350.8" stroke="#18181b" stroke-width="1" opacity="0.35"/><line x1="249.5" y1="342.0" x2="242.9" y2="338.8" stroke="#18181b" stroke-width="1.5" opacity="0.75"/><line x1="271.5" y1="333.1" x2="268.4" y2="331.1" stroke="#18181b" stroke-width="1" opacity="0.35"/><line x1="296.2" y1="326.0" x2="293.8" y2="323.8" stroke="#18181b" stroke-width="1" opacity="0.35"/><line x1="323.0" y1="320.8" x2="321.3" y2="318.4" stroke="#18181b" stroke-width="1" opacity="0.35"/><line x1="351.1" y1="317.7" x2="350.3" y2="315.2" stroke="#18181b" stroke-width="1" opacity="0.35"/><line x1="380.0" y1="316.6" x2="380.0" y2="312.2" stroke="#18181b" stroke-width="1.5" opacity="0.75"/><line x1="408.9" y1="317.7" x2="409.7" y2="315.2" stroke="#18181b" stroke-width="1" opacity="0.35"/><line x1="437.0" y1="320.8" x2="438.7" y2="318.4" stroke="#18181b" stroke-width="1" opacity="0.35"/><line x1="463.8" y1="326.0" x2="466.2" y2="323.8" stroke="#18181b" stroke-width="1" opacity="0.35"/><line x1="488.5" y1="333.1" x2="491.6" y2="331.1" stroke="#18181b" stroke-width="1" opacity="0.35"/><line x1="510.5" y1="342.0" x2="517.1" y2="338.8" stroke="#18181b" stroke-width="1.5" opacity="0.75"/><line x1="529.3" y1="352.3" x2="533.6" y2="350.8" stroke="#18181b" stroke-width="1" opacity="0.35"/><line x1="544.4" y1="363.9" x2="549.2" y2="362.8" stroke="#18181b" stroke-width="1" opacity="0.35"/><line x1="555.5" y1="376.5" x2="560.6" y2="375.7" stroke="#18181b" stroke-width="1" opacity="0.35"/><line x1="562.2" y1="389.7" x2="567.6" y2="389.3" stroke="#18181b" stroke-width="1" opacity="0.35"/><line x1="564.5" y1="403.2" x2="573.9" y2="403.2" stroke="#18181b" stroke-width="1.5" opacity="0.75"/><line x1="562.2" y1="416.8" x2="567.6" y2="417.2" stroke="#18181b" stroke-width="1" opacity="0.35"/><line x1="555.5" y1="430.0" x2="560.6" y2="430.8" stroke="#18181b" stroke-width="1" opacity="0.35"/><line x1="544.4" y1="442.6" x2="549.2" y2="443.7" stroke="#18181b" stroke-width="1" opacity="0.35"/><line x1="529.3" y1="454.1" x2="533.6" y2="455.6" stroke="#18181b" stroke-width="1" opacity="0.35"/><path d="M249.5 376.6L261.0 382.0L251.4 386.4L240.0 381.1Z" fill="#f4f3ec" stroke="#18181b" stroke-width="1.2" stroke-linejoin="round" stroke-linecap="round"/><path d="M216.2 407.5L225.7 411.9L216.2 416.4L206.7 411.9Z" fill="#f4f3ec" stroke="#18181b" stroke-width="1.2" stroke-linejoin="round" stroke-linecap="round"/><path d="M307.6 458.4L319.1 463.8L311.4 467.4L300.0 462.0Z" fill="#f4f3ec" stroke="#18181b" stroke-width="1.2" stroke-linejoin="round" stroke-linecap="round"/><path d="M438.1 457.1L447.6 461.6L436.2 466.9L426.7 462.5Z" fill="#f4f3ec" stroke="#18181b" stroke-width="1.2" stroke-linejoin="round" stroke-linecap="round"/><path d="M525.7 386.4L537.1 391.8L527.6 396.3L516.2 390.9Z" fill="#f4f3ec" stroke="#18181b" stroke-width="1.2" stroke-linejoin="round" stroke-linecap="round"/><path d="M425.7 334.1L435.2 338.6L425.7 343.1L416.2 338.6Z" fill="#f4f3ec" stroke="#18181b" stroke-width="1.2" stroke-linejoin="round" stroke-linecap="round"/><path d="M266.9 393.2L269 382.9L275.5 372.9L285.9 363.7L300 355.7L317.1 349.1L336.7 344.2L357.9 341.1L380 340.1L402.1 341.1L423.3 344.2L442.9 349.1L460 355.7L474.1 363.7L484.5 372.9L491 382.9L493.1 393.2L493.1 402.8L491 413.1L484.5 423.1L474.1 432.3L460 440.3L442.9 446.9L423.3 451.8L402.1 454.8L380 455.9L357.9 454.8L336.7 451.8L317.1 446.9L300 440.3L285.9 432.3L275.5 423.1L269 413.1L266.9 402.8Z" fill="#d5be32"/><path d="M460 440.3L442.9 446.9L442.9 437.4L460 430.8ZM493.1 402.8L491 413.1L491 403.6L493.1 393.2ZM491 413.1L484.5 423.1L484.5 413.6L491 403.6ZM484.5 423.1L474.1 432.3L474.1 422.7L484.5 413.6ZM474.1 432.3L460 440.3L460 430.8L474.1 422.7Z" fill="#d5be32"/><path d="M442.9 446.9L423.3 451.8L423.3 442.3L442.9 437.4ZM423.3 451.8L402.1 454.8L402.1 445.3L423.3 442.3ZM402.1 454.8L380 455.9L380 446.3L402.1 445.3Z" fill="#fee868"/><path d="M380 455.9L357.9 454.8L357.9 445.3L380 446.3ZM357.9 454.8L336.7 451.8L336.7 442.3L357.9 445.3ZM336.7 451.8L317.1 446.9L317.1 437.4L336.7 442.3Z" fill="#b8a324"/><path d="M317.1 446.9L300 440.3L300 430.8L317.1 437.4ZM300 440.3L285.9 432.3L285.9 422.7L300 430.8ZM285.9 432.3L275.5 423.1L275.5 413.6L285.9 422.7ZM275.5 423.1L269 413.1L269 403.6L275.5 413.6ZM269 413.1L266.9 402.8L266.9 393.2L269 403.6Z" fill="#fde047"/><path d="M460 430.8L442.9 437.4L423.3 442.3L402.1 445.3L380 446.3L357.9 445.3L336.7 442.3L317.1 437.4L300 430.8L285.9 422.7L275.5 413.6L269 403.6L266.9 393.2L269 382.9L275.5 372.9L285.9 363.7L300 355.7L317.1 349.1L336.7 344.2L357.9 341.1L380 340.1L402.1 341.1L423.3 344.2L442.9 349.1L460 355.7L474.1 363.7L484.5 372.9L491 382.9L493.1 393.2L491 403.6L484.5 413.6L474.1 422.7Z" fill="#fde047"/><path d="M266.9 393.2L269 382.9L275.5 372.9L285.9 363.7L300 355.7L317.1 349.1L336.7 344.2L357.9 341.1L380 340.1L402.1 341.1L423.3 344.2L442.9 349.1L460 355.7L474.1 363.7L484.5 372.9L491 382.9L493.1 393.2M493.1 402.8L491 413.1L484.5 423.1L474.1 432.3L460 440.3L442.9 446.9L423.3 451.8L402.1 454.8L380 455.9L357.9 454.8L336.7 451.8L317.1 446.9L300 440.3L285.9 432.3L275.5 423.1L269 413.1L266.9 402.8M266.9 393.2L266.9 402.8M493.1 393.2L493.1 402.8" fill="none" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M493.1 393.2L491 403.6L484.5 413.6L474.1 422.7L460 430.8L442.9 437.4L423.3 442.3L402.1 445.3L380 446.3L357.9 445.3L336.7 442.3L317.1 437.4L300 430.8L285.9 422.7L275.5 413.6L269 403.6L266.9 393.2" fill="none" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M286.3 382.8L291 373.2L300.2 364.2L313.3 356.5L329.8 350.3L348.9 346L369.4 343.8L390.6 343.8L411.1 346L430.2 350.3L446.7 356.5L459.8 364.2L469 373.2L473.7 382.8L473.7 398.2L469 407.9L459.8 416.8L446.7 424.5L430.2 430.7L411.1 435L390.6 437.2L369.4 437.2L348.9 435L329.8 430.7L313.3 424.5L300.2 416.8L291 407.9L286.3 398.2Z" fill="#0f172a"/><path d="M446.7 424.5L430.2 430.7L430.2 425.2L446.7 419.1ZM473.7 398.2L469 407.9L469 402.4L473.7 392.7ZM469 407.9L459.8 416.8L459.8 411.3L469 402.4ZM459.8 416.8L446.7 424.5L446.7 419.1L459.8 411.3Z" fill="#0f172a"/><path d="M430.2 430.7L411.1 435L411.1 429.5L430.2 425.2ZM411.1 435L390.6 437.2L390.6 431.7L411.1 429.5ZM390.6 437.2L369.4 437.2L369.4 431.7L390.6 431.7Z" fill="#334155"/><path d="M369.4 437.2L348.9 435L348.9 429.5L369.4 431.7ZM348.9 435L329.8 430.7L329.8 425.2L348.9 429.5Z" fill="#0f172a"/><path d="M329.8 430.7L313.3 424.5L313.3 419.1L329.8 425.2ZM313.3 424.5L300.2 416.8L300.2 411.3L313.3 419.1ZM300.2 416.8L291 407.9L291 402.4L300.2 411.3ZM291 407.9L286.3 398.2L286.3 392.7L291 402.4Z" fill="#1e293b"/><path d="M446.7 419.1L430.2 425.2L411.1 429.5L390.6 431.7L369.4 431.7L348.9 429.5L329.8 425.2L313.3 419.1L300.2 411.3L291 402.4L286.3 392.7L286.3 382.8L291 373.2L300.2 364.2L313.3 356.5L329.8 350.3L348.9 346L369.4 343.8L390.6 343.8L411.1 346L430.2 350.3L446.7 356.5L459.8 364.2L469 373.2L473.7 382.8L473.7 392.7L469 402.4L459.8 411.3Z" fill="#1e293b"/><path d="M286.3 392.7L286.3 382.8L291 373.2L300.2 364.2L313.3 356.5L329.8 350.3L348.9 346L369.4 343.8L390.6 343.8L411.1 346L430.2 350.3L446.7 356.5L459.8 364.2L469 373.2L473.7 382.8L473.7 392.7M473.7 398.2L469 407.9L459.8 416.8L446.7 424.5L430.2 430.7L411.1 435L390.6 437.2L369.4 437.2L348.9 435L329.8 430.7L313.3 424.5L300.2 416.8L291 407.9L286.3 398.2M286.3 392.7L286.3 398.2M473.7 392.7L473.7 398.2" fill="none" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M473.7 392.7L469 402.4L459.8 411.3L446.7 419.1L430.2 425.2L411.1 429.5L390.6 431.7L369.4 431.7L348.9 429.5L329.8 425.2L313.3 419.1L300.2 411.3L291 402.4L286.3 392.7" fill="none" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M368.2 463.4L368.8 461L371.6 458.9L376.1 457.5L381.3 457.3L386.3 458.1L390 459.8L391.8 462.2L391.8 471.7L391.2 474.1L388.4 476.2L383.9 477.6L378.7 477.8L373.7 477L370 475.3L368.2 472.9Z" fill="#b91c1c"/><path d="M388.4 476.2L383.9 477.6L383.9 468L388.4 466.7ZM391.8 471.7L391.2 474.1L391.2 464.6L391.8 462.2ZM391.2 474.1L388.4 476.2L388.4 466.7L391.2 464.6Z" fill="#b91c1c"/><path d="M383.9 477.6L378.7 477.8L378.7 468.3L383.9 468Z" fill="#f87171"/><path d="M378.7 477.8L373.7 477L373.7 467.5L378.7 468.3Z" fill="#991b1b"/><path d="M373.7 477L370 475.3L370 465.7L373.7 467.5ZM370 475.3L368.2 472.9L368.2 463.4L370 465.7Z" fill="#ff6b57"/><path d="M388.4 466.7L383.9 468L378.7 468.3L373.7 467.5L370 465.7L368.2 463.4L368.8 461L371.6 458.9L376.1 457.5L381.3 457.3L386.3 458.1L390 459.8L391.8 462.2L391.2 464.6Z" fill="#ff6b57"/><path d="M368.2 463.4L368.8 461L371.6 458.9L376.1 457.5L381.3 457.3L386.3 458.1L390 459.8L391.8 462.2M391.8 471.7L391.2 474.1L388.4 476.2L383.9 477.6L378.7 477.8L373.7 477L370 475.3L368.2 472.9M368.2 463.4L368.2 472.9M391.8 462.2L391.8 471.7" fill="none" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M391.8 462.2L391.2 464.6L388.4 466.7L383.9 468L378.7 468.3L373.7 467.5L370 465.7L368.2 463.4" fill="none" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><circle cx="380.0" cy="462.6" r="1.4" fill="#ffffff" opacity="0.95"/><path d="M239.9 359.1L240.5 356.6L243.3 354.5L247.8 353.2L253 352.9L258 353.8L261.7 355.5L263.5 357.8L263.5 367.4L262.9 369.8L260.1 371.9L255.6 373.2L250.4 373.5L245.4 372.7L241.7 370.9L239.9 368.6Z" fill="#b91c1c"/><path d="M260.1 371.9L255.6 373.2L255.6 363.7L260.1 362.4ZM263.5 367.4L262.9 369.8L262.9 360.3L263.5 357.8ZM262.9 369.8L260.1 371.9L260.1 362.4L262.9 360.3Z" fill="#b91c1c"/><path d="M255.6 373.2L250.4 373.5L250.4 364L255.6 363.7Z" fill="#f87171"/><path d="M250.4 373.5L245.4 372.7L245.4 363.2L250.4 364Z" fill="#991b1b"/><path d="M245.4 372.7L241.7 370.9L241.7 361.4L245.4 363.2ZM241.7 370.9L239.9 368.6L239.9 359.1L241.7 361.4Z" fill="#ff6b57"/><path d="M260.1 362.4L255.6 363.7L250.4 364L245.4 363.2L241.7 361.4L239.9 359.1L240.5 356.6L243.3 354.5L247.8 353.2L253 352.9L258 353.8L261.7 355.5L263.5 357.8L262.9 360.3Z" fill="#ff6b57"/><path d="M239.9 359.1L240.5 356.6L243.3 354.5L247.8 353.2L253 352.9L258 353.8L261.7 355.5L263.5 357.8M263.5 367.4L262.9 369.8L260.1 371.9L255.6 373.2L250.4 373.5L245.4 372.7L241.7 370.9L239.9 368.6M239.9 359.1L239.9 368.6M263.5 357.8L263.5 367.4" fill="none" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M263.5 357.8L262.9 360.3L260.1 362.4L255.6 363.7L250.4 364L245.4 363.2L241.7 361.4L239.9 359.1" fill="none" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><circle cx="251.7" cy="358.2" r="1.4" fill="#ffffff" opacity="0.95"/><path d="M496.5 359.1L497.1 356.6L499.9 354.5L504.4 353.2L509.6 352.9L514.6 353.8L518.3 355.5L520.1 357.8L520.1 367.4L519.5 369.8L516.7 371.9L512.2 373.2L507 373.5L502 372.7L498.3 370.9L496.5 368.6Z" fill="#b91c1c"/><path d="M516.7 371.9L512.2 373.2L512.2 363.7L516.7 362.4ZM520.1 367.4L519.5 369.8L519.5 360.3L520.1 357.8ZM519.5 369.8L516.7 371.9L516.7 362.4L519.5 360.3Z" fill="#b91c1c"/><path d="M512.2 373.2L507 373.5L507 364L512.2 363.7Z" fill="#f87171"/><path d="M507 373.5L502 372.7L502 363.2L507 364Z" fill="#991b1b"/><path d="M502 372.7L498.3 370.9L498.3 361.4L502 363.2ZM498.3 370.9L496.5 368.6L496.5 359.1L498.3 361.4Z" fill="#ff6b57"/><path d="M516.7 362.4L512.2 363.7L507 364L502 363.2L498.3 361.4L496.5 359.1L497.1 356.6L499.9 354.5L504.4 353.2L509.6 352.9L514.6 353.8L518.3 355.5L520.1 357.8L519.5 360.3Z" fill="#ff6b57"/><path d="M496.5 359.1L497.1 356.6L499.9 354.5L504.4 353.2L509.6 352.9L514.6 353.8L518.3 355.5L520.1 357.8M520.1 367.4L519.5 369.8L516.7 371.9L512.2 373.2L507 373.5L502 372.7L498.3 370.9L496.5 368.6M496.5 359.1L496.5 368.6M520.1 357.8L520.1 367.4" fill="none" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M520.1 357.8L519.5 360.3L516.7 362.4L512.2 363.7L507 364L502 363.2L498.3 361.4L496.5 359.1" fill="none" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><circle cx="508.3" cy="358.2" r="1.4" fill="#ffffff" opacity="0.95"/>
    <ellipse cx="380.0" cy="387.3" rx="26" ry="13.5" fill="#0284c7" opacity="0.85"/>
    <ellipse cx="380.0" cy="387.3" rx="18" ry="9.5" fill="#38bdf8" opacity="0.95"/>
    <ellipse cx="380.0" cy="387.3" rx="9" ry="4.8" fill="#e0f2fe" opacity="1"/>
    <circle cx="380.0" cy="387.3" r="2.8" fill="#ffffff"/>`,
					}}
				/>

				{/* 2. Volumetric Projector Rays & 3D Echoing Floating Rings */}
				<g id="volumetric-field" style={{ pointerEvents: "none" }}>
					{/* Volumetric Light Beam */}
					<path
						id="holo-beam"
						d="M 354,387.3 A 26 13.5 0 0 0 406,387.3 L 480,240 L 280,240 Z"
						fill="url(#holo-beam-gradient)"
						className="beam-anim"
					/>

					{/* Upward Streaming Laser Rays (Smooth Compositor Needle Pivoting) */}
					{/* Ray 1: Front Diode */}
					<g transform="translate(380.0, 462.6)">
						<g className="ray-sweep-front">
							<line
								x1="0"
								y1="0"
								x2="0"
								y2="-200"
								stroke="#38bdf8"
								strokeWidth="1.6"
								strokeDasharray="6 4"
								opacity="0.85"
								className="laser-ray-stream"
							/>
							<circle cx="0" cy="-200" r="2.8" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="1.2" />
						</g>
					</g>

					{/* Ray 2: Left Diode (Vertical Scans on Left HUD border) */}
					<g transform="translate(251.7, 358.2)">
						<line
							x1="0"
							y1="0"
							x2="18.3"
							y2="-163.2"
							stroke="#38bdf8"
							strokeWidth="1.6"
							strokeDasharray="6 4"
							opacity="0.85"
							className="laser-ray-stream ray-scale-left"
							style={{ transformOrigin: "0px 0px" }}
						/>
						<circle
							cx="18.3"
							cy="-163.2"
							r="2.8"
							fill="#e0f2fe"
							stroke="#38bdf8"
							strokeWidth="1.2"
							className="ray-dot-left"
						/>
					</g>

					{/* Ray 3: Right Diode (Vertical Scans on Right HUD border) */}
					<g transform="translate(508.3, 358.2)">
						<line
							x1="0"
							y1="0"
							x2="-18.3"
							y2="-163.2"
							stroke="#38bdf8"
							strokeWidth="1.6"
							strokeDasharray="6 4"
							opacity="0.85"
							className="laser-ray-stream ray-scale-right"
							style={{ transformOrigin: "0px 0px" }}
						/>
						<circle
							cx="-18.3"
							cy="-163.2"
							r="2.8"
							fill="#e0f2fe"
							stroke="#38bdf8"
							strokeWidth="1.2"
							className="ray-dot-right"
						/>
					</g>

					{/* 3D Echoing Floating Rings */}
					<g transform="translate(380, 390)">
						<ellipse
							className="ring-rise-1"
							cx="0"
							cy="0"
							rx="36"
							ry="18"
							fill="none"
							stroke="#38bdf8"
							strokeWidth="1.6"
						/>
						<ellipse
							className="ring-rise-2"
							cx="0"
							cy="0"
							rx="52"
							ry="26"
							fill="none"
							stroke="var(--color-mint, #86efac)"
							strokeWidth="1.3"
						/>
						<ellipse
							className="ring-rise-3"
							cx="0"
							cy="0"
							rx="68"
							ry="34"
							fill="none"
							stroke="#38bdf8"
							strokeWidth="1.1"
						/>
					</g>
				</g>

				{/* 3. Upright Front-Facing Holographic HUD Screen */}
				<g id="holo-screen" className="holo-glow holo-floating">
					{/* Solid Neubrutalist Holo-Drop Depth */}
					<rect
						x="-106"
						y="-71"
						width="216"
						height="146"
						rx="14"
						fill="var(--color-ink, #18181b)"
						opacity="0.22"
					/>

					{/* Main Clean Translucent Glass Screen */}
					<rect
						x="-110"
						y="-75"
						width="216"
						height="146"
						rx="14"
						fill="var(--color-surface-muted, #f3f8f5)"
						fillOpacity="0.95"
						stroke="var(--color-ink, #18181b)"
						strokeWidth="2.2"
					/>

					{/* Top Telemetry Header Bar */}
					<rect x="-102" y="-67" width="200" height="20" rx="5" fill="var(--color-ink, #18181b)" />
					<circle
						id="holo-rec-dot"
						className="beacon-blink-anim"
						cx="-90"
						cy="-57"
						r="3"
						fill="var(--color-mint, #86efac)"
					/>

					{/* Header Text in Pure Crisp White with Lucide Chevrons Right Icon */}
					<g transform="translate(-80, -57)">
						<text
							x="0"
							y="3.2"
							fontFamily="monospace"
							fontSize="7.5"
							fontWeight="900"
							fill="#ffffff"
							letterSpacing="0.6"
						>
							CRAFT TIMELINE // 2019
						</text>

						{/* Lucide Chevrons Right Icon in Pure Crisp White */}
						<g
							transform="translate(110, -6) scale(0.5)"
							stroke="#ffffff"
							strokeWidth="2.8"
							strokeLinecap="round"
							strokeLinejoin="round"
							fill="none"
						>
							<path d="m6 17 5-5-5-5" />
							<path d="m13 17 5-5-5-5" />
						</g>

						<text
							x="126"
							y="3.2"
							fontFamily="monospace"
							fontSize="7.5"
							fontWeight="900"
							fill="#ffffff"
							letterSpacing="0.6"
						>
							{currentYear}
						</text>
					</g>

					{/* Center Hero Stat: Tactile Years Squircle Badge */}
					<g id="hero-stat-badge" transform="translate(0, -7)">
						<rect
							x="-82"
							y="-22"
							width="164"
							height="44"
							rx="10"
							fill="var(--color-ink, #18181b)"
						/>
						<rect
							x="-84"
							y="-24"
							width="164"
							height="44"
							rx="10"
							fill="var(--color-yellow, #fde047)"
							stroke="var(--color-ink, #18181b)"
							strokeWidth="2"
						/>

						<text
							x="-26"
							y="9"
							fontFamily="ui-sans-serif, system-ui, sans-serif"
							fontSize="36"
							fontWeight="900"
							fill="var(--color-ink, #18181b)"
							textAnchor="middle"
							letterSpacing="-1.5"
						>
							{elapsedYears}
							<tspan fill="var(--color-coral, #ff6b57)" fontWeight="900">
								+
							</tspan>
						</text>

						<text
							x="2"
							y="-4"
							fontFamily="monospace"
							fontSize="10"
							fontWeight="900"
							fill="var(--color-ink, #18181b)"
							textAnchor="start"
							letterSpacing="0.5"
						>
							YEARS
						</text>
						<text
							x="2"
							y="9"
							fontFamily="monospace"
							fontSize="9"
							fontWeight="900"
							fill="var(--color-ink-muted, #52525b)"
							textAnchor="start"
							letterSpacing="0.5"
						>
							CRAFTING UI
						</text>
					</g>

					{/* Bottom Dynamic Experience Stream Ticker */}
					<g id="experience-ticker" transform="translate(0, 43)">
						<rect
							x="-102"
							y="-13"
							width="200"
							height="26"
							rx="6"
							fill="var(--color-ink, #18181b)"
						/>

						<text
							ref={tickerRef}
							x="0"
							y="3.5"
							fontFamily="monospace"
							fontSize="8.8"
							fontWeight="900"
							fill="#ffffff"
							textAnchor="middle"
							letterSpacing="0.6"
							className="ticker-fade"
						>
							{EXPERIENCES[0]}
						</text>
					</g>

					{/* Sweeping Laser Scanline */}
					<g style={{ pointerEvents: "none" }}>
						<rect
							id="screen-scanline"
							className="scanline-anim"
							x="-106"
							y="-75"
							width="208"
							height="16"
							fill="url(#holo-scan-strip)"
						/>
					</g>
				</g>
			</svg>
		</div>
	);
}
