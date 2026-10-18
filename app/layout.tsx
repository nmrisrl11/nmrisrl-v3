import { fontBody, fontDisplay, fontHeading, fontMono } from "@/app/fonts";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
	title: {
		default: "Nomer Israel — Front-end Developer",
		template: "%s | Nomer Israel",
	},
	description:
		"Front-end Developer with a passion for modern web technologies, accessible design systems, and delightful interactions.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			className={`${fontDisplay.variable} ${fontHeading.variable} ${fontBody.variable} ${fontMono.variable}`}
		>
			<body className="antialiased selection:bg-yellow selection:text-ink">{children}</body>
		</html>
	);
}
