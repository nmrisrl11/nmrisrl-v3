import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ExperiencePulseProps {
	className?: string;
	label?: string;
}

export function ExperiencePulse({ className, label = "Current Work" }: ExperiencePulseProps) {
	return (
		<Badge
			variant="mint"
			shape="squircle"
			className={cn("px-2 py-0.5 font-mono text-2xs select-none", className)}
			title={label}
		>
			<span className="relative flex size-2 items-center justify-center" aria-hidden="true">
				<span className="absolute inline-flex size-full animate-ping rounded-full bg-ink/40 opacity-75 motion-reduce:animate-none" />
				<span className="relative inline-flex size-1.5 rounded-full bg-ink" />
			</span>
			<span className="uppercase">{label}</span>
		</Badge>
	);
}
