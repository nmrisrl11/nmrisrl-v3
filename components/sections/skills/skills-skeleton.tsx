import { DiamondStarIcon } from "@/components/neu-icons";
import { cn } from "@/lib/utils";

interface SkillsSkeletonProps {
	className?: string;
}

const SKELETON_CARDS = [
	{ id: "sk-1", colSpan: "lg:col-span-7", badgeCount: 7 },
	{ id: "sk-2", colSpan: "lg:col-span-5", badgeCount: 5 },
	{ id: "sk-3", colSpan: "lg:col-span-5", badgeCount: 6 },
	{ id: "sk-4", colSpan: "lg:col-span-7", badgeCount: 8 },
	{ id: "sk-5", colSpan: "lg:col-span-6", badgeCount: 6 },
	{ id: "sk-6", colSpan: "lg:col-span-6", badgeCount: 5 },
];

export function SkillsSkeleton({ className }: SkillsSkeletonProps) {
	return (
		<div
			role="status"
			aria-label="Loading technical specification matrix"
			className={cn("grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-12", className)}
		>
			<span className="sr-only">Loading technical specification matrix...</span>
			{SKELETON_CARDS.map((card) => (
				<div
					key={card.id}
					className={cn(
						"relative flex flex-col justify-between overflow-hidden squircle-card bg-surface p-4 sm:p-5 lg:p-6",
						card.colSpan,
					)}
				>
					<div>
						{/* Top Wireframe Header */}
						<div className="mb-3 flex items-center justify-between gap-2 border-b border-ink/10 pb-3 sm:mb-4 sm:pb-3.5">
							<div className="flex items-center gap-1.5 sm:gap-2">
								<DiamondStarIcon size={12} className="size-3 shrink-0 text-coral/40" />
								<div className="h-3 w-28 animate-pulse rounded-xs bg-ink/10 motion-reduce:animate-none" />
							</div>
							<div className="h-2.5 w-20 animate-pulse rounded-xs bg-ink/10 motion-reduce:animate-none" />
						</div>

						{/* Title Placeholder */}
						<div className="my-2 h-6 w-44 animate-pulse rounded-xs bg-ink/15 motion-reduce:animate-none sm:my-3 sm:h-7 sm:w-56" />

						{/* Badges Cluster Wireframe */}
						<div className="mt-3 flex flex-wrap gap-2 sm:gap-2.5">
							{Array.from({ length: card.badgeCount }).map((_, idx) => (
								<div
									// Safe static skeleton wireframe indices
									// biome-ignore lint/suspicious/noArrayIndexKey: pure visual placeholder array
									key={`badge-${card.id}-${idx}`}
									className="h-7 w-20 animate-pulse rounded-md border-subtle border-ink/15 bg-canvas/30 shadow-brutal-xs corner-squircle supports-[corner-shape:squircle]:rounded-full motion-reduce:animate-none sm:h-8 sm:w-24"
								/>
							))}
						</div>
					</div>

					{/* Spec Footer Wireframe */}
					<div className="mt-5 flex items-center justify-between border-t border-ink/10 pt-3">
						<div className="h-2.5 w-24 animate-pulse rounded-xs bg-ink/10 motion-reduce:animate-none" />
						<div className="h-2.5 w-14 animate-pulse rounded-xs bg-ink/10 motion-reduce:animate-none" />
					</div>
				</div>
			))}
		</div>
	);
}
