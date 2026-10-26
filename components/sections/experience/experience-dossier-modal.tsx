"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CrossStarIcon, DiamondStarIcon } from "@/components/neu-icons";
import { parseExperienceTask, type WorkExperienceItem } from "@/constants/work-experience-data";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import { ExperienceLogo } from "./experience-logo";
import { ExperiencePulse } from "./experience-pulse";

interface ExperienceDossierModalProps {
	item: WorkExperienceItem;
	direction: number;
	currentIndex: number;
	totalCount: number;
	onClose: () => void;
	onNavigate: (index: number) => void;
}

function getSkillVariant(
	skill: string,
): "sky" | "coral" | "lavender" | "mint" | "yellow" | "default" {
	const lower = skill.toLowerCase();
	if (
		lower.includes("react") ||
		lower.includes("next") ||
		lower.includes("typescript") ||
		lower.includes("vite") ||
		lower.includes("javascript")
	) {
		return "sky";
	}
	if (
		lower.includes("nest") ||
		lower.includes("node") ||
		lower.includes("express") ||
		lower.includes("docker") ||
		lower.includes("bullmq") ||
		lower.includes("php")
	) {
		return "coral";
	}
	if (
		lower.includes("tailwind") ||
		lower.includes("shadcn") ||
		lower.includes("mantine") ||
		lower.includes("material") ||
		lower.includes("css") ||
		lower.includes("motion")
	) {
		return "lavender";
	}
	if (
		lower.includes("sql") ||
		lower.includes("prisma") ||
		lower.includes("drizzle") ||
		lower.includes("redis") ||
		lower.includes("mongo") ||
		lower.includes("azure")
	) {
		return "mint";
	}
	if (
		lower.includes("architecture") ||
		lower.includes("ddd") ||
		lower.includes("tdd") ||
		lower.includes("fsd") ||
		lower.includes("antigravity") ||
		lower.includes("agentic")
	) {
		return "yellow";
	}
	return "default";
}

export function ExperienceDossierModal({
	item,
	direction,
	currentIndex,
	totalCount,
	onClose,
	onNavigate,
}: ExperienceDossierModalProps) {
	const shouldReduceMotion = useReducedMotion();
	const modalRef = useRef<HTMLDivElement>(null);

	// Lock body scroll and listen for keyboard navigation / escape
	useEffect(() => {
		const originalOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";

		const handleKeyDown = (e: globalThis.KeyboardEvent) => {
			if (e.key === "Escape") {
				onClose();
			} else if (e.key === "ArrowLeft" && currentIndex > 0) {
				onNavigate(currentIndex - 1);
			} else if (e.key === "ArrowRight" && currentIndex < totalCount - 1) {
				onNavigate(currentIndex + 1);
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => {
			document.body.style.overflow = originalOverflow;
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [currentIndex, totalCount, onClose, onNavigate]);

	const parsedTasks = item.tasks.map(parseExperienceTask);

	const contentVariants = {
		enter: (dir: number) => ({
			x: shouldReduceMotion ? 0 : dir > 0 ? 32 : dir < 0 ? -32 : 0,
			opacity: 0,
		}),
		center: {
			x: 0,
			opacity: 1,
			transition: {
				duration: shouldReduceMotion ? 0.1 : 0.22,
				ease: "easeOut" as const,
			},
		},
		exit: (dir: number) => ({
			x: shouldReduceMotion ? 0 : dir > 0 ? -32 : dir < 0 ? 32 : 0,
			opacity: 0,
			transition: {
				duration: shouldReduceMotion ? 0.08 : 0.16,
				ease: "easeIn" as const,
			},
		}),
	};

	return (
		<motion.div
			ref={modalRef}
			role="dialog"
			aria-modal="true"
			aria-labelledby="dossier-company-name"
			onClick={(e) => e.stopPropagation()}
			initial={{
				opacity: 0,
				scale: shouldReduceMotion ? 1 : 0.95,
				y: shouldReduceMotion ? 0 : 12,
			}}
			animate={{
				opacity: 1,
				scale: 1,
				y: 0,
			}}
			exit={{
				opacity: 0,
				scale: shouldReduceMotion ? 1 : 0.95,
				y: shouldReduceMotion ? 0 : 12,
			}}
			transition={{
				duration: shouldReduceMotion ? 0.1 : 0.2,
				ease: "easeOut",
			}}
			className="relative isolate flex max-h-[85vh] w-full max-w-2xl transform-gpu flex-col overflow-hidden rounded-2xl border-brutal border-ink bg-surface text-ink shadow-brutal-xl sm:max-h-[88vh] sm:rounded-3xl"
		>
			{/* Close Button - Anchored to top-right corner, stays stationary across role navigation */}
			<button
				type="button"
				onClick={onClose}
				aria-label="Close dossier"
				className="absolute top-3.5 right-3.5 z-20 flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-lg border-subtle border-ink bg-surface text-ink shadow-brutal-xs transition-all duration-150 corner-squircle hover:scale-105 hover:bg-yellow hover:shadow-brutal focus-visible:outline-2 focus-visible:outline-ink active:scale-95 supports-[corner-shape:squircle]:rounded-full sm:top-4 sm:right-5 sm:size-9"
			>
				<X className="size-4" />
			</button>

			{/* Sliding Content Container - Handles Directional Next/Prev Role Transition */}
			<div className="relative flex min-h-0 flex-1 flex-col overflow-hidden rounded-t-2xl sm:rounded-t-3xl">
				<AnimatePresence mode="wait" custom={direction} initial={false}>
					<motion.div
						key={item.id}
						custom={direction}
						variants={contentVariants}
						initial="enter"
						animate="center"
						exit="exit"
						className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-t-2xl sm:rounded-t-3xl"
					>
						{/* Pinned Top Identity Block - Stays stationary, never scrolls */}
						<div className="shrink-0 rounded-t-2xl border-b border-ink/15 bg-canvas-subtle p-4 sm:rounded-t-3xl sm:p-5">
							{/* Row 1: Top Utility Row (Status Badge / Blueprint Kicker + Reserved Space for Close Button) */}
							<div className="mb-3 flex h-8 items-center justify-between pr-10 sm:h-9 sm:pr-12">
								<div>
									{item.isCurrent ? (
										<ExperiencePulse />
									) : (
										<div className="flex items-center gap-1.5 font-mono text-2xs font-bold tracking-wider text-ink/50 uppercase select-none">
											<DiamondStarIcon size={10} className="size-2.5 text-coral" />
											<span>ROLE DOSSIER // {item.jobType.toUpperCase()}</span>
										</div>
									)}
								</div>
							</div>

							{/* Row 2: Identity Block (Logo + Full Width Company Name & Position) */}
							<div className="flex min-w-0 flex-col items-center gap-3">
								<div className="flex shrink-0 flex-col items-center gap-3 text-center">
									<ExperienceLogo logo={item.logo} companyName={item.companyName} size="md" />

									<h2
										id="dossier-company-name"
										className="font-heading text-base font-black tracking-tight text-ink sm:text-lg"
									>
										{item.companyName}
									</h2>
								</div>

								<div className="flex min-w-0 flex-1 flex-col gap-1 text-center">
									<p className="font-heading text-sm font-bold text-coral sm:text-base">
										{item.position}
									</p>

									<div className="mt-0.5 flex flex-wrap items-center gap-1.5 font-mono text-2xs text-ink/75 sm:gap-2 sm:text-xs">
										<span>{item.jobType}</span>
										<span className="text-ink/30">•</span>
										<span>{item.location}</span>
										<span className="text-ink/30">•</span>
										<span className="font-bold text-ink">
											{item.startDate} — {item.endDate}
										</span>
									</div>
								</div>
							</div>
						</div>

						{/* Scrollable Modal Body - Only this section scrolls vertically */}
						<div className="min-h-0 flex-1 space-y-6 overflow-y-auto p-5 sm:p-6">
							{/* Deliverables & Impact */}
							<div className="space-y-3">
								<div className="flex items-center gap-2 border-b border-ink/15 pb-2 font-mono text-2xs font-bold tracking-wider text-ink/70 uppercase">
									<DiamondStarIcon size={12} className="size-3 text-coral" />
									<span>ENGINEERING DELIVERABLES & IMPACT</span>
								</div>

								<div className="grid gap-2.5">
									{parsedTasks.map((task, i) => (
										<div
											key={i}
											className="rounded-xl border-subtle border-ink/30 bg-surface-muted p-3.5 transition-colors hover:border-ink"
										>
											<div className="mb-1 flex items-center gap-1.5 font-mono text-xs font-bold tracking-wide text-ink uppercase">
												<ChevronRight
													className="size-3.5 shrink-0 text-coral"
													strokeWidth={2.5}
													aria-hidden="true"
												/>
												<span>{task.category}</span>
											</div>
											<p className="font-body text-sm leading-relaxed text-ink/85">
												{task.description}
											</p>
										</div>
									))}
								</div>
							</div>

							{/* Tech Arsenal */}
							{item.skills && item.skills.length > 0 && (
								<div className="space-y-3">
									<div className="flex items-center gap-2 border-b border-ink/15 pb-2 font-mono text-2xs font-bold tracking-wider text-ink/70 uppercase">
										<CrossStarIcon size={12} className="size-3 text-yellow" />
										<span>TECHNOLOGY STACK & TOOLCHAIN ({item.skills.length})</span>
									</div>

									<div className="flex flex-wrap gap-1.5 sm:gap-2">
										{item.skills.map((skill) => (
											<Badge
												key={skill}
												variant={getSkillVariant(skill)}
												className="text-2xs sm:text-xs"
											>
												{skill}
											</Badge>
										))}
									</div>
								</div>
							)}
						</div>
					</motion.div>
				</AnimatePresence>
			</div>

			{/* Stationary Bottom Navigation Dock */}
			<div className="flex shrink-0 items-center justify-between rounded-b-2xl border-t border-ink/15 bg-canvas-subtle p-3 sm:rounded-b-3xl sm:px-6 sm:py-3.5">
				<Button
					variant="outline"
					size="sm"
					shape="squircle"
					disabled={currentIndex === 0}
					onClick={() => onNavigate(currentIndex - 1)}
					className="gap-1.5 text-xs"
				>
					<ChevronLeft className="size-4" />
					<span className="hidden sm:inline">Previous Role</span>
					<span className="sm:hidden">Prev</span>
				</Button>

				<div className="font-mono text-2xs font-bold tracking-wider text-ink/60">
					ROLE {currentIndex + 1} OF {totalCount}
				</div>

				<Button
					variant="outline"
					size="sm"
					shape="squircle"
					disabled={currentIndex === totalCount - 1}
					onClick={() => onNavigate(currentIndex + 1)}
					className="gap-1.5 text-xs"
				>
					<span className="hidden sm:inline">Next Role</span>
					<span className="sm:hidden">Next</span>
					<ChevronRight className="size-4" />
				</Button>
			</div>
		</motion.div>
	);
}
