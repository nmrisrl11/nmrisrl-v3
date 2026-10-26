import { COMPANY_LOGOS } from "./company-logos";

export interface WorkExperienceItem {
	id: string;
	companyName: string;
	position: string;
	jobType: string;
	location: string;
	startDate: string;
	endDate: string;
	logo: string;
	logoBanner: string;
	tasks: string[];
	skills?: string[];
	isCurrent: boolean;
}

export type WorkExperienceDataProps = WorkExperienceItem;

export interface ParsedTask {
	category: string;
	description: string;
}

export function parseExperienceTask(task: string): ParsedTask {
	const colonIndex = task.indexOf(": ");
	if (colonIndex !== -1) {
		return {
			category: task.slice(0, colonIndex).trim(),
			description: task.slice(colonIndex + 2).trim(),
		};
	}
	return {
		category: "Core Scope & Responsibilities",
		description: task.trim(),
	};
}

export const WorkExperienceData: WorkExperienceDataProps[] = [
	{
		id: "0",
		companyName: "Independent Developer",
		position: "Career Break & Upskilling",
		jobType: "Self-Employed",
		location: "Remote",
		startDate: "May 2026",
		endDate: "Present",
		logo: "Code2",
		logoBanner: "",
		tasks: [
			"Backend Engineering & Architecture: Undertook an intensive deep-dive into enterprise-grade backend development using NestJS. Architected robust APIs by applying Clean Architecture, Domain-Driven Design (DDD), and Hexagonal Architecture principles. Implemented advanced features including JWT/TOTP authentication, BullMQ for task scheduling, rate limiting, event-driven flows, Redis caching, and modern ORMs like Prisma and Drizzle.",
			"AI-Assisted Development (Agentic Coding): Leveraged AI tools and the Antigravity framework to dramatically accelerate development cycles—transitioning from traditional month-long workflows to rapid day-long iterations. Designed, built, and deployed production-ready, local-first applications ('DayBook', 'Sulok') featuring PWA support, IndexedDB/Dexie.js for offline storage, and WebRTC/PeerJS for seamless cross-device data syncing.",
			"Full-Stack Mastery: Expanded end-to-end capabilities by engineering complex applications across diverse ecosystems. Developed a real-time messaging application (utilizing MERN and Socket.io) and built a support ticketing platform emphasizing PostgreSQL and comprehensive error/analytics monitoring via Sentry and PostHog, alongside complete UI/UX overhauls.",
			"Modern Frontend & Mobile Development: Explored bleeding-edge frontend routing and rendering paradigms by building applications with TanStack Router and TanStack Start. Concurrently refreshed cross-platform mobile development skills by building functional mobile applications using React Native.",
		],
		skills: [
			"React",
			"React Native",
			"Next.js",
			"TanStack Router",
			"TanStack Start",
			"Node.js",
			"NestJS",
			"Express.js",
			"PostgreSQL",
			"MongoDB",
			"Prisma",
			"Drizzle",
			"Redis",
			"Docker",
			"WebRTC",
			"PWA",
			"TypeScript",
			"Tailwind CSS",
			"shadcn/ui",
			"Zustand",
			"Zod",
			"BullMQ",
			"Sentry",
			"PostHog",
			"Clean Architecture",
			"Domain-Driven Design (DDD)",
			"Hexagonal Architecture",
			"Agentic Coding",
			"Antigravity",
		],
		isCurrent: true,
	},
	{
		id: "1",
		companyName: "Eden Garden Network Inc.",
		position: "Front-end Developer",
		jobType: "Full-time",
		location: "Philippines",
		startDate: "February 2022",
		endDate: "April 2026",
		logo: COMPANY_LOGOS.EDEN_GARDEN.thumbnail,
		logoBanner: COMPANY_LOGOS.EDEN_GARDEN.banner,
		tasks: [
			`System Architecture: Architected "Seeking," a complex dating platform using Next.js, TypeScript, and Tailwind. Applied Clean Architecture principles to the frontend structure, enforcing a strict separation between UI components, business logic, and API services.`,
			`Frontend Modernization: Migrated "The One Bible" from a React SPA to a robust Next.js ecosystem. Built the admin dashboard interface by consuming backend APIs, ensuring seamless data synchronization.`,
			`SaaS & Growth Engineering: Developed high-conversion landing pages for "D-Tru" and engineered an SEO-optimized blog platform, successfully migrating from static MDX to Sanity (Headless CMS) to streamline content management for the marketing team.`,
			`Subscription Management: Engineered the central hub for the VPN app, handling user subscriptions, gift codes, and cross-platform client downloads. Ensured the reliability of complex logic and critical user journeys through Test-Driven Development (TDD) with Vitest and React Testing Library, complemented by End-to-End (E2E) testing using Playwright.`,
			`Internal Systems: Built and maintained company websites and dashboards using CodeIgniter 3, streamlining content operations.`,
			`Developer Experience (DX): Reduced boilerplate coding time by ~40% using custom CLI workflows (Plop.js/Handlebars.js). Enforced strict code formatting and quality standards—preventing broken builds—by integrating ESLint, Prettier, and Husky pre-commit hooks alongside automated Vercel CI/CD pipelines.`,
			`Technical Leadership: Mentored junior developers and conducted regular code reviews, ensuring codebase consistency and adherence to the team's Clean Architecture standards.`,
			`Backend Specialization: Selected for an intensive 2-month ASP.NET 9 Backend training program. Mastered Domain-Driven Design (DDD), Clean Architecture, and Modular Monolithic, tying as the cohort's Top Performer.`,
		],
		skills: [
			"React",
			"Next.js",
			"TypeScript",
			"JavaScript",
			"Tailwind CSS",
			"shadcn/ui",
			"Mantine",
			"Material UI",
			"Tanstack",
			"SWR",
			"Redux Toolkit",
			"Zustand",
			"Zod",
			"Vitest",
			"Testing Library",
			"Playwright",
			"CI/CD",
			"Dexie.js",
			"Microsoft Azure",
			"Firebase",
			"Test-Driven Development (TDD)",
			"Domain-Driven Design (DDD)",
			"Clean Architecture",
			"Feature-Sliced Design (FSD)",
			"Modular Monolithic",
		],
		isCurrent: false,
	},
	{
		id: "2",
		companyName: "HYME",
		position: "Front-end Developer",
		jobType: "Part-time",
		location: "Germany",
		startDate: "July 2023",
		endDate: "April 2024",
		logo: COMPANY_LOGOS.HYME.thumbnail,
		logoBanner: COMPANY_LOGOS.HYME.banner,
		tasks: [
			"Web3 Integration: Secured user assets by integrating MetaMask wallet connections and smart contract interactions using Ethers.js, enabling seamless decentralized transactions.",
			"Browser-Based Media Processing: Engineered a client-side video trimming tool using FFmpeg.wasm, shifting processing load from server to client and reducing infrastructure costs.",
			"Interactive 3D UX: Developed immersive, high-engagement 3D backgrounds and logo transitions using Three.js and React, translating static Figma designs into fluid web experiences.",
			"Admin Dashboard: Built a comprehensive management portal for Web3 token visualization, enabling real-time tracking of project submissions and price fluctuations.",
		],
		skills: [
			"React",
			"Vite",
			"SWR",
			"Redux Toolkit",
			"Mantine",
			"Framer Motion",
			"SCSS",
			"Three.js",
			"Ethers.js",
			"Apache ECharts",
			"ffmpeg.wasm",
			"AWS Amplify",
			"MetaMask",
		],
		isCurrent: false,
	},
	{
		id: "3",
		companyName: "CareHealth Plus Systems International Inc.",
		position: "Graphic Web Designer & Web Developer",
		jobType: "Part-time",
		location: "Philippines",
		startDate: "March 2020",
		endDate: "March 2023",
		logo: COMPANY_LOGOS.CHPSI.thumbnail,
		logoBanner: COMPANY_LOGOS.CHPSI.banner,
		tasks: [
			"UI/UX Implementation: Bridged the gap between design and development by creating optimized SVG assets and high-fidelity UI layouts, ensuring pixel-perfect web implementation.",
			"Interactive Frontend: Engineered custom CSS/JavaScript animations and micro-interactions, significantly enhancing user engagement and visual feedback.",
			"System Maintenance: Managed database integrity for internal training systems, ensuring accurate data propagation across branch information modules.",
			"Performance Optimization: Conducted cross-stack debugging to resolve UI rendering issues and backend inconsistencies, improving overall application stability.",
		],
		skills: [
			"PHP",
			"JavaScript",
			"jQuery",
			"Bootstrap",
			"HTML5",
			"CSS3",
			"MySQL",
			"Adobe Photoshop",
			"Adobe Illustrator",
			"Adobe After Effects",
		],
		isCurrent: false,
	},
	{
		id: "4",
		companyName: "Ansber Professional Solutions Inc.",
		position: "Full-stack Developer",
		jobType: "Full-time",
		location: "Philippines",
		startDate: "May 2019",
		endDate: "February 2022",
		logo: COMPANY_LOGOS.APSI.thumbnail,
		logoBanner: COMPANY_LOGOS.APSI.banner,
		tasks: [
			"System Reliability: Designed a robust cashiering system with automated discrepancy resolution modules, reducing manual accounting errors.",
			"Database Optimization: Refactored SQL database schemas to optimize transaction reporting, significantly decreasing report generation time for large datasets.",
			"Operations Automation: Developed automated tools for generating Official Receipts and error logs, streamlining daily end-of-day operations for staff.",
		],
		skills: ["PHP", "JavaScript", "jQuery", "Bootstrap", "HTML5", "CSS3", "MySQL"],
		isCurrent: false,
	},
	{
		id: "5",
		companyName: "Electronic Data Processing at Manila City Hall",
		position: "Technical Support",
		jobType: "Internship",
		location: "Philippines",
		startDate: "2018",
		endDate: "Less than a year",
		logo: COMPANY_LOGOS.MANILA_CITY_HALL.thumbnail,
		logoBanner: COMPANY_LOGOS.MANILA_CITY_HALL.banner,
		tasks: [
			"Diagnosing and resolving internet connectivity issues",
			"Troubleshooting hardware problems",
			"Performing computer reformatting and system recovery",
			"Setting up computers and configuring systems",
			"Installing and configuring printers",
			"Providing on-call technical support",
		],
		skills: [],
		isCurrent: false,
	},
];
