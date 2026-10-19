export interface NavItem {
	label: string;
	href: string;
}

export const NAV_ITEMS: readonly NavItem[] = [
	{ label: "About", href: "#about" },
	{ label: "Work", href: "#experience" },
	{ label: "Stack & Skills", href: "#skills" },
	{ label: "Projects", href: "#projects" },
	{ label: "Contact", href: "#contact" },
] as const;
