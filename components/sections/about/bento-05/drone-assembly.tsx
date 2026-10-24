"use client";

import { useEffect, useRef, useState } from "react";

interface DroneAssemblyProps {
	className?: string;
}

export function DroneAssembly({ className }: DroneAssemblyProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const [isVisible, setIsVisible] = useState(false);

	// Viewport Observer: Pause CSS animations when off-screen to free 100% CPU/GPU and prevent memory leaks
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

	return (
		<div
			ref={containerRef}
			className={`relative flex w-full items-center justify-center overflow-visible py-1 select-none ${className ?? ""}`}
		>
			<svg
				viewBox="90 55 540 435"
				fill="none"
				className={`drone-assembly-svg h-auto w-full max-w-60 overflow-visible drop-shadow-sm sm:max-w-72 md:max-w-80 lg:max-w-84 ${
					!isVisible ? "drone-paused" : ""
				}`}
				role="img"
				aria-label="Philosophy Value Stack and Autonomous Construction Drone Assembly 3D Model"
			>
				<defs>
					{/* 1. Warm Cream Stone Chassis (Matching Bento 01, 02, 03, 04 Base) */}
					<linearGradient id="stone-top" x1="0%" y1="0%" x2="100%" y2="100%">
						<stop offset="0%" stopColor="#ffffff" />
						<stop offset="60%" stopColor="#ede6d8" />
						<stop offset="100%" stopColor="#ded2bb" />
					</linearGradient>
					<linearGradient id="stone-left" x1="0%" y1="0%" x2="100%" y2="100%">
						<stop offset="0%" stopColor="#ded2bb" />
						<stop offset="100%" stopColor="#c5b699" />
					</linearGradient>
					<linearGradient id="stone-right" x1="0%" y1="0%" x2="100%" y2="100%">
						<stop offset="0%" stopColor="#b8a88a" />
						<stop offset="100%" stopColor="#9d8f74" />
					</linearGradient>

					{/* 2. Signature Sage Green Platform Deck (Matching Bento 01, 02, 03, 04 Deck #9bbfa8) */}
					<linearGradient id="sage-deck" x1="0%" y1="0%" x2="100%" y2="100%">
						<stop offset="0%" stopColor="#a6c8b2" />
						<stop offset="100%" stopColor="#9bbfa8" />
					</linearGradient>

					{/* 3. Keystone Apex Block: Canary Yellow (Matching var(--color-yellow, #fde047)) */}
					<linearGradient id="gold-top" x1="0%" y1="0%" x2="100%" y2="100%">
						<stop offset="0%" stopColor="#fef9c3" />
						<stop offset="100%" stopColor="#fde047" />
					</linearGradient>
					<linearGradient id="gold-left" x1="0%" y1="0%" x2="100%" y2="100%">
						<stop offset="0%" stopColor="#fde047" />
						<stop offset="100%" stopColor="#facc15" />
					</linearGradient>
					<linearGradient id="gold-right" x1="0%" y1="0%" x2="100%" y2="100%">
						<stop offset="0%" stopColor="#eab308" />
						<stop offset="100%" stopColor="#ca8a04" />
					</linearGradient>

					{/* 4. Drone Fuselage Cowl (Matching var(--color-ink, #18181b)) */}
					<linearGradient id="drone-cowl" x1="0%" y1="0%" x2="100%" y2="0%">
						<stop offset="0%" stopColor="#27272a" />
						<stop offset="50%" stopColor="#18181b" />
						<stop offset="100%" stopColor="#09090b" />
					</linearGradient>
					<linearGradient id="drone-accent" x1="0%" y1="0%" x2="100%" y2="0%">
						<stop offset="0%" stopColor="#fef08a" />
						<stop offset="100%" stopColor="#fde047" />
					</linearGradient>

					{/* 5. Suspension Gripper Steel */}
					<linearGradient id="chrome-claw" x1="0%" y1="0%" x2="100%" y2="100%">
						<stop offset="0%" stopColor="#ffffff" />
						<stop offset="50%" stopColor="#e2e8f0" />
						<stop offset="100%" stopColor="#94a3b8" />
					</linearGradient>

					{/* 6. Rotor Motion Blur (Sky Blue) */}
					<radialGradient id="rotor-blur" cx="50%" cy="50%" r="50%">
						<stop offset="0%" stopColor="#38bdf8" stopOpacity="0.4" />
						<stop offset="70%" stopColor="#bae6fd" stopOpacity="0.2" />
						<stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
					</radialGradient>

					{/* 7. Scout Left Fan Sweep (Sage / Mint) */}
					<linearGradient id="scout-left-fan-grad" x1="0%" y1="0%" x2="0%" y2="100%">
						<stop offset="0%" stopColor="#9bbfa8" stopOpacity="0.55" />
						<stop offset="100%" stopColor="#9bbfa8" stopOpacity="0.02" />
					</linearGradient>

					{/* 8. Scout Right Fan Sweep (Sky Cyan) */}
					<linearGradient id="scout-right-fan-grad" x1="0%" y1="0%" x2="0%" y2="100%">
						<stop offset="0%" stopColor="#38bdf8" stopOpacity="0.55" />
						<stop offset="100%" stopColor="#38bdf8" stopOpacity="0.02" />
					</linearGradient>

					<style>{`
            /* Pure Compositor Animations: 0 DOM mutations, 0 layout reflows */
            .drone-paused * {
              animation-play-state: paused !important;
            }

            /* 1. Primary Hero Drone Construction & Docking Flight Cycle (6.0s loop) */
            @keyframes hero-drone-cycle {
              0% {
                transform: translate(45px, -50px) rotate(3deg);
              }
              22% {
                transform: translate(0px, -20px) rotate(-0.5deg);
              }
              40%, 66% {
                transform: translate(0px, 77px) rotate(0deg);
              }
              78% {
                transform: translate(-6px, -24px) rotate(-2deg);
              }
              92% {
                transform: translate(32px, -42px) rotate(3.5deg);
              }
              100% {
                transform: translate(45px, -50px) rotate(3deg);
              }
            }

            /* 2. Left Scout Drone Autonomous Patrol (4.6s loop) */
            @keyframes scout-left-cycle {
              0%, 100% {
                transform: translate(0px, 0px) rotate(0deg);
              }
              35% {
                transform: translate(12px, -14px) rotate(2deg);
              }
              70% {
                transform: translate(-10px, 10px) rotate(-2deg);
              }
            }

            /* 3. Right Scout Drone Autonomous Patrol (5.2s loop, offset phase) */
            @keyframes scout-right-cycle {
              0%, 100% {
                transform: translate(0px, 0px) rotate(0deg);
              }
              40% {
                transform: translate(-14px, -12px) rotate(-2.5deg);
              }
              75% {
                transform: translate(10px, 12px) rotate(2deg);
              }
            }

            /* 4. Horizontal Isometric Rotor Spin */
            @keyframes spin-cw {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }

            @keyframes spin-ccw {
              from { transform: rotate(0deg); }
              to { transform: rotate(-360deg); }
            }

            /* 5. Scout Drone Inspection Fan Sweeps */
            @keyframes scout-left-sweep {
              0%, 100% { opacity: 0.3; transform: rotate(-6deg); }
              50% { opacity: 0.7; transform: rotate(6deg); }
            }

            @keyframes scout-right-sweep {
              0%, 100% { opacity: 0.3; transform: rotate(6deg); }
              50% { opacity: 0.7; transform: rotate(-6deg); }
            }

            /* 6. Drone Beacon LED Blink */
            @keyframes beacon-blink {
              0%, 48% { opacity: 1; }
              50%, 98% { opacity: 0.2; }
            }

            .hero-drone-anim {
              animation: hero-drone-cycle 6.0s cubic-bezier(0.42, 0, 0.25, 1) infinite;
              transform-origin: 360px 145px;
              will-change: transform;
            }

            .scout-left-anim {
              animation: scout-left-cycle 4.6s ease-in-out infinite;
              transform-origin: 185px 230px;
              will-change: transform;
            }

            .scout-right-anim {
              animation: scout-right-cycle 5.2s ease-in-out -1.2s infinite;
              transform-origin: 535px 230px;
              will-change: transform;
            }

            .blade-spin-cw {
              animation: spin-cw 0.12s linear infinite;
              transform-origin: 0px 0px;
              will-change: transform;
            }

            .blade-spin-ccw {
              animation: spin-ccw 0.12s linear infinite;
              transform-origin: 0px 0px;
              will-change: transform;
            }

            .scout-left-fan {
              animation: scout-left-sweep 3.2s ease-in-out infinite;
              transform-origin: 185px 240px;
              will-change: opacity, transform;
            }

            .scout-right-fan {
              animation: scout-right-sweep 3.5s ease-in-out -1.0s infinite;
              transform-origin: 535px 240px;
              will-change: opacity, transform;
            }

            .beacon-light {
              animation: beacon-blink 0.9s steps(1) infinite;
            }

            @media (prefers-reduced-motion: reduce) {
              .drone-assembly-svg * {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
              }
            }
          `}</style>
				</defs>

				{/* ==============================================================
             LAYER 1: THE MONOLITHIC VALUE STACK
             Tier 1 (Base: CRAFT - Warm Cream Stone with Ink Plinth & Sage Deck)
             Tier 2 (Mid: SOFTWARE - Warm Cream Stone with Sage Deck)
             Tier 3 (Top: VALUE - Warm Cream Stone with Sage Deck & Deep Recessed Slot)
             ============================================================== */}
				<g id="value-stack-assembly">
					{/* ------------------------------------------------------------
               TIER 1: FOUNDATION CHASSIS — "CRAFT"
               ------------------------------------------------------------ */}
					<g id="block-01-craft">
						{/* Front-Left Face (Warm Sand Stone) */}
						<polygon
							points="290,370 360,405 360,441 290,406"
							fill="url(#stone-left)"
							stroke="#18181b"
							strokeWidth="1.8"
							strokeLinejoin="round"
						/>
						{/* Front-Right Face (Shaded Warm Stone) */}
						<polygon
							points="360,405 430,370 430,406 360,441"
							fill="url(#stone-right)"
							stroke="#18181b"
							strokeWidth="1.8"
							strokeLinejoin="round"
						/>
						{/* Sub-base Ground Plinth Band (Ink Jet Black) */}
						<polygon
							points="290,401 360,436 360,441 290,406"
							fill="#18181b"
							stroke="#18181b"
							strokeWidth="1.4"
							strokeLinejoin="round"
						/>
						<polygon
							points="360,436 430,401 430,406 360,441"
							fill="#09090b"
							stroke="#18181b"
							strokeWidth="1.4"
							strokeLinejoin="round"
						/>
						{/* Top Signature Sage Green Platform Deck (Matching Bento 01-04) */}
						<polygon
							points="360,335 430,370 360,405 290,370"
							fill="#9bbfa8"
							stroke="#18181b"
							strokeWidth="1.8"
							strokeLinejoin="round"
						/>

						{/* Inset Milling Accent Trim on Sage Deck */}
						<polygon
							points="360,341 422,370 360,399 298,370"
							fill="none"
							stroke="#ede6d8"
							strokeWidth="1.2"
							opacity="0.6"
						/>

						{/* Bento 03 Style Refined Isometric Nameplate: CRAFT */}
						<g transform="translate(325, 401.5) matrix(1, 0.5, 0, 1, 0, 0)">
							<rect
								x="-18"
								y="-4.8"
								width="36"
								height="9.6"
								rx="2"
								fill="#ffffff"
								stroke="#18181b"
								strokeWidth="1.1"
							/>
							<text
								x="0"
								y="0.5"
								fontFamily="monospace"
								fontSize="5"
								fontWeight="900"
								fill="#18181b"
								textAnchor="middle"
								dominantBaseline="central"
								letterSpacing="0.12em"
							>
								CRAFT
							</text>
						</g>
					</g>

					{/* ------------------------------------------------------------
               TIER 2: SCALABLE DIGITAL PILLAR — "SOFTWARE"
               ------------------------------------------------------------ */}
					<g id="block-02-software">
						{/* Front-Left Face (Warm Sand Stone) */}
						<polygon
							points="306,336 360,363 360,397 306,370"
							fill="url(#stone-left)"
							stroke="#18181b"
							strokeWidth="1.8"
							strokeLinejoin="round"
						/>
						{/* Front-Right Shadow Face (Shaded Warm Stone) */}
						<polygon
							points="360,363 414,336 414,370 360,397"
							fill="url(#stone-right)"
							stroke="#18181b"
							strokeWidth="1.8"
							strokeLinejoin="round"
						/>
						{/* Top Signature Sage Green Platform Deck (Matching Bento 01-04) */}
						<polygon
							points="360,309 414,336 360,363 306,336"
							fill="#9bbfa8"
							stroke="#18181b"
							strokeWidth="1.8"
							strokeLinejoin="round"
						/>

						{/* Inset Milling Border Line on Sage Deck */}
						<polygon
							points="360,315 406,336 360,357 314,336"
							fill="none"
							stroke="#ede6d8"
							strokeWidth="1"
							opacity="0.5"
						/>

						{/* Bento 03 Style Refined Isometric Nameplate: SOFTWARE */}
						<g transform="translate(333, 366.5) matrix(1, 0.5, 0, 1, 0, 0)">
							<rect
								x="-24"
								y="-4.8"
								width="48"
								height="9.6"
								rx="2"
								fill="#ffffff"
								stroke="#18181b"
								strokeWidth="1.1"
							/>
							<text
								x="0"
								y="0.5"
								fontFamily="monospace"
								fontSize="4.8"
								fontWeight="900"
								fill="#18181b"
								textAnchor="middle"
								dominantBaseline="central"
								letterSpacing="0.08em"
							>
								SOFTWARE
							</text>
						</g>
					</g>

					{/* ------------------------------------------------------------
               TIER 3: INTERMEDIATE KEYSTONE & RECESSED DOCKING SLOT — "VALUE"
               ------------------------------------------------------------ */}
					<g id="block-03-value-engine">
						{/* Front-Left Face (Warm Sand Stone) */}
						<polygon
							points="322,306 360,325 360,355 322,336"
							fill="url(#stone-left)"
							stroke="#18181b"
							strokeWidth="1.8"
							strokeLinejoin="round"
						/>
						{/* Front-Right Face (Shaded Warm Stone) */}
						<polygon
							points="360,325 398,306 398,336 360,355"
							fill="url(#stone-right)"
							stroke="#18181b"
							strokeWidth="1.8"
							strokeLinejoin="round"
						/>
						{/* Top Signature Sage Green Mounting Platform Deck */}
						<polygon
							points="360,287 398,306 360,325 322,306"
							fill="#9bbfa8"
							stroke="#18181b"
							strokeWidth="1.8"
							strokeLinejoin="round"
						/>

						{/* Bento 03 Style Refined Isometric Nameplate: VALUE (Centered inside face) */}
						<g transform="translate(341, 330.5) matrix(1, 0.5, 0, 1, 0, 0)">
							<rect
								x="-16"
								y="-4.8"
								width="32"
								height="9.6"
								rx="2"
								fill="#ffffff"
								stroke="#18181b"
								strokeWidth="1.1"
							/>
							<text
								x="0"
								y="0.5"
								fontFamily="monospace"
								fontSize="5"
								fontWeight="900"
								fill="#18181b"
								textAnchor="middle"
								dominantBaseline="central"
								letterSpacing="0.12em"
							>
								VALUE
							</text>
						</g>

						{/* RECESSED DOCKING SLOT (Clean, Minimalist Recessed Well) */}
						<g id="socket-interior-well">
							{/* Slot Well Opening */}
							<polygon
								points="360,296 380,306 360,316 340,306"
								fill="#09090b"
								stroke="#18181b"
								strokeWidth="1.6"
								strokeLinejoin="round"
							/>
							{/* Back-Left Cavity Depth Wall */}
							<polygon points="340,306 360,296 360,302 340,312" fill="#09090b" />
							{/* Back-Right Cavity Depth Wall */}
							<polygon points="360,296 380,306 380,312 360,302" fill="#18181b" />
							{/* Cavity Floor */}
							<polygon points="340,312 360,302 380,312 360,322" fill="#050505" />
						</g>
					</g>
				</g>

				{/* ==============================================================
             LAYER 2A: LEFT RECON SCOUT DRONE (Inspecting CRAFT foundation)
             Center: (185, 230)
             ============================================================== */}
				<g id="scout-drone-left" className="scout-left-anim">
					{/* Downward Inspection Laser Fan Sweep (Sage Green) */}
					<polygon
						points="185,240 145,385 225,395"
						fill="url(#scout-left-fan-grad)"
						className="scout-left-fan pointer-events-none"
					/>

					{/* Scout Drone Body */}
					<g transform="translate(185, 230)">
						<polygon
							points="0,-10 18,-2 0,10 -18,-2"
							fill="#18181b"
							stroke="#18181b"
							strokeWidth="1.4"
							strokeLinejoin="round"
						/>
						<polygon
							points="0,-14 12,-6 0,4 -12,-6"
							fill="#ded2bb"
							stroke="#18181b"
							strokeWidth="1.2"
							strokeLinejoin="round"
						/>
						<circle cx="0" cy="5" r="2.5" fill="#22c55e" />
						<circle cx="0" cy="-15" r="1.5" fill="#fde047" className="beacon-light" />

						{/* Left Propeller (-26, -2) */}
						<line x1="-8" y1="-2" x2="-26" y2="-2" stroke="#18181b" strokeWidth="2" />
						<g transform="translate(-26, -2)">
							<ellipse cx="0" cy="0" rx="18" ry="7" fill="url(#rotor-blur)" />
							<ellipse
								cx="0"
								cy="0"
								rx="18"
								ry="7"
								fill="none"
								stroke="#22c55e"
								strokeWidth="1"
								opacity="0.45"
							/>
							<g transform="scale(1, 0.38)">
								<g className="blade-spin-cw">
									<line
										x1="-16"
										y1="0"
										x2="16"
										y2="0"
										stroke="#18181b"
										strokeWidth="2"
										strokeLinecap="round"
									/>
									<circle cx="0" cy="0" r="2.8" fill="#fde047" stroke="#18181b" strokeWidth="0.8" />
								</g>
							</g>
							<circle cx="-18" cy="0" r="1.5" fill="#ef4444" className="beacon-light" />
						</g>

						{/* Right Propeller (26, -2) */}
						<line x1="8" y1="-2" x2="26" y2="-2" stroke="#18181b" strokeWidth="2" />
						<g transform="translate(26, -2)">
							<ellipse cx="0" cy="0" rx="18" ry="7" fill="url(#rotor-blur)" />
							<ellipse
								cx="0"
								cy="0"
								rx="18"
								ry="7"
								fill="none"
								stroke="#22c55e"
								strokeWidth="1"
								opacity="0.45"
							/>
							<g transform="scale(1, 0.38)">
								<g className="blade-spin-ccw">
									<line
										x1="-16"
										y1="0"
										x2="16"
										y2="0"
										stroke="#18181b"
										strokeWidth="2"
										strokeLinecap="round"
									/>
									<circle cx="0" cy="0" r="2.8" fill="#fde047" stroke="#18181b" strokeWidth="0.8" />
								</g>
							</g>
							<circle cx="18" cy="0" r="1.5" fill="#22c55e" className="beacon-light" />
						</g>
					</g>
				</g>

				{/* ==============================================================
             LAYER 2B: RIGHT RECON / TELEMETRY DRONE
             Center: (535, 230) — Inspecting SOFTWARE/VALUE flank
             ============================================================== */}
				<g id="scout-drone-right" className="scout-right-anim">
					{/* Downward Inspection Laser Fan Sweep (Cyan) */}
					<polygon
						points="535,240 495,385 575,395"
						fill="url(#scout-right-fan-grad)"
						className="scout-right-fan pointer-events-none"
					/>

					{/* Scout Drone Body */}
					<g transform="translate(535, 230)">
						<polygon
							points="0,-10 18,-2 0,10 -18,-2"
							fill="#18181b"
							stroke="#18181b"
							strokeWidth="1.4"
							strokeLinejoin="round"
						/>
						<polygon
							points="0,-14 12,-6 0,4 -12,-6"
							fill="#ded2bb"
							stroke="#18181b"
							strokeWidth="1.2"
							strokeLinejoin="round"
						/>
						<circle cx="0" cy="5" r="2.5" fill="#38bdf8" />
						<circle cx="0" cy="-15" r="1.5" fill="#fde047" className="beacon-light" />

						{/* Left Propeller (-26, -2) */}
						<line x1="-8" y1="-2" x2="-26" y2="-2" stroke="#18181b" strokeWidth="2" />
						<g transform="translate(-26, -2)">
							<ellipse cx="0" cy="0" rx="18" ry="7" fill="url(#rotor-blur)" />
							<ellipse
								cx="0"
								cy="0"
								rx="18"
								ry="7"
								fill="none"
								stroke="#38bdf8"
								strokeWidth="1"
								opacity="0.45"
							/>
							<g transform="scale(1, 0.38)">
								<g className="blade-spin-cw">
									<line
										x1="-16"
										y1="0"
										x2="16"
										y2="0"
										stroke="#18181b"
										strokeWidth="2"
										strokeLinecap="round"
									/>
									<circle cx="0" cy="0" r="2.8" fill="#fde047" stroke="#18181b" strokeWidth="0.8" />
								</g>
							</g>
							<circle cx="-18" cy="0" r="1.5" fill="#ef4444" className="beacon-light" />
						</g>

						{/* Right Propeller (26, -2) */}
						<line x1="8" y1="-2" x2="26" y2="-2" stroke="#18181b" strokeWidth="2" />
						<g transform="translate(26, -2)">
							<ellipse cx="0" cy="0" rx="18" ry="7" fill="url(#rotor-blur)" />
							<ellipse
								cx="0"
								cy="0"
								rx="18"
								ry="7"
								fill="none"
								stroke="#38bdf8"
								strokeWidth="1"
								opacity="0.45"
							/>
							<g transform="scale(1, 0.38)">
								<g className="blade-spin-ccw">
									<line
										x1="-16"
										y1="0"
										x2="16"
										y2="0"
										stroke="#18181b"
										strokeWidth="2"
										strokeLinecap="round"
									/>
									<circle cx="0" cy="0" r="2.8" fill="#fde047" stroke="#18181b" strokeWidth="0.8" />
								</g>
							</g>
							<circle cx="18" cy="0" r="1.5" fill="#22c55e" className="beacon-light" />
						</g>
					</g>
				</g>

				{/* ==============================================================
             LAYER 3: THE AUTONOMOUS HEAVY CONSTRUCTION DRONE & APEX BLOCK
             Carries the Crown Keystone Block into place!
             ============================================================== */}
				<g id="drone-flight-carrier" className="hero-drone-anim">
					{/* ------------------------------------------------------------
               3B. THE MOVING DOCKABLE APEX KEYSTONE BLOCK (Solid Isometric Box)
               ------------------------------------------------------------ */}
					<g id="apex-crown-block" transform="translate(360, 222)">
						{/* MECHANICAL ROBOTIC CLAW SUSPENSION CABLES & GRIPPERS */}
						<g id="drone-claws">
							{/* High-Tension Suspension Cables from Drone Belly (y=-66) to Claws */}
							<line x1="-14" y1="-66" x2="-19" y2="-6" stroke="#18181b" strokeWidth="1.8" />
							<line
								x1="-14"
								y1="-66"
								x2="-19"
								y2="-6"
								stroke="#ffffff"
								strokeWidth="0.8"
								opacity="0.7"
							/>

							<line x1="14" y1="-66" x2="19" y2="-6" stroke="#18181b" strokeWidth="1.8" />
							<line
								x1="14"
								y1="-66"
								x2="19"
								y2="-6"
								stroke="#ffffff"
								strokeWidth="0.8"
								opacity="0.7"
							/>

							{/* Left Articulated Gripper Jaw */}
							<path
								d="M -19,-11 L -24,-3 L -19,4 L -14,-4 Z"
								fill="url(#chrome-claw)"
								stroke="#18181b"
								strokeWidth="1.3"
								strokeLinejoin="round"
							/>
							<circle cx="-19" cy="-3" r="1.4" fill="#fde047" stroke="#18181b" strokeWidth="0.6" />

							{/* Right Articulated Gripper Jaw */}
							<path
								d="M 19,-11 L 24,-3 L 19,4 L 14,-4 Z"
								fill="url(#chrome-claw)"
								stroke="#18181b"
								strokeWidth="1.3"
								strokeLinejoin="round"
							/>
							<circle cx="19" cy="-3" r="1.4" fill="#fde047" stroke="#18181b" strokeWidth="0.6" />
						</g>

						{/* SOLID GOLD MONOLITHIC APEX BLOCK (Clean, Minimalist, Neubrutalist) */}
						<g id="gold-bullion-block">
							{/* Front-Left Face */}
							<polygon
								points="-19,-8.5 0,1 0,23 -19,13.5"
								fill="url(#gold-left)"
								stroke="#18181b"
								strokeWidth="1.6"
								strokeLinejoin="round"
							/>
							{/* Front-Right Face */}
							<polygon
								points="0,1 19,-8.5 19,13.5 0,23"
								fill="url(#gold-right)"
								stroke="#18181b"
								strokeWidth="1.6"
								strokeLinejoin="round"
							/>
							{/* Top Face */}
							<polygon
								points="0,-18 19,-8.5 0,1 -19,-8.5"
								fill="url(#gold-top)"
								stroke="#18181b"
								strokeWidth="1.6"
								strokeLinejoin="round"
							/>
						</g>
					</g>

					{/* ------------------------------------------------------------
               3C. THE HIGH-TECH HEAVY CONSTRUCTION DRONE
               Center of drone chassis: (360, 145)
               ------------------------------------------------------------ */}
					<g id="drone-aircraft" transform="translate(360, 145)">
						{/* 1. DRONE UNDERCARRIAGE WINCH & SUSPENSION BAY */}
						<rect
							x="-18"
							y="10"
							width="36"
							height="11"
							rx="3"
							fill="#09090b"
							stroke="#18181b"
							strokeWidth="1.4"
						/>
						<circle cx="-11" cy="15" r="2.2" fill="#fde047" stroke="#18181b" strokeWidth="0.8" />
						<circle cx="11" cy="15" r="2.2" fill="#fde047" stroke="#18181b" strokeWidth="0.8" />
						<rect x="-5" y="17" width="10" height="4" fill="#38bdf8" />

						{/* 2. FOUR CARBON-FIBER ROTOR ARMS */}
						<g id="drone-arms" stroke="#18181b" strokeWidth="2.2" strokeLinecap="round">
							{/* Arm 1: Rear-Left */}
							<line x1="-12" y1="-4" x2="-64" y2="-22" />
							<line x1="-12" y1="-4" x2="-64" y2="-22" stroke="#64748b" strokeWidth="1.2" />

							{/* Arm 2: Rear-Right */}
							<line x1="12" y1="-4" x2="64" y2="-22" />
							<line x1="12" y1="-4" x2="64" y2="-22" stroke="#64748b" strokeWidth="1.2" />

							{/* Arm 3: Front-Left */}
							<line x1="-14" y1="4" x2="-68" y2="18" />
							<line x1="-14" y1="4" x2="-68" y2="18" stroke="#94a3b8" strokeWidth="1.2" />

							{/* Arm 4: Front-Right */}
							<line x1="14" y1="4" x2="68" y2="18" />
							<line x1="14" y1="4" x2="68" y2="18" stroke="#94a3b8" strokeWidth="1.2" />
						</g>

						{/* 3. AERODYNAMIC CENTRAL FUSELAGE POD */}
						<g id="drone-body">
							{/* Lower Chassis Hull */}
							<polygon
								points="0,-18 32,-4 0,16 -32,-4"
								fill="url(#drone-cowl)"
								stroke="#18181b"
								strokeWidth="1.8"
								strokeLinejoin="round"
							/>
							{/* Upper Canopy / Cowl Deck */}
							<polygon
								points="0,-24 24,-10 0,6 -24,-10"
								fill="#ded2bb"
								stroke="#18181b"
								strokeWidth="1.6"
								strokeLinejoin="round"
							/>
							{/* High-Gloss Racing Accent Stripe (Warm Yellow) */}
							<polygon
								points="0,-24 8,-14 0,-4 -8,-14"
								fill="url(#drone-accent)"
								stroke="#18181b"
								strokeWidth="1.2"
								strokeLinejoin="round"
							/>

							{/* Forward Optical LiDAR / Sensor Eye (Glowing Cyan) */}
							<circle cx="0" cy="8" r="4.5" fill="#09090b" stroke="#18181b" strokeWidth="1.2" />
							<circle cx="0" cy="8" r="2.8" fill="#38bdf8" />
							<circle cx="-1" cy="7" r="1" fill="#ffffff" />

							{/* Top Telemetry Antenna Mast */}
							<line
								x1="0"
								y1="-24"
								x2="0"
								y2="-34"
								stroke="#18181b"
								strokeWidth="1.6"
								strokeLinecap="round"
							/>
							<circle cx="0" cy="-35" r="2" fill="#38bdf8" className="beacon-light" />
						</g>

						{/* 4. ROTOR PODS & CLEAN SOLID ROTOR DISCS */}
						{/* Rotor 1: Rear-Left (-64, -22) */}
						<g transform="translate(-64, -22)">
							<rect x="-5" y="-3" width="10" height="7" rx="2" fill="#18181b" />
							<ellipse cx="0" cy="0" rx="34" ry="13" fill="url(#rotor-blur)" />
							<ellipse
								cx="0"
								cy="0"
								rx="34"
								ry="13"
								fill="none"
								stroke="#38bdf8"
								strokeWidth="1"
								opacity="0.45"
							/>
							<g transform="scale(1, 0.38)">
								<g className="blade-spin-cw">
									<line
										x1="-30"
										y1="0"
										x2="30"
										y2="0"
										stroke="#18181b"
										strokeWidth="2.6"
										strokeLinecap="round"
									/>
									<circle cx="0" cy="0" r="4" fill="#fde047" stroke="#18181b" strokeWidth="0.8" />
								</g>
							</g>
							<circle cx="-34" cy="0" r="2" fill="#ef4444" className="beacon-light" />
						</g>

						{/* Rotor 2: Rear-Right (64, -22) */}
						<g transform="translate(64, -22)">
							<rect x="-5" y="-3" width="10" height="7" rx="2" fill="#18181b" />
							<ellipse cx="0" cy="0" rx="34" ry="13" fill="url(#rotor-blur)" />
							<ellipse
								cx="0"
								cy="0"
								rx="34"
								ry="13"
								fill="none"
								stroke="#38bdf8"
								strokeWidth="1"
								opacity="0.45"
							/>
							<g transform="scale(1, 0.38)">
								<g className="blade-spin-ccw">
									<line
										x1="-30"
										y1="0"
										x2="30"
										y2="0"
										stroke="#18181b"
										strokeWidth="2.6"
										strokeLinecap="round"
									/>
									<circle cx="0" cy="0" r="4" fill="#fde047" stroke="#18181b" strokeWidth="0.8" />
								</g>
							</g>
							<circle cx="34" cy="0" r="2" fill="#22c55e" className="beacon-light" />
						</g>

						{/* Rotor 3: Front-Left (-68, 18) */}
						<g transform="translate(-68, 18)">
							<rect x="-6" y="-3" width="12" height="8" rx="2" fill="#18181b" />
							<ellipse cx="0" cy="0" rx="38" ry="14" fill="url(#rotor-blur)" />
							<ellipse
								cx="0"
								cy="0"
								rx="38"
								ry="14"
								fill="none"
								stroke="#38bdf8"
								strokeWidth="1.1"
								opacity="0.5"
							/>
							<g transform="scale(1, 0.38)">
								<g className="blade-spin-ccw">
									<line
										x1="-34"
										y1="0"
										x2="34"
										y2="0"
										stroke="#18181b"
										strokeWidth="2.8"
										strokeLinecap="round"
									/>
									<circle cx="0" cy="0" r="4.5" fill="#fde047" stroke="#18181b" strokeWidth="0.8" />
								</g>
							</g>
							<circle cx="-38" cy="0" r="2.2" fill="#ef4444" className="beacon-light" />
						</g>

						{/* Rotor 4: Front-Right (68, 18) */}
						<g transform="translate(68, 18)">
							<rect x="-6" y="-3" width="12" height="8" rx="2" fill="#18181b" />
							<ellipse cx="0" cy="0" rx="38" ry="14" fill="url(#rotor-blur)" />
							<ellipse
								cx="0"
								cy="0"
								rx="38"
								ry="14"
								fill="none"
								stroke="#38bdf8"
								strokeWidth="1.1"
								opacity="0.5"
							/>
							<g transform="scale(1, 0.38)">
								<g className="blade-spin-cw">
									<line
										x1="-34"
										y1="0"
										x2="34"
										y2="0"
										stroke="#18181b"
										strokeWidth="2.8"
										strokeLinecap="round"
									/>
									<circle cx="0" cy="0" r="4.5" fill="#fde047" stroke="#18181b" strokeWidth="0.8" />
								</g>
							</g>
							<circle cx="38" cy="0" r="2.2" fill="#22c55e" className="beacon-light" />
						</g>
					</g>
				</g>

				{/* ==============================================================
             LAYER 4: VALUE DOCKING SLOT FRONT LIP
             Rendered in front of the carrier so the Apex Block physically
             seats INSIDE the recessed slot cavity (Bento 03 Style)!
             ============================================================== */}
				<g id="value-slot-front-lip">
					<line
						x1="340"
						y1="306"
						x2="360"
						y2="316"
						stroke="#18181b"
						strokeWidth="1.8"
						strokeLinecap="round"
					/>
					<line
						x1="360"
						y1="316"
						x2="380"
						y2="306"
						stroke="#18181b"
						strokeWidth="1.8"
						strokeLinecap="round"
					/>
				</g>
			</svg>
		</div>
	);
}
