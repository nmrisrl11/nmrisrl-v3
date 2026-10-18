import Link from "next/link";
import { ArrowUpRightIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function Header() {
	return (
		<header className="sticky top-0 z-30 w-full border-b-brutal border-ink bg-canvas/90 backdrop-blur-md">
			<div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-8">
				{/* Brand Logo */}
				<Link
					href="#hero"
					className="group inline-flex items-center gap-1 font-display text-2xl font-extrabold tracking-tight text-ink transition-transform active:scale-95"
				>
					<span>nmrisrl</span>
					<span className="text-coral transition-colors group-hover:text-ink">.dev</span>
				</Link>

				{/* Quick Actions */}
				<nav className="flex items-center gap-3">
					<Badge variant="default" className="hidden gap-1.5 font-mono text-xs sm:inline-flex">
						<span className="size-2 animate-pulse rounded-full bg-emerald-500" />
						Available for work
					</Badge>

					<Button asChild variant="default" size="sm">
						<a href="#contact">
							Get in touch <ArrowUpRightIcon className="size-4" />
						</a>
					</Button>
				</nav>
			</div>
		</header>
	);
}
