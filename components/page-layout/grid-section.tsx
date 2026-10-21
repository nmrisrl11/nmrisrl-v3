import { GridMarker, type GridMarkerVariant } from "@/components/page-layout/grid-marker";
import { cn } from "@/lib/utils";
import type { ReactElement, ReactNode } from "react";

interface GridSectionProps {
	id?: string;
	number?: string;
	figure?: string;
	figureMeta?: string | string[];
	title?: string;
	description?: string;
	children: ReactNode;
	className?: string;
	/** Marker variant ('squircle' | 'diamond-star' etc.) or custom ReactElement (defaults to 'squircle') */
	marker?: GridMarkerVariant | ReactElement;
	/** Optional class string applied to the corner markers */
	markerClassName?: string;
	/** Whether to display markers at bottom corner intersections (defaults to true) */
	showMarker?: boolean;
	/** Whether to display markers at top corner intersections (defaults to false) */
	showTopMarker?: boolean;
}

function CornerMarkers({
	marker,
	position,
	className,
}: {
	marker: GridMarkerVariant | ReactElement;
	position: "top" | "bottom";
	className?: string;
}) {
	const leftPos = position === "top" ? "top-left" : "bottom-left";
	const rightPos = position === "top" ? "top-right" : "bottom-right";

	if (typeof marker === "string") {
		return (
			<>
				<GridMarker variant={marker} position={leftPos} className={className} />
				<GridMarker variant={marker} position={rightPos} className={className} />
			</>
		);
	}

	return (
		<>
			<GridMarker position={leftPos} className={className}>
				{marker}
			</GridMarker>
			<GridMarker position={rightPos} className={className}>
				{marker}
			</GridMarker>
		</>
	);
}

export function GridSection({
	id,
	number,
	figure,
	figureMeta,
	title,
	description,
	children,
	className,
	marker = "squircle",
	markerClassName,
	showMarker = true,
	showTopMarker = false,
}: GridSectionProps) {
	return (
		<section
			id={id}
			className={cn("relative border-b border-ink/15 px-4 py-16 md:px-8 lg:px-12", className)}
		>
			{/* Top Intersection Corner Markers */}
			{showTopMarker && (
				<CornerMarkers marker={marker} position="top" className={markerClassName} />
			)}

			{/* Section Header (if title, number, or figure provided) */}
			{(title || number || figure) && (
				<header className="mb-8">
					{figure && (
						<div className="mb-2 flex flex-wrap items-center gap-1.5 font-mono text-[10px] font-bold tracking-wider text-ink/60 uppercase select-none sm:gap-2 sm:text-[11px] sm:tracking-widest">
							<span className="text-coral">✦</span>
							<span>{figure}</span>
							{figureMeta &&
								(Array.isArray(figureMeta) ? (
									figureMeta.map((item, idx) => (
										<span
											key={`${item}-${idx}`}
											className="inline-flex items-center gap-1.5 sm:gap-2"
										>
											<span className="text-ink/25">•</span>
											<span>{item}</span>
										</span>
									))
								) : (
									<span className="inline-flex items-center gap-1.5 sm:gap-2">
										<span className="text-ink/25">•</span>
										<span>{figureMeta}</span>
									</span>
								))}
						</div>
					)}
					<div className="flex items-center gap-2.5">
						{number && (
							<span className="font-mono text-sm font-bold tracking-tight text-coral">
								{number} //
							</span>
						)}
						{title && (
							<h2 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">
								{title}
							</h2>
						)}
					</div>
					{description && (
						<p className="mt-2 max-w-2xl font-body text-base text-ink/80 md:text-lg">
							{description}
						</p>
					)}
				</header>
			)}

			{/* Content */}
			{children}

			{/* Bottom Intersection Corner Markers */}
			{showMarker && (
				<CornerMarkers marker={marker} position="bottom" className={markerClassName} />
			)}
		</section>
	);
}
