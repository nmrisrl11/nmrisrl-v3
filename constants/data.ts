export const Data = {
	fullName: "Nomer Israel",
	firstName: "Nomer",
	lastName: "Israel",
	initialName: "NI",
	position: "Front-end Developer",
	location: "Manila, Philippines",
	description:
		"I design and build modern, dynamic web applications, focusing on user experience, accessibility, and performance to help businesses grow in the digital world.",
	careerStartYear: 2019,
	yearsOfExperience: 7,
	fullUrl: "https://www.nmrisrl.dev",
	cleanUrl: "nmrisrl.dev",
	emailAddress: "hello@nmrisrl.dev",
	socialLinks: {
		github: "https://github.com/nmrisrl11",
		linkedin: "https://www.linkedin.com/in/nmrisrl11",
		facebook: "https://www.facebook.com/nmrisrl11",
	},
} as const;

export const About_Data = {
	section: {
		figure: "FIG. 02 // IDENTITY & BACKGROUND",
		figureMeta: ["SPECIALIZATION", "CRAFT & SYSTEMS"],
		title: "About Me",
		description: `${Data.position} crafting tactile, high-performance web applications and modular design systems.`,
	},
	specialization: {
		kicker: "01 // SPECIALIZATION",
		tag: "CORE // STACK",
		title: `${Data.position} building polished, accessible web apps.`,
		description:
			"Deeply rooted in the React ecosystem with hands-on architectural experience. I translate ambitious product visions into clean component abstractions, fluid micro-interactions, and robust type-safe codebases engineered for speed and scale.",
	},
	experience: {
		kicker: "02 // EXPERIENCE",
		tag: `EST. ${Data.careerStartYear}`,
		title: "Engineered with a designer’s intuition.",
		description: `Merging ${Data.yearsOfExperience}+ years of development depth with design sensibilities to deliver tactile, intuitive user interfaces that feel alive.`,
	},
	architecture: {
		kicker: "03 // ARCHITECTURE",
		tag: "MODULAR // SCALE",
		title: "Modular, scalable systems.",
		description:
			"Architecting secure, high-performance web applications. Establishing clean layer boundaries, strict type contracts, and zero-debt maintainability.",
	},
	innovation: {
		kicker: "04 // INNOVATION",
		tag: "RADAR // HORIZON",
		title: "Staying active on modern trends.",
		description:
			"Continuously learning and keeping pace with emerging technologies, modern web standards, and evolving frontend patterns to deliver future-ready digital experiences.",
	},
	philosophy: {
		kicker: "05 // PHILOSOPHY",
		tag: "CRAFT // VALUE",
		title: "Engineering undeniable value.",
		description:
			"Driven by high-impact craft, ownership, and building software that genuinely matters — striving toward total creative and financial freedom.",
	},
	interests: {
		kicker: "06 // OFF-DUTY & INTERESTS",
		tag: "CREATIVE // LAB",
		title: "Beyond the terminal.",
		description:
			"Grounding myself through a consistent running routine, alongside an enduring creative fascination for indie game development and 2D character art that I continue to admire.",
	},
} as const;
