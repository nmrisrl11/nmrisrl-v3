"use client";

import { Click, type ClickProps, type ClickVariant } from "@/components/custom/click";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion, useMotionValue, type HTMLMotionProps } from "motion/react";
import * as React from "react";

interface CursorContextType {
	cursorX: ReturnType<typeof useMotionValue<number>>;
	cursorY: ReturnType<typeof useMotionValue<number>>;
	active: boolean;
	isPressed: boolean;
	isHovered: boolean;
	isText: boolean;
	global: boolean;
	containerRef: React.RefObject<HTMLDivElement | null>;
	parentRef: React.RefObject<HTMLElement | null>;
}

const CursorContext = React.createContext<CursorContextType | null>(null);

export function useCursor() {
	const context = React.useContext(CursorContext);
	if (!context) {
		throw new Error("useCursor must be used within a CursorProvider");
	}
	return context;
}

const subscribeHoverMedia = (callback: () => void) => {
	if (typeof window === "undefined") return () => {};
	const media = window.matchMedia("(hover: hover) and (pointer: fine)");
	media.addEventListener("change", callback);
	return () => media.removeEventListener("change", callback);
};

const getDesktopSnapshot = () => {
	if (typeof window === "undefined") return false;
	return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
};

const subscribeMotionMedia = (callback: () => void) => {
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

export interface CursorProviderProps {
	children: React.ReactNode;
	global?: boolean;
}

export function CursorProvider({ children, global = true }: CursorProviderProps) {
	const cursorX = useMotionValue(-100);
	const cursorY = useMotionValue(-100);
	const [active, setActive] = React.useState(false);
	const [isPressed, setIsPressed] = React.useState(false);
	const [isHovered, setIsHovered] = React.useState(false);
	const [isText, setIsText] = React.useState(false);
	const containerRef = React.useRef<HTMLDivElement | null>(null);
	const parentRef = React.useRef<HTMLElement | null>(null);

	const isDesktop = React.useSyncExternalStore(
		subscribeHoverMedia,
		getDesktopSnapshot,
		getServerSnapshot,
	);

	// Inject cursor: none stylesheet once on desktop
	React.useEffect(() => {
		if (typeof window === "undefined" || !isDesktop) return;

		const styleId = "__nmr_custom_cursor_style__";
		if (!document.getElementById(styleId)) {
			const style = document.createElement("style");
			style.id = styleId;
			style.textContent = `
				html.nmr-cursor-active,
				html.nmr-cursor-active *:not(input):not(textarea):not([contenteditable="true"]):not([data-cursor="text"]),
				.nmr-cursor-scoped-active,
				.nmr-cursor-scoped-active *:not(input):not(textarea):not([contenteditable="true"]):not([data-cursor="text"]) {
					cursor: none !important;
				}
				html.nmr-cursor-active input,
				html.nmr-cursor-active textarea,
				html.nmr-cursor-active [contenteditable="true"],
				html.nmr-cursor-active [data-cursor="text"],
				.nmr-cursor-scoped-active input,
				.nmr-cursor-scoped-active textarea,
				.nmr-cursor-scoped-active [contenteditable="true"],
				.nmr-cursor-scoped-active [data-cursor="text"] {
					cursor: text !important;
				}
			`;
			document.head.appendChild(style);
		}

		return () => {
			const existingStyle = document.getElementById(styleId);
			if (existingStyle) {
				existingStyle.remove();
			}
			document.documentElement.classList.remove("nmr-cursor-active");
		};
	}, [isDesktop]);

	// Pointer tracking logic
	React.useEffect(() => {
		if (typeof window === "undefined" || !isDesktop) return;

		let cleanupTarget: EventTarget | null = null;

		const handlePointerMove = (e: PointerEvent) => {
			// Offset by (-1.5px, -3px) to anchor the SVG arrow tip precisely at the mouse click hotspot
			let clientX = e.clientX;
			let clientY = e.clientY;

			if (!global) {
				const parent = containerRef.current?.parentElement ?? parentRef.current;
				if (parent) {
					const rect = parent.getBoundingClientRect();
					clientX -= rect.left;
					clientY -= rect.top;
				}
			}

			cursorX.set(clientX - 1.5);
			cursorY.set(clientY - 3);

			setActive(true);

			// Element detection under cursor
			const target = e.target as HTMLElement | null;
			if (target) {
				const isTextInput = Boolean(
					target.closest(
						'input:not([type="button"]):not([type="submit"]):not([type="reset"]):not([type="checkbox"]):not([type="radio"]):not([type="color"]):not([type="range"]), textarea, [contenteditable="true"], [data-cursor="text"]',
					),
				);
				setIsText(isTextInput);

				const isClickable = Boolean(
					target.closest(
						'a, button, [role="button"], input[type="submit"], input[type="button"], select, summary, label, [data-cursor="pointer"]',
					),
				);
				setIsHovered(isClickable && !isTextInput);
			}
		};

		const handlePointerDown = () => setIsPressed(true);
		const handlePointerUp = () => setIsPressed(false);
		const handlePointerLeave = () => {
			setActive(false);
			setIsPressed(false);
			setIsHovered(false);
		};

		const handleVisibilityChange = () => {
			if (document.visibilityState === "hidden") {
				setActive(false);
				setIsPressed(false);
				setIsHovered(false);
			}
		};

		if (global) {
			cleanupTarget = window;
			window.addEventListener("pointermove", handlePointerMove, { passive: true });
			window.addEventListener("pointerdown", handlePointerDown, { passive: true });
			window.addEventListener("pointerup", handlePointerUp, { passive: true });
			document.addEventListener("mouseleave", handlePointerLeave);
			document.documentElement.addEventListener("pointerleave", handlePointerLeave);
			window.addEventListener("blur", handlePointerLeave);
			document.addEventListener("visibilitychange", handleVisibilityChange);
		} else {
			const parent = containerRef.current?.parentElement ?? parentRef.current;
			if (parent) {
				cleanupTarget = parent;
				if (getComputedStyle(parent).position === "static") {
					parent.style.position = "relative";
				}

				parent.addEventListener("pointermove", handlePointerMove, { passive: true });
				parent.addEventListener("pointerdown", handlePointerDown, { passive: true });
				parent.addEventListener("pointerup", handlePointerUp, { passive: true });
				parent.addEventListener("pointerleave", handlePointerLeave);
			}
		}

		return () => {
			if (global) {
				window.removeEventListener("pointermove", handlePointerMove);
				window.removeEventListener("pointerdown", handlePointerDown);
				window.removeEventListener("pointerup", handlePointerUp);
				document.removeEventListener("mouseleave", handlePointerLeave);
				document.documentElement.removeEventListener("pointerleave", handlePointerLeave);
				window.removeEventListener("blur", handlePointerLeave);
				document.removeEventListener("visibilitychange", handleVisibilityChange);
			} else if (cleanupTarget && cleanupTarget instanceof HTMLElement) {
				cleanupTarget.removeEventListener("pointermove", handlePointerMove);
				cleanupTarget.removeEventListener("pointerdown", handlePointerDown);
				cleanupTarget.removeEventListener("pointerup", handlePointerUp);
				cleanupTarget.removeEventListener("pointerleave", handlePointerLeave);
			}
		};
	}, [global, isDesktop, cursorX, cursorY]);

	// Toggle cursor: none on document root (global) or parent container (scoped)
	React.useEffect(() => {
		if (typeof window === "undefined" || !isDesktop) return;

		if (global) {
			if (active && !isText) {
				document.documentElement.classList.add("nmr-cursor-active");
			} else {
				document.documentElement.classList.remove("nmr-cursor-active");
			}

			return () => {
				document.documentElement.classList.remove("nmr-cursor-active");
			};
		}

		// Scoped mode: hide native cursor on parent container when active
		const parent = containerRef.current?.parentElement ?? parentRef.current;
		if (!parent) return;

		if (active && !isText) {
			parent.classList.add("nmr-cursor-scoped-active");
		} else {
			parent.classList.remove("nmr-cursor-scoped-active");
		}

		return () => {
			parent.classList.remove("nmr-cursor-scoped-active");
		};
	}, [active, isText, global, isDesktop]);

	return (
		<CursorContext.Provider
			value={{
				cursorX,
				cursorY,
				active,
				isPressed,
				isHovered,
				isText,
				global,
				containerRef,
				parentRef,
			}}
		>
			<div
				ref={(node) => {
					containerRef.current = node;
					if (node?.parentElement) {
						parentRef.current = node.parentElement;
					}
				}}
				style={{
					position: "absolute",
					width: 0,
					height: 0,
					padding: 0,
					margin: 0,
					border: 0,
					overflow: "hidden",
					pointerEvents: "none",
					opacity: 0,
				}}
				aria-hidden="true"
			/>
			{children}
		</CursorContext.Provider>
	);
}

export interface CursorProps extends Omit<HTMLMotionProps<"div">, "children"> {
	/** Fill color for the cursor arrow (defaults to Coral #FF6B57) */
	color?: string;
	/** Outline border color for maximum contrast (defaults to Chalk White #FFFFFF) */
	borderColor?: string;
	/** Border stroke width in px (defaults to 2.5) */
	strokeWidth?: number;
	/** Custom SVG child if replacing the arrow silhouette */
	children?: React.ReactNode;
	/** Whether to apply soft neubrutalist 3D pop drop-shadow (defaults to true) */
	showShadow?: boolean;
}

export function Cursor({
	className,
	color = "#FF6B57",
	borderColor = "#FFFFFF",
	strokeWidth = 2.5,
	showShadow = true,
	children,
	style,
	...props
}: CursorProps) {
	const { cursorX, cursorY, active, isPressed, isHovered, isText, global } = useCursor();

	const isDesktop = React.useSyncExternalStore(
		subscribeHoverMedia,
		getDesktopSnapshot,
		getServerSnapshot,
	);
	const reducedMotion = React.useSyncExternalStore(
		subscribeMotionMedia,
		getReducedMotionSnapshot,
		getServerSnapshot,
	);

	// Never render on touch-only mobile devices
	if (!isDesktop) return null;

	return (
		<AnimatePresence>
			{active && !isText && (
				<motion.div
					data-slot="cursor"
					aria-hidden="true"
					className={cn(
						"pointer-events-none z-9999 select-none",
						global ? "fixed top-0 left-0" : "absolute top-0 left-0",
						className,
					)}
					style={{
						x: cursorX,
						y: cursorY,
						transformOrigin: "1.5px 3px",
						...style,
					}}
					initial={{ scale: 0.5, opacity: 0 }}
					animate={{
						scale: isPressed ? 0.88 : isHovered ? 1.15 : 1,
						rotate: isHovered && !reducedMotion ? -6 : 0,
						opacity: 1,
					}}
					exit={{ scale: 0.5, opacity: 0 }}
					transition={
						reducedMotion
							? { duration: 0 }
							: {
									type: "spring",
									stiffness: 550,
									damping: 30,
									mass: 0.4,
								}
					}
					{...props}
				>
					{children ?? (
						<svg
							className="size-7 overflow-visible"
							viewBox="0 0 40 40"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							style={{
								filter: showShadow ? "drop-shadow(0px 2px 0px rgba(24, 24, 27, 0.95))" : undefined,
							}}
						>
							<path
								d="M1.8 4.4 7 36.2c.3 1.8 2.6 2.3 3.6.8l3.9-5.7c1.7-2.5 4.5-4.1 7.5-4.3l6.9-.5c1.8-.1 2.5-2.4 1.1-3.5L5 2.5c-1.4-1.1-3.5 0-3.3 1.9Z"
								fill={color}
								stroke={borderColor}
								strokeWidth={strokeWidth}
								strokeLinejoin="round"
								strokeLinecap="round"
							/>
						</svg>
					)}
				</motion.div>
			)}
		</AnimatePresence>
	);
}

export interface CustomCursorProps extends CursorProps {
	/** Whether the cursor tracks across the entire window (defaults to true) */
	global?: boolean;
	/** Click effect animation style ('burst' | 'particles' | 'crosshair' | 'ring' | 'ripple' | 'none', defaults to 'burst') */
	clickEffect?: ClickVariant | "none";
	/** Click effect accent color (defaults to Coral #FF6B57) */
	clickEffectColor?: string;
	/** Whether the click effect uses the multi-color soft neubrutalist palette (defaults to false) */
	clickEffectMultiColor?: boolean;
	/** Whether to apply a drop shadow under the click effect elements (defaults to true) */
	clickEffectShadow?: boolean;
	/** Future-ready callback hook for SFX sounds or telemetry */
	onEffectTrigger?: (item: { x: number; y: number; variant: ClickVariant }) => void;
}

/**
 * CustomCursor
 * Turnkey custom cursor with Soft Neubrutalism Coral body, Chalk White border, and brutal drop shadow.
 * Automatically handles desktop detection, touch device exclusion, text input caret fallback, click micro-physics,
 * and customizable click feedback effects ('burst' | 'particles' | 'crosshair' | 'ring' | 'ripple').
 */
export function CustomCursor({
	global = true,
	clickEffect = "burst",
	clickEffectColor = "#FF6B57",
	clickEffectMultiColor = false,
	clickEffectShadow = true,
	onEffectTrigger,
	...cursorProps
}: CustomCursorProps) {
	const isClient = React.useSyncExternalStore(noopSubscribe, getClientSnapshot, getServerSnapshot);

	if (!isClient) return null;

	return (
		<CursorProvider global={global}>
			<Cursor {...cursorProps} />
			{clickEffect !== "none" && (
				<CustomCursorClick
					variant={clickEffect}
					color={clickEffectColor}
					multiColor={clickEffectMultiColor}
					showShadow={clickEffectShadow}
					onEffectTrigger={onEffectTrigger}
				/>
			)}
		</CursorProvider>
	);
}

interface CustomCursorClickProps {
	variant: ClickVariant;
	color: string;
	multiColor: boolean;
	showShadow: boolean;
	onEffectTrigger?: (item: { x: number; y: number; variant: ClickVariant }) => void;
}

function CustomCursorClick({
	variant,
	color,
	multiColor,
	showShadow,
	onEffectTrigger,
}: CustomCursorClickProps) {
	const { global, parentRef } = useCursor();

	return (
		<Click
			variant={variant}
			color={color}
			multiColor={multiColor}
			showShadow={showShadow}
			onEffectTrigger={onEffectTrigger}
			scope={!global ? parentRef : undefined}
		/>
	);
}

export { Click, type ClickProps, type ClickVariant };
