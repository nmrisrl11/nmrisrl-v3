"use client";

import { GridSection } from "@/components/page-layout/grid-section";
import { Experience_Section_Data } from "@/constants/data";
import { WorkExperienceData } from "@/constants/work-experience-data";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { ExperienceCard } from "./experience-card";
import { ExperienceDossierModal } from "./experience-dossier-modal";

export function ExperienceSection() {
	const [activeId, setActiveId] = useState<string | null>(null);
	const [direction, setDirection] = useState<number>(0);

	const currentIndex = WorkExperienceData.findIndex((item) => item.id === activeId);
	const activeItem = currentIndex !== -1 ? WorkExperienceData[currentIndex] : null;

	const handleSelect = (id: string) => {
		setActiveId(id);
		setDirection(0);
	};

	const handleNavigate = (newIndex: number) => {
		if (newIndex >= 0 && newIndex < WorkExperienceData.length) {
			setDirection(newIndex > currentIndex ? 1 : -1);
			setActiveId(WorkExperienceData[newIndex].id);
		}
	};

	const handleClose = () => {
		setActiveId(null);
	};

	return (
		<GridSection
			id="experience"
			figure={Experience_Section_Data.figure}
			figureMeta={Experience_Section_Data.figureMeta}
			title={Experience_Section_Data.title}
			description={Experience_Section_Data.description}
		>
			{/* Timeline Cards List */}
			<div className="flex flex-col gap-4 sm:gap-5">
				{WorkExperienceData.map((item) => (
					<ExperienceCard key={item.id} item={item} onSelect={() => handleSelect(item.id)} />
				))}
			</div>

			{/* Isolated Backdrop AnimatePresence */}
			<AnimatePresence>
				{activeItem && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.2 }}
						className="fixed inset-0 z-50 h-full w-full bg-ink/80"
						onClick={handleClose}
					/>
				)}
			</AnimatePresence>

			{/* Isolated Modal AnimatePresence */}
			<AnimatePresence>
				{activeItem && (
					<div
						className="fixed inset-0 z-50 grid place-items-center overflow-y-auto p-3 sm:p-5 md:p-8"
						onClick={handleClose}
					>
						<ExperienceDossierModal
							item={activeItem}
							direction={direction}
							currentIndex={currentIndex}
							totalCount={WorkExperienceData.length}
							onClose={handleClose}
							onNavigate={handleNavigate}
						/>
					</div>
				)}
			</AnimatePresence>
		</GridSection>
	);
}
