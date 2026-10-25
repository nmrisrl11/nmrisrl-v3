"use client";

import { DiamondStarIcon } from "@/components/neu-icons";
import { GridSection } from "@/components/page-layout/grid-section";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { NotFoundIllustration } from "./not-found-illustration";

export function NotFoundSection() {
	const router = useRouter();

	const handleGoBack = () => {
		if (typeof window !== "undefined" && window.history.length > 1) {
			router.back();
		} else {
			router.push("/");
		}
	};

	return (
		<div className="w-full min-w-0">
			{/* 01 // MAIN 404 HERO STAGE */}
			<GridSection
				id="not-found-hero"
				className="border-b-0 pt-10 pb-20 sm:pt-14 sm:pb-24 lg:pt-16 lg:pb-32"
			>
				<div className="mx-auto flex max-w-4xl flex-col items-center text-center">
					{/* 0. CENTERED BLUEPRINT FIGURE HEADER */}
					<div className="mb-6 flex flex-wrap items-center justify-center gap-1.5 font-mono text-[10px] font-bold tracking-wider text-ink/60 uppercase select-none sm:gap-2 sm:text-[11px] sm:tracking-widest">
						<DiamondStarIcon size={12} className="size-3 text-coral" />
						<span>FIG. 404 // ROUTE DISCONNECTED</span>
						<span className="text-ink/25">•</span>
						<span>NOT FOUND</span>
						<span className="text-ink/25">•</span>
						<span>AUTOMATED REPAIR ACTIVE</span>
					</div>

					{/* 1. CLEAN 3D ISOMETRIC MODEL (EXPANDED PROMINENCE) */}
					<NotFoundIllustration className="w-full max-w-3xl" />

					{/* 2. TITLE */}
					<h1 className="mt-4 font-heading text-3xl font-black tracking-tight text-ink sm:text-4xl md:text-5xl">
						Connection Severed — Page Not Found
					</h1>

					{/* 3. DESCRIPTION */}
					<p className="mt-3 max-w-xl font-body text-base leading-relaxed text-ink/80 md:text-lg">
						Looks like the conduit to this page was unplugged or moved. Our autonomous bots and
						drone are already on site splicing the line — let&apos;s get you back on track!
					</p>

					{/* 4. PRIMARY CTA BUTTONS */}
					<div className="mt-8 flex w-full flex-col items-center justify-center gap-3 sm:flex-row">
						<Button
							variant="default"
							size="lg"
							shape="squircle"
							asChild
							className="w-full shadow-brutal hover:shadow-brutal-lg sm:w-auto"
						>
							<Link href="/">
								<Home className="size-4" />
								<span>Take Me Home</span>
							</Link>
						</Button>

						<Button
							variant="secondary"
							size="lg"
							shape="squircle"
							onClick={handleGoBack}
							className="w-full shadow-brutal hover:shadow-brutal-lg sm:w-auto"
						>
							<ArrowLeft className="size-4" />
							<span>Go Back</span>
						</Button>
					</div>
				</div>
			</GridSection>
		</div>
	);
}
