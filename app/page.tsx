import { GridSection, PageLayout } from "@/components/page-layout";
import { HeroSection } from "@/components/sections";
import { Badge } from "@/components/ui/badge";

export default function Home() {
	return (
		<PageLayout>
			{/* 01 // HERO SECTION */}
			<HeroSection />

			{/* 02 // ABOUT SECTION */}
			<GridSection
				id="about"
				number="02"
				title="About Me"
				description="Passionate about building refined web interfaces, reactive systems, and delightful developer experiences."
			>
				<div className="squircle-card rounded-2xl border-subtle border-ink bg-white/70 p-6 shadow-brutal-sm">
					<p className="font-body text-base text-ink/80">
						Front-end engineer with a strong eye for design systems, accessible UI primitives, and
						micro-interactions.
					</p>
				</div>
			</GridSection>

			{/* 03 // WORK EXPERIENCE SECTION */}
			<GridSection
				id="experience"
				number="03"
				title="Work Experience"
				description="History of roles and impactful products developed across multiple domains."
			>
				<div className="squircle-card rounded-2xl border-subtle border-ink bg-white/70 p-6 shadow-brutal-sm">
					<p className="font-body text-base text-ink/80">
						Track record of delivering scalable web applications and developer tools.
					</p>
				</div>
			</GridSection>

			{/* 04 // TECH STACK & SKILLS SECTION */}
			<GridSection
				id="skills"
				number="04"
				title="Tech Stack & Skills"
				description="Technologies, frameworks, and tools powering production applications."
			>
				<div className="flex flex-wrap gap-2.5">
					<Badge variant="yellow" className="text-sm">
						Next.js 16
					</Badge>
					<Badge variant="lavender" className="text-sm">
						React 19
					</Badge>
					<Badge variant="sky" className="text-sm">
						TypeScript
					</Badge>
					<Badge variant="mint" className="text-sm">
						Tailwind CSS v4
					</Badge>
					<Badge variant="coral" className="text-sm">
						Base UI
					</Badge>
					<Badge variant="default" className="text-sm">
						Motion
					</Badge>
					<Badge variant="outline" className="text-sm">
						OXC Toolchain
					</Badge>
				</div>
			</GridSection>

			{/* 05 // HIGHLIGHTS OF MY WORK (PROJECTS) */}
			<GridSection
				id="projects"
				number="05"
				title="Highlights of My Work"
				description="Selected case studies and open-source contributions."
			>
				<div className="squircle-card rounded-2xl border-subtle border-ink bg-white/70 p-6 shadow-brutal-sm">
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
				showBottomCrosshairs={false}
				className="border-b-0 pb-20"
			>
				<div className="squircle-card rounded-2xl border-subtle border-ink bg-white/70 p-6 shadow-brutal-sm">
					<p className="font-body text-base text-ink/80">
						Let&apos;s build something exceptional together. Reach out via email or social links.
					</p>
				</div>
			</GridSection>
		</PageLayout>
	);
}
