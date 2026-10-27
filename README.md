# nmrisrl-v3

> The third iteration of [nmrisrl.dev](https://www.nmrisrl.dev) — an interactive personal portfolio featuring an interactive 3D avatar engine, Soft Neubrutalism design system, squircle geometry, and headless Base UI components.

---

## 🌟 Overview & Design Philosophy

**nmrisrl-v3** departs from standard, templated tech portfolios in favor of **Soft Neubrutalism** — a playful yet professional aesthetic balancing tactile high-contrast geometry with calm, approachable pastel tones:

- **Canvas Background**: Sage Mint (`#DEF2E0`), synchronized with all 11 pre-rendered 3D WebM avatar video clips for seamless zero-border composition.
- **Architectural Grid Rails**: 3-column architectural framework with viewport-locked diagonal striped gutter rails (`bg-striped-rail`) inspired by `tailwindcss.com`.
- **Deep Ink Accents**: Sharp `#18181B` typography, brutalist outlines (`2px`), and crisp, zero-blur 3D vertical drop shadows (`0px 4px 0 0 #18181B`).
- **Pastel Palette**: Warm Coral, Buttercup Yellow, Soft Lavender, Sky Mist, and Fresh Mint.
- **Continuous Squircles**: Continuous-curvature corners powered by `@toolwind/corner-shape` (`corner-shape: squircle`) with a reliable 3-layer progressive enhancement fallback for all modern browsers.
- **Interactive Avatar Engine**: Hybrid state-machine video player reacting to cursor tracking, viewport gaze, idle intervals, and contextual tactile gestures (`coding`, `thumbsup`, `fingerheart`, `thinking`, `wave`) triggered by interactive hero badges, CTA hovers, and direct avatar clicks via `avatarStore` with strict priority handling.
- **Custom Cursor & Tactile Click Engine**: Coral (`#FF6B57`) and Chalk White SVG pointer with instant 0ms haptic response, 5 selectable click effect styles (`burst`, `particles`, `crosshair`, `ring`, `ripple`), toggleable 3D brutal drop shadows, and audio SFX integration hooks.
- **Hand-Drawn Vector Annotations**: Dynamic sketchy underlines and highlighter accents powered by [Rough Notation](https://roughnotation.com/) (`react-rough-notation`), featuring font-ready layout synchronization and full WCAG 2.3.3 motion reduction support.
- **Soft Neubrutalist Bento Grid**: High-contrast 6-card modular bento grid for the About Me section, decomposed into dedicated `bento-01..06` sub-packages featuring 6 bespoke interactive 3D visual models/assemblies (`TechStackReactor`, `ExperienceHologram`, `ArchitectureCartridge`, `TrendRadar`, `DroneAssembly`, `CreativeLab`) with official Simple Icons and custom neu-icons.
- **Career Chronology & Deep-Dive Dossier**: High-contrast interactive career timeline (`FIG. 03 // CAREER CHRONOLOGY`) featuring Cloudinary company logo stamps, active role live-pulse badges, and a keyboard-accessible modal dossier with directional slide transitions, domain-categorized tech badges, and stationary controls.
- **Tech Stack & System Capabilities Matrix**: High-contrast interactive technical matrix (`FIG. 04 // TECH STACK & SYSTEM CAPABILITIES`) organizing 60+ production technologies across 10 structured domains into a responsive 12-column Bento Grid, equipped with dynamic domain filtering toolbar (`useSkillsFilter`), React 19 concurrent transitions (`useTransition`), zero-shift blueprint skeleton states, and a 3-tier icon resolution pipeline (Bespoke SVG -> Simple Icons CDN -> Neu-Icon Blueprint Glyph).
- **Playful Custom 404 Route Exception Page**: Dedicated not-found boundary (`app/not-found.tsx` & `components/sections/not-found/`) featuring a handcrafted 3D isometric repair crew illustration (`NotFoundIllustration`) with an autonomous crawler splicer bot, patrol rover, and quad-rotor drone repairing a severed conduit, paired with direct Home and Go Back recovery actions.

---

## 🚀 Tech Stack

| Layer                      | Technology                                                                                                          | Version               | Purpose                                                                              |
| :------------------------- | :------------------------------------------------------------------------------------------------------------------ | :-------------------- | :----------------------------------------------------------------------------------- |
| **Framework**              | [Next.js](https://nextjs.org/) (App Router)                                                                         | `^16.4.2`             | Turbopack, React Server Components, Partial Prerendering                             |
| **Runtime**                | [React](https://react.dev/)                                                                                         | `^19.3.0`             | Actions, Server Components, and native hooks                                         |
| **Language**               | [TypeScript](https://www.typescriptlang.org/)                                                                       | `^5.0.0`              | Strict static typing across components, models, and tokens                           |
| **Styling**                | [Tailwind CSS v4](https://tailwindcss.com/)                                                                         | `^4.0.0`              | CSS-first `@theme` and `@utility` engine with canonical token enforcement            |
| **PostCSS Plugin**         | [@tailwindcss/postcss](https://www.npmjs.com/package/@tailwindcss/postcss)                                          | `^4.0.0`              | Standard PostCSS integration via `postcss.config.mjs` for reliable HMR               |
| **Component Primitives**   | [Base UI](https://base-ui.com/)                                                                                     | `^1.9.0`              | Unstyled headless primitives from MUI (`@base-ui/react`), replacing Radix UI         |
| **Component Scaffolding**  | [shadcn/ui](https://ui.shadcn.com/)                                                                                 | Base UI Preset        | Atomic component structure mapped to Base UI (`components.json`)                     |
| **Corner Geometry**        | [@toolwind/corner-shape](https://www.npmjs.com/package/@toolwind/corner-shape)                                      | `^0.0.8-3`            | CSS `corner-shape: squircle` utilities and fallback classes                          |
| **Animations**             | [Motion](https://motion.dev/)                                                                                       | `^14.3.0`             | Spring physics, layout animations, and gesture tracking                              |
| **Tailwind Merge**         | [tailwind-merge](https://www.npmjs.com/package/tailwind-merge)                                                      | `^3.0.0`              | Intelligent class merging extended with custom brutal tokens (`lib/utils.ts`)        |
| **Hand-Drawn Annotations** | [Rough Notation](https://roughnotation.com/) + [React Wrapper](https://github.com/linkstrifer/react-rough-notation) | `^0.5.1` / `^1.0.8`   | Hand-drawn vector annotations (`underline`, `highlight`) with layout synchronization |
| **Icons**                  | [Lucide React](https://lucide.dev/) + [Neu Icons](./components/neu-icons)                                           | `^1.59.0` / Local     | Crisp UI icons (`lucide-react`) + 10 bespoke Soft Neubrutalism SVG accents           |
| **Diagnostics**            | [React Scan](https://react-scan.com/)                                                                               | Auto (unpkg)          | Real-time React 19 render & performance profiling (development-only)                 |
| **Linter & Formatter**     | [OXC](https://oxc.rs/) (`oxlint` + `oxfmt`)                                                                         | `^1.88.0` / `^0.73.0` | Ultra-fast Rust-based static analysis replacing ESLint & Prettier                    |

---

## 📁 Project Structure

```text
nmrisrl-v3/
├── .agents/
│   ├── skills/           # Installed Agent Skills from skills.sh
│   │   ├── frontend-a11y/
│   │   ├── frontend-design/
│   │   ├── migrate-radix-to-base/
│   │   ├── shadcn/
│   │   ├── vercel-react-best-practices/
│   │   └── web-design-guidelines/
│   └── workflows/        # Markdown agent workflows
│       ├── load-project-context.md       # Start/resume feature workflow
│       ├── commit-and-push.md            # Stage, conventional commit (grouped), and push workflow
│       ├── summarize-git-changes.md      # Commit-ready changelog generator
│       └── sync-project-documentation.md # Closing feature & doc sync workflow
├── app/
│   ├── fonts.ts          # Plus Jakarta Sans, Space Grotesk, DM Sans, JetBrains Mono loaders
│   ├── globals.css       # Tailwind v4 @theme, squircle @utility, brutal tokens
│   ├── layout.tsx        # Root HTML wrapper, metadata, font variable bindings
│   ├── not-found.tsx     # Custom 404 route exception boundary & navigation waypoint
│   └── page.tsx          # Interactive preview: Avatar engine + Base UI components
├── components/
│   ├── avatar/           # Interactive avatar video player, gaze tracker & action store (InteractiveAvatar, useAvatarGaze, avatarStore)
│   ├── custom/           # App-specific interactive features (CustomCursor, Click effect)
│   ├── neu-icons/        # 10 bespoke Soft Neubrutalism SVG accent icons (PropellerStar, RoundedCross, etc.)
│   ├── page-layout/      # Architectural 3-column grid layout (Navbar, GridSection, GridMarker, PageLayout)
│   ├── sections/         # Modular portfolio sections
│   │   ├── hero/         # Hero section (HeroCtaButtons, RotatingSeal, BauhausAccent, HeroNarrative with Rough Notation, badges, marquee)
│   │   ├── about/        # About section (6 decomposed bento-01..06 cards with co-located 3D visual assemblies)
│   │   ├── experience/   # Career chronology & deep-dive dossier (ExperienceCard, ExperienceDossierModal, ExperienceLogo, ExperiencePulse)
│   │   ├── skills/       # Tech stack & skills matrix (SkillsSection, SkillsCard, SkillsFilter, SkillsSkeleton, TechBadge, skills-icons)
│   │   └── not-found/    # Custom 404 hero section & 3D isometric repair crew illustration (NotFoundIllustration)
│   └── ui/               # Registry-backed Base UI primitives and styled wrappers (Button, Card, Badge, Dialog, Tooltip)
├── constants/            # Modular personal data & tech stack taxonomies
│   ├── company-logos.ts  # Cloudinary CDN company logo URLs & banners
│   ├── data.ts           # Centralized personal profile, bio, URLs, email, About_Data, Experience_Section_Data, Skills_Section_Data, and social links
│   ├── stack-and-skills-data.ts # ProfileCoreTech & StackAndSkillsData (10 structured domains)
│   └── work-experience-data.ts  # Career chronology, deliverables, and tech stack taxonomy
├── docs/                 # Modular design system & architecture blueprints (8 chapters)
│   ├── README.md
│   ├── 01-brand-and-philosophy.md
│   ├── 02-design-tokens-and-colors.md
│   ├── 03-typography.md
│   ├── 04-squircle-and-shapes.md
│   ├── 05-component-system.md
│   ├── 06-avatar-interactive-engine.md
│   ├── 07-tech-stack-and-tooling.md
│   └── 08-agent-rules.md
├── hooks/                # Reusable application hooks (use-rough-notation.ts, use-skills-filter.ts)
├── lib/
│   └── utils.ts          # cn() class merging utility (clsx + tailwind-merge)
├── public/
│   └── avatar/           # 11 pre-rendered WebM avatar clips + poster fallback
├── .oxfmtrc.json         # OXC formatter configuration (tab indent, Tailwind sort)
├── .oxlintrc.json         # OXC linter configuration (React, Next.js, TypeScript plugins)
├── AGENTS.md             # Core AI agent mandate: Canonical Tailwind classes & Base UI rules
├── components.json       # shadcn configuration configured for Base UI
└── skills-lock.json      # Locked versions and hashes for installed agent skills
```

---

## 🎨 Design Tokens & System

### 1. Palette

- **Canvas**: `bg-canvas` (`#DEF2E0` / `#E2F2DF`)
- **Ink**: `text-ink`, `border-ink`, `bg-ink` (`#18181B`)
- **Warm Coral**: `bg-coral` (`#FF6B57`)
- **Buttercup Yellow**: `bg-yellow` (`#FDE047`)
- **Soft Lavender**: `bg-lavender` (`#EBE6FF`)
- **Sky Mist**: `bg-sky` (`#BAE6FD`)
- **Fresh Mint**: `bg-mint` (`#86EFAC`)

### 2. Zero-Blur Brutal Shadows (3D Vertical Pop)

- `shadow-brutal-xs` $\rightarrow$ `0px 2px 0 0 #18181B` (Active click state)
- `shadow-brutal-sm` $\rightarrow$ `0px 3px 0 0 #18181B` (Badges, small tags)
- `shadow-brutal` $\rightarrow$ `0px 4px 0 0 #18181B` (Buttons, cards default, navbar dock)
- `shadow-brutal-lg` $\rightarrow$ `0px 6px 0 0 #18181B` (Button hover elevation, modals)
- `shadow-brutal-xl` $\rightarrow$ `0px 8px 0 0 #18181B` (Hero cards, floating containers)
- `drop-shadow-brutal-xs/sm/default/lg` $\rightarrow$ `filter: drop-shadow(...)` (Zero-blur silhouette shadows for SVGs and icons)

### 3. Typography Hierarchy

- **Display (`font-display`)**: [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) — Bold display headlines and hero titles.
- **Headings (`font-heading`)**: [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) — Section titles and card headers.
- **Body (`font-body`)**: [DM Sans](https://fonts.google.com/specimen/DM+Sans) — Clean, legible paragraphs and descriptions.
- **Monospace (`font-mono`)**: [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) — Tech tags, stats, metadata, code.

### 4. 3-Layer Squircle Progressive Fallback

```tsx
// Pattern
className = "rounded-[fallback] corner-squircle supports-[corner-shape:squircle]:rounded-[target]";

// Pre-built utilities in app/globals.css
className = "squircle-btn"; // rounded-2xl -> rounded-full
className = "squircle-card"; // rounded-2xl -> rounded-3xl
className = "squircle-badge"; // rounded-lg -> rounded-full
```

---

## 🤖 Agent Skills & Development Workflows

This codebase is purpose-built for autonomous AI pair programming.

### Installed Agent Skills ([skills.sh](https://skills.sh))

- **`migrate-radix-to-base`**: Converts shadcn component templates and Radix UI primitives into `@base-ui/react` headless components.
- **`shadcn`**: Manages component scaffolding and token integration.
- **`vercel-react-best-practices`**: Next.js 16 and React 19 performance patterns from Vercel Engineering.
- **`web-design-guidelines`**: Audits UI against Web Interface Guidelines (hierarchy, spacing, touch targets).
- **`frontend-a11y`**: WCAG 2.2 AA accessibility enforcement and focus management.
- **`frontend-design`**: Direction for bold, intentional visual craft to prevent generic AI UI.

### Workflows ([`.agents/workflows/`](file:///C:/Users/NOMER%20ISRAEL/OneDrive/Desktop/Projects/nmrisrl-v3/.agents/workflows/))

- **`load-project-context.md`**: Run at the start of any new feature or coding turn to load all tokens, guardrails, and component rules.
- **`commit-and-push.md`**: Run to stage, format a conventional commit grouped by responsibilities, commit, and push to the target branch.
- **`sync-project-documentation.md`**: Run at the end of feature development to audit and sync `docs/` and `AGENTS.md` with recent code changes.
- **`summarize-git-changes.md`**: Run before committing to generate a clean, grouped Conventional Commit changelog.

---

## 📚 Modular Documentation Blueprints

For in-depth architectural and design specifications, consult the blueprint in [`docs/`](file:///C:/Users/NOMER%20ISRAEL/OneDrive/Desktop/Projects/nmrisrl-v3/docs/):

1. [**01 — Brand & Philosophy**](file:///C:/Users/NOMER%20ISRAEL/OneDrive/Desktop/Projects/nmrisrl-v3/docs/01-brand-and-philosophy.md): Core vision, Soft Neubrutalism, voice, and design principles.
2. [**02 — Design Tokens & Colors**](file:///C:/Users/NOMER%20ISRAEL/OneDrive/Desktop/Projects/nmrisrl-v3/docs/02-design-tokens-and-colors.md): Hex codes, CSS variables, shadow tokens, and border widths.
3. [**03 — Typography**](file:///C:/Users/NOMER%20ISRAEL/OneDrive/Desktop/Projects/nmrisrl-v3/docs/03-typography.md): Type scales, font weights, line heights, and Google Font loading.
4. [**04 — Squircle & Shapes**](file:///C:/Users/NOMER%20ISRAEL/OneDrive/Desktop/Projects/nmrisrl-v3/docs/04-squircle-and-shapes.md): Geometry, browser compatibility, and fallback architecture.
5. [**05 — Component System**](file:///C:/Users/NOMER%20ISRAEL/OneDrive/Desktop/Projects/nmrisrl-v3/docs/05-component-system.md): Base UI integration, component anatomy, and state physics.
6. [**06 — Avatar Interactive Engine**](file:///C:/Users/NOMER%20ISRAEL/OneDrive/Desktop/Projects/nmrisrl-v3/docs/06-avatar-interactive-engine.md): 3D clips, gaze tracking, state machine, and canvas sync.
7. [**07 — Tech Stack & Tooling**](file:///C:/Users/NOMER%20ISRAEL/OneDrive/Desktop/Projects/nmrisrl-v3/docs/07-tech-stack-and-tooling.md): Tooling setup, OXC linter & formatter configs, and npm scripts.
8. [**08 — Agent Rules & Engineering Guardrails**](file:///C:/Users/NOMER%20ISRAEL/OneDrive/Desktop/Projects/nmrisrl-v3/docs/08-agent-rules.md): Non-negotiable rules, canonical class lookup table, DOs and DONTs.

---

## 🛠️ Getting Started

### Prerequisites

- Node.js 20.x or later
- npm (or `npm.cmd` on Windows)

### Installation

```bash
# Clone repository
git clone https://github.com/nmrisrl/nmrisrl-v3.git
cd nmrisrl-v3

# Install dependencies
npm install
```

### Development

```bash
# Start Turbopack local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 📜 Available Scripts

| Script         | Command                | Purpose                                     |
| :------------- | :--------------------- | :------------------------------------------ |
| `dev`          | `next dev --turbopack` | Starts local dev server with Turbopack      |
| `build`        | `next build`           | Compiles optimized static production bundle |
| `start`        | `next start`           | Runs the production build locally           |
| `lint`         | `oxlint`               | High-speed static analysis via OXC          |
| `format`       | `oxfmt . --write`      | Formats all code and sorts Tailwind classes |
| `format:check` | `oxfmt . --check`      | Validates formatting consistency (CI check) |

---

## 🚨 Mandatory Engineering Mandate

When developing in this repository, **always use canonical Tailwind classes** instead of arbitrary bracket syntax:

| ❌ NEVER WRITE (Arbitrary)           | ✅ ALWAYS WRITE (Canonical) | CSS Target                            |
| :----------------------------------- | :-------------------------- | :------------------------------------ |
| `border-[2px]`                       | `border-brutal`             | `border-width: 2px;`                  |
| `border-b-[2px]`                     | `border-b-brutal`           | `border-bottom-width: 2px;`           |
| `border-[1.5px]`                     | `border-subtle`             | `border-width: 1.5px;`                |
| `shadow-[0px_4px_0_0_#18181B]`       | `shadow-brutal`             | Neubrutalist 3D pop shadow            |
| `shadow-[0px_2px_0_0_#18181B]`       | `shadow-brutal-xs`          | Active click shadow                   |
| `bg-[#DEF2E0]`                       | `bg-canvas`                 | Sage Mint canvas background           |
| `text-[#18181B]`, `border-[#18181B]` | `text-ink`, `border-ink`    | Deep Ink                              |
| `bg-[repeating-linear...]`           | `bg-striped-rail`           | 315° diagonal hatching rail           |
| `text-[10px]`                        | `text-2xs`                  | 0.625rem / 10px blueprint micro label |

See [`AGENTS.md`](./AGENTS.md) for the full lookup table and rules.

### Key Architectural Rules

- **`@/components/ui/*` Pristine Registry Boundary**: Strictly reserved for registry-backed primitives and their local styled wrappers installed or scaffolded from Base UI and shadcn registries (`button`, `badge`, `card`, `dialog`, `tooltip`). Never place bespoke app code in this directory.
- **`@/components/custom/*` for Bespoke Interactive Features**: Decouple and place custom experience primitives (`CustomCursor`, `Click` effect, future audio SFX managers) in this dedicated folder.
- **`@/components/neu-icons/*` for Bespoke Neubrutalist SVG Accents**: Dedicated collection of 10 handcrafted Soft Neubrutalism SVG accent icons with shared `NeuIconProps`, size/fill cascade, and accessible defaults. Always imported via the `@/components/neu-icons` barrel file.
- **Strict Barrel File & Module Import Protocol**: If a module collection provides an established barrel file (like `@/components/neu-icons`), always import through the barrel file using explicit named imports (`import { ... } from "@/components/neu-icons"`). For components without a barrel file, always use direct module imports (`@/components/ui/button`, `@/components/custom/cursor`, `@/components/page-layout/grid-section`, `@/components/sections/hero/hero-section`). Do not create superfluous or nested barrel files.
- **Component Reuse over Reinvention (`@/components/ui/*`)**: Never build ad-hoc raw HTML elements (e.g. `<button>` styled with manual brutal rings/borders/shadows) when established primitives exist in `@/components/ui/` (`Button`, `Card`, `Badge`, `Dialog`, `Tooltip`). Always utilize the existing primitives with appropriate `variant`, `size`, and `shape`.
- **Modular Bento Subcomponent Decomposition (`components/sections/<section>/bento-XX/`)**: Decompose complex bento sections and rich visual assemblies into dedicated numbered subdirectories (`bento-01/`, `bento-02/`, etc.) containing the card wrapper and co-located visual assembly/simulation to maintain clean single-responsibility boundaries.
- **Centralized Personal & Domain Metadata (`@/constants/data`)**: All personal info, name, bio, URLs (`cleanUrl`, `fullUrl`), contact email, social links, and section blueprint copy are strictly managed in `Data`, `About_Data`, `Experience_Section_Data`, and `Skills_Section_Data` from `@/constants/data`. Never hardcode developer personal details across components.
- **Technical Matrix & Skills Architecture (`@/components/sections/skills/*`)**: Decouple technical capabilities into `SkillsSection`, `SkillsCard`, `SkillsFilter`, `SkillsSkeleton`, `TechBadge`, and `skills-icons.tsx`. Centralize the 10-domain taxonomy in `constants/stack-and-skills-data.ts`. Manage filter state via `useSkillsFilter` with React 19 concurrent transitions (`useTransition`), and expand dynamic column spans via `getFilteredColSpan`. Enforce the 3-tier icon fallback pipeline in `TechBadge` (Bespoke SVG -> Simple Icons CDN -> Neu-Icon Blueprint Glyph).
- **Outset Ring Box-Shadow Pattern for Squircles**: Use outset ring box-shadows (`box-shadow: var(--ring), 0 Ypx 0 0 var(--color-ink); border: none;`) across interactive buttons, `squircle-card`, and `squircle-badge` to eliminate sub-pixel anti-aliasing gaps and corner desync, paired with `@media (forced-colors: active)` system-colored borders (`ButtonText`, `CanvasText`) to preserve boundary visibility in high-contrast mode.

---

## 👤 Author

**Nomer Israel**

- Website: [nmrisrl.dev](https://www.nmrisrl.dev)
- GitHub: [@nmrisrl](https://github.com/nmrisrl)
