"use client";

import { cn } from "@/lib/utils";
import React from "react";

export function NotFoundIllustration({ className }: { className?: string }) {
	return (
		<div
			className={cn(
				"relative flex w-full items-center justify-center overflow-visible select-none",
				className,
			)}
			style={
				{
					"--nfi-anim-speed": 1.0,
				} as React.CSSProperties
			}
		>
			<svg
				viewBox="0 0 660 320"
				xmlns="http://www.w3.org/2000/svg"
				className="h-auto max-h-115 w-full overflow-visible select-none"
				role="img"
				aria-label="Isometric 3D model of 404 sculpture with autonomous repair crew fixing severed electrical conduit"
			>
				<defs>
					<linearGradient id="coral-left" x1="0%" y1="0%" x2="100%" y2="100%">
						<stop offset="0%" stopColor="#ff7b68" />
						<stop offset="100%" stopColor="#ff6b57" />
					</linearGradient>

					<linearGradient id="coral-right" x1="0%" y1="0%" x2="100%" y2="100%">
						<stop offset="0%" stopColor="#e85945" />
						<stop offset="100%" stopColor="#cf4430" />
					</linearGradient>

					<linearGradient id="coral-top" x1="0%" y1="0%" x2="100%" y2="100%">
						<stop offset="0%" stopColor="#ffa091" />
						<stop offset="100%" stopColor="#ff8573" />
					</linearGradient>

					<linearGradient id="cable-sheath" x1="0%" y1="0%" x2="0%" y2="100%">
						<stop offset="0%" stopColor="#3f3f46" />
						<stop offset="50%" stopColor="#27272a" />
						<stop offset="100%" stopColor="#18181b" />
					</linearGradient>

					<linearGradient id="copper-core" x1="0%" y1="0%" x2="100%" y2="0%">
						<stop offset="0%" stopColor="#f59e0b" />
						<stop offset="50%" stopColor="#fbbf24" />
						<stop offset="100%" stopColor="#d97706" />
					</linearGradient>

					<radialGradient id="floor-contact-shadow" cx="50%" cy="50%" r="50%">
						<stop offset="0%" stopColor="#18181b" stopOpacity="0.30" />
						<stop offset="60%" stopColor="#18181b" stopOpacity="0.12" />
						<stop offset="100%" stopColor="#18181b" stopOpacity="0" />
					</radialGradient>

					<linearGradient id="scanner-cone-grad" x1="50%" y1="0%" x2="50%" y2="100%">
						<stop offset="0%" stopColor="#38bdf8" stopOpacity="0.55" />
						<stop offset="60%" stopColor="#38bdf8" stopOpacity="0.22" />
						<stop offset="100%" stopColor="#38bdf8" stopOpacity="0.03" />
					</linearGradient>

					<clipPath id="beam-clip">
						<polygon points="0,18 -50,126 50,126" />
					</clipPath>

					<radialGradient id="arc-flare-glow" cx="50%" cy="50%" r="50%">
						<stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
						<stop offset="30%" stopColor="#67e8f9" stopOpacity="0.85" />
						<stop offset="70%" stopColor="#38bdf8" stopOpacity="0.35" />
						<stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
					</radialGradient>

					<radialGradient id="splice-flare-glow" cx="50%" cy="50%" r="50%">
						<stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
						<stop offset="40%" stopColor="#fef08a" stopOpacity="0.85" />
						<stop offset="75%" stopColor="#f59e0b" stopOpacity="0.4" />
						<stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
					</radialGradient>

					<radialGradient id="rotor-disc" cx="50%" cy="50%" r="50%">
						<stop offset="0%" stopColor="#18181b" stopOpacity="0.55" />
						<stop offset="70%" stopColor="#38bdf8" stopOpacity="0.25" />
						<stop offset="100%" stopColor="#18181b" stopOpacity="0" />
					</radialGradient>

					<linearGradient id="green-scan-grad-up" x1="50%" y1="100%" x2="50%" y2="0%">
						<stop offset="0%" stopColor="#22c55e" stopOpacity="0.85" />
						<stop offset="50%" stopColor="#22c55e" stopOpacity="0.30" />
						<stop offset="100%" stopColor="#22c55e" stopOpacity="0.0" />
					</linearGradient>

					<g id="safety-pylon-def">
						<ellipse cx="0" cy="3.5" rx="7" ry="2.2" fill="#18181b" opacity="0.22" />
						<polygon points="-6,2 6,2 8,5 -8,5" fill="#18181b" />
						<polygon points="0,-16 -6,2 6,2" fill="#fde047" stroke="#18181b" strokeWidth="1.2" />
						<polygon
							points="-1.5,-8 1.5,-8 3,-3 -3,-3"
							fill="#ffffff"
							stroke="#18181b"
							strokeWidth="0.8"
						/>
						<polygon
							points="0,-1 1,-4 -1,-4 0,-7"
							stroke="#18181b"
							strokeWidth="0.8"
							fill="#18181b"
						/>
					</g>
				</defs>

				<g id="ground-contact-shadows">
					<ellipse
						cx="382"
						cy="221"
						rx="24"
						ry="5"
						fill="url(#floor-contact-shadow)"
						opacity="0.5"
					/>
				</g>

				<g id="stationary-404-sculpture">
					<g id="solid-left-4" transform="translate(180, 172)">
						<polygon
							points="12,-42 24,-36 24,34 12,28"
							fill="url(#coral-left)"
							stroke="#18181b"
							strokeWidth="1.8"
							strokeLinejoin="round"
						/>
						<polygon
							points="24,-36 36,-42 36,28 24,34"
							fill="url(#coral-right)"
							stroke="#18181b"
							strokeWidth="1.8"
							strokeLinejoin="round"
						/>
						<polygon
							points="12,-42 24,-48 36,-42 24,-36"
							fill="url(#coral-top)"
							stroke="#18181b"
							strokeWidth="1.8"
							strokeLinejoin="round"
						/>

						<polygon
							points="-28,4 24,4 24,18 -28,18"
							fill="url(#coral-left)"
							stroke="#18181b"
							strokeWidth="1.8"
							strokeLinejoin="round"
						/>
						<polygon
							points="-28,4 -18,-2 34,-2 24,4"
							fill="url(#coral-top)"
							stroke="#18181b"
							strokeWidth="1.8"
							strokeLinejoin="round"
						/>
						<polygon
							points="-28,18 24,18 24,24 -28,24"
							fill="#96281b"
							stroke="#18181b"
							strokeWidth="1.4"
							strokeLinejoin="round"
						/>

						<polygon
							points="-28,4 -16,4 20,-36 12,-42"
							fill="url(#coral-left)"
							stroke="#18181b"
							strokeWidth="1.8"
							strokeLinejoin="round"
						/>
						<polygon
							points="-28,4 -18,-2 10,-38 12,-42"
							fill="url(#coral-top)"
							stroke="#18181b"
							strokeWidth="1.8"
							strokeLinejoin="round"
						/>

						<polygon points="-16,4 12,-34 12,4" fill="#96281b" stroke="#18181b" strokeWidth="1.2" />

						<line
							x1="24"
							y1="-26"
							x2="24"
							y2="22"
							stroke="#ffffff"
							strokeWidth="1.4"
							opacity="0.8"
							strokeLinecap="round"
						/>
						<circle cx="24" cy="-26" r="1.6" fill="#ffffff" />
						<circle cx="24" cy="22" r="1.6" fill="#ffffff" />

						<circle cx="30" cy="25" r="2.8" fill="#18181b" stroke="#3f3f46" strokeWidth="0.8" />
						<circle cx="30" cy="25" r="1.8" fill="#22c55e" />
						<circle cx="30" cy="25" r="0.8" fill="#ffffff" />

						<rect
							x="28"
							y="10"
							width="8"
							height="12"
							rx="1.5"
							fill="#27272a"
							stroke="#18181b"
							strokeWidth="1.2"
						/>
						<circle cx="32" cy="16" r="2.2" fill="#18181b" />
					</g>

					<g id="solid-center-0" transform="translate(330, 172)">
						<path
							d="M -36,-12 L -36,14 C -36,36 36,36 36,14 L 36,-12 L 22,-18 L 22,14 C 22,24 -22,24 -22,14 L -22,-18 Z"
							fill="url(#coral-left)"
							stroke="#18181b"
							strokeWidth="1.8"
							strokeLinejoin="round"
						/>

						<path
							d="M 36,-12 L 36,14 C 36,36 0,44 0,44 C 0,44 36,36 36,14 Z"
							fill="url(#coral-right)"
							opacity="0.65"
						/>

						<path
							d="M -36,-12 L -36,-18 C -36,-44 36,-44 36,-18 L 36,-12 L 22,-6 L 22,-14 C 22,-32 -22,-32 -22,-14 L -22,-6 Z"
							fill="url(#coral-left)"
							stroke="#18181b"
							strokeWidth="1.8"
							strokeLinejoin="round"
						/>

						<path
							d="M -36,-18 C -36,-44 36,-44 36,-18 L 22,-14 C 22,-32 -22,-32 -22,-14 Z"
							fill="url(#coral-top)"
							stroke="#18181b"
							strokeWidth="1.8"
							strokeLinejoin="round"
						/>

						<path
							d="M -22,-14 C -22,-32 22,-32 22,-14 L 22,14 C 22,24 -22,24 -22,14 Z"
							fill="var(--color-canvas, #def2e0)"
							stroke="#18181b"
							strokeWidth="1.8"
							strokeLinejoin="round"
						/>

						<path
							d="M -22,-14 C -22,-32 22,-32 22,-14 L 22,-8 C 22,-24 -22,-24 -22,-8 Z"
							fill="#96281b"
							stroke="#18181b"
							strokeWidth="1.2"
						/>

						<rect
							x="-38"
							y="10"
							width="8"
							height="12"
							rx="1.5"
							fill="#27272a"
							stroke="#18181b"
							strokeWidth="1.2"
						/>

						<rect
							x="30"
							y="8"
							width="10"
							height="14"
							rx="2"
							fill="#27272a"
							stroke="#18181b"
							strokeWidth="1.4"
						/>
						<rect x="34" y="11" width="5" height="8" rx="1" fill="#18181b" />
					</g>

					<g id="healthy-conduit-left">
						<path
							d="M 214,188 C 226,188 236,214 254,214 C 272,214 282,188 294,188"
							fill="none"
							stroke="#18181b"
							strokeWidth="5.5"
							strokeLinecap="round"
						/>
						<path
							d="M 214,188 C 226,188 236,214 254,214 C 272,214 282,188 294,188"
							fill="none"
							stroke="url(#cable-sheath)"
							strokeWidth="3.5"
							strokeLinecap="round"
						/>

						<path
							d="M 214,188 C 226,188 236,214 254,214 C 272,214 282,188 294,188"
							fill="none"
							stroke="#fde047"
							strokeWidth="1.0"
							strokeLinecap="round"
							strokeDasharray="3 4"
						/>

						<rect
							x="210"
							y="182"
							width="6"
							height="12"
							rx="1.5"
							fill="#27272a"
							stroke="#18181b"
							strokeWidth="1.2"
						/>
						<ellipse cx="216" cy="188" rx="1.5" ry="3.5" fill="#18181b" />

						<rect
							x="290"
							y="182"
							width="6"
							height="12"
							rx="1.5"
							fill="#27272a"
							stroke="#18181b"
							strokeWidth="1.2"
						/>
						<ellipse cx="290" cy="188" rx="1.5" ry="3.5" fill="#18181b" />
					</g>

					<g id="solid-right-4" transform="translate(480, 172)">
						<polygon
							points="12,-42 24,-36 24,34 12,28"
							fill="url(#coral-left)"
							stroke="#18181b"
							strokeWidth="1.8"
							strokeLinejoin="round"
						/>
						<polygon
							points="24,-36 36,-42 36,28 24,34"
							fill="url(#coral-right)"
							stroke="#18181b"
							strokeWidth="1.8"
							strokeLinejoin="round"
						/>
						<polygon
							points="12,-42 24,-48 36,-42 24,-36"
							fill="url(#coral-top)"
							stroke="#18181b"
							strokeWidth="1.8"
							strokeLinejoin="round"
						/>

						<polygon
							points="-28,4 24,4 24,18 -28,18"
							fill="url(#coral-left)"
							stroke="#18181b"
							strokeWidth="1.8"
							strokeLinejoin="round"
						/>
						<polygon
							points="-28,4 -18,-2 34,-2 24,4"
							fill="url(#coral-top)"
							stroke="#18181b"
							strokeWidth="1.8"
							strokeLinejoin="round"
						/>
						<polygon
							points="-28,18 24,18 24,24 -28,24"
							fill="#96281b"
							stroke="#18181b"
							strokeWidth="1.4"
							strokeLinejoin="round"
						/>

						<polygon
							points="-28,4 -16,4 20,-36 12,-42"
							fill="url(#coral-left)"
							stroke="#18181b"
							strokeWidth="1.8"
							strokeLinejoin="round"
						/>
						<polygon
							points="-28,4 -18,-2 10,-38 12,-42"
							fill="url(#coral-top)"
							stroke="#18181b"
							strokeWidth="1.8"
							strokeLinejoin="round"
						/>

						<polygon points="-16,4 12,-34 12,4" fill="#96281b" stroke="#18181b" strokeWidth="1.2" />

						<line
							x1="24"
							y1="-26"
							x2="24"
							y2="22"
							stroke="#ffffff"
							strokeWidth="1.4"
							opacity="0.8"
							strokeLinecap="round"
						/>
						<circle cx="24" cy="-26" r="1.6" fill="#ffffff" />
						<circle cx="24" cy="22" r="1.6" fill="#ffffff" />

						<rect
							x="-34"
							y="8"
							width="9"
							height="13"
							rx="1.8"
							fill="#27272a"
							stroke="#18181b"
							strokeWidth="1.2"
						/>

						<circle cx="30" cy="25" r="2.8" fill="#18181b" stroke="#3f3f46" strokeWidth="0.8" />
						<circle cx="30" cy="25" r="1.8" fill="#ef4444" className="beacon-strobe" />
						<circle cx="30" cy="25" r="0.8" fill="#ffffff" className="beacon-strobe" />
					</g>
				</g>

				<g id="severed-conduit-assembly">
					<path
						d="M 366,186 C 376,196 384,214 412,215"
						fill="none"
						stroke="#18181b"
						strokeWidth="6.0"
						strokeLinecap="round"
					/>
					<path
						d="M 366,186 C 376,196 384,214 412,215"
						fill="none"
						stroke="url(#cable-sheath)"
						strokeWidth="3.8"
						strokeLinecap="round"
					/>
					<path
						d="M 366,186 C 376,196 384,214 412,215"
						fill="none"
						stroke="#fde047"
						strokeWidth="1.1"
						strokeLinecap="round"
						strokeDasharray="3 4"
					/>

					<rect
						x="408"
						y="211"
						width="5"
						height="8"
						rx="1"
						fill="#71717a"
						stroke="#18181b"
						strokeWidth="1.0"
					/>

					<line
						x1="413"
						y1="213"
						x2="418"
						y2="212"
						stroke="url(#copper-core)"
						strokeWidth="1.4"
						strokeLinecap="round"
					/>
					<line
						x1="413"
						y1="215"
						x2="419"
						y2="215"
						stroke="url(#copper-core)"
						strokeWidth="1.6"
						strokeLinecap="round"
					/>
					<line
						x1="413"
						y1="217"
						x2="417"
						y2="218"
						stroke="url(#copper-core)"
						strokeWidth="1.4"
						strokeLinecap="round"
					/>

					<path
						d="M 432,216 C 438,216 442,204 448,186"
						fill="none"
						stroke="#18181b"
						strokeWidth="6.0"
						strokeLinecap="round"
					/>
					<path
						d="M 432,216 C 438,216 442,204 448,186"
						fill="none"
						stroke="url(#cable-sheath)"
						strokeWidth="3.8"
						strokeLinecap="round"
					/>
					<path
						d="M 432,216 C 438,216 442,204 448,186"
						fill="none"
						stroke="#fde047"
						strokeWidth="1.1"
						strokeLinecap="round"
						strokeDasharray="3 4"
					/>

					<g transform="translate(430, 216) rotate(12)">
						<rect
							x="-6"
							y="-5"
							width="12"
							height="10"
							rx="2"
							fill="#27272a"
							stroke="#18181b"
							strokeWidth="1.3"
						/>

						<rect
							x="-9"
							y="-3"
							width="4"
							height="2"
							fill="#f59e0b"
							stroke="#18181b"
							strokeWidth="0.8"
						/>
						<rect
							x="-9"
							y="1"
							width="4"
							height="2"
							fill="#f59e0b"
							stroke="#18181b"
							strokeWidth="0.8"
						/>
					</g>

					<g id="short-circuit-sparks">
						<circle cx="422" cy="216" r="22" fill="url(#arc-flare-glow)" className="arc-glow" />
						<circle cx="422" cy="216" r="5" fill="#ffffff" className="arc-glow" />

						<polyline
							points="418,213 421,208 424,217 427,212 430,215"
							fill="none"
							stroke="#ffffff"
							strokeWidth="2.2"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="lightning-arc"
						/>
						<polyline
							points="418,213 421,208 424,217 427,212 430,215"
							fill="none"
							stroke="#67e8f9"
							strokeWidth="1.2"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="lightning-arc"
						/>

						<polyline
							points="419,216 423,222 425,214 429,218"
							fill="none"
							stroke="#38bdf8"
							strokeWidth="1.6"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="lightning-arc"
						/>

						<g className="arc-particles">
							<line
								x1="422"
								y1="216"
								x2="430"
								y2="204"
								stroke="#ffffff"
								strokeWidth="1.2"
								strokeLinecap="round"
							/>
							<line
								x1="422"
								y1="216"
								x2="414"
								y2="202"
								stroke="#67e8f9"
								strokeWidth="1.1"
								strokeLinecap="round"
							/>
							<line
								x1="422"
								y1="216"
								x2="432"
								y2="224"
								stroke="#fde047"
								strokeWidth="1.2"
								strokeLinecap="round"
							/>
							<line
								x1="422"
								y1="216"
								x2="412"
								y2="226"
								stroke="#38bdf8"
								strokeWidth="1.0"
								strokeLinecap="round"
							/>
							<circle cx="430" cy="204" r="1.0" fill="#ffffff" />
							<circle cx="414" cy="202" r="0.9" fill="#67e8f9" />
							<circle cx="432" cy="224" r="1.1" fill="#fde047" />
						</g>
					</g>
				</g>

				<g id="splicer-crawler-bot">
					<rect
						x="368"
						y="214"
						width="28"
						height="7"
						rx="3"
						fill="#18181b"
						stroke="#18181b"
						strokeWidth="1.2"
					/>
					<circle cx="372" cy="217.5" r="2.0" fill="#71717a" />
					<circle cx="378" cy="217.5" r="2.0" fill="#71717a" />
					<circle cx="384" cy="217.5" r="2.0" fill="#71717a" />
					<circle cx="390" cy="217.5" r="2.0" fill="#71717a" />

					<rect
						x="372"
						y="198"
						width="20"
						height="16"
						rx="3"
						fill="#27272a"
						stroke="#18181b"
						strokeWidth="1.5"
					/>

					<rect x="372" y="206" width="20" height="4" fill="#fde047" />
					<line x1="376" y1="206" x2="379" y2="210" stroke="#18181b" strokeWidth="1.0" />
					<line x1="382" y1="206" x2="385" y2="210" stroke="#18181b" strokeWidth="1.0" />
					<line x1="388" y1="206" x2="391" y2="210" stroke="#18181b" strokeWidth="1.0" />

					<rect
						x="376"
						y="188"
						width="12"
						height="10"
						rx="2"
						fill="#18181b"
						stroke="#18181b"
						strokeWidth="1.2"
					/>
					<rect x="378" y="191" width="8" height="3" rx="1" fill="#38bdf8" />

					<line
						x1="382"
						y1="188"
						x2="382"
						y2="180"
						stroke="#18181b"
						strokeWidth="1.3"
						strokeLinecap="round"
					/>
					<circle cx="382" cy="180" r="1.8" fill="#eab308" />
					<circle cx="382" cy="180" r="0.8" fill="#ffffff" className="beacon-strobe" />

					<g id="cable-clamp-arm">
						<line
							x1="388"
							y1="204"
							x2="398"
							y2="209"
							stroke="#18181b"
							strokeWidth="2.2"
							strokeLinecap="round"
						/>
						<line
							x1="398"
							y1="209"
							x2="408"
							y2="214"
							stroke="#71717a"
							strokeWidth="1.8"
							strokeLinecap="round"
						/>

						<path
							d="M 406,211 L 410,211 L 409,217 L 406,217"
							fill="none"
							stroke="#18181b"
							strokeWidth="1.4"
						/>
					</g>

					<g id="laser-splicer-arm" className="splicer-arm-anim">
						<line
							x1="384"
							y1="200"
							x2="396"
							y2="198"
							stroke="#18181b"
							strokeWidth="2.4"
							strokeLinecap="round"
						/>
						<circle cx="396" cy="198" r="2.0" fill="#71717a" />
						<line
							x1="396"
							y1="198"
							x2="408"
							y2="210"
							stroke="#18181b"
							strokeWidth="2.0"
							strokeLinecap="round"
						/>

						<polygon
							points="408,208 413,212 409,214"
							fill="#38bdf8"
							stroke="#18181b"
							strokeWidth="1.0"
						/>

						<circle
							cx="413"
							cy="213"
							r="10"
							fill="url(#splice-flare-glow)"
							className="splice-laser-flare"
						/>
						<circle cx="413" cy="213" r="2.2" fill="#ffffff" className="splice-laser-flare" />
					</g>
				</g>

				<g id="patrol-inspector-rover" className="rover-patrol-anim">
					<ellipse
						cx="0"
						cy="5"
						rx="13"
						ry="3.8"
						fill="url(#floor-contact-shadow)"
						opacity="0.45"
					/>

					<rect
						x="-9"
						y="0"
						width="4.5"
						height="6.5"
						rx="1.8"
						fill="#18181b"
						stroke="#18181b"
						strokeWidth="1.0"
					/>
					<rect x="4.5" y="0" width="4.5" height="6.5" rx="1.8" fill="#18181b" strokeWidth="1.0" />
					<circle cx="-6.8" cy="3.2" r="1.1" fill="#71717a" />
					<circle cx="6.8" cy="3.2" r="1.1" fill="#71717a" />

					<rect
						x="-8"
						y="-7"
						width="16"
						height="8.5"
						rx="2"
						fill="#27272a"
						stroke="#18181b"
						strokeWidth="1.3"
					/>
					<rect x="-8" y="-3.5" width="16" height="2.2" fill="#fde047" />

					<g className="rover-head-swivel">
						<rect
							x="-4"
							y="-13"
							width="8"
							height="6.5"
							rx="1.8"
							fill="#18181b"
							stroke="#18181b"
							strokeWidth="1.1"
						/>
						<rect x="-2.5" y="-11" width="5" height="2.2" rx="0.8" fill="#22c55e" />

						<line
							x1="0"
							y1="-13"
							x2="0"
							y2="-18"
							stroke="#18181b"
							strokeWidth="1.2"
							strokeLinecap="round"
						/>
						<circle cx="0" cy="-18" r="1.5" fill="#22c55e" />
						<circle cx="0" cy="-18" r="0.7" fill="#ffffff" className="beacon-strobe" />

						<g className="rover-scan-ray">
							<polygon points="0,-12 -22,-52 22,-52" fill="url(#green-scan-grad-up)" />
						</g>
					</g>
				</g>

				<g id="diagnostic-scanner-drone" transform="translate(424, 96)">
					<g className="scanner-drone-anim">
						<g id="drone-scan-system">
							<polygon
								points="0,7 -42,126 42,126"
								fill="url(#scanner-cone-grad)"
								className="scan-beam"
							/>
						</g>

						<line
							x1="0"
							y1="0"
							x2="-40"
							y2="-5"
							stroke="#18181b"
							strokeWidth="3.2"
							strokeLinecap="round"
						/>
						<line
							x1="0"
							y1="0"
							x2="40"
							y2="-5"
							stroke="#18181b"
							strokeWidth="3.2"
							strokeLinecap="round"
						/>

						<g transform="translate(-40, -5)">
							<ellipse cx="0" cy="0" rx="16" ry="6" fill="url(#rotor-disc)" />
							<g className="rotor-spin-cw">
								<line x1="-14" y1="0" x2="14" y2="0" stroke="#18181b" strokeWidth="1.5" />
								<line x1="0" y1="-5" x2="0" y2="5" stroke="#18181b" strokeWidth="1.5" />
							</g>
							<circle cx="0" cy="0" r="2.0" fill="#18181b" />
						</g>

						<g transform="translate(40, -5)">
							<ellipse cx="0" cy="0" rx="16" ry="6" fill="url(#rotor-disc)" />
							<g className="rotor-spin-ccw">
								<line x1="-14" y1="0" x2="14" y2="0" stroke="#18181b" strokeWidth="1.5" />
								<line x1="0" y1="-5" x2="0" y2="5" stroke="#18181b" strokeWidth="1.5" />
							</g>
							<circle cx="0" cy="0" r="2.0" fill="#18181b" />
						</g>

						<polygon
							points="0,-14 18,-5 18,9 0,16 -18,9 -18,-5"
							fill="#27272a"
							stroke="#18181b"
							strokeWidth="1.8"
							strokeLinejoin="round"
						/>

						<polygon
							points="0,-10 13,-3 13,6 0,12 -13,6 -13,-3"
							fill="#fde047"
							stroke="#18181b"
							strokeWidth="1.2"
							strokeLinejoin="round"
						/>

						<circle cx="0" cy="2" r="4.5" fill="#18181b" />
						<circle cx="0" cy="2" r="2.5" fill="#38bdf8" />
						<circle cx="0" cy="2" r="1.0" fill="#ffffff" />

						<line
							x1="0"
							y1="-14"
							x2="0"
							y2="-20"
							stroke="#18181b"
							strokeWidth="1.5"
							strokeLinecap="round"
						/>
						<circle cx="0" cy="-20" r="2.4" fill="#38bdf8" stroke="#18181b" strokeWidth="0.8" />
						<circle cx="0" cy="-20" r="1.1" fill="#ffffff" className="beacon-strobe" />
					</g>
				</g>

				<g id="ground-safety-accents">
					<use href="#safety-pylon-def" transform="translate(458, 218) scale(0.9)" />

					<use href="#safety-pylon-def" transform="translate(356, 219) scale(0.85)" />

					<use href="#safety-pylon-def" transform="translate(156, 218) scale(0.9)" />
				</g>
			</svg>
			{/* Exact Animation Engine from Approved Prototype */}
			<style jsx>{`
				/* -------------------------------------------------------------------------
       ANIMATION ENGINE (KINETIC ELEMENTS ONLY - 404 SCULPTURE IS STATIONARY)
       ------------------------------------------------------------------------- */

				/* 1. Scanner Drone Hover & Micro Sway */
				@keyframes drone-hover {
					0%,
					100% {
						transform: translate3d(0, 0px, 0) rotate(0deg);
					}
					35% {
						transform: translate3d(-3px, -5px, 0) rotate(-1.2deg);
					}
					70% {
						transform: translate3d(3px, -3px, 0) rotate(1deg);
					}
				}

				.scanner-drone-anim {
					animation: drone-hover calc(3.8s * var(--nfi-anim-speed, 1)) ease-in-out infinite;
					will-change: transform;
				}

				/* Rotor Spins */
				@keyframes rotor-cw {
					from {
						transform: rotate(0deg);
					}
					to {
						transform: rotate(360deg);
					}
				}
				@keyframes rotor-ccw {
					from {
						transform: rotate(0deg);
					}
					to {
						transform: rotate(-360deg);
					}
				}

				.rotor-spin-cw {
					animation: rotor-cw calc(0.12s * var(--nfi-anim-speed, 1)) linear infinite;
					transform-origin: 0 0;
				}
				.rotor-spin-ccw {
					animation: rotor-ccw calc(0.12s * var(--nfi-anim-speed, 1)) linear infinite;
					transform-origin: 0 0;
				}

				/* 2. Diagnostic Scanning Beam */
				@keyframes beam-flicker {
					0%,
					100% {
						opacity: 0.45;
					}
					25% {
						opacity: 0.65;
					}
					50% {
						opacity: 0.4;
					}
					75% {
						opacity: 0.7;
					}
				}

				.scan-beam {
					animation: beam-flicker calc(2.4s * var(--nfi-anim-speed, 1)) ease-in-out infinite;
				}

				/* 3. High Voltage Short Circuit Arc & Sparks */
				@keyframes arc-spark-burst {
					0%,
					100% {
						opacity: 0;
						transform: scale(0.2);
					}
					5%,
					8% {
						opacity: 1;
						transform: scale(1.3);
					}
					12% {
						opacity: 0.2;
						transform: scale(0.6);
					}
					15%,
					20% {
						opacity: 1;
						transform: scale(1.5);
					}
					25% {
						opacity: 0;
					}
					55%,
					60% {
						opacity: 0.95;
						transform: scale(1.2);
					}
					65% {
						opacity: 0;
					}
					80%,
					84% {
						opacity: 1;
						transform: scale(1.4);
					}
					90% {
						opacity: 0;
					}
				}

				.arc-glow {
					animation: arc-spark-burst calc(1.4s * var(--nfi-anim-speed, 1)) ease-out infinite;
					transform-origin: 422px 216px;
					will-change: transform, opacity;
				}

				@keyframes lightning-jitter {
					0%,
					100% {
						opacity: 0;
					}
					4%,
					8% {
						opacity: 1;
						stroke-dashoffset: 0;
					}
					12% {
						opacity: 0;
					}
					16%,
					22% {
						opacity: 1;
						stroke-dashoffset: 6;
					}
					26% {
						opacity: 0;
					}
					58%,
					62% {
						opacity: 1;
						stroke-dashoffset: -4;
					}
					66% {
						opacity: 0;
					}
					82%,
					86% {
						opacity: 1;
						stroke-dashoffset: 2;
					}
					92% {
						opacity: 0;
					}
				}

				.lightning-arc {
					animation: lightning-jitter calc(1.4s * var(--nfi-anim-speed, 1)) steps(1) infinite;
					will-change: opacity;
				}

				@keyframes particle-spray {
					0%,
					100% {
						opacity: 0;
						transform: translate3d(0, 0, 0) scale(0.4);
					}
					6%,
					18% {
						opacity: 1;
						transform: translate3d(4px, -10px, 0) scale(1.2);
					}
					24% {
						opacity: 0;
						transform: translate3d(8px, 4px, 0) scale(0.3);
					}
					58%,
					66% {
						opacity: 0.9;
						transform: translate3d(-6px, -8px, 0) scale(1.1);
					}
					74% {
						opacity: 0;
						transform: translate3d(-10px, 6px, 0) scale(0.3);
					}
				}

				.arc-particles {
					animation: particle-spray calc(1.4s * var(--nfi-anim-speed, 1)) ease-out infinite;
					transform-origin: 422px 216px;
					will-change: transform, opacity;
				}

				/* 4. Splicer Bot Manipulator Arms & Laser Splicer Tip */
				@keyframes arm-solder-tap {
					0%,
					100% {
						transform: rotate(0deg);
					}
					25% {
						transform: rotate(-2.5deg);
					}
					50% {
						transform: rotate(1.5deg);
					}
					75% {
						transform: rotate(-1deg);
					}
				}

				.splicer-arm-anim {
					animation: arm-solder-tap calc(1.6s * var(--nfi-anim-speed, 1)) ease-in-out infinite;
					transform-origin: 384px 204px;
				}

				@keyframes splice-glow-flash {
					0%,
					100% {
						opacity: 0.2;
						transform: scale(0.7);
					}
					30%,
					45% {
						opacity: 1;
						transform: scale(1.3);
					}
					60% {
						opacity: 0.3;
						transform: scale(0.8);
					}
					75%,
					90% {
						opacity: 0.95;
						transform: scale(1.2);
					}
				}

				.splice-laser-flare {
					animation: splice-glow-flash calc(1.6s * var(--nfi-anim-speed, 1)) ease-in-out infinite;
					transform-origin: 412px 215px;
				}

				/* 5. Warning Beacon & Port LED Strobe */
				@keyframes strobe-flash {
					0%,
					45% {
						opacity: 1;
					}
					50%,
					95% {
						opacity: 0.15;
					}
				}

				.beacon-strobe {
					animation: strobe-flash calc(0.8s * var(--nfi-anim-speed, 1)) steps(1) infinite;
				}

				/* 6. Inspector Patrol Rover (Checking Left 4 & 0 Conduit) */
				@keyframes rover-patrol {
					0%,
					10% {
						transform: translate3d(230px, 215px, 0);
					}
					45%,
					55% {
						transform: translate3d(274px, 215px, 0);
					}
					90%,
					100% {
						transform: translate3d(230px, 215px, 0);
					}
				}

				.rover-patrol-anim {
					animation: rover-patrol calc(6s * var(--nfi-anim-speed, 1)) ease-in-out infinite;
					will-change: transform;
				}

				@keyframes rover-head-scan {
					0%,
					12% {
						/* Near Left 4: Aim scanning beam up-left toward Left 4 */
						transform: rotate(-38deg);
					}
					45%,
					58% {
						/* Near Center 0: Aim scanning beam up-right toward Center 0 */
						transform: rotate(38deg);
					}
					88%,
					100% {
						/* Back at Left 4: Aim scanning beam up-left toward Left 4 */
						transform: rotate(-38deg);
					}
				}

				.rover-head-swivel {
					animation: rover-head-scan calc(6s * var(--nfi-anim-speed, 1)) ease-in-out infinite;
					transform-origin: 0px -12px;
					will-change: transform;
				}

				@keyframes rover-scan-pulse {
					0%,
					100% {
						opacity: 0.35;
						transform: scaleY(0.85);
					}
					50% {
						opacity: 1;
						transform: scaleY(1.15);
					}
				}

				.rover-scan-ray {
					animation: rover-scan-pulse calc(1.4s * var(--nfi-anim-speed, 1)) ease-in-out infinite;
					transform-origin: 0px -12px;
				}

				/* Paused State */
				[data-paused="true"] :global(*) {
					animation-play-state: paused !important;
				}

				/* Base Resting Positions for Motion & Pauses */
				.rover-patrol-anim {
					transform: translate3d(245px, 215px, 0);
				}
				.rover-head-swivel {
					transform: rotate(20deg);
				}

				/* Accessibility: Reduced Motion Support */
				@media (prefers-reduced-motion: reduce) {
					.scanner-drone-anim,
					.rotor-spin-cw,
					.rotor-spin-ccw,
					.scan-beam,
					.arc-glow,
					.lightning-arc,
					.arc-particles,
					.splicer-arm-anim,
					.splice-laser-flare,
					.beacon-strobe,
					.rover-patrol-anim,
					.rover-head-swivel,
					.rover-scan-ray {
						animation: none !important;
					}

					/* Resting visuals */
					.arc-glow {
						opacity: 0.45 !important;
						transform: scale(0.9) !important;
					}
					.splice-laser-flare {
						opacity: 0.85 !important;
						transform: scale(1) !important;
					}
					.scan-beam {
						opacity: 0.45 !important;
					}
					.rover-scan-ray {
						opacity: 0.65 !important;
						transform: scaleY(1) !important;
					}
					.lightning-arc {
						opacity: 0.75 !important;
					}
					.beacon-strobe {
						opacity: 1 !important;
					}
				}
			`}</style>
		</div>
	);
}
