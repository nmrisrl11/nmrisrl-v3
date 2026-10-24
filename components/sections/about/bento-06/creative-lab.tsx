"use client";

import { useEffect, useRef, useState } from "react";

interface CreativeLabProps {
	className?: string;
}

export function CreativeLab({ className }: CreativeLabProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const [isVisible, setIsVisible] = useState(false);

	// Viewport Observer: Pause CSS animations when off-screen to free 100% GPU/CPU and prevent memory leaks
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
				viewBox="40 35 720 380"
				fill="none"
				className={`h-auto w-full max-w-76 overflow-visible drop-shadow-sm sm:max-w-100 md:max-w-110 lg:max-w-120 xl:max-w-lg ${
					!isVisible ? "lab-paused" : ""
				}`}
				role="img"
				aria-label="Off-Duty and Interests Creative Specimen Laboratory 3D Model"
			>
				<defs>
					{/* 1. Warm Stone Platform Materials (Synced with Bento 01-05 Base) */}
					<linearGradient id="lab-stone-left" x1="0%" y1="0%" x2="100%" y2="100%">
						<stop offset="0%" stopColor="#ded2bb" />
						<stop offset="100%" stopColor="#c5b699" />
					</linearGradient>
					<linearGradient id="lab-stone-right" x1="0%" y1="0%" x2="100%" y2="100%">
						<stop offset="0%" stopColor="#b8a88a" />
						<stop offset="100%" stopColor="#9d8f74" />
					</linearGradient>

					{/* 2. Signature Sage Green Platform Deck (Synced with Bento 01-05 Deck) */}
					<linearGradient id="lab-sage-deck" x1="0%" y1="0%" x2="100%" y2="100%">
						<stop offset="0%" stopColor="#a6c8b2" />
						<stop offset="100%" stopColor="#9bbfa8" />
					</linearGradient>

					{/* 3. Stasis Chamber Rear Fluid Glow Gradients */}
					<linearGradient id="lab-fluid-back-coral" x1="0%" y1="0%" x2="100%" y2="0%">
						<stop offset="0%" stopColor="#ff6b57" stopOpacity="0.18" />
						<stop offset="50%" stopColor="#ff6b57" stopOpacity="0.06" />
						<stop offset="100%" stopColor="#ff6b57" stopOpacity="0.18" />
					</linearGradient>

					<linearGradient id="lab-fluid-back-sky" x1="0%" y1="0%" x2="100%" y2="0%">
						<stop offset="0%" stopColor="#38bdf8" stopOpacity="0.20" />
						<stop offset="50%" stopColor="#38bdf8" stopOpacity="0.06" />
						<stop offset="100%" stopColor="#38bdf8" stopOpacity="0.20" />
					</linearGradient>

					<linearGradient id="lab-fluid-back-lavender" x1="0%" y1="0%" x2="100%" y2="0%">
						<stop offset="0%" stopColor="#a855f7" stopOpacity="0.18" />
						<stop offset="50%" stopColor="#a855f7" stopOpacity="0.06" />
						<stop offset="100%" stopColor="#a855f7" stopOpacity="0.18" />
					</linearGradient>

					{/* 4. Front Glass Reflection Overlay */}
					<linearGradient id="lab-glass-glare" x1="0%" y1="0%" x2="100%" y2="0%">
						<stop offset="0%" stopColor="#ffffff" stopOpacity="0.25" />
						<stop offset="25%" stopColor="#ffffff" stopOpacity="0.05" />
						<stop offset="70%" stopColor="#ffffff" stopOpacity="0.0" />
						<stop offset="100%" stopColor="#ffffff" stopOpacity="0.15" />
					</linearGradient>

					{/* Fluid Glow Radial Filters */}
					<radialGradient id="lab-coral-glow" cx="50%" cy="50%" r="50%">
						<stop offset="0%" stopColor="#ff6b57" stopOpacity="0.6" />
						<stop offset="70%" stopColor="#ff6b57" stopOpacity="0.15" />
						<stop offset="100%" stopColor="#ff6b57" stopOpacity="0" />
					</radialGradient>

					<radialGradient id="lab-sky-glow" cx="50%" cy="50%" r="50%">
						<stop offset="0%" stopColor="#38bdf8" stopOpacity="0.65" />
						<stop offset="70%" stopColor="#38bdf8" stopOpacity="0.18" />
						<stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
					</radialGradient>

					<radialGradient id="lab-lavender-glow" cx="50%" cy="50%" r="50%">
						<stop offset="0%" stopColor="#c084fc" stopOpacity="0.6" />
						<stop offset="70%" stopColor="#c084fc" stopOpacity="0.15" />
						<stop offset="100%" stopColor="#c084fc" stopOpacity="0" />
					</radialGradient>

					<style>{`
						/* Pure Compositor Keyframe Animations: 0 Layout Reflows / 60 FPS */
						.lab-paused * {
							animation-play-state: paused !important;
						}

						/* 1. Pod 01: ECG Heartbeat Rhythm Pulse (Seamless Lub-Dub with Diastolic Rest) */
						@keyframes ecg-heartbeat-pulse {
							0% { transform: scale(1); opacity: 0.85; }
							14% { transform: scale(1.06); opacity: 1; }
							22% { transform: scale(0.98); opacity: 0.88; }
							32% { transform: scale(1.12); opacity: 1; }
							44% { transform: scale(0.98); opacity: 0.88; }
							56% { transform: scale(1); opacity: 0.85; }
							100% { transform: scale(1); opacity: 0.85; }
						}

						.ecg-pulse-anim {
							animation: ecg-heartbeat-pulse 1.8s ease-in-out infinite;
							transform-origin: 0px 0px;
							will-change: transform, opacity;
						}

						/* Floating bobbing motions inside stasis pods */
						@keyframes pod-float-subtle-1 {
							0%, 100% { transform: translateY(0px); }
							50% { transform: translateY(-6px); }
						}

						@keyframes pod-float-subtle-2 {
							0%, 100% { transform: translateY(0px) rotate(0deg); }
							50% { transform: translateY(-7px) rotate(-1.5deg); }
						}

						@keyframes pod-float-subtle-3 {
							0%, 100% { transform: translateY(0px) scale(1); }
							50% { transform: translateY(-5px) scale(1.02); }
						}

						/* ECG Electric Scan Beam - Seamless sweeping pulse without jump */
						@keyframes ecg-scan-sweep {
							0% { stroke-dashoffset: 28; opacity: 0; }
							6% { opacity: 1; }
							78% { opacity: 1; }
							90%, 100% { stroke-dashoffset: -150; opacity: 0; }
						}

						.ecg-scan-beam {
							stroke-dasharray: 28 150;
							animation: ecg-scan-sweep 1.8s ease-in-out infinite;
						}

						/* Peak Node Cardiac Flash */
						@keyframes ecg-node-beacon {
							0%, 24% { transform: scale(1); opacity: 0.8; }
							32% { transform: scale(1.45); opacity: 1; }
							44% { transform: scale(1); opacity: 0.8; }
							100% { transform: scale(1); opacity: 0.8; }
						}

						.ecg-node-anim {
							animation: ecg-node-beacon 1.8s ease-in-out infinite;
							transform-origin: 2px -18px;
							will-change: transform, opacity;
						}

						/* Conduit pulse track - Exact integer period multiple (period = 10px, shift = -20px) = ZERO jump */
						@keyframes conduit-stream {
							from { stroke-dashoffset: 0; }
							to { stroke-dashoffset: -20; }
						}

						.conduit-flow {
							stroke-dasharray: 4 6;
							animation: conduit-stream 1.2s linear infinite;
						}

						/* Vector anchor handle breathing */
						@keyframes vector-box-pulse {
							0%, 100% { opacity: 0.75; transform: scale(1); }
							50% { opacity: 1; transform: scale(1.03); }
						}

						/* Beacon LED */
						@keyframes beacon-blink {
							0%, 48% { opacity: 1; }
							50%, 98% { opacity: 0.25; }
						}

						/* Animation Classes */
						.pod-float-1 {
							animation: pod-float-subtle-1 3.6s ease-in-out infinite;
							will-change: transform;
						}

						.pod-float-2 {
							animation: pod-float-subtle-2 4.2s ease-in-out infinite;
							will-change: transform;
						}

						.pod-float-3 {
							animation: pod-float-subtle-3 3.8s ease-in-out -1.2s infinite;
							will-change: transform;
						}

						.vector-box-anim {
							animation: vector-box-pulse 3.4s ease-in-out infinite;
							transform-origin: 0px 0px;
							will-change: transform, opacity;
						}

						.beacon-light {
							animation: beacon-blink 1.0s steps(1) infinite;
						}

						@media (prefers-reduced-motion: reduce) {
							.ecg-pulse-anim,
							.pod-float-1,
							.pod-float-2,
							.pod-float-3,
							.ecg-scan-beam,
							.ecg-node-anim,
							.conduit-flow,
							.vector-box-anim,
							.beacon-light {
								animation: none !important;
							}
						}
					`}</style>
				</defs>

				{/* ==============================================================
				     LAYER 1: MAIN WORKBENCH PLATFORM (Shared Stone & Sage Deck)
				     ============================================================== */}
				<g id="laboratory-base-platform">
					{/* Front-Left Stone Face */}
					<polygon
						points="100,265 400,355 400,383 100,293"
						fill="url(#lab-stone-left)"
						stroke="#18181b"
						strokeWidth="1.8"
						strokeLinejoin="round"
					/>
					{/* Front-Right Stone Face */}
					<polygon
						points="400,355 700,265 700,293 400,383"
						fill="url(#lab-stone-right)"
						stroke="#18181b"
						strokeWidth="1.8"
						strokeLinejoin="round"
					/>

					{/* Bottom Sub-base Plinth (Ink Black) */}
					<polygon
						points="100,288 400,378 400,383 100,293"
						fill="#18181b"
						stroke="#18181b"
						strokeWidth="1.4"
						strokeLinejoin="round"
					/>
					<polygon
						points="400,378 700,288 700,293 400,383"
						fill="#09090b"
						stroke="#18181b"
						strokeWidth="1.4"
						strokeLinejoin="round"
					/>

					{/* Top Signature Sage Green Platform Deck */}
					<polygon
						points="400,175 700,265 400,355 100,265"
						fill="#9bbfa8"
						stroke="#18181b"
						strokeWidth="1.8"
						strokeLinejoin="round"
					/>

					{/* Inset Milling Accent Groove on Sage Deck */}
					<polygon
						points="400,183 688,265 400,347 112,265"
						fill="none"
						stroke="#ede6d8"
						strokeWidth="1.2"
						opacity="0.55"
					/>

					{/* Platform Label Centered Vertically & Horizontally on Front-Left Stone Face */}
					<g transform="translate(250, 321.5) matrix(1, 0.3, 0, 1, 0, 0)">
						<rect
							x="-42"
							y="-5.5"
							width="84"
							height="11"
							rx="2.5"
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
							letterSpacing="0.1em"
						>
							BIO-DIGITAL // LAB 06
						</text>
					</g>

					{/* Central Distribution Hub Junction Box Base (Precision Isometric Hexagon) */}
					<g id="central-cable-junction">
						<polygon
							points="400,285 422,293 400,301 378,293"
							fill="#27272a"
							stroke="#18181b"
							strokeWidth="1.4"
							strokeLinejoin="round"
						/>
						<polygon
							points="378,293 400,301 400,311 378,303"
							fill="#18181b"
							stroke="#18181b"
							strokeWidth="1.4"
							strokeLinejoin="round"
						/>
						<polygon
							points="400,301 422,293 422,303 400,311"
							fill="#09090b"
							stroke="#18181b"
							strokeWidth="1.4"
							strokeLinejoin="round"
						/>

						{/* Recessed Central Status LED Indicator */}
						<ellipse
							cx="400"
							cy="293"
							rx="4.5"
							ry="2.0"
							fill="#18181b"
							stroke="#3f3f46"
							strokeWidth="0.8"
						/>
						<ellipse cx="400" cy="293" rx="2.8" ry="1.2" fill="#22c55e" />
						<circle cx="400" cy="293" r="0.8" fill="#ffffff" />

						{/* Hub Receptacle Port Flanges */}
						{/* Rear Port Socket Flange (Middle Pod) */}
						<ellipse
							cx="400"
							cy="285"
							rx="6.5"
							ry="2.8"
							fill="#18181b"
							stroke="#18181b"
							strokeWidth="1.2"
						/>
						<ellipse cx="400" cy="285" rx="4.8" ry="2.0" fill="#09090b" />

						{/* Left Port Socket Flange (Pod 01) */}
						<polygon
							points="375,294 378,293 378,303 375,302"
							fill="#18181b"
							stroke="#18181b"
							strokeWidth="1.2"
							strokeLinejoin="round"
						/>
						<ellipse
							cx="375"
							cy="298"
							rx="2.0"
							ry="4.0"
							fill="#09090b"
							stroke="#18181b"
							strokeWidth="1.2"
						/>

						{/* Right Port Socket Flange (Pod 03) */}
						<polygon
							points="422,293 425,294 425,302 422,303"
							fill="#18181b"
							stroke="#18181b"
							strokeWidth="1.2"
							strokeLinejoin="round"
						/>
						<ellipse
							cx="425"
							cy="298"
							rx="2.0"
							ry="4.0"
							fill="#09090b"
							stroke="#18181b"
							strokeWidth="1.2"
						/>
					</g>
				</g>

				{/* ==============================================================
				     LAYER 2: HEAVY INDUSTRIAL CONNECTING CONDUITS & CABLES
				     ============================================================== */}
				<g id="interconnecting-conduits">
					{/* 1. Left Cable: Pod 01 collar (268, 273) to Plug (363, 298) */}
					<path
						d="M 268,273 C 298,288 335,298 363,298"
						fill="none"
						stroke="#18181b"
						strokeWidth="4.5"
						strokeLinecap="round"
					/>
					<path
						d="M 268,273 C 298,288 335,298 363,298"
						fill="none"
						stroke="#ff6b57"
						strokeWidth="1.5"
						strokeLinecap="round"
						opacity="0.85"
					/>
					<path
						d="M 268,273 C 298,288 335,298 363,298"
						fill="none"
						stroke="#ffffff"
						strokeWidth="1.0"
						strokeDasharray="4 6"
						className="conduit-flow"
						opacity="0.9"
					/>

					{/* 2. Middle Cable: Pod 02 collar (400, 238) to Plug (400, 276) */}
					<line
						x1="400"
						y1="238"
						x2="400"
						y2="276"
						stroke="#18181b"
						strokeWidth="4.5"
						strokeLinecap="round"
					/>
					<line
						x1="400"
						y1="238"
						x2="400"
						y2="276"
						stroke="#38bdf8"
						strokeWidth="1.5"
						strokeLinecap="round"
						opacity="0.85"
					/>
					<line
						x1="400"
						y1="238"
						x2="400"
						y2="276"
						stroke="#ffffff"
						strokeWidth="1.0"
						strokeDasharray="4 6"
						className="conduit-flow"
						opacity="0.9"
					/>

					{/* 3. Right Cable: Pod 03 collar (532, 273) to Plug (437, 298) */}
					<path
						d="M 532,273 C 502,288 465,298 437,298"
						fill="none"
						stroke="#18181b"
						strokeWidth="4.5"
						strokeLinecap="round"
					/>
					<path
						d="M 532,273 C 502,288 465,298 437,298"
						fill="none"
						stroke="#c084fc"
						strokeWidth="1.5"
						strokeLinecap="round"
						opacity="0.85"
					/>
					<path
						d="M 532,273 C 502,288 465,298 437,298"
						fill="none"
						stroke="#ffffff"
						strokeWidth="1.0"
						strokeDasharray="4 6"
						className="conduit-flow"
						opacity="0.9"
					/>

					{/* Pod-End Gland Collars */}
					<ellipse
						cx="268"
						cy="273"
						rx="3.5"
						ry="5.5"
						fill="#52525b"
						stroke="#18181b"
						strokeWidth="1.1"
					/>
					<ellipse
						cx="400"
						cy="238"
						rx="5.5"
						ry="2.4"
						fill="#52525b"
						stroke="#18181b"
						strokeWidth="1.1"
					/>
					<ellipse
						cx="532"
						cy="273"
						rx="3.5"
						ry="5.5"
						fill="#52525b"
						stroke="#18181b"
						strokeWidth="1.1"
					/>

					{/* SOLID INDUSTRIAL CONNECTOR PLUGS (MALE PLUGS) */}
					{/* 1. Left Plug (Pod 01 - Coral) */}
					<g id="plug-pod-01">
						<rect
							x="363"
							y="294"
							width="13"
							height="8"
							rx="2"
							fill="#52525b"
							stroke="#18181b"
							strokeWidth="1.3"
						/>
						<line x1="367" y1="295" x2="367" y2="301" stroke="#3f3f46" strokeWidth="1.0" />
						<line x1="370" y1="295" x2="370" y2="301" stroke="#3f3f46" strokeWidth="1.0" />
						<rect x="364.5" y="295.5" width="2" height="5" rx="0.5" fill="#ff6b57" />
						<ellipse
							cx="363"
							cy="298"
							rx="2.0"
							ry="3.8"
							fill="#3f3f46"
							stroke="#18181b"
							strokeWidth="1.1"
						/>
					</g>

					{/* 2. Middle Plug (Pod 02 - Cyan) */}
					<g id="plug-pod-02">
						<rect
							x="396"
							y="276"
							width="8"
							height="10"
							rx="2"
							fill="#52525b"
							stroke="#18181b"
							strokeWidth="1.3"
						/>
						<line x1="397" y1="280" x2="403" y2="280" stroke="#3f3f46" strokeWidth="1.0" />
						<line x1="397" y1="283" x2="403" y2="283" stroke="#3f3f46" strokeWidth="1.0" />
						<rect x="397" y="277.5" width="6" height="1.8" rx="0.4" fill="#38bdf8" />
						<ellipse
							cx="400"
							cy="276"
							rx="3.8"
							ry="1.8"
							fill="#3f3f46"
							stroke="#18181b"
							strokeWidth="1.1"
						/>
					</g>

					{/* 3. Right Plug (Pod 03 - Lavender) */}
					<g id="plug-pod-03">
						<rect
							x="424"
							y="294"
							width="13"
							height="8"
							rx="2"
							fill="#52525b"
							stroke="#18181b"
							strokeWidth="1.3"
						/>
						<line x1="430" y1="295" x2="430" y2="301" stroke="#3f3f46" strokeWidth="1.0" />
						<line x1="433" y1="295" x2="433" y2="301" stroke="#3f3f46" strokeWidth="1.0" />
						<rect x="433.5" y="295.5" width="2" height="5" rx="0.5" fill="#c084fc" />
						<ellipse
							cx="437"
							cy="298"
							rx="2.0"
							ry="3.8"
							fill="#3f3f46"
							stroke="#18181b"
							strokeWidth="1.1"
						/>
					</g>
				</g>

				{/* ==============================================================
				     LAYER 3A: POD 02 (GAME DEV / RETRO GAMEPAD — Center Flagship, x=400, y=215)
				     Rendered first for physically accurate painter's algorithm depth sorting
				     ============================================================== */}
				<g id="stasis-pod-02-gamedev">
					{/* Base Pedestal (x=400, y=215, rx=38, ry=15.5) */}
					<ellipse
						cx="400"
						cy="223"
						rx="38"
						ry="15.5"
						fill="#09090b"
						stroke="#18181b"
						strokeWidth="1.8"
					/>
					<path
						d="M 362,215 L 362,223 A 38 15.5 0 0 0 438,223 L 438,215 Z"
						fill="#27272a"
						stroke="#18181b"
						strokeWidth="1.8"
					/>
					<ellipse
						cx="400"
						cy="215"
						rx="38"
						ry="15.5"
						fill="#ded2bb"
						stroke="#18181b"
						strokeWidth="1.8"
					/>
					<ellipse cx="400" cy="213" rx="30" ry="12" fill="#18181b" />
					<ellipse cx="400" cy="213" rx="24" ry="10" fill="url(#lab-sky-glow)" />

					{/* Rear Fluid Wall */}
					<path
						d="M 362,93 L 362,215 A 38 15.5 0 0 0 438,215 L 438,93 Z"
						fill="url(#lab-fluid-back-sky)"
					/>

					{/* Holographic Specimen: Floating Retro Gamepad */}
					<g transform="translate(400, 154)">
						<g className="pod-float-2">
							<g transform="rotate(-6)">
								<rect
									x="-28"
									y="-13"
									width="56"
									height="26"
									rx="10"
									fill="#0284c7"
									stroke="#18181b"
									strokeWidth="1.8"
								/>
								<rect
									x="-26"
									y="-11"
									width="52"
									height="22"
									rx="8"
									fill="#38bdf8"
									stroke="#ffffff"
									strokeWidth="1.3"
								/>

								{/* Left D-PAD Cross */}
								<g transform="translate(-14, -2)">
									<rect x="-7" y="-2.5" width="14" height="5" rx="1" fill="#18181b" />
									<rect x="-2.5" y="-7" width="5" height="14" rx="1" fill="#18181b" />
									<circle cx="0" cy="0" r="1.4" fill="#fde047" />
								</g>

								{/* Dual Analog Thumbsticks */}
								<circle cx="-6" cy="5" r="3.2" fill="#18181b" stroke="#ffffff" strokeWidth="0.8" />
								<circle cx="-6" cy="5" r="1.6" fill="#64748b" />
								<circle cx="6" cy="5" r="3.2" fill="#18181b" stroke="#ffffff" strokeWidth="0.8" />
								<circle cx="6" cy="5" r="1.6" fill="#64748b" />

								{/* Center Select / Start Buttons */}
								<line
									x1="-3"
									y1="-2"
									x2="-1"
									y2="-2"
									stroke="#18181b"
									strokeWidth="1.6"
									strokeLinecap="round"
								/>
								<line
									x1="1"
									y1="-2"
									x2="3"
									y2="-2"
									stroke="#18181b"
									strokeWidth="1.6"
									strokeLinecap="round"
								/>

								{/* Right Diamond Action Buttons (A, B, X, Y) */}
								<g transform="translate(14, -2)">
									<circle
										cx="0"
										cy="-4.5"
										r="2.0"
										fill="#fde047"
										stroke="#18181b"
										strokeWidth="0.7"
									/>
									<circle
										cx="4.5"
										cy="0"
										r="2.0"
										fill="#ff6b57"
										stroke="#18181b"
										strokeWidth="0.7"
									/>
									<circle
										cx="0"
										cy="4.5"
										r="2.0"
										fill="#22c55e"
										stroke="#18181b"
										strokeWidth="0.7"
									/>
									<circle
										cx="-4.5"
										cy="0"
										r="2.0"
										fill="#a855f7"
										stroke="#18181b"
										strokeWidth="0.7"
									/>
								</g>

								{/* Top Shoulder Bumpers L/R */}
								<rect
									x="-22"
									y="-15"
									width="13"
									height="3.5"
									rx="1.2"
									fill="#18181b"
									stroke="#ffffff"
									strokeWidth="0.8"
								/>
								<rect
									x="9"
									y="-15"
									width="13"
									height="3.5"
									rx="1.2"
									fill="#18181b"
									stroke="#ffffff"
									strokeWidth="0.8"
								/>
							</g>
						</g>
					</g>

					{/* Front Cylinder Glass Outline & Specular Glare */}
					<path
						d="M 362,93 L 362,215 A 38 15.5 0 0 0 438,215 L 438,93"
						fill="url(#lab-glass-glare)"
						stroke="#18181b"
						strokeWidth="1.6"
					/>
					<line
						x1="371"
						y1="103"
						x2="371"
						y2="196"
						stroke="#ffffff"
						strokeWidth="3.2"
						strokeLinecap="round"
						opacity="0.6"
					/>
					<line
						x1="377"
						y1="109"
						x2="377"
						y2="186"
						stroke="#ffffff"
						strokeWidth="1.4"
						strokeLinecap="round"
						opacity="0.32"
					/>

					{/* Glass Top & Bottom Rim Rings */}
					<ellipse
						cx="400"
						cy="215"
						rx="38"
						ry="15.5"
						fill="none"
						stroke="#18181b"
						strokeWidth="1.6"
					/>
					<ellipse
						cx="400"
						cy="93"
						rx="38"
						ry="15.5"
						fill="none"
						stroke="#18181b"
						strokeWidth="1.6"
					/>

					{/* Top Industrial Canopy Cap */}
					<path
						d="M 362,85 L 362,93 A 38 15.5 0 0 0 438,93 L 438,85 Z"
						fill="#27272a"
						stroke="#18181b"
						strokeWidth="1.8"
					/>
					<ellipse
						cx="400"
						cy="85"
						rx="38"
						ry="15.5"
						fill="#ded2bb"
						stroke="#18181b"
						strokeWidth="1.8"
					/>
					<ellipse
						cx="400"
						cy="80"
						rx="25"
						ry="10"
						fill="#18181b"
						stroke="#18181b"
						strokeWidth="1.2"
					/>
					<circle cx="400" cy="80" r="3.4" fill="#38bdf8" stroke="#18181b" strokeWidth="0.8" />
					<circle cx="400" cy="80" r="1.6" fill="#ffffff" className="beacon-light" />
				</g>

				{/* ==============================================================
				     LAYER 3B: POD 01 (RUNNING & CADENCE — Left Chamber, x=240, y=265)
				     ============================================================== */}
				<g id="stasis-pod-01-running">
					{/* Base Pedestal (x=240, y=265, rx=34, ry=14) */}
					<ellipse
						cx="240"
						cy="273"
						rx="34"
						ry="14"
						fill="#09090b"
						stroke="#18181b"
						strokeWidth="1.8"
					/>
					<path
						d="M 206,265 L 206,273 A 34 14 0 0 0 274,273 L 274,265 Z"
						fill="#27272a"
						stroke="#18181b"
						strokeWidth="1.8"
					/>
					<ellipse
						cx="240"
						cy="265"
						rx="34"
						ry="14"
						fill="#ded2bb"
						stroke="#18181b"
						strokeWidth="1.8"
					/>
					<ellipse cx="240" cy="263" rx="27" ry="11" fill="#18181b" />
					<ellipse cx="240" cy="263" rx="22" ry="9" fill="url(#lab-coral-glow)" />

					{/* Rear Fluid Wall */}
					<path
						d="M 206,155 L 206,265 A 34 14 0 0 0 274,265 L 274,155 Z"
						fill="url(#lab-fluid-back-coral)"
					/>

					{/* Holographic Specimen: Glowing Horizontal ECG Pulse Wave */}
					<g transform="translate(240, 210)">
						<g className="pod-float-1">
							<g className="ecg-pulse-anim">
								{/* Background Glow Trace */}
								<path
									d="M -26,0 L -14,0 L -11,2 L -8,-2 L -5,0 L -2,6 L 2,-18 L 6,10 L 9,0 L 13,0 L 15,-3 L 17,0 L 26,0"
									fill="none"
									stroke="#ff6b57"
									strokeWidth="3.2"
									strokeLinecap="round"
									strokeLinejoin="round"
									opacity="0.3"
								/>
								{/* Sharp Baseline Neon Coral Line */}
								<path
									d="M -26,0 L -14,0 L -11,2 L -8,-2 L -5,0 L -2,6 L 2,-18 L 6,10 L 9,0 L 13,0 L 15,-3 L 17,0 L 26,0"
									fill="none"
									stroke="#ff6b57"
									strokeWidth="1.8"
									strokeLinecap="round"
									strokeLinejoin="round"
									opacity="0.75"
								/>
								{/* Core White Filament */}
								<path
									d="M -26,0 L -14,0 L -11,2 L -8,-2 L -5,0 L -2,6 L 2,-18 L 6,10 L 9,0 L 13,0 L 15,-3 L 17,0 L 26,0"
									fill="none"
									stroke="#ffffff"
									strokeWidth="0.9"
									opacity="0.85"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								{/* Seamless Sweeping Pulse Beam (Zero Jumps) */}
								<path
									className="ecg-scan-beam"
									d="M -26,0 L -14,0 L -11,2 L -8,-2 L -5,0 L -2,6 L 2,-18 L 6,10 L 9,0 L 13,0 L 15,-3 L 17,0 L 26,0"
									fill="none"
									stroke="#ffffff"
									strokeWidth="2.2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								{/* Pulsing Heartbeat Node (Synchronized Flash) */}
								<circle
									className="ecg-node-anim"
									cx="2"
									cy="-18"
									r="2.2"
									fill="#ffffff"
									stroke="#ff6b57"
									strokeWidth="0.8"
								/>
							</g>
						</g>
					</g>

					{/* Front Cylinder Glass Outline & Specular Glare */}
					<path
						d="M 206,155 L 206,265 A 34 14 0 0 0 274,265 L 274,155"
						fill="url(#lab-glass-glare)"
						stroke="#18181b"
						strokeWidth="1.6"
					/>
					<line
						x1="213"
						y1="163"
						x2="213"
						y2="246"
						stroke="#ffffff"
						strokeWidth="3.0"
						strokeLinecap="round"
						opacity="0.55"
					/>
					<line
						x1="218"
						y1="169"
						x2="218"
						y2="236"
						stroke="#ffffff"
						strokeWidth="1.2"
						strokeLinecap="round"
						opacity="0.3"
					/>

					{/* Glass Top & Bottom Rim Rings */}
					<ellipse
						cx="240"
						cy="265"
						rx="34"
						ry="14"
						fill="none"
						stroke="#18181b"
						strokeWidth="1.6"
					/>
					<ellipse
						cx="240"
						cy="155"
						rx="34"
						ry="14"
						fill="none"
						stroke="#18181b"
						strokeWidth="1.6"
					/>

					{/* Top Industrial Canopy Cap */}
					<path
						d="M 206,147 L 206,155 A 34 14 0 0 0 274,155 L 274,147 Z"
						fill="#27272a"
						stroke="#18181b"
						strokeWidth="1.8"
					/>
					<ellipse
						cx="240"
						cy="147"
						rx="34"
						ry="14"
						fill="#ded2bb"
						stroke="#18181b"
						strokeWidth="1.8"
					/>
					<ellipse
						cx="240"
						cy="143"
						rx="22"
						ry="9"
						fill="#18181b"
						stroke="#18181b"
						strokeWidth="1.2"
					/>
					<circle cx="240" cy="143" r="3.2" fill="#ff6b57" stroke="#18181b" strokeWidth="0.8" />
					<circle cx="240" cy="143" r="1.5" fill="#ffffff" className="beacon-light" />
				</g>

				{/* ==============================================================
				     LAYER 3C: POD 03 (CHARACTER ART / 2D BUST — Right Chamber, x=560, y=265)
				     ============================================================== */}
				<g id="stasis-pod-03-character-art">
					{/* Base Pedestal (x=560, y=265, rx=34, ry=14) */}
					<ellipse
						cx="560"
						cy="273"
						rx="34"
						ry="14"
						fill="#09090b"
						stroke="#18181b"
						strokeWidth="1.8"
					/>
					<path
						d="M 526,265 L 526,273 A 34 14 0 0 0 594,273 L 594,265 Z"
						fill="#27272a"
						stroke="#18181b"
						strokeWidth="1.8"
					/>
					<ellipse
						cx="560"
						cy="265"
						rx="34"
						ry="14"
						fill="#ded2bb"
						stroke="#18181b"
						strokeWidth="1.8"
					/>
					<ellipse cx="560" cy="263" rx="27" ry="11" fill="#18181b" />
					<ellipse cx="560" cy="263" rx="22" ry="9" fill="url(#lab-lavender-glow)" />

					{/* Rear Fluid Wall */}
					<path
						d="M 526,155 L 526,265 A 34 14 0 0 0 594,265 L 594,155 Z"
						fill="url(#lab-fluid-back-lavender)"
					/>

					{/* Holographic Specimen: 2D Character Bust Wireframe */}
					<g transform="translate(560, 210)">
						<g className="pod-float-3">
							{/* Vector Selection Bounding Frame with Corner Anchor Handles */}
							<g className="vector-box-anim">
								<rect
									x="-24"
									y="-26"
									width="48"
									height="50"
									rx="3"
									fill="none"
									stroke="#a855f7"
									strokeWidth="1.1"
									strokeDasharray="3 3"
									opacity="0.85"
								/>
								<rect
									x="-26"
									y="-28"
									width="4.5"
									height="4.5"
									fill="#ffffff"
									stroke="#a855f7"
									strokeWidth="0.8"
								/>
								<rect
									x="21.5"
									y="-28"
									width="4.5"
									height="4.5"
									fill="#ffffff"
									stroke="#a855f7"
									strokeWidth="0.8"
								/>
								<rect
									x="-26"
									y="21.5"
									width="4.5"
									height="4.5"
									fill="#ffffff"
									stroke="#a855f7"
									strokeWidth="0.8"
								/>
								<rect
									x="21.5"
									y="21.5"
									width="4.5"
									height="4.5"
									fill="#ffffff"
									stroke="#a855f7"
									strokeWidth="0.8"
								/>
							</g>

							{/* Stylized Anime / Indie Character Head & Bust Wireframe */}
							<g transform="translate(0, -3)">
								<path
									d="M -15,18 L -11,9 L -5,11 L 0,7 L 5,11 L 11,9 L 15,18 Z"
									fill="#2e1065"
									stroke="#c084fc"
									strokeWidth="1.6"
									strokeLinejoin="round"
								/>
								<line x1="0" y1="7" x2="0" y2="18" stroke="#ffffff" strokeWidth="1.4" />
								<rect
									x="-3.5"
									y="3"
									width="7"
									height="6"
									fill="#c084fc"
									opacity="0.4"
									stroke="#c084fc"
									strokeWidth="1.1"
								/>
								<polygon
									points="0,-11 10,-9 8,2 0,7 -8,2 -10,-9"
									fill="#581c87"
									stroke="#ffffff"
									strokeWidth="1.5"
									strokeLinejoin="round"
								/>
								<polygon points="-7,-4 -3,-5 -2,-2 -6,-1" fill="#38bdf8" />
								<polygon points="2,-2 3,-5 7,-4 6,-1" fill="#38bdf8" />
								<polygon
									points="-14,-6 -8,-18 0,-23 8,-18 14,-6 8,-9 0,-11 -8,-9"
									fill="#a855f7"
									stroke="#ffffff"
									strokeWidth="1.5"
									strokeLinejoin="round"
								/>
								<polygon
									points="-5,-12 -2,-18 2,-12 7,-17 10,-8"
									fill="#c084fc"
									stroke="#ffffff"
									strokeWidth="1.3"
									strokeLinejoin="round"
								/>
								<polygon
									points="-9,-9 -5,-15 -3,-10"
									fill="#c084fc"
									stroke="#ffffff"
									strokeWidth="1.2"
									strokeLinejoin="round"
								/>
							</g>

							{/* 4 Floating Color Palette Swatches */}
							<g transform="translate(0, 20)">
								<circle cx="-10" cy="0" r="1.8" fill="#ff6b57" stroke="#18181b" strokeWidth="0.6" />
								<circle
									cx="-3.5"
									cy="0"
									r="1.8"
									fill="#fde047"
									stroke="#18181b"
									strokeWidth="0.6"
								/>
								<circle cx="3.5" cy="0" r="1.8" fill="#86efac" stroke="#18181b" strokeWidth="0.6" />
								<circle cx="10" cy="0" r="1.8" fill="#38bdf8" stroke="#18181b" strokeWidth="0.6" />
							</g>
						</g>
					</g>

					{/* Front Cylinder Glass Outline & Specular Glare */}
					<path
						d="M 526,155 L 526,265 A 34 14 0 0 0 594,265 L 594,155"
						fill="url(#lab-glass-glare)"
						stroke="#18181b"
						strokeWidth="1.6"
					/>
					<line
						x1="533"
						y1="163"
						x2="533"
						y2="246"
						stroke="#ffffff"
						strokeWidth="3.0"
						strokeLinecap="round"
						opacity="0.55"
					/>
					<line
						x1="538"
						y1="169"
						x2="538"
						y2="236"
						stroke="#ffffff"
						strokeWidth="1.2"
						strokeLinecap="round"
						opacity="0.3"
					/>

					{/* Glass Top & Bottom Rim Rings */}
					<ellipse
						cx="560"
						cy="265"
						rx="34"
						ry="14"
						fill="none"
						stroke="#18181b"
						strokeWidth="1.6"
					/>
					<ellipse
						cx="560"
						cy="155"
						rx="34"
						ry="14"
						fill="none"
						stroke="#18181b"
						strokeWidth="1.6"
					/>

					{/* Top Industrial Canopy Cap */}
					<path
						d="M 526,147 L 526,155 A 34 14 0 0 0 594,155 L 594,147 Z"
						fill="#27272a"
						stroke="#18181b"
						strokeWidth="1.8"
					/>
					<ellipse
						cx="560"
						cy="147"
						rx="34"
						ry="14"
						fill="#ded2bb"
						stroke="#18181b"
						strokeWidth="1.8"
					/>
					<ellipse
						cx="560"
						cy="143"
						rx="22"
						ry="9"
						fill="#18181b"
						stroke="#18181b"
						strokeWidth="1.2"
					/>
					<circle cx="560" cy="143" r="3.2" fill="#a855f7" stroke="#18181b" strokeWidth="0.8" />
					<circle cx="560" cy="143" r="1.5" fill="#ffffff" className="beacon-light" />
				</g>
			</svg>
		</div>
	);
}
