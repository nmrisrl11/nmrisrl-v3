export interface TechStack {
	label: string;
	icon: string;
}

export interface StackAndSkillsDataProps {
	id: string;
	title: string;
	kicker: string;
	tag: string;
	colSpan: string;
	items: TechStack[];
}

export const ProfileCoreTech: TechStack[] = [
	{ label: "React", icon: "react" },
	{ label: "Next.js", icon: "nextdotjs" },
	{ label: "Node.js", icon: "nodedotjs" },
	{ label: "NestJS", icon: "nestjs" },
	{ label: "TypeScript", icon: "typescript" },
	{ label: "JavaScript", icon: "javascript" },
	{ label: "Tailwind CSS", icon: "tailwindcss" },
];

export const StackAndSkillsData: StackAndSkillsDataProps[] = [
	{
		id: "core-tech",
		title: "Core Technologies",
		kicker: "01 // CORE TECHNOLOGIES",
		tag: "RUNTIME & SPECS",
		colSpan: "lg:col-span-7",
		items: [
			{ label: "React", icon: "react" },
			{ label: "Next.js", icon: "nextdotjs" },
			{ label: "TypeScript", icon: "typescript" },
			{ label: "JavaScript", icon: "javascript" },
			{ label: "Node.js", icon: "nodedotjs" },
			{ label: "NestJS", icon: "nestjs" },
			{ label: "React Native", icon: "react" },
		],
	},
	{
		id: "ui-styling",
		title: "UI & Styling",
		kicker: "02 // UI & STYLING",
		tag: "DESIGN SYSTEMS",
		colSpan: "lg:col-span-5",
		items: [
			{ label: "Tailwind CSS", icon: "tailwindcss" },
			{ label: "shadcn/ui", icon: "shadcnui" },
			{ label: "Mantine", icon: "mantine" },
			{ label: "Material UI", icon: "mui" },
			{ label: "Flowbite React", icon: "" },
		],
	},
	{
		id: "state-ecosystem",
		title: "State Management & Ecosystem",
		kicker: "03 // STATE & DATA",
		tag: "CLIENT CACHE & STORE",
		colSpan: "lg:col-span-5",
		items: [
			{ label: "TanStack", icon: "tanstack" },
			{ label: "Zustand", icon: "" },
			{ label: "Redux Toolkit", icon: "redux" },
			{ label: "Zod", icon: "zod" },
			{ label: "React Hook Form", icon: "reacthookform" },
			{ label: "SWR", icon: "swr" },
			{ label: "nuqs", icon: "" },
		],
	},
	{
		id: "backend-db",
		title: "Back-end, Database & Caching",
		kicker: "04 // BACKEND & DATABASE",
		tag: "PERSISTENCE & ORM",
		colSpan: "lg:col-span-7",
		items: [
			{ label: "PostgreSQL", icon: "postgresql" },
			{ label: "MySQL", icon: "mysql" },
			{ label: "Prisma", icon: "prisma" },
			{ label: "Drizzle", icon: "drizzle" },
			{ label: "Redis", icon: "redis" },
			{ label: "Upstash", icon: "upstash" },
			{ label: "BullMQ", icon: "" },
			{ label: "Express.js", icon: "express" },
			{ label: "NextAuth.js", icon: "" },
			{ label: "Appwrite", icon: "appwrite" },
		],
	},
	{
		id: "devops-infra",
		title: "DevOps & Infrastructure",
		kicker: "05 // DEVOPS & CLOUD",
		tag: "CI/CD & INFRASTRUCTURE",
		colSpan: "lg:col-span-6",
		items: [
			{ label: "Docker", icon: "docker" },
			{ label: "Vercel", icon: "vercel" },
			{ label: "AWS Amplify", icon: "" },
			{ label: "Azure", icon: "" },
			{ label: "Git", icon: "git" },
			{ label: "GitHub", icon: "github" },
			{ label: "GitHub Actions", icon: "githubactions" },
		],
	},
	{
		id: "testing-quality",
		title: "Testing & Code Quality",
		kicker: "06 // QUALITY & TOOLING",
		tag: "TEST SUITES & LINT",
		colSpan: "lg:col-span-6",
		items: [
			{ label: "Vitest", icon: "vitest" },
			{ label: "Testing Library", icon: "testinglibrary" },
			{ label: "Playwright", icon: "" },
			{ label: "OXC", icon: "oxc" },
			{ label: "ESLint", icon: "eslint" },
			{ label: "Prettier", icon: "prettier" },
			{ label: "Husky", icon: "" },
			{ label: "Biome", icon: "biome" },
			{ label: "Greptile", icon: "" },
			{ label: "CodeRabbit", icon: "coderabbit" },
		],
	},
	{
		id: "architecture-methods",
		title: "Architecture & Methodologies",
		kicker: "07 // ARCHITECTURE",
		tag: "SYSTEM METHODOLOGIES",
		colSpan: "lg:col-span-7",
		items: [
			{ label: "Feature-Sliced Design (FSD)", icon: "" },
			{ label: "Domain-Driven Design (DDD)", icon: "" },
			{ label: "Clean Architecture", icon: "" },
			{ label: "Hexagonal Architecture", icon: "" },
			{ label: "Modular Monolith", icon: "" },
			{ label: "Test-Driven Development (TDD)", icon: "" },
		],
	},
	{
		id: "ai-assisted",
		title: "AI-Assisted Development",
		kicker: "08 // AI WORKFLOWS",
		tag: "NEURAL & ASSISTIVE",
		colSpan: "lg:col-span-5",
		items: [
			{ label: "Antigravity", icon: "googlegemini" },
			{ label: "Gemini", icon: "googlegemini" },
			{ label: "ChatGPT", icon: "" },
			{ label: "v0", icon: "v0" },
		],
	},
	{
		id: "monitoring-analytics",
		title: "Monitoring & Analytics",
		kicker: "09 // OBSERVABILITY",
		tag: "TELEMETRY & LOGS",
		colSpan: "lg:col-span-6",
		items: [
			{ label: "Sentry", icon: "sentry" },
			{ label: "PostHog", icon: "posthog" },
		],
	},
	{
		id: "design-assets",
		title: "Design",
		kicker: "10 // DESIGN & ASSETS",
		tag: "CREATIVE & VECTOR",
		colSpan: "lg:col-span-6",
		items: [
			{ label: "Figma", icon: "figma" },
			{ label: "Adobe Creative Suite", icon: "" },
		],
	},
];
