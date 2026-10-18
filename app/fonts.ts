import { DM_Sans, JetBrains_Mono, Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";

export const fontDisplay = Plus_Jakarta_Sans({
	subsets: ["latin"],
	weight: ["700", "800"],
	variable: "--font-display",
	display: "swap",
});

export const fontHeading = Space_Grotesk({
	subsets: ["latin"],
	weight: ["600", "700"],
	variable: "--font-heading",
	display: "swap",
});

export const fontBody = DM_Sans({
	subsets: ["latin"],
	weight: ["400", "500", "700"],
	variable: "--font-body",
	display: "swap",
});

export const fontMono = JetBrains_Mono({
	subsets: ["latin"],
	weight: ["400", "500", "700"],
	variable: "--font-mono",
	display: "swap",
});
