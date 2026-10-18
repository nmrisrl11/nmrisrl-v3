import Image from "next/image";
import Link from "next/link";
import { ArrowUpRightIcon, CodeXmlIcon, SparklesIcon } from "lucide-react";
import { GridSection, PageLayout } from "@/components/page-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Home() {
	return (
		<PageLayout>
			{/* 01 // HERO SECTION */}
			<GridSection
				id="hero"
				className="grid min-h-[calc(100vh-8rem)] items-center gap-12 lg:grid-cols-12"
			>
				{/* Copy Column */}
				<div className="flex flex-col gap-6 lg:col-span-7">
					<div className="flex flex-wrap gap-2">
						<Badge variant="yellow" className="gap-1">
							<SparklesIcon className="size-3.5" />
							Soft Neubrutalism v3
						</Badge>
						<Badge variant="lavender">shadcn + Base UI</Badge>
						<Badge variant="sky">Tailwind CSS v4</Badge>
					</div>

					<h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
						Nomer Israel
					</h1>

					<p className="max-w-xl font-body text-lg leading-relaxed text-ink/80 md:text-xl">
						Front-end developer crafting tactile, accessible, and high-performance digital
						experiences. Blending graphic bluntness with friendly interactions.
					</p>

					<div className="flex flex-wrap items-center gap-3 pt-2">
						<Button asChild variant="default" size="lg">
							<a href="#projects">
								View Projects <ArrowUpRightIcon className="size-4" />
							</a>
						</Button>
						<Button asChild variant="secondary" size="lg">
							<Link href="/docs">
								<CodeXmlIcon className="size-4" /> Architecture Docs
							</Link>
						</Button>
					</div>
				</div>

				{/* Avatar Visual Column */}
				<div className="flex justify-center lg:col-span-5">
					<Card className="relative aspect-square w-full max-w-sm overflow-hidden bg-canvas p-0">
						<video
							autoPlay
							loop
							muted
							playsInline
							poster="/avatar/avatar-idle.webp"
							className="size-full object-cover object-center"
						>
							<source src="/avatar/avatar-idle.webm" type="video/webm" />
							<Image
								src="/avatar/avatar-idle.webp"
								alt="Nomer Israel Avatar"
								width={400}
								height={400}
								priority
								className="size-full object-cover"
							/>
						</video>
					</Card>
				</div>
			</GridSection>

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
