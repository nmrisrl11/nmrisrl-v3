import type { ReactNode } from "react";
import { Navbar } from "./navbar";

interface PageLayoutProps {
	children: ReactNode;
}

export function PageLayout({ children }: PageLayoutProps) {
	return (
		<div className="relative min-h-dvh w-full overflow-x-clip text-ink">
			{/* 3-Column Architectural Framework with Decorative Diagonal Striped Gutter Rails */}
			<div className="mx-auto grid min-h-dvh w-full grid-cols-1 justify-center md:grid-cols-[2.5rem_minmax(0,72rem)_2.5rem] lg:grid-cols-[3rem_minmax(0,72rem)_3rem]">
				{/* Left Gutter Rail (Hatched decorative stripes bounded by 2 vertical hairline borders) */}
				<div
					aria-hidden="true"
					className="col-start-1 row-span-full row-start-1 hidden border-x border-ink/15 bg-striped-rail md:block"
				/>

				{/* Center Main Architectural Stage */}
				<div className="relative col-start-1 min-h-dvh w-full min-w-0 border-x border-ink/15 md:col-start-2 md:border-x-0">
					{/* Sticky Top Navbar */}
					<Navbar />

					<main className="w-full min-w-0">{children}</main>
				</div>

				{/* Right Gutter Rail (Hatched decorative stripes bounded by 2 vertical hairline borders) */}
				<div
					aria-hidden="true"
					className="row-span-full row-start-1 hidden border-x border-ink/15 bg-striped-rail md:col-start-3 md:block"
				/>
			</div>
		</div>
	);
}
