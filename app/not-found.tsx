import { PageLayout } from "@/components/page-layout/page-layout";
import { NotFoundSection } from "@/components/sections/not-found/not-found-section";
import { Data } from "@/constants/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "404 — Page Not Found",
	description: `Oops! The page you are looking for doesn't exist or has been moved. Return to the homepage or explore ${Data.fullName}'s portfolio.`,
};

export default function NotFound() {
	return (
		<PageLayout>
			<NotFoundSection />
		</PageLayout>
	);
}
