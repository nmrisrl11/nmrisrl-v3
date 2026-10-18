export interface TechStack {
	label: string;
	icon: string;
}

export interface StackAndSkillsDataProps {
	title: string;
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
		title: "Core Technologies",
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
		title: "UI & Styling",
		items: [
			{ label: "Tailwind CSS", icon: "tailwindcss" },
			{ label: "shadcn/ui", icon: "shadcnui" },
			{ label: "Mantine", icon: "mantine" },
			{ label: "Material UI", icon: "mui" },
			{ label: "Flowbite React", icon: "" },
		],
	},
	{
		title: "State Management & Ecosystem",
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
		title: "Back-end, Database & Caching",
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
		title: "DevOps & Infrastructure",
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
		title: "Testing & Code Quality",
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
		title: "Monitoring & Analytics",
		items: [
			{ label: "Sentry", icon: "sentry" },
			{ label: "PostHog", icon: "posthog" },
		],
	},
	{
		title: "Architecture & Methodologies",
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
		title: "AI-Assisted Development",
		items: [
			{ label: "Antigravity", icon: "googlegemini" },
			{ label: "Gemini", icon: "googlegemini" },
			{ label: "ChatGPT", icon: "" },
			{ label: "v0", icon: "v0" },
		],
	},
	{
		title: "Design",
		items: [
			{ label: "Figma", icon: "figma" },
			{ label: "Adobe Creative Suite", icon: "" },
		],
	},
];
