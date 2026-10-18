"use client";

import { useEffect, useState } from "react";

export function useScrollSpy(ids: readonly string[], defaultId = "hero"): string {
	const [activeId, setActiveId] = useState<string>(defaultId);

	useEffect(() => {
		const elements = ids
			.map((id) => document.getElementById(id))
			.filter((el): el is HTMLElement => el !== null);

		if (elements.length === 0) return;

		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						setActiveId(entry.target.id);
					}
				}
			},
			{
				rootMargin: "-20% 0px -60% 0px",
				threshold: 0,
			},
		);

		for (const el of elements) {
			observer.observe(el);
		}

		return () => {
			observer.disconnect();
		};
	}, [ids]);

	return activeId;
}
