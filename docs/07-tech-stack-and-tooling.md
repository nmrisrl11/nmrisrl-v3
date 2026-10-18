# 07 — Tech Stack & Tooling

## 1. Core Production Stack

| Technology       | Version                               | Purpose                                                                 |
| ---------------- | ------------------------------------- | ----------------------------------------------------------------------- |
| **Next.js**      | `^16.4.2`                             | React framework with App Router, Turbopack, and Server Components       |
| **React**        | `^19.3.0`                             | Latest React runtime with native Actions and Hooks                      |
| **TypeScript**   | `^5`                                  | Strict static typing across all components, APIs, and data models       |
| **Tailwind CSS** | `^4.0.0`                              | High-performance CSS-first utility engine using `@theme` and `@utility` |
| **Base UI**      | `^1.9.0` (`@base-ui/react`)           | Headless unstyled accessible primitives from the MUI team               |
| **Corner Shape** | `^0.0.8-3` (`@toolwind/corner-shape`) | First-class utilities for CSS `corner-shape: squircle`                  |
| **Motion**       | `^14.3.0` (`motion`)                  | Spring physics, layout animations, and gesture tracking                 |
| **Icons**        | `^1.59.0` (`lucide-react`)            | Crisp, lightweight icons styled with stroke and fill tokens             |

---

## 2. OXC Toolchain (Replacing ESLint & Prettier)

This repository exclusively uses **OXC**, the lightning-fast Rust-based JavaScript/TypeScript linter and formatter. Standard ESLint and Prettier have been removed.

### Linter Configuration (`.oxlintrc.json`)

```json
{
	"env": {
		"browser": true,
		"node": true
	},
	"plugins": ["typescript", "react", "nextjs"],
	"ignorePatterns": [
		".next/**",
		"out/**",
		"build/**",
		"next-env.d.ts",
		"node_modules/**",
		"public/**"
	]
}
```

### Formatter Configuration (`.oxfmtrc.json`)

```json
{
	"endOfLine": "lf",
	"printWidth": 100,
	"tabWidth": 2,
	"useTabs": true,
	"semi": true,
	"singleQuote": false,
	"jsxSingleQuote": false,
	"trailingComma": "all",
	"bracketSpacing": true,
	"arrowParens": "always",
	"sortTailwindcss": {
		"stylesheet": "app/globals.css",
		"functions": ["clsx", "cn"],
		"preserveWhitespace": true
	}
}
```

---

## 3. NPM Scripts Reference

Run these commands using `npm` (or `npm.cmd` on Windows):

```bash
# Start local development server (Turbopack)
npm run dev

# Run OXC linter across the entire repository
npm run lint

# Automatically format code and sort Tailwind CSS classes
npm run format

# Verify formatting without modifying files (CI check)
npm run format:check

# Build optimized production bundle
npm run build

# Start production server
npm run start
```
