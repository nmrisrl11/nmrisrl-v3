import { cn } from "@/lib/utils";
import { Code2 } from "lucide-react";
import Image from "next/image";

interface ExperienceLogoProps {
	logo: string;
	companyName: string;
	className?: string;
	size?: "sm" | "md" | "lg";
}

export function ExperienceLogo({ logo, companyName, className, size = "md" }: ExperienceLogoProps) {
	const sizeClasses = {
		sm: "size-10",
		md: "size-12",
		lg: "size-16",
	}[size];

	const isLucideIcon = logo === "Code2";

	return (
		<div
			className={cn(
				"relative flex shrink-0 items-center justify-center overflow-hidden rounded-xl border-subtle border-ink bg-surface shadow-brutal-xs corner-squircle supports-[corner-shape:squircle]:rounded-full",
				sizeClasses,
				className,
			)}
		>
			{isLucideIcon ? (
				<Code2 className="size-6 text-coral" aria-hidden="true" />
			) : (
				<Image
					src={logo}
					alt={`${companyName} logo`}
					width={64}
					height={64}
					className="aspect-square size-full object-cover"
				/>
			)}
		</div>
	);
}
