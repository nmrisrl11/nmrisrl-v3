"use client";

import { Data } from "@/constants/data";
import { useRoughNotation } from "@/hooks/use-rough-notation";
import { RoughNotation, RoughNotationGroup } from "react-rough-notation";

export function HeroNarrative() {
	const { ready: showAnnotations, reducedMotion } = useRoughNotation(250);

	return (
		<p className="max-w-xl font-body text-base leading-relaxed font-medium text-balance text-ink/80 sm:text-lg">
			<RoughNotationGroup show={showAnnotations}>
				Hi, I&apos;m{" "}
				<span className="relative inline-block font-bold text-ink">
					<RoughNotation
						type="underline"
						order={1}
						color="var(--color-coral)"
						strokeWidth={2.5}
						iterations={2}
						padding={[0, 2, 2, 2]}
						animate={!reducedMotion}
						animationDuration={600}
					>
						{Data.firstName}
					</RoughNotation>
				</span>{" "}
				— a{" "}
				<span className="relative inline-block font-semibold text-ink">
					<RoughNotation
						type="highlight"
						order={2}
						color="color-mix(in srgb, var(--color-yellow) 75%, transparent)"
						multiline={true}
						iterations={1}
						padding={[2, 6]}
						animate={!reducedMotion}
						animationDuration={700}
					>
						{Data.position.toLowerCase()}
					</RoughNotation>
				</span>{" "}
				turning complex ideas into fast, accessible, and delightful web applications.
			</RoughNotationGroup>
		</p>
	);
}
