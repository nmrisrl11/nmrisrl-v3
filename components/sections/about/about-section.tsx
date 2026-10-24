import { GridSection } from "@/components/page-layout/grid-section";
import { Data } from "@/constants/data";
import { SpecializationCard } from "./bento-01/specialization";
import { ExperienceCard } from "./bento-02/experience";
import { ArchitectureCard } from "./bento-03/architecture";
import { InnovationCard } from "./bento-04/innovation";
import { PhilosophyCard } from "./bento-05/philosophy";
import { InterestsCard } from "./bento-06/interests";

export function AboutSection() {
	return (
		<GridSection
			id="about"
			figure="FIG. 02 // IDENTITY & BACKGROUND"
			figureMeta={["SPECIALIZATION", "CRAFT & SYSTEMS"]}
			title="About Me"
			description={`${Data.position} crafting tactile, high-performance web applications and modular design systems.`}
		>
			<div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-12">
				<SpecializationCard />
				<ExperienceCard />
				<ArchitectureCard />
				<InnovationCard />
				<PhilosophyCard />
				<InterestsCard />
			</div>
		</GridSection>
	);
}
