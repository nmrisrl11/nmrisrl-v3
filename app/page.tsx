import Image from "next/image";
import Link from "next/link";
import { ArrowUpRightIcon, CodeXmlIcon, SparklesIcon } from "lucide-react";
import { PageLayout } from "@/components/page-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Home() {
	return (
		<PageLayout>
			{/* 01 // HERO SECTION */}
			<section
				id="hero"
				className="grid min-h-[calc(100vh-10rem)] items-center gap-12 pt-6 lg:grid-cols-12"
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
			</section>

			{/* 02 // ABOUT SECTION PLACEHOLDER */}
			<section id="about" className="mt-28 border-t-brutal border-ink pt-16">
				<div className="flex items-center gap-3">
					<span className="font-mono text-sm font-bold text-coral">02 //</span>
					<h2 className="font-heading text-3xl font-bold tracking-tight">About Me</h2>
				</div>
				<p className="mt-4 max-w-2xl font-body text-base text-ink/80">
					Passionate about building refined web interfaces, reactive systems, and delightful
					developer experiences.
				</p>
			</section>

			{/* 03 // EXPERIENCE SECTION PLACEHOLDER */}
			<section id="experience" className="mt-28 border-t-brutal border-ink pt-16">
				<div className="flex items-center gap-3">
					<span className="font-mono text-sm font-bold text-coral">03 //</span>
					<h2 className="font-heading text-3xl font-bold tracking-tight">Work Experience</h2>
				</div>
				<p className="mt-4 max-w-2xl font-body text-base text-ink/80">
					History of roles and impactful products developed across multiple domains.
				</p>
			</section>

			{/* 04 // STACK & SKILLS SECTION PLACEHOLDER */}
			<section id="skills" className="mt-28 border-t-brutal border-ink pt-16">
				<div className="flex items-center gap-3">
					<span className="font-mono text-sm font-bold text-coral">04 //</span>
					<h2 className="font-heading text-3xl font-bold tracking-tight">Tech Stack & Skills</h2>
				</div>
				<p className="mt-4 max-w-2xl font-body text-base text-ink/80">
					Technologies, frameworks, and tools powering production applications.
				</p>
			</section>

			{/* 05 // PROJECTS SECTION PLACEHOLDER */}
			<section id="projects" className="mt-28 border-t-brutal border-ink pt-16">
				<div className="flex items-center gap-3">
					<span className="font-mono text-sm font-bold text-coral">05 //</span>
					<h2 className="font-heading text-3xl font-bold tracking-tight">Highlights of My Work</h2>
				</div>
				<p className="mt-4 max-w-2xl font-body text-base text-ink/80">
					Selected case studies and open-source contributions.
				</p>
			</section>

			{/* 06 // CONTACT SECTION PLACEHOLDER */}
			<section id="contact" className="mt-28 border-t-brutal border-ink pt-16 pb-16">
				<div className="flex items-center gap-3">
					<span className="font-mono text-sm font-bold text-coral">06 //</span>
					<h2 className="font-heading text-3xl font-bold tracking-tight">Get in Touch</h2>
				</div>
				<p className="mt-4 max-w-2xl font-body text-base text-ink/80">
					Available for select consulting, contracts, or full-time opportunities.
				</p>
			</section>
		</PageLayout>
	);
}
