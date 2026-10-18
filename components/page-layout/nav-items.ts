import {
	BriefcaseIcon,
	FolderGit2Icon,
	HomeIcon,
	LayersIcon,
	MailIcon,
	UserIcon,
	type LucideIcon,
} from "lucide-react";

export interface NavItem {
	id: string;
	label: string;
	number: string;
	href: string;
	icon: LucideIcon;
}

export const NAV_ITEMS: readonly NavItem[] = [
	{ id: "hero", label: "Home", number: "01", href: "#hero", icon: HomeIcon },
	{ id: "about", label: "About", number: "02", href: "#about", icon: UserIcon },
	{ id: "experience", label: "Experience", number: "03", href: "#experience", icon: BriefcaseIcon },
	{ id: "skills", label: "Stack & Skills", number: "04", href: "#skills", icon: LayersIcon },
	{ id: "projects", label: "Projects", number: "05", href: "#projects", icon: FolderGit2Icon },
	{ id: "contact", label: "Contact", number: "06", href: "#contact", icon: MailIcon },
] as const;
