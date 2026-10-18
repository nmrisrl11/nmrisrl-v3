import Image from "next/image";
import Link from "next/link";
import { ArrowUpRightIcon, CodeXmlIcon, SparklesIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Home() {
	return (
		<main className="min-h-screen bg-canvas px-4 py-8 md:px-8 lg:px-16">
			{/* Header Nav */}
			<header className="mx-auto flex max-w-6xl items-center justify-between border-b-[2.5px] border-ink pb-6">
				<div className="font-display text-2xl font-extrabold tracking-tight">
					nmrisrl<span className="text-coral">.dev</span>
				</div>
				<nav className="flex items-center gap-3">
					<Badge variant="default" className="gap-1.5 font-mono text-xs">
						<span className="size-2 animate-pulse rounded-full bg-emerald-500" />
						Available for work
					</Badge>
					<Button asChild variant="default" size="sm">
						<a href="#contact">
							Get in touch <ArrowUpRightIcon className="size-4" />
						</a>
					</Button>
				</nav>
			</header>

			{/* Hero Preview */}
			<section className="mx-auto mt-12 grid max-w-6xl items-center gap-12 lg:grid-cols-12">
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
		</main>
	);
}
