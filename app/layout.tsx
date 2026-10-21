import { fontBody, fontDisplay, fontHeading, fontMono } from "@/app/fonts";
import { CustomCursor } from "@/components/custom/cursor";
import type { Metadata } from "next";
import Script from "next/script";
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
			<head>
				{process.env.NODE_ENV === "development" && (
					<Script
						src="//unpkg.com/react-scan/dist/auto.global.js"
						crossOrigin="anonymous"
						strategy="beforeInteractive"
					/>
				)}
			</head>

			<body className="antialiased selection:bg-yellow selection:text-ink">
				<CustomCursor clickEffectShadow={false} />
				{children}
			</body>
		</html>
	);
}
