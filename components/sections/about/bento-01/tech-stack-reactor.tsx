"use client";

import { useEffect, useRef, useState } from "react";

// App Color Tokens (Synced with globals.css Neubrutalist system)
const COLOR_INK = "var(--color-ink, #18181b)";
const COLOR_SKY = "var(--color-sky, #bae6fd)";
const COLOR_SURFACE_MUTED = "var(--color-surface-muted, #f3f8f5)";
const COLOR_YELLOW = "var(--color-yellow, #fde047)";
const COLOR_MINT = "var(--color-mint, #86efac)";

// User-provided official vector paths (viewBox 0 0 24 24)
const SVG_REACT =
	"M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z";

const SVG_NEXT =
	"M18.665 21.978C16.758 23.255 14.465 24 12 24 5.377 24 0 18.623 0 12S5.377 0 12 0s12 5.377 12 12c0 3.583-1.574 6.801-4.067 9.001L9.219 7.2H7.2v9.596h1.615V9.251l9.85 12.727Zm-3.332-8.533 1.6 2.061V7.2h-1.6v6.245Z";

const SVG_TS =
	"M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z";

const SVG_TAILWIND =
	"M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z";

export function TechStackReactor() {
	const containerRef = useRef<HTMLDivElement>(null);
	const [isVisible, setIsVisible] = useState(false);

	// Viewport Observer: Pause CSS animations and free 100% GPU/CPU when off-screen
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
			className="relative flex w-full items-center justify-center overflow-visible py-1 select-none"
		>
			<svg
				viewBox="120 140 520 400"
				className={`h-auto w-full max-w-64 overflow-visible drop-shadow-sm sm:max-w-76 md:max-w-84 lg:max-w-88 ${
					!isVisible ? "reactor-paused" : ""
				}`}
				role="img"
				aria-label="Frontend Specialization Tech Stack Reactor Core"
			>
				<defs>
					<filter id="soft-shadow" x="-50%" y="-50%" width="200%" height="200%">
						<feGaussianBlur in="SourceGraphic" stdDeviation="5" />
					</filter>

					<style>{`
            /* Pure Compositor Animations: 0 DOM mutations, 0 layout reflows */
            .reactor-paused * {
              animation-play-state: paused !important;
            }

            @media (prefers-reduced-motion: reduce) {
              .badge-react-anim,
              .badge-ts-anim,
              .badge-next-anim,
              .badge-tailwind-anim,
              .shadow-pulse-react,
              .shadow-pulse-ts,
              .shadow-pulse-next,
              .shadow-pulse-tailwind,
              .ring-pulse-1,
              .ring-pulse-2,
              .ring-pulse-3,
              .ring-pulse-4,
              .flow-line-1,
              .flow-line-2,
              .flow-line-3 {
                animation: none !important;
              }
            }

            @keyframes float-badge-react {
              0%, 100% {
                transform: translate3d(0, -6px, 0) rotate(-4.2deg);
              }
              50% {
                transform: translate3d(0, 6px, 0) rotate(-1.8deg);
              }
            }
            .badge-react-anim {
              animation: float-badge-react 3.49s ease-in-out infinite;
              will-change: transform;
            }

            @keyframes float-badge-ts {
              0%, 100% {
                transform: translate3d(0, -5.5px, 0) rotate(-3.5deg);
              }
              50% {
                transform: translate3d(0, 5.5px, 0) rotate(-1.5deg);
              }
            }
            .badge-ts-anim {
              animation: float-badge-ts 3.49s ease-in-out -0.83s infinite;
              will-change: transform;
            }

            @keyframes float-badge-next {
              0%, 100% {
                transform: translate3d(0, -5.5px, 0) rotate(2deg);
              }
              50% {
                transform: translate3d(0, 5.5px, 0) rotate(4deg);
              }
            }
            .badge-next-anim {
              animation: float-badge-next 3.49s ease-in-out -1.67s infinite;
              will-change: transform;
            }

            @keyframes float-badge-tailwind {
              0%, 100% {
                transform: translate3d(0, -5px, 0) rotate(1.3deg);
              }
              50% {
                transform: translate3d(0, 5px, 0) rotate(3.7deg);
              }
            }
            .badge-tailwind-anim {
              animation: float-badge-tailwind 3.49s ease-in-out -2.5s infinite;
              will-change: transform;
            }

            @keyframes shadow-pulse {
              0%, 100% {
                transform: scale(0.92);
                opacity: 0.26;
              }
              50% {
                transform: scale(1.08);
                opacity: 0.16;
              }
            }
            .shadow-pulse-react {
              animation: shadow-pulse 3.49s ease-in-out infinite;
              will-change: transform, opacity;
            }
            .shadow-pulse-ts {
              animation: shadow-pulse 3.49s ease-in-out -0.83s infinite;
              will-change: transform, opacity;
            }
            .shadow-pulse-next {
              animation: shadow-pulse 3.49s ease-in-out -1.67s infinite;
              will-change: transform, opacity;
            }
            .shadow-pulse-tailwind {
              animation: shadow-pulse 3.49s ease-in-out -2.5s infinite;
              will-change: transform, opacity;
            }

            @keyframes pulse-ring-rise {
              0% {
                transform: translate3d(0, 0, 0) scale(1);
                opacity: 0.85;
              }
              100% {
                transform: translate3d(0, -116px, 0) scale(2.8);
                opacity: 0;
              }
            }
            .ring-pulse-1 {
              animation: pulse-ring-rise 3.2s cubic-bezier(0.2, 0.4, 0.4, 1) infinite;
              will-change: transform, opacity;
            }
            .ring-pulse-2 {
              animation: pulse-ring-rise 3.2s cubic-bezier(0.2, 0.4, 0.4, 1) -0.8s infinite;
              will-change: transform, opacity;
            }
            .ring-pulse-3 {
              animation: pulse-ring-rise 3.2s cubic-bezier(0.2, 0.4, 0.4, 1) -1.6s infinite;
              will-change: transform, opacity;
            }
            .ring-pulse-4 {
              animation: pulse-ring-rise 3.2s cubic-bezier(0.2, 0.4, 0.4, 1) -2.4s infinite;
              will-change: transform, opacity;
            }

            @keyframes flow-rise {
              to {
                stroke-dashoffset: -40px;
              }
            }
            .flow-line-1 {
              animation: flow-rise 1.25s linear infinite;
            }
            .flow-line-2 {
              animation: flow-rise 1.42s linear infinite;
            }
            .flow-line-3 {
              animation: flow-rise 1.11s linear infinite;
            }
          `}</style>
				</defs>

				{/* Ambient Ground Shadow & Stepped Plinth Platform */}
				<g
					dangerouslySetInnerHTML={{
						__html: `<ellipse cx="380" cy="441.8840168197642" rx="195" ry="98" fill="#18181b" opacity="0.14" filter="blur(16px)"/><path d="M395.6 351.1L388.4 353.3L388.4 341.2L395.6 338.9Z" fill="#383a4e" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M388.4 353.3L380.0 354.1L380.0 341.9L388.4 341.2Z" fill="#383a4e" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M380.0 354.1L371.6 353.3L371.6 341.2L380.0 341.9Z" fill="#383a4e" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M371.6 353.3L364.4 351.1L364.4 338.9L371.6 341.2Z" fill="#383a4e" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M364.4 351.1L359.7 347.7L359.7 335.6L364.4 338.9Z" fill="#383a4e" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M359.7 347.7L358.0 343.8L358.0 331.6L359.7 335.6Z" fill="#383a4e" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M358.0 343.8L359.7 339.8L359.7 327.7L358.0 331.6Z" fill="#383a4e" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M400.3 347.7L395.6 351.1L395.6 338.9L400.3 335.6Z" fill="#383a4e" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M395.6 338.9L388.4 341.2L380.0 341.9L371.6 341.2L364.4 338.9L359.7 335.6L358.0 331.6L359.7 327.7L364.4 324.3L371.6 322.1L380.0 321.3L388.4 322.1L395.6 324.3L400.3 327.7L402.0 331.6L400.3 335.6L395.6 338.9Z" fill="#44465a" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M597.9 446.0L590.7 448.3L590.7 436.1L597.9 433.9Z" fill="#383a4e" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M590.7 448.3L582.3 449.1L582.3 436.9L590.7 436.1Z" fill="#383a4e" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M582.3 449.1L573.9 448.3L573.9 436.1L582.3 436.9Z" fill="#383a4e" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M573.9 448.3L566.8 446.0L566.8 433.9L573.9 436.1Z" fill="#383a4e" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M566.8 446.0L562.0 442.7L562.0 430.6L566.8 433.9Z" fill="#383a4e" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M562.0 442.7L560.3 438.7L560.3 426.6L562.0 430.6Z" fill="#383a4e" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M560.3 438.7L562.0 434.8L562.0 422.6L560.3 426.6Z" fill="#383a4e" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M602.6 442.7L597.9 446.0L597.9 433.9L602.6 430.6Z" fill="#383a4e" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M597.9 433.9L590.7 436.1L582.3 436.9L573.9 436.1L566.8 433.9L562.0 430.6L560.3 426.6L562.0 422.6L566.8 419.3L573.9 417.1L582.3 416.3L590.7 417.1L597.9 419.3L602.6 422.6L604.3 426.6L602.6 430.6L597.9 433.9Z" fill="#44465a" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M193.2 446.0L186.1 448.3L186.1 436.1L193.2 433.9Z" fill="#383a4e" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M186.1 448.3L177.7 449.1L177.7 436.9L186.1 436.1Z" fill="#383a4e" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M177.7 449.1L169.3 448.3L169.3 436.1L177.7 436.9Z" fill="#383a4e" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M169.3 448.3L162.1 446.0L162.1 433.9L169.3 436.1Z" fill="#383a4e" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M162.1 446.0L157.4 442.7L157.4 430.6L162.1 433.9Z" fill="#383a4e" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M157.4 442.7L155.7 438.7L155.7 426.6L157.4 430.6Z" fill="#383a4e" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M155.7 438.7L157.4 434.8L157.4 422.6L155.7 426.6Z" fill="#383a4e" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M198.0 442.7L193.2 446.0L193.2 433.9L198.0 430.6Z" fill="#383a4e" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M193.2 433.9L186.1 436.1L177.7 436.9L169.3 436.1L162.1 433.9L157.4 430.6L155.7 426.6L157.4 422.6L162.1 419.3L169.3 417.1L177.7 416.3L186.1 417.1L193.2 419.3L198.0 422.6L199.7 426.6L198.0 430.6L193.2 433.9Z" fill="#44465a" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M395.6 541.0L388.4 543.3L388.4 531.1L395.6 528.9Z" fill="#383a4e" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M388.4 543.3L380.0 544.1L380.0 531.9L388.4 531.1Z" fill="#383a4e" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M380.0 544.1L371.6 543.3L371.6 531.1L380.0 531.9Z" fill="#383a4e" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M371.6 543.3L364.4 541.0L364.4 528.9L371.6 531.1Z" fill="#383a4e" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M364.4 541.0L359.7 537.7L359.7 525.5L364.4 528.9Z" fill="#383a4e" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M359.7 537.7L358.0 533.7L358.0 521.6L359.7 525.5Z" fill="#383a4e" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M358.0 533.7L359.7 529.8L359.7 517.6L358.0 521.6Z" fill="#383a4e" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M400.3 537.7L395.6 541.0L395.6 528.9L400.3 525.5Z" fill="#383a4e" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M395.6 528.9L388.4 531.1L380.0 531.9L371.6 531.1L364.4 528.9L359.7 525.5L358.0 521.6L359.7 517.6L364.4 514.3L371.6 512.0L380.0 511.2L388.4 512.0L395.6 514.3L400.3 517.6L402.0 521.6L400.3 525.5L395.6 528.9Z" fill="#44465a" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M527.8 496.0L502.9 506.0L502.9 484.1L527.8 474.1Z" fill="#e2dacb" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M502.9 506.0L474.9 514.1L474.9 492.2L502.9 484.1Z" fill="#e2dacb" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M474.9 514.1L444.6 520.0L444.6 498.1L474.9 492.2Z" fill="#e2dacb" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M444.6 520.0L412.7 523.5L412.7 501.7L444.6 498.1Z" fill="#e2dacb" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M412.7 523.5L380.0 524.8L380.0 502.9L412.7 501.7Z" fill="#e2dacb" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M380.0 524.8L347.3 523.5L347.3 501.7L380.0 502.9Z" fill="#e2dacb" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M347.3 523.5L315.4 520.0L315.4 498.1L347.3 501.7Z" fill="#e2dacb" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M315.4 520.0L285.1 514.1L285.1 492.2L315.4 498.1Z" fill="#e2dacb" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M285.1 514.1L257.1 506.0L257.1 484.1L285.1 492.2Z" fill="#e2dacb" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M257.1 506.0L232.2 496.0L232.2 474.1L257.1 484.1Z" fill="#e2dacb" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M232.2 496.0L210.8 484.3L210.8 462.4L232.2 474.1Z" fill="#e2dacb" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M210.8 484.3L193.7 471.2L193.7 449.3L210.8 462.4Z" fill="#e2dacb" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M193.7 471.2L181.1 456.9L181.1 435.1L193.7 449.3Z" fill="#e2dacb" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M181.1 456.9L173.5 442.0L173.5 420.1L181.1 435.1Z" fill="#e2dacb" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M173.5 442.0L170.9 426.6L170.9 404.7L173.5 420.1Z" fill="#e2dacb" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M170.9 426.6L173.5 411.2L173.5 389.4L170.9 404.7Z" fill="#d5cbb8" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M173.5 411.2L181.1 396.3L181.1 374.4L173.5 389.4Z" fill="#d5cbb8" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M181.1 396.3L193.7 382.0L193.7 360.2L181.1 374.4Z" fill="#d5cbb8" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M193.7 382.0L210.8 368.9L210.8 347.0L193.7 360.2Z" fill="#c4b9a5" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M210.8 368.9L232.2 357.2L232.2 335.3L210.8 347.0Z" fill="#c4b9a5" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M232.2 357.2L257.1 347.2L257.1 325.3L232.2 335.3Z" fill="#c4b9a5" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M257.1 347.2L285.1 339.1L285.1 317.3L257.1 325.3Z" fill="#c4b9a5" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M285.1 339.1L315.4 333.2L315.4 311.4L285.1 317.3Z" fill="#c4b9a5" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M315.4 333.2L347.3 329.6L347.3 307.8L315.4 311.4Z" fill="#c4b9a5" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M347.3 329.6L380.0 328.4L380.0 306.6L347.3 307.8Z" fill="#c4b9a5" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M380.0 328.4L412.7 329.6L412.7 307.8L380.0 306.6Z" fill="#c4b9a5" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M412.7 329.6L444.6 333.2L444.6 311.4L412.7 307.8Z" fill="#c4b9a5" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M444.6 333.2L474.9 339.1L474.9 317.3L444.6 311.4Z" fill="#c4b9a5" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M474.9 339.1L502.9 347.2L502.9 325.3L474.9 317.3Z" fill="#c4b9a5" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M502.9 347.2L527.8 357.2L527.8 335.3L502.9 325.3Z" fill="#c4b9a5" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M527.8 357.2L549.2 368.9L549.2 347.0L527.8 335.3Z" fill="#c4b9a5" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M549.2 368.9L566.3 382.0L566.3 360.2L549.2 347.0Z" fill="#c4b9a5" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M566.3 382.0L578.9 396.3L578.9 374.4L566.3 360.2Z" fill="#c4b9a5" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M578.9 396.3L586.5 411.2L586.5 389.4L578.9 374.4Z" fill="#c4b9a5" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M586.5 411.2L589.1 426.6L589.1 404.7L586.5 389.4Z" fill="#c4b9a5" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M589.1 426.6L586.5 442.0L586.5 420.1L589.1 404.7Z" fill="#c4b9a5" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M586.5 442.0L578.9 456.9L578.9 435.1L586.5 420.1Z" fill="#d5cbb8" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M578.9 456.9L566.3 471.2L566.3 449.3L578.9 435.1Z" fill="#d5cbb8" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M566.3 471.2L549.2 484.3L549.2 462.4L566.3 449.3Z" fill="#d5cbb8" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M549.2 484.3L527.8 496.0L527.8 474.1L549.2 462.4Z" fill="#d5cbb8" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M527.8 474.1L502.9 484.1L498.0 476.2L522.0 466.5Z" fill="#ede6d8" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M502.9 484.1L474.9 492.2L471.2 483.9L498.0 476.2Z" fill="#ede6d8" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M474.9 492.2L444.6 498.1L442.1 489.5L471.2 483.9Z" fill="#ede6d8" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M444.6 498.1L412.7 501.7L411.4 493.0L442.1 489.5Z" fill="#ede6d8" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M412.7 501.7L380.0 502.9L380.0 494.2L411.4 493.0Z" fill="#ede6d8" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M380.0 502.9L347.3 501.7L348.6 493.0L380.0 494.2Z" fill="#ede6d8" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M347.3 501.7L315.4 498.1L317.9 489.5L348.6 493.0Z" fill="#ede6d8" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M315.4 498.1L285.1 492.2L288.8 483.9L317.9 489.5Z" fill="#ede6d8" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M285.1 492.2L257.1 484.1L262.0 476.2L288.8 483.9Z" fill="#ede6d8" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M257.1 484.1L232.2 474.1L238.0 466.5L262.0 476.2Z" fill="#ede6d8" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M232.2 474.1L210.8 462.4L217.5 455.3L238.0 466.5Z" fill="#ede6d8" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M210.8 462.4L193.7 449.3L201.1 442.7L217.5 455.3Z" fill="#ede6d8" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M193.7 449.3L181.1 435.1L189.0 429.0L201.1 442.7Z" fill="#ede6d8" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M181.1 435.1L173.5 420.1L181.6 414.6L189.0 429.0Z" fill="#ede6d8" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M173.5 420.1L170.9 404.7L179.2 399.9L181.6 414.6Z" fill="#ede6d8" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M170.9 404.7L173.5 389.4L181.6 385.1L179.2 399.9Z" fill="#dfd6c4" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M173.5 389.4L181.1 374.4L189.0 370.7L181.6 385.1Z" fill="#dfd6c4" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M181.1 374.4L193.7 360.2L201.1 357.1L189.0 370.7Z" fill="#dfd6c4" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M193.7 360.2L210.8 347.0L217.5 344.5L201.1 357.1Z" fill="#dfd6c4" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M210.8 347.0L232.2 335.3L238.0 333.2L217.5 344.5Z" fill="#dfd6c4" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M232.2 335.3L257.1 325.3L262.0 323.6L238.0 333.2Z" fill="#dfd6c4" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M257.1 325.3L285.1 317.3L288.8 315.9L262.0 323.6Z" fill="#dfd6c4" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M285.1 317.3L315.4 311.4L317.9 310.2L288.8 315.9Z" fill="#dfd6c4" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M315.4 311.4L347.3 307.8L348.6 306.8L317.9 310.2Z" fill="#dfd6c4" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M347.3 307.8L380.0 306.6L380.0 305.6L348.6 306.8Z" fill="#dfd6c4" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M380.0 306.6L412.7 307.8L411.4 306.8L380.0 305.6Z" fill="#dfd6c4" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M412.7 307.8L444.6 311.4L442.1 310.2L411.4 306.8Z" fill="#dfd6c4" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M444.6 311.4L474.9 317.3L471.2 315.9L442.1 310.2Z" fill="#dfd6c4" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M474.9 317.3L502.9 325.3L498.0 323.6L471.2 315.9Z" fill="#dfd6c4" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M502.9 325.3L527.8 335.3L522.0 333.2L498.0 323.6Z" fill="#dfd6c4" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M527.8 335.3L549.2 347.0L542.5 344.5L522.0 333.2Z" fill="#dfd6c4" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M549.2 347.0L566.3 360.2L558.9 357.1L542.5 344.5Z" fill="#dfd6c4" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M566.3 360.2L578.9 374.4L571.0 370.7L558.9 357.1Z" fill="#dfd6c4" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M578.9 374.4L586.5 389.4L578.4 385.1L571.0 370.7Z" fill="#dfd6c4" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M586.5 389.4L589.1 404.7L580.8 399.9L578.4 385.1Z" fill="#dfd6c4" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M589.1 404.7L586.5 420.1L578.4 414.6L580.8 399.9Z" fill="#dfd6c4" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M586.5 420.1L578.9 435.1L571.0 429.0L578.4 414.6Z" fill="#dfd6c4" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M578.9 435.1L566.3 449.3L558.9 442.7L571.0 429.0Z" fill="#dfd6c4" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M566.3 449.3L549.2 462.4L542.5 455.3L558.9 442.7Z" fill="#dfd6c4" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M549.2 462.4L527.8 474.1L522.0 466.5L542.5 455.3Z" fill="#ede6d8" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M522.0 466.5L498.0 476.2L471.2 483.9L442.1 489.5L411.4 493.0L380.0 494.2L348.6 493.0L317.9 489.5L288.8 483.9L262.0 476.2L238.0 466.5L217.5 455.3L201.1 442.7L189.0 429.0L181.6 414.6L179.2 399.9L181.6 385.1L189.0 370.7L201.1 357.1L217.5 344.5L238.0 333.2L262.0 323.6L288.8 315.9L317.9 310.2L348.6 306.8L380.0 305.6L411.4 306.8L442.1 310.2L471.2 315.9L498.0 323.6L522.0 333.2L542.5 344.5L558.9 357.1L571.0 370.7L578.4 385.1L580.8 399.9L578.4 414.6L571.0 429.0L558.9 442.7L542.5 455.3L522.0 466.5Z" fill="#9bbfa8" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M512.3 461.5L490.0 470.4L464.9 477.6L437.8 482.9L409.3 486.1L380.0 487.2L350.7 486.1L322.2 482.9L295.1 477.6L270.0 470.4L247.7 461.5L228.7 451.0L213.3 439.3L202.1 426.5L195.2 413.1L192.9 399.4L195.2 385.7L202.1 372.3L213.3 359.5L228.7 347.8L247.7 337.3L270.0 328.3L295.1 321.1L322.2 315.9L350.7 312.6L380.0 311.6L409.3 312.6L437.8 315.9L464.9 321.1L490.0 328.3L512.3 337.3L531.3 347.8L546.7 359.5L557.9 372.3L564.8 385.7L567.1 399.4L564.8 413.1L557.9 426.5L546.7 439.3L531.3 451.0L512.3 461.5Z" fill="none" stroke="#18181b" stroke-width="1.2" opacity="0.35"/><line x1="513.3" y1="461.7" x2="520.1" y2="464.9" stroke="#18181b" stroke-width="1.5" opacity="0.75"/><line x1="490.8" y1="470.7" x2="494.0" y2="472.8" stroke="#18181b" stroke-width="1" opacity="0.35"/><line x1="465.6" y1="478.0" x2="468.1" y2="480.3" stroke="#18181b" stroke-width="1" opacity="0.35"/><line x1="438.2" y1="483.3" x2="439.9" y2="485.7" stroke="#18181b" stroke-width="1" opacity="0.35"/><line x1="409.5" y1="486.5" x2="410.3" y2="489.1" stroke="#18181b" stroke-width="1" opacity="0.35"/><line x1="380.0" y1="487.6" x2="380.0" y2="492.1" stroke="#18181b" stroke-width="1.5" opacity="0.75"/><line x1="350.5" y1="486.5" x2="349.7" y2="489.1" stroke="#18181b" stroke-width="1" opacity="0.35"/><line x1="321.8" y1="483.3" x2="320.1" y2="485.7" stroke="#18181b" stroke-width="1" opacity="0.35"/><line x1="294.4" y1="478.0" x2="291.9" y2="480.3" stroke="#18181b" stroke-width="1" opacity="0.35"/><line x1="269.2" y1="470.7" x2="266.0" y2="472.8" stroke="#18181b" stroke-width="1" opacity="0.35"/><line x1="246.7" y1="461.7" x2="239.9" y2="464.9" stroke="#18181b" stroke-width="1.5" opacity="0.75"/><line x1="227.5" y1="451.2" x2="223.1" y2="452.7" stroke="#18181b" stroke-width="1" opacity="0.35"/><line x1="212.1" y1="439.3" x2="207.2" y2="440.5" stroke="#18181b" stroke-width="1" opacity="0.35"/><line x1="200.8" y1="426.5" x2="195.5" y2="427.3" stroke="#18181b" stroke-width="1" opacity="0.35"/><line x1="193.9" y1="413.0" x2="188.4" y2="413.4" stroke="#18181b" stroke-width="1" opacity="0.35"/><line x1="191.5" y1="399.1" x2="181.9" y2="399.1" stroke="#18181b" stroke-width="1.5" opacity="0.75"/><line x1="193.9" y1="385.3" x2="188.4" y2="384.9" stroke="#18181b" stroke-width="1" opacity="0.35"/><line x1="200.8" y1="371.8" x2="195.5" y2="371.0" stroke="#18181b" stroke-width="1" opacity="0.35"/><line x1="212.1" y1="359.0" x2="207.2" y2="357.8" stroke="#18181b" stroke-width="1" opacity="0.35"/><line x1="227.5" y1="347.1" x2="223.1" y2="345.6" stroke="#18181b" stroke-width="1" opacity="0.35"/><line x1="246.7" y1="336.6" x2="239.9" y2="333.4" stroke="#18181b" stroke-width="1.5" opacity="0.75"/><line x1="269.2" y1="327.6" x2="266.0" y2="325.5" stroke="#18181b" stroke-width="1" opacity="0.35"/><line x1="294.4" y1="320.3" x2="291.9" y2="318.0" stroke="#18181b" stroke-width="1" opacity="0.35"/><line x1="321.8" y1="315.0" x2="320.1" y2="312.5" stroke="#18181b" stroke-width="1" opacity="0.35"/><line x1="350.5" y1="311.8" x2="349.7" y2="309.2" stroke="#18181b" stroke-width="1" opacity="0.35"/><line x1="380.0" y1="310.7" x2="380.0" y2="306.2" stroke="#18181b" stroke-width="1.5" opacity="0.75"/><line x1="409.5" y1="311.8" x2="410.3" y2="309.2" stroke="#18181b" stroke-width="1" opacity="0.35"/><line x1="438.2" y1="315.0" x2="439.9" y2="312.5" stroke="#18181b" stroke-width="1" opacity="0.35"/><line x1="465.6" y1="320.3" x2="468.1" y2="318.0" stroke="#18181b" stroke-width="1" opacity="0.35"/><line x1="490.8" y1="327.6" x2="494.0" y2="325.5" stroke="#18181b" stroke-width="1" opacity="0.35"/><line x1="513.3" y1="336.6" x2="520.1" y2="333.4" stroke="#18181b" stroke-width="1.5" opacity="0.75"/><line x1="532.5" y1="347.1" x2="536.9" y2="345.6" stroke="#18181b" stroke-width="1" opacity="0.35"/><line x1="547.9" y1="359.0" x2="552.8" y2="357.8" stroke="#18181b" stroke-width="1" opacity="0.35"/><line x1="559.2" y1="371.8" x2="564.5" y2="371.0" stroke="#18181b" stroke-width="1" opacity="0.35"/><line x1="566.1" y1="385.3" x2="571.6" y2="384.9" stroke="#18181b" stroke-width="1" opacity="0.35"/><line x1="568.5" y1="399.1" x2="578.1" y2="399.1" stroke="#18181b" stroke-width="1.5" opacity="0.75"/><line x1="566.1" y1="413.0" x2="571.6" y2="413.4" stroke="#18181b" stroke-width="1" opacity="0.35"/><line x1="559.2" y1="426.5" x2="564.5" y2="427.3" stroke="#18181b" stroke-width="1" opacity="0.35"/><line x1="547.9" y1="439.3" x2="552.8" y2="440.5" stroke="#18181b" stroke-width="1" opacity="0.35"/><line x1="532.5" y1="451.2" x2="536.9" y2="452.7" stroke="#18181b" stroke-width="1" opacity="0.35"/><path d="M246.7 372.0L258.4 377.4L248.7 382.0L237.0 376.5Z" fill="#f4f3ec" stroke="#18181b" stroke-width="1.2" stroke-linejoin="round" stroke-linecap="round"/><path d="M212.7 403.5L222.4 408.0L212.7 412.6L203.0 408.0Z" fill="#f4f3ec" stroke="#18181b" stroke-width="1.2" stroke-linejoin="round" stroke-linecap="round"/><path d="M306.1 455.5L317.7 461.0L310.0 464.7L298.3 459.2Z" fill="#f4f3ec" stroke="#18181b" stroke-width="1.2" stroke-linejoin="round" stroke-linecap="round"/><path d="M439.3 454.2L449.1 458.7L437.4 464.2L427.7 459.6Z" fill="#f4f3ec" stroke="#18181b" stroke-width="1.2" stroke-linejoin="round" stroke-linecap="round"/><path d="M528.8 382.0L540.5 387.5L530.8 392.1L519.1 386.6Z" fill="#f4f3ec" stroke="#18181b" stroke-width="1.2" stroke-linejoin="round" stroke-linecap="round"/><path d="M426.7 328.6L436.4 333.1L426.7 337.7L417.0 333.1Z" fill="#f4f3ec" stroke="#18181b" stroke-width="1.2" stroke-linejoin="round" stroke-linecap="round"/><path d="M385.8 350.5L483.1 396.2L483.1 401.6L385.8 447.3L374.2 447.3L276.9 401.6L276.9 396.2L374.2 350.5Z" fill="#e2e6eb" stroke="#18181b" stroke-width="1.4" stroke-linejoin="round" stroke-linecap="round"/><circle cx="380.0" cy="358.2" r="2.8" fill="#f3cf7a" stroke="#18181b" stroke-width="1"/><circle cx="380.0" cy="358.2" r="1" fill="#18181b"/><circle cx="465.6" cy="398.4" r="2.8" fill="#f3cf7a" stroke="#18181b" stroke-width="1"/><circle cx="465.6" cy="398.4" r="1" fill="#18181b"/><circle cx="294.4" cy="398.4" r="2.8" fill="#f3cf7a" stroke="#18181b" stroke-width="1"/><circle cx="294.4" cy="398.4" r="1" fill="#18181b"/><circle cx="380.0" cy="438.6" r="2.8" fill="#f3cf7a" stroke="#18181b" stroke-width="1"/><circle cx="380.0" cy="438.6" r="1" fill="#18181b"/><path d="M422.8 418.5L415.6 421.4L415.6 408.3L422.8 405.4Z" fill="#d8dde3" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M415.6 421.4L407.5 423.7L407.5 410.6L415.6 408.3Z" fill="#d8dde3" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M407.5 423.7L398.7 425.4L398.7 412.3L407.5 410.6Z" fill="#d8dde3" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M398.7 425.4L389.5 426.5L389.5 413.4L398.7 412.3Z" fill="#d8dde3" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M389.5 426.5L380.0 426.8L380.0 413.7L389.5 413.4Z" fill="#d8dde3" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M380.0 426.8L370.5 426.5L370.5 413.4L380.0 413.7Z" fill="#d8dde3" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M370.5 426.5L361.3 425.4L361.3 412.3L370.5 413.4Z" fill="#d8dde3" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M361.3 425.4L352.5 423.7L352.5 410.6L361.3 412.3Z" fill="#d8dde3" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M352.5 423.7L344.4 421.4L344.4 408.3L352.5 410.6Z" fill="#d8dde3" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M344.4 421.4L337.2 418.5L337.2 405.4L344.4 408.3Z" fill="#d8dde3" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M337.2 418.5L331.0 415.1L331.0 402.0L337.2 405.4Z" fill="#d8dde3" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M331.0 415.1L326.1 411.3L326.1 398.2L331.0 402.0Z" fill="#d8dde3" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M326.1 411.3L322.4 407.2L322.4 394.1L326.1 398.2Z" fill="#d8dde3" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M322.4 407.2L320.2 402.9L320.2 389.7L322.4 394.1Z" fill="#d8dde3" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M320.2 402.9L319.5 398.4L319.5 385.3L320.2 389.7Z" fill="#d8dde3" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M319.5 398.4L320.2 394.0L320.2 380.9L319.5 385.3Z" fill="#bcc5cf" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M320.2 394.0L322.4 389.6L322.4 376.5L320.2 380.9Z" fill="#bcc5cf" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M322.4 389.6L326.1 385.5L326.1 372.4L322.4 376.5Z" fill="#bcc5cf" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M326.1 385.5L331.0 381.7L331.0 368.6L326.1 372.4Z" fill="#a7afba" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M331.0 381.7L337.2 378.3L337.2 365.2L331.0 368.6Z" fill="#a7afba" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M337.2 378.3L344.4 375.4L344.4 362.3L337.2 365.2Z" fill="#a7afba" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M344.4 375.4L352.5 373.1L352.5 360.0L344.4 362.3Z" fill="#a7afba" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M352.5 373.1L361.3 371.4L361.3 358.3L352.5 360.0Z" fill="#a7afba" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M361.3 371.4L370.5 370.4L370.5 357.2L361.3 358.3Z" fill="#a7afba" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M370.5 370.4L380.0 370.0L380.0 356.9L370.5 357.2Z" fill="#a7afba" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M380.0 370.0L389.5 370.4L389.5 357.2L380.0 356.9Z" fill="#a7afba" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M389.5 370.4L398.7 371.4L398.7 358.3L389.5 357.2Z" fill="#a7afba" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M398.7 371.4L407.5 373.1L407.5 360.0L398.7 358.3Z" fill="#a7afba" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M407.5 373.1L415.6 375.4L415.6 362.3L407.5 360.0Z" fill="#a7afba" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M415.6 375.4L422.8 378.3L422.8 365.2L415.6 362.3Z" fill="#a7afba" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M422.8 378.3L429.0 381.7L429.0 368.6L422.8 365.2Z" fill="#a7afba" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M429.0 381.7L433.9 385.5L433.9 372.4L429.0 368.6Z" fill="#a7afba" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M433.9 385.5L437.6 389.6L437.6 376.5L433.9 372.4Z" fill="#a7afba" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M437.6 389.6L439.8 394.0L439.8 380.9L437.6 376.5Z" fill="#a7afba" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M439.8 394.0L440.5 398.4L440.5 385.3L439.8 380.9Z" fill="#a7afba" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M440.5 398.4L439.8 402.9L439.8 389.7L440.5 385.3Z" fill="#a7afba" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M439.8 402.9L437.6 407.2L437.6 394.1L439.8 389.7Z" fill="#bcc5cf" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M437.6 407.2L433.9 411.3L433.9 398.2L437.6 394.1Z" fill="#bcc5cf" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M433.9 411.3L429.0 415.1L429.0 402.0L433.9 398.2Z" fill="#bcc5cf" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M429.0 415.1L422.8 418.5L422.8 405.4L429.0 402.0Z" fill="#bcc5cf" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M422.8 405.4L415.6 408.3L407.5 410.6L398.7 412.3L389.5 413.4L380.0 413.7L370.5 413.4L361.3 412.3L352.5 410.6L344.4 408.3L337.2 405.4L331.0 402.0L326.1 398.2L322.4 394.1L320.2 389.7L319.5 385.3L320.2 380.9L322.4 376.5L326.1 372.4L331.0 368.6L337.2 365.2L344.4 362.3L352.5 360.0L361.3 358.3L370.5 357.2L380.0 356.9L389.5 357.2L398.7 358.3L407.5 360.0L415.6 362.3L422.8 365.2L429.0 368.6L433.9 372.4L437.6 376.5L439.8 380.9L440.5 385.3L439.8 389.7L437.6 394.1L433.9 398.2L429.0 402.0L422.8 405.4Z" fill="#e8ecf0" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M428.6 403.3L420.4 406.6L411.2 409.2L401.3 411.2L390.8 412.3L380.0 412.7L369.2 412.3L358.7 411.2L348.8 409.2L339.6 406.6L331.4 403.3L324.4 399.4L318.7 395.1L314.6 390.4L312.1 385.5L311.2 380.4L312.1 375.4L314.6 370.5L318.7 365.8L324.4 361.5L331.4 357.6L339.6 354.3L348.8 351.7L358.7 349.7L369.2 348.6L380.0 348.2L390.8 348.6L401.3 349.7L411.2 351.7L420.4 354.3L428.6 357.6L435.6 361.5L441.3 365.8L445.4 370.5L447.9 375.4L448.8 380.4L447.9 385.5L445.4 390.4L441.3 395.1L435.6 399.4L428.6 403.3Z" fill="none" stroke="#18181b" stroke-width="4.2" stroke-linecap="round"/><path d="M428.6 403.3L420.4 406.6L411.2 409.2L401.3 411.2L390.8 412.3L380.0 412.7L369.2 412.3L358.7 411.2L348.8 409.2L339.6 406.6L331.4 403.3L324.4 399.4L318.7 395.1L314.6 390.4L312.1 385.5L311.2 380.4L312.1 375.4L314.6 370.5L318.7 365.8L324.4 361.5L331.4 357.6L339.6 354.3L348.8 351.7L358.7 349.7L369.2 348.6L380.0 348.2L390.8 348.6L401.3 349.7L411.2 351.7L420.4 354.3L428.6 357.6L435.6 361.5L441.3 365.8L445.4 370.5L447.9 375.4L448.8 380.4L447.9 385.5L445.4 390.4L441.3 395.1L435.6 399.4L428.6 403.3Z" fill="none" stroke="#d98a5a" stroke-width="3" stroke-linecap="round"/><path d="M428.6 403.3L420.4 406.6L411.2 409.2L401.3 411.2L390.8 412.3L380.0 412.7L369.2 412.3L358.7 411.2L348.8 409.2L339.6 406.6L331.4 403.3L324.4 399.4L318.7 395.1L314.6 390.4L312.1 385.5L311.2 380.4L312.1 375.4L314.6 370.5L318.7 365.8L324.4 361.5L331.4 357.6L339.6 354.3L348.8 351.7L358.7 349.7L369.2 348.6L380.0 348.2L390.8 348.6L401.3 349.7L411.2 351.7L420.4 354.3L428.6 357.6L435.6 361.5L441.3 365.8L445.4 370.5L447.9 375.4L448.8 380.4L447.9 385.5L445.4 390.4L441.3 395.1L435.6 399.4L428.6 403.3Z" fill="none" stroke="#efb28a" stroke-width="1.2" stroke-linecap="round" opacity="0.8"/><path d="M428.6 396.0L420.4 399.3L411.2 401.9L401.3 403.9L390.8 405.0L380.0 405.4L369.2 405.0L358.7 403.9L348.8 401.9L339.6 399.3L331.4 396.0L324.4 392.1L318.7 387.8L314.6 383.1L312.1 378.2L311.2 373.2L312.1 368.1L314.6 363.2L318.7 358.5L324.4 354.2L331.4 350.3L339.6 347.0L348.8 344.4L358.7 342.4L369.2 341.3L380.0 340.9L390.8 341.3L401.3 342.4L411.2 344.4L420.4 347.0L428.6 350.3L435.6 354.2L441.3 358.5L445.4 363.2L447.9 368.1L448.8 373.2L447.9 378.2L445.4 383.1L441.3 387.8L435.6 392.1L428.6 396.0Z" fill="none" stroke="#18181b" stroke-width="4.2" stroke-linecap="round"/><path d="M428.6 396.0L420.4 399.3L411.2 401.9L401.3 403.9L390.8 405.0L380.0 405.4L369.2 405.0L358.7 403.9L348.8 401.9L339.6 399.3L331.4 396.0L324.4 392.1L318.7 387.8L314.6 383.1L312.1 378.2L311.2 373.2L312.1 368.1L314.6 363.2L318.7 358.5L324.4 354.2L331.4 350.3L339.6 347.0L348.8 344.4L358.7 342.4L369.2 341.3L380.0 340.9L390.8 341.3L401.3 342.4L411.2 344.4L420.4 347.0L428.6 350.3L435.6 354.2L441.3 358.5L445.4 363.2L447.9 368.1L448.8 373.2L447.9 378.2L445.4 383.1L441.3 387.8L435.6 392.1L428.6 396.0Z" fill="none" stroke="#d98a5a" stroke-width="3" stroke-linecap="round"/><path d="M428.6 396.0L420.4 399.3L411.2 401.9L401.3 403.9L390.8 405.0L380.0 405.4L369.2 405.0L358.7 403.9L348.8 401.9L339.6 399.3L331.4 396.0L324.4 392.1L318.7 387.8L314.6 383.1L312.1 378.2L311.2 373.2L312.1 368.1L314.6 363.2L318.7 358.5L324.4 354.2L331.4 350.3L339.6 347.0L348.8 344.4L358.7 342.4L369.2 341.3L380.0 340.9L390.8 341.3L401.3 342.4L411.2 344.4L420.4 347.0L428.6 350.3L435.6 354.2L441.3 358.5L445.4 363.2L447.9 368.1L448.8 373.2L447.9 378.2L445.4 383.1L441.3 387.8L435.6 392.1L428.6 396.0Z" fill="none" stroke="#efb28a" stroke-width="1.2" stroke-linecap="round" opacity="0.8"/><path d="M428.6 388.7L420.4 392.0L411.2 394.6L401.3 396.6L390.8 397.8L380.0 398.2L369.2 397.8L358.7 396.6L348.8 394.6L339.6 392.0L331.4 388.7L324.4 384.8L318.7 380.5L314.6 375.8L312.1 370.9L311.2 365.9L312.1 360.8L314.6 355.9L318.7 351.2L324.4 346.9L331.4 343.0L339.6 339.7L348.8 337.1L358.7 335.2L369.2 334.0L380.0 333.6L390.8 334.0L401.3 335.2L411.2 337.1L420.4 339.7L428.6 343.0L435.6 346.9L441.3 351.2L445.4 355.9L447.9 360.8L448.8 365.9L447.9 370.9L445.4 375.8L441.3 380.5L435.6 384.8L428.6 388.7Z" fill="none" stroke="#18181b" stroke-width="4.2" stroke-linecap="round"/><path d="M428.6 388.7L420.4 392.0L411.2 394.6L401.3 396.6L390.8 397.8L380.0 398.2L369.2 397.8L358.7 396.6L348.8 394.6L339.6 392.0L331.4 388.7L324.4 384.8L318.7 380.5L314.6 375.8L312.1 370.9L311.2 365.9L312.1 360.8L314.6 355.9L318.7 351.2L324.4 346.9L331.4 343.0L339.6 339.7L348.8 337.1L358.7 335.2L369.2 334.0L380.0 333.6L390.8 334.0L401.3 335.2L411.2 337.1L420.4 339.7L428.6 343.0L435.6 346.9L441.3 351.2L445.4 355.9L447.9 360.8L448.8 365.9L447.9 370.9L445.4 375.8L441.3 380.5L435.6 384.8L428.6 388.7Z" fill="none" stroke="#d98a5a" stroke-width="3" stroke-linecap="round"/><path d="M428.6 388.7L420.4 392.0L411.2 394.6L401.3 396.6L390.8 397.8L380.0 398.2L369.2 397.8L358.7 396.6L348.8 394.6L339.6 392.0L331.4 388.7L324.4 384.8L318.7 380.5L314.6 375.8L312.1 370.9L311.2 365.9L312.1 360.8L314.6 355.9L318.7 351.2L324.4 346.9L331.4 343.0L339.6 339.7L348.8 337.1L358.7 335.2L369.2 334.0L380.0 333.6L390.8 334.0L401.3 335.2L411.2 337.1L420.4 339.7L428.6 343.0L435.6 346.9L441.3 351.2L445.4 355.9L447.9 360.8L448.8 365.9L447.9 370.9L445.4 375.8L441.3 380.5L435.6 384.8L428.6 388.7Z" fill="none" stroke="#efb28a" stroke-width="1.2" stroke-linecap="round" opacity="0.8"/><path d="M415.0 379.9L409.1 382.2L402.5 384.2L395.3 385.6L387.7 386.4L380.0 386.7L372.3 386.4L364.7 385.6L357.5 384.2L350.9 382.2L345.0 379.9L339.9 377.1L335.9 374.0L332.9 370.6L331.1 367.1L330.5 363.4L331.1 359.8L332.9 356.3L335.9 352.9L339.9 349.8L345.0 347.0L350.9 344.6L357.5 342.7L364.7 341.3L372.3 340.5L380.0 340.2L387.7 340.5L395.3 341.3L402.5 342.7L409.1 344.6L415.0 347.0L420.1 349.8L424.1 352.9L427.1 356.3L428.9 359.8L429.5 363.4L428.9 367.1L427.1 370.6L424.1 374.0L420.1 377.1L415.0 379.9Z" fill="#1e2230" stroke="#18181b" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><ellipse cx="380.0" cy="363.0" rx="22" ry="11" fill="#38bdf8" opacity="0.5"/><ellipse cx="380.0" cy="363.0" rx="13" ry="6.5" fill="#ffffff" opacity="0.85"/>`,
					}}
				/>

				{/* Concentric Magnetic Induction Pulse Rings (Rising from reactor core z=15 to z=60) */}
				<g
					className="magnetic-field"
					transform="translate(380, 375)"
					style={{ pointerEvents: "none" }}
				>
					<ellipse
						className="ring-pulse-1"
						cx="0"
						cy="0"
						rx="20"
						ry="9.6"
						fill="none"
						stroke="var(--color-sky, #bae6fd)"
						strokeWidth="2"
					/>
					<ellipse
						className="ring-pulse-2"
						cx="0"
						cy="0"
						rx="20"
						ry="9.6"
						fill="none"
						stroke="var(--color-lavender, #ebe6ff)"
						strokeWidth="1.8"
					/>
					<ellipse
						className="ring-pulse-3"
						cx="0"
						cy="0"
						rx="20"
						ry="9.6"
						fill="none"
						stroke="var(--color-mint, #86efac)"
						strokeWidth="1.6"
					/>
					<ellipse
						className="ring-pulse-4"
						cx="0"
						cy="0"
						rx="20"
						ry="9.6"
						fill="none"
						stroke="var(--color-sky, #bae6fd)"
						strokeWidth="1.4"
					/>
				</g>

				{/* Upward Streaming Air Lift Flowlines */}
				<g
					className="air-currents"
					style={{ pointerEvents: "none" }}
					stroke="var(--color-sky, #bae6fd)"
					strokeWidth="1.8"
					strokeDasharray="5 5"
					opacity="0.55"
				>
					<path className="flow-line-1" d="M358 375 C350 325, 362 275, 358 215" fill="none" />
					<path className="flow-line-2" d="M402 375 C410 325, 398 275, 402 215" fill="none" />
					<path className="flow-line-3" d="M380 375 C372 315, 388 255, 380 195" fill="none" />
				</g>

				{/* Ground Projected Soft Shadows */}
				<g transform="translate(380, 412)">
					<ellipse
						className="shadow-pulse-react"
						cx="0"
						cy="0"
						rx="24"
						ry="12"
						fill={COLOR_INK}
						filter="url(#soft-shadow)"
					/>
				</g>
				<g transform="translate(260, 424)">
					<ellipse
						className="shadow-pulse-ts"
						cx="0"
						cy="0"
						rx="23"
						ry="11"
						fill={COLOR_INK}
						filter="url(#soft-shadow)"
					/>
				</g>
				<g transform="translate(500, 424)">
					<ellipse
						className="shadow-pulse-next"
						cx="0"
						cy="0"
						rx="23"
						ry="11"
						fill={COLOR_INK}
						filter="url(#soft-shadow)"
					/>
				</g>
				<g transform="translate(380, 436)">
					<ellipse
						className="shadow-pulse-tailwind"
						cx="0"
						cy="0"
						rx="26"
						ry="13"
						fill={COLOR_INK}
						filter="url(#soft-shadow)"
					/>
				</g>

				{/* Floating Tactile 3D Badges (Neubrutalist Squircle Badges) */}
				{/* 1. React 19 (Top Center) - bg-sky */}
				<g transform="translate(380, 188)">
					<g className="badge-react-anim">
						{/* Neubrutalist Extrusion Block */}
						<rect x={-24} y={-24} width={56} height={56} rx={14} fill={COLOR_INK} />
						{/* Main Face */}
						<rect
							x={-28}
							y={-28}
							width={56}
							height={56}
							rx={14}
							fill={COLOR_SKY}
							stroke={COLOR_INK}
							strokeWidth={2}
						/>
						{/* Centered Vector Icon */}
						<g transform="translate(-15, -15) scale(1.25)" fill={COLOR_INK}>
							<path d={SVG_REACT} />
						</g>
					</g>
				</g>

				{/* 2. TypeScript (Left) - bg-yellow */}
				<g transform="translate(252, 265)">
					<g className="badge-ts-anim">
						<rect x={-23} y={-23} width={54} height={54} rx={13} fill={COLOR_INK} />
						<rect
							x={-27}
							y={-27}
							width={54}
							height={54}
							rx={13}
							fill={COLOR_YELLOW}
							stroke={COLOR_INK}
							strokeWidth={2}
						/>
						<g transform="translate(-14.4, -14.4) scale(1.2)" fill={COLOR_INK}>
							<path d={SVG_TS} />
						</g>
					</g>
				</g>

				{/* 3. Next.js 16 (Right) - bg-surface-muted */}
				<g transform="translate(508, 265)">
					<g className="badge-next-anim">
						<rect x={-23} y={-23} width={54} height={54} rx={13} fill={COLOR_INK} />
						<rect
							x={-27}
							y={-27}
							width={54}
							height={54}
							rx={13}
							fill={COLOR_SURFACE_MUTED}
							stroke={COLOR_INK}
							strokeWidth={2}
						/>
						<g transform="translate(-14.4, -14.4) scale(1.2)" fill={COLOR_INK}>
							<path d={SVG_NEXT} />
						</g>
					</g>
				</g>

				{/* 4. Tailwind CSS v4 (Front Center) - bg-mint */}
				<g transform="translate(380, 328)">
					<g className="badge-tailwind-anim">
						<rect x={-24} y={-24} width={56} height={56} rx={14} fill={COLOR_INK} />
						<rect
							x={-28}
							y={-28}
							width={56}
							height={56}
							rx={14}
							fill={COLOR_MINT}
							stroke={COLOR_INK}
							strokeWidth={2}
						/>
						<g transform="translate(-15, -15) scale(1.25)" fill={COLOR_INK}>
							<path d={SVG_TAILWIND} />
						</g>
					</g>
				</g>
			</svg>
		</div>
	);
}
