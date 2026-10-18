import Image from "next/image";
import Link from "next/link";
import { ArrowUpRightIcon, CodeXmlIcon, SparklesIcon } from "lucide-react";

export default function Home() {
	return (
		<main className="min-h-screen bg-canvas px-4 py-8 md:px-8 lg:px-16">
			{/* Header Nav */}
			<header className="mx-auto flex max-w-6xl items-center justify-between border-b-[2.5px] border-ink pb-6">
				<div className="font-display text-2xl font-extrabold tracking-tight">
					nmrisrl<span className="text-coral">.dev</span>
				</div>
				<nav className="flex items-center gap-3">
					<span className="squircle-badge inline-flex items-center gap-1.5 bg-surface px-3 py-1 font-mono text-xs font-semibold text-ink">
						<span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
						Available for work
					</span>
					<a
						href="#contact"
						className="squircle-btn inline-flex items-center gap-1.5 bg-coral px-4 py-2 text-sm font-bold text-white"
					>
						Get in touch <ArrowUpRightIcon className="size-4" />
					</a>
				</nav>
			</header>

			{/* Hero Preview */}
			<section className="mx-auto mt-12 grid max-w-6xl items-center gap-12 lg:grid-cols-12">
				{/* Copy Column */}
				<div className="flex flex-col gap-6 lg:col-span-7">
					<div className="flex flex-wrap gap-2">
						<span className="squircle-badge inline-flex items-center gap-1 bg-yellow px-3 py-1 font-mono text-xs font-bold text-ink">
							<SparklesIcon className="size-3.5" />
							Soft Neubrutalism v3
						</span>
						<span className="squircle-badge bg-lavender px-3 py-1 font-mono text-xs font-bold text-ink">
							Base UI + Tailwind v4
						</span>
					</div>

					<h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
						Nomer Israel
					</h1>

					<p className="max-w-xl font-body text-lg leading-relaxed text-ink/80 md:text-xl">
						Front-end developer crafting tactile, accessible, and high-performance digital
						experiences. Blending graphic bluntness with friendly interactions.
					</p>

					<div className="flex flex-wrap items-center gap-3 pt-2">
						<a
							href="#projects"
							className="squircle-btn inline-flex items-center gap-2 bg-coral px-6 py-3.5 text-base font-bold text-white"
						>
							View Projects <ArrowUpRightIcon className="size-4" />
						</a>
						<Link
							href="/docs"
							className="squircle-btn inline-flex items-center gap-2 bg-surface px-6 py-3.5 text-base font-bold text-ink"
						>
							<CodeXmlIcon className="size-4" /> Architecture Docs
						</Link>
					</div>
				</div>

				{/* Avatar Visual Column */}
				<div className="flex justify-center lg:col-span-5">
					<div className="squircle-card relative aspect-square w-full max-w-sm overflow-hidden bg-canvas">
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
					</div>
				</div>
			</section>
		</main>
	);
}
