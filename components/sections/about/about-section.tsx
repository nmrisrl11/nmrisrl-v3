import { GridSection } from "@/components/page-layout/grid-section";
import { About_Data } from "@/constants/data";
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
			figure={About_Data.section.figure}
			figureMeta={About_Data.section.figureMeta}
			title={About_Data.section.title}
			description={About_Data.section.description}
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
