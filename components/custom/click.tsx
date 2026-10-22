"use client";

import { AnimatePresence, motion, type HTMLMotionProps, type SVGMotionProps } from "motion/react";
import * as React from "react";
import { createPortal } from "react-dom";

export type ClickVariant = "burst" | "particles" | "crosshair" | "ring" | "ripple";

export interface ClickItem {
	id: string;
	x: number;
	y: number;
	variant: ClickVariant;
	color: string;
	multiColor: boolean;
	size: number;
	duration: number;
	showShadow: boolean;
}

export interface ClickCommonProps {
	children?: React.ReactNode;
	/** Visual effect animation style: 'burst' | 'particles' | 'crosshair' | 'ring' | 'ripple' (defaults to 'burst') */
	variant?: ClickVariant;
	/** Effect accent color (defaults to Coral #FF6B57) */
	color?: string;
	/** Whether particles/burst use the full Soft Neubrutalism color palette (Coral, Yellow, Ink, Mint, Sky) */
	multiColor?: boolean;
	/** Size of effect boundary in pixels (defaults to 80) */
	size?: number;
	/** Duration of effect animation in milliseconds (defaults to 400) */
	duration?: number;
	/** Event trigger to initiate effect: 'pointerdown' (instant tactile response) or 'pointerup' (defaults to 'pointerdown') */
	trigger?: "pointerdown" | "pointerup";
	/** Optional container ref to restrict click effect to a specific area. If omitted, triggers globally across the window */
	scope?: React.RefObject<HTMLElement | null>;
	/** Temporarily disable the effect */
	disabled?: boolean;
	/** Whether to render a drop shadow under the click effect elements (defaults to true) */
	showShadow?: boolean;
	/** Future-ready callback hook for audio SFX or interaction telemetry */
	onEffectTrigger?: (item: { x: number; y: number; variant: ClickVariant }) => void;
}

export type ClickProps = ClickCommonProps & (HTMLMotionProps<"div"> | SVGMotionProps<"svg">);

const subscribeMotion = (callback: () => void) => {
	if (typeof window === "undefined") return () => {};
	const media = window.matchMedia("(prefers-reduced-motion: reduce)");
	media.addEventListener("change", callback);
	return () => media.removeEventListener("change", callback);
};

const getReducedMotionSnapshot = () => {
	if (typeof window === "undefined") return false;
	return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

const noopSubscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

const generateId = () => {
	if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
		return crypto.randomUUID();
	}
	return `click_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
};

/** Neubrutalist palette colors for multi-color confetti effects */
const NEUBRUTAL_PALETTE = [
	"var(--color-coral)", // Coral
	"var(--color-yellow)", // Yellow
	"var(--color-ink)", // Deep Ink
	"var(--color-mint)", // Mint
	"var(--color-sky)", // Sky
	"var(--color-lavender)", // Lavender
];

export function Click({
	children,
	variant = "burst",
	color = "var(--color-coral)",
	multiColor = false,
	size = 80,
	duration = 400,
	trigger = "pointerdown",
	scope,
	disabled = false,
	showShadow = true,
	onEffectTrigger,
}: ClickProps) {
	const [items, setItems] = React.useState<ClickItem[]>([]);
	const isClient = React.useSyncExternalStore(noopSubscribe, getClientSnapshot, getServerSnapshot);
	const reducedMotion = React.useSyncExternalStore(
		subscribeMotion,
		getReducedMotionSnapshot,
		getServerSnapshot,
	);

	React.useEffect(() => {
		if (disabled || reducedMotion || typeof window === "undefined") return;

		const target = scope?.current ?? window;

		const handlePointer = (e: PointerEvent) => {
			if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

			let x = e.clientX;
			let y = e.clientY;

			if (scope?.current) {
				const rect = scope.current.getBoundingClientRect();
				if (
					e.clientX < rect.left ||
					e.clientX > rect.right ||
					e.clientY < rect.top ||
					e.clientY > rect.bottom
				) {
					return;
				}
				x = e.clientX;
				y = e.clientY;
			}

			const id = generateId();
			const newItem: ClickItem = {
				id,
				x,
				y,
				variant,
				color,
				multiColor,
				size,
				duration,
				showShadow,
			};

			setItems((prev) => [...prev, newItem]);

			// Fire future-proof SFX / telemetry callback
			onEffectTrigger?.({ x, y, variant });

			window.setTimeout(() => {
				setItems((prev) => prev.filter((it) => it.id !== id));
			}, duration + 200);
		};

		target.addEventListener(trigger, handlePointer as EventListener, { passive: true });
		return () => {
			target.removeEventListener(trigger, handlePointer as EventListener);
		};
	}, [
		scope,
		variant,
		color,
		multiColor,
		size,
		duration,
		trigger,
		disabled,
		showShadow,
		reducedMotion,
		onEffectTrigger,
	]);

	if (!isClient) return <>{children}</>;

	return (
		<>
			{children}
			{createPortal(
				<div
					data-slot="click-effects-container"
					aria-hidden="true"
					style={{
						position: "fixed",
						inset: 0,
						pointerEvents: "none",
						zIndex: 99998,
						overflow: "hidden",
					}}
				>
					<AnimatePresence initial={false}>
						{items.map((item) => (
							<EffectRenderer key={item.id} item={item} />
						))}
					</AnimatePresence>
				</div>,
				document.body,
			)}
		</>
	);
}

function EffectRenderer({ item }: { item: ClickItem }) {
	switch (item.variant) {
		case "burst":
			return <BurstEffect item={item} />;
		case "particles":
			return <ParticlesEffect item={item} />;
		case "crosshair":
			return <CrosshairEffect item={item} />;
		case "ring":
			return <RingEffect item={item} />;
		case "ripple":
			return <RippleEffect item={item} />;
		default:
			return null;
	}
}

/**
 * Burst Effect
 * Crisp radiating speed lines bursting in the top-left quadrant behind the cursor arrow tip.
 * Enhanced with Soft Neubrutalism zero-blur brutal stroke and pop physics.
 */
function BurstEffect({ item }: { item: ClickItem }) {
	const d = item.duration / 1000;
	const rStart = Math.max(item.size * 0.28, 18);
	const rEnd = Math.max(item.size * 0.65, 48);

	const segCount = 5;
	const lenStart = Math.max(item.size * 0.22, 12);
	const lenEnd = Math.max(lenStart * 0.45, 5);
	const strokeWidth = 2.5;

	// Radiates 180° to 270° (top-left quadrant behind the pointing arrow tip)
	const startDeg = 175;
	const endDeg = 275;

	const half = rEnd + lenStart + 10;
	const box = half * 2;
	const cx = half;
	const cy = half;

	const toRad = (deg: number) => (deg * Math.PI) / 180;

	return (
		<motion.svg
			aria-hidden="true"
			style={{
				position: "fixed",
				left: item.x - half,
				top: item.y - half,
				width: box,
				height: box,
				display: "block",
				overflow: "visible",
				pointerEvents: "none",
				filter: item.showShadow
					? "drop-shadow(0px 1.5px 0px color-mix(in srgb, var(--color-ink) 80%, transparent))"
					: undefined,
			}}
			viewBox={`0 0 ${box} ${box}`}
		>
			{Array.from({ length: segCount }).map((_, i) => {
				const t = i / Math.max(1, segCount - 1);
				const deg = startDeg + (endDeg - startDeg) * t;
				const th = toRad(deg);

				const ux = Math.cos(th);
				const uy = Math.sin(th);

				const c0x = cx + ux * rStart;
				const c0y = cy + uy * rStart;
				const c1x = cx + ux * rEnd;
				const c1y = cy + uy * rEnd;

				const lineColor = item.multiColor
					? NEUBRUTAL_PALETTE[i % NEUBRUTAL_PALETTE.length]
					: item.color;

				return (
					<motion.line
						key={i}
						x1={c0x - ux * (lenStart / 2)}
						y1={c0y - uy * (lenStart / 2)}
						x2={c0x + ux * (lenStart / 2)}
						y2={c0y + uy * (lenStart / 2)}
						stroke={lineColor}
						strokeWidth={strokeWidth}
						strokeLinecap="round"
						initial={{ pathLength: 1, scale: 1, opacity: 1 }}
						animate={{
							x1: [c0x - ux * (lenStart / 2), c1x - ux * (lenEnd / 2), c1x - ux * (lenEnd / 2)],
							y1: [c0y - uy * (lenStart / 2), c1y - uy * (lenEnd / 2), c1y - uy * (lenEnd / 2)],
							x2: [c0x + ux * (lenStart / 2), c1x + ux * (lenEnd / 2), c1x + ux * (lenEnd / 2)],
							y2: [c0y + uy * (lenStart / 2), c1y + uy * (lenEnd / 2), c1y + uy * (lenEnd / 2)],
							pathLength: [1, 0.6, 0],
							opacity: [1, 1, 0],
						}}
						transition={{
							duration: d,
							ease: [0.16, 1, 0.3, 1],
							times: [0, 0.65, 1],
						}}
					/>
				);
			})}
		</motion.svg>
	);
}

/**
 * Particles Effect
 * Radiating circular confetti dots bursting 360° outward from the click hotspot.
 * Features 2px ink shadows or crisp chalk borders to match Soft Neubrutalism.
 */
function ParticlesEffect({ item }: { item: ClickItem }) {
	const d = item.duration / 1000;
	const count = 7;
	const radius = Math.max(item.size * 0.42, 32);
	const r0 = 3;

	const half = radius + r0 * 3 + 6;
	const box = half * 2;
	const cx = half;
	const cy = half;

	const angleStep = (2 * Math.PI) / count;

	return (
		<motion.svg
			aria-hidden="true"
			style={{
				position: "fixed",
				left: item.x - half,
				top: item.y - half,
				width: box,
				height: box,
				display: "block",
				overflow: "visible",
				pointerEvents: "none",
				filter: item.showShadow
					? "drop-shadow(0px 1px 0px color-mix(in srgb, var(--color-ink) 90%, transparent))"
					: undefined,
			}}
			viewBox={`0 0 ${box} ${box}`}
		>
			{Array.from({ length: count }).map((_, i) => {
				const angle = i * angleStep - Math.PI / 4;
				const x = Math.cos(angle) * radius;
				const y = Math.sin(angle) * radius;

				const particleColor = item.multiColor
					? NEUBRUTAL_PALETTE[i % NEUBRUTAL_PALETTE.length]
					: item.color;

				return (
					<motion.circle
						key={i}
						cx={cx}
						cy={cy}
						r={r0}
						fill={particleColor}
						stroke="var(--color-surface, #FFFFFF)"
						strokeWidth={1}
						initial={{ scale: 0, opacity: 0 }}
						animate={{
							cx: cx + x,
							cy: cy + y,
							scale: [0, 1.3, 0],
							opacity: [0, 1, 0],
						}}
						transition={{
							duration: d,
							delay: i * 0.015,
							ease: [0.22, 1, 0.36, 1],
						}}
					/>
				);
			})}
		</motion.svg>
	);
}

/**
 * Crosshair Effect
 * Architectural 4-tick crosshair expanding outward, matching the GridSection [+] corner crosshairs.
 */
function CrosshairEffect({ item }: { item: ClickItem }) {
	const d = item.duration / 1000;
	const distanceEnd = Math.max(item.size * 0.5, 36);
	const gapStart = 4;
	const lenStart = Math.max(item.size * 0.2, 12);
	const lenEnd = Math.max(lenStart * 0.5, 5);
	const strokeWidth = 2;

	const half = distanceEnd + gapStart + lenStart;
	const box = half * 2;
	const cx = half;
	const cy = half;

	const dirs = [
		{ dx: 1, dy: 0 },
		{ dx: -1, dy: 0 },
		{ dx: 0, dy: -1 },
		{ dx: 0, dy: 1 },
	] as const;

	return (
		<motion.svg
			aria-hidden="true"
			style={{
				position: "fixed",
				left: item.x - half,
				top: item.y - half,
				width: box,
				height: box,
				display: "block",
				overflow: "visible",
				pointerEvents: "none",
				rotate: "-25deg",
				filter: item.showShadow
					? "drop-shadow(0px 1px 0px color-mix(in srgb, var(--color-ink) 80%, transparent))"
					: undefined,
			}}
			viewBox={`0 0 ${box} ${box}`}
		>
			{dirs.map((dir, i) => {
				const x1_0 = cx + dir.dx * gapStart;
				const y1_0 = cy + dir.dy * gapStart;
				const x2_0 = cx + dir.dx * (gapStart + lenStart);
				const y2_0 = cy + dir.dy * (gapStart + lenStart);

				const x1_1 = cx + dir.dx * distanceEnd;
				const y1_1 = cy + dir.dy * distanceEnd;
				const x2_1 = cx + dir.dx * (distanceEnd + lenEnd);
				const y2_1 = cy + dir.dy * (distanceEnd + lenEnd);

				return (
					<motion.line
						key={i}
						x1={x1_0}
						y1={y1_0}
						x2={x2_0}
						y2={y2_0}
						stroke={item.color}
						strokeWidth={strokeWidth}
						strokeLinecap="round"
						initial={{ pathLength: 1, scale: 1, opacity: 1 }}
						animate={{
							x1: x1_1,
							y1: y1_1,
							x2: x2_1,
							y2: y2_1,
							pathLength: 0,
							opacity: [1, 1, 0],
						}}
						transition={{ duration: d, ease: [0.1, 0.9, 0.2, 1] }}
					/>
				);
			})}
		</motion.svg>
	);
}

/**
 * Ring Effect
 * Tactile expanding shockwave ring with brutal outline.
 */
function RingEffect({ item }: { item: ClickItem }) {
	const d = item.duration / 1000;
	const rEnd = Math.max(item.size * 0.6, 42);
	const rStart = 10;
	const strokeStart = 2.5;

	return (
		<motion.svg
			aria-hidden="true"
			style={{
				position: "fixed",
				left: item.x - rEnd / 2,
				top: item.y - rEnd / 2,
				width: rEnd,
				height: rEnd,
				display: "block",
				overflow: "visible",
				pointerEvents: "none",
				filter: item.showShadow
					? "drop-shadow(0px 1.5px 0px color-mix(in srgb, var(--color-ink) 70%, transparent))"
					: undefined,
			}}
			viewBox={`0 0 ${rEnd} ${rEnd}`}
		>
			<motion.circle
				cx={rEnd / 2}
				cy={rEnd / 2}
				fill="none"
				stroke={item.color}
				initial={{ r: rStart, strokeWidth: strokeStart, opacity: 1 }}
				animate={{ r: rEnd / 2, strokeWidth: 0.5, opacity: 0 }}
				transition={{ duration: d, ease: [0.2, 0.8, 0.2, 1] }}
				strokeLinecap="round"
			/>
		</motion.svg>
	);
}

/**
 * Ripple Effect
 * Subtle expanding radial wash.
 */
function RippleEffect({ item }: { item: ClickItem }) {
	const r = item.size * 0.75;
	const d = item.duration / 1000;

	return (
		<motion.div
			aria-hidden="true"
			initial={{ opacity: 0.65, scale: 0.2 }}
			animate={{ opacity: 0, scale: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: d, ease: "easeOut" }}
			style={{
				position: "fixed",
				left: item.x - r / 2,
				top: item.y - r / 2,
				width: r,
				height: r,
				borderRadius: "9999px",
				backgroundColor: item.color,
				pointerEvents: "none",
				boxShadow: item.showShadow
					? "0 2px 0 0 color-mix(in srgb, var(--color-ink) 40%, transparent)"
					: undefined,
			}}
		/>
	);
}
