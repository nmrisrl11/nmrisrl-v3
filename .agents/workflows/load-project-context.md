---
description: Read .agents skills, AGENTS.md, and docs/ modular design system & architecture blueprints before development to understand the application's architecture, soft neubrutalism tokens, Base UI primitives, avatar engine, rules, and current state before building anything.
---

# Load Project Context

Before implementing, modifying, refactoring, or debugging any feature in **`nmrisrl-v3`**, first review the project's installed agent skills, core mandates, and modular documentation.

The goal is to understand the application's visual identity, component architecture, design tokens, established rules, and current technical state so that implementation is **never done blindly**.

---

## 1. Read Agent Skills First

Inspect `.agents/skills/` and review the relevant skill files before writing code:

- **`.agents/skills/migrate-radix-to-base/SKILL.md`**: Essential for adapting or scaffolding shadcn component patterns using headless `@base-ui/react` primitives instead of Radix UI.
- **`.agents/skills/shadcn/SKILL.md`**: Guidelines for shadcn component structure, composition, and registry patterns.
- **`.agents/skills/vercel-react-best-practices/SKILL.md`**: Vercel engineering performance guidelines for Next.js 16 and React 19 (Server/Client boundaries, bundle optimization, hydration safety).
- **`.agents/skills/web-design-guidelines/SKILL.md`**: Web Interface Guidelines for spacing rhythm, typographic contrast, touch targets, and visual hierarchy.
- **`.agents/skills/frontend-a11y/SKILL.md`**: WCAG 2.2 AA accessibility requirements, ARIA roles, focus rings, and keyboard navigation.
- **`.agents/skills/frontend-design/SKILL.md`**: Intentional, distinctive visual design guidance to preserve bold personality and prevent generic AI templates.

Follow project-specific skills instead of relying on generic LLM coding patterns.

---

## 2. Read Project Documentation (`docs/**` & `AGENTS.md`)

This repository uses a modular documentation blueprint in [`docs/`](file:///C:/Users/NOMER%20ISRAEL/OneDrive/Desktop/Projects/nmrisrl-v3/docs/):

1. **[`AGENTS.md`](file:///C:/Users/NOMER%20ISRAEL/OneDrive/Desktop/Projects/nmrisrl-v3/AGENTS.md)**: Mandatory root mandate. Contains the **Canonical Tailwind Classes Lookup Table** and core engineering constraints.
2. **[`docs/README.md`](file:///C:/Users/NOMER%20ISRAEL/OneDrive/Desktop/Projects/nmrisrl-v3/docs/README.md)**: Master index and table of contents of the entire blueprint.
3. **[`docs/01-brand-and-philosophy.md`](file:///C:/Users/NOMER%20ISRAEL/OneDrive/Desktop/Projects/nmrisrl-v3/docs/01-brand-and-philosophy.md)**: Soft Neubrutalism design philosophy, Sage Mint mood, and personality.
4. **[`docs/02-design-tokens-and-colors.md`](file:///C:/Users/NOMER%20ISRAEL/OneDrive/Desktop/Projects/nmrisrl-v3/docs/02-design-tokens-and-colors.md)**: Palette definitions, hard zero-blur brutal shadows (`shadow-brutal*`), and brutal borders (`border-brutal*`, `border-subtle*`).
5. **[`docs/03-typography.md`](file:///C:/Users/NOMER%20ISRAEL/OneDrive/Desktop/Projects/nmrisrl-v3/docs/03-typography.md)**: 4-font hierarchy: Display (`Syne`), Headings (`Space Grotesk`), Body (`DM Sans`), Monospace (`JetBrains Mono`).
6. **[`docs/04-squircle-and-shapes.md`](file:///C:/Users/NOMER%20ISRAEL/OneDrive/Desktop/Projects/nmrisrl-v3/docs/04-squircle-and-shapes.md)**: Squircle geometry with `@toolwind/corner-shape` and the 3-layer progressive enhancement fallback pattern.
7. **[`docs/05-component-system.md`](file:///C:/Users/NOMER%20ISRAEL/OneDrive/Desktop/Projects/nmrisrl-v3/docs/05-component-system.md)**: Component architecture, `@base-ui/react` headless primitives, `@/components/ui/*` placement, and click physics.
8. **[`docs/06-avatar-interactive-engine.md`](file:///C:/Users/NOMER%20ISRAEL/OneDrive/Desktop/Projects/nmrisrl-v3/docs/06-avatar-interactive-engine.md)**: Interactive 3D avatar engine, 11 pre-rendered WebM video clips, gaze-tracking state machine, and canvas color lock.
9. **[`docs/07-tech-stack-and-tooling.md`](file:///C:/Users/NOMER%20ISRAEL/OneDrive/Desktop/Projects/nmrisrl-v3/docs/07-tech-stack-and-tooling.md)**: Next.js 16 (App Router + Turbopack), React 19, Tailwind CSS v4, OXC toolchain (`oxlint` + `oxfmt`), and npm commands.
10. **[`docs/08-agent-rules.md`](file:///C:/Users/NOMER%20ISRAEL/OneDrive/Desktop/Projects/nmrisrl-v3/docs/08-agent-rules.md)**: Non-negotiable engineering rules, strict DOs & DONTs, and formatting verification.

---

## 3. Understand Codebase Organization

Inspect the current file tree before adding or editing files:

```text
app/
├── fonts.ts              # Syne, Space Grotesk, DM Sans, JetBrains Mono font loader
├── globals.css           # Tailwind v4 @theme, squircle @utility, and shadcn aliases
├── layout.tsx            # Root HTML, SEO metadata, font variables
└── page.tsx              # Homepage composition (Avatar + UI showcase)
components/
├── ui/                   # Atomic Base UI primitives (button, badge, card, dialog, tooltip)
├── avatar/               # Avatar video player & pointer tracking controllers
├── sections/             # Page sections (hero, about, projects, experience, contact)
└── icons/                # SVG icons and Lucide re-exports
docs/                     # Modular design system & architecture blueprints
lib/
└── utils.ts              # cn() class merging utility (clsx + tailwind-merge)
public/
└── avatar/               # 11 pre-rendered WebM video assets & avatar-idle.webp fallback
```

---

## 4. Non-Negotiable Engineering Guardrails

Pay close attention to these rules; violations will trigger linter errors or visual bugs:

### 🚨 1. Canonical Tailwind Classes (NO Arbitrary Bracket Syntax)
The IDE enforces `suggestCanonicalClasses`. Never write arbitrary brackets when a theme token exists:
- ❌ `border-[2.5px]` → ✅ `border-brutal`
- ❌ `border-b-[2.5px]` → ✅ `border-b-brutal`
- ❌ `border-[1.5px]` → ✅ `border-subtle`
- ❌ `shadow-[4px_4px_0_0_#18181B]` → ✅ `shadow-brutal`
- ❌ `shadow-[2px_2px_0_0_#18181B]` → ✅ `shadow-brutal-xs`
- ❌ `bg-[#DEF2E0]` → ✅ `bg-canvas`
- ❌ `text-[#18181B]` / `border-[#18181B]` → ✅ `text-ink` / `border-ink`
- ❌ `bg-[#FF6B57]` → ✅ `bg-coral`
- ❌ `bg-[#FDE047]` → ✅ `bg-yellow`
- ❌ `bg-[#EBE6FF]` → ✅ `bg-lavender`
- ❌ `bg-[#BAE6FD]` → ✅ `bg-sky`
- ❌ `bg-[#86EFAC]` → ✅ `bg-mint`

### 🚨 2. Canvas Color Lock (`#DEF2E0`)
The root canvas background MUST remain Sage Mint (`#DEF2E0` / `#E2F2DF`). All 11 pre-rendered WebM avatar clips in `public/avatar/` were rendered on this exact background. Changing the canvas reveals visible rectangular video bounding boxes.

### 🚨 3. Three-Layer Squircle Fallback Pattern
Never apply `rounded-full` alone without squircle progressive enhancement:
```tsx
// Pattern
className="rounded-[fallback] corner-squircle supports-[corner-shape:squircle]:rounded-[target]"

// Or pre-built utilities:
className="squircle-btn"
className="squircle-card"
className="squircle-badge"
```

### 🚨 4. Base UI Foundation (NO Radix UI)
Exclusively use `@base-ui/react` primitives. Never install `@radix-ui/*`. When scaffolding shadcn components, use `.agents/skills/migrate-radix-to-base/SKILL.md` to map them directly to Base UI unstyled parts.

### 🚨 5. Zero-Blur Hard Shadows (Neubrutalism)
Never use blurred drop shadows (`shadow-md`, `shadow-lg`, or blur radii). Neubrutalism demands crisp, hard offsets (`4px 4px 0 0 #18181B`).

### 🚨 6. Interactive Click Physics
Buttons, links, and cards must translate on active press with reduced shadow offset (`active:translate-x-0.5 active:translate-y-0.5 active:shadow-brutal-xs`).

### 🚨 7. OXC Toolchain Exclusivity
Do NOT install ESLint or Prettier. This repository is strictly linted and formatted via:
- `npm run lint` (`oxlint`)
- `npm run format` (`oxfmt`)

---

## 5. Check Current Implementation

Before writing code:
1. Check what components already exist in `components/ui/` (`button.tsx`, `badge.tsx`, `card.tsx`, `dialog.tsx`, `tooltip.tsx`).
2. Reuse existing primitives instead of recreating duplicate buttons, badges, or dialogs.
3. Review recent git commits (`git log -n 5 --oneline`) to see what was recently added.

---

## 6. Pre-Implementation Checklist

Before generating code, verify:
- [ ] **What exists?** Have I checked if a similar primitive or utility is already present?
- [ ] **Where does it belong?** UI primitives in `components/ui/`, section blocks in `components/sections/`, avatar logic in `components/avatar/`.
- [ ] **Which tokens apply?** Use `font-display`, `font-heading`, `font-body`, `font-mono`.
- [ ] **Are all classes canonical?** No arbitrary `[...]` brackets where tokens exist.
- [ ] **Is squircle fallback preserved?** Progressive enhancement via `@toolwind/corner-shape`.
- [ ] **Is accessibility respected?** Proper ARIA roles, focus-visible states, keyboard trapping (`frontend-a11y`).

---

## 7. Resolve Documentation vs Code Conflicts

If documentation and implementation ever disagree:
1. Inspect the source code (`app/globals.css`, `components/ui/*`).
2. Follow explicit rules in `AGENTS.md` and `docs/08-agent-rules.md`.
3. Check git history for recent architectural decisions.
4. If documentation is genuinely outdated, plan to update it using the `sync-project-documentation` workflow.

---

## 8. Mantra

> **Read the context first. Understand the design tokens and architecture. Then implement.**
