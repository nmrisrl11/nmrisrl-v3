import { GridSection } from "@/components/page-layout/grid-section";
import { PageLayout } from "@/components/page-layout/page-layout";
import { AboutSection } from "@/components/sections/about/about-section";
import { ExperienceSection } from "@/components/sections/experience/experience-section";
import { HeroSection } from "@/components/sections/hero/hero-section";
import { SkillsSection } from "@/components/sections/skills/skills-section";
import { Data } from "@/constants/data";

export default function Home() {
	return (
		<PageLayout>
			{/* 01 // HERO SECTION */}
			<HeroSection />

			{/* 02 // ABOUT SECTION (BENTO GRID) */}
			<AboutSection />

			{/* 03 // WORK EXPERIENCE SECTION */}
			<ExperienceSection />

			{/* 04 // TECH STACK & SKILLS SECTION */}
			<SkillsSection />

			{/* 05 // HIGHLIGHTS OF MY WORK (PROJECTS) */}
			<GridSection
				id="projects"
				number="05"
				title="Highlights of My Work"
				description="Selected case studies and open-source contributions."
			>
				<div className="squircle-card bg-surface p-6">
					<p className="font-body text-base text-ink/80">
						Featured engineering showcases and real-world implementations.
					</p>
				</div>
			</GridSection>

			{/* 06 // CONTACT SECTION */}
			<GridSection
				id="contact"
				number="06"
				title="Get in Touch"
				description="Available for select consulting, contracts, or full-time opportunities."
				showMarker={false}
				className="border-b-0 pb-20"
			>
				<div className="squircle-card bg-surface p-6">
					<p className="font-body text-base text-ink/80">
						Let&apos;s build something exceptional together. Reach out via email at{" "}
						<a
							href={`mailto:${Data.emailAddress}`}
							className="font-bold text-coral underline decoration-2 underline-offset-4 hover:text-ink"
						>
							{Data.emailAddress}
						</a>{" "}
						or connect on social links.
					</p>
				</div>
			</GridSection>
		</PageLayout>
	);
}
