# 08 — Agent Rules & Engineering Guardrails

> [!IMPORTANT]
> **Mandatory reading for all autonomous AI coding agents (Antigravity, Claude, Cursor, Copilot)** executing tasks in `nmrisrl-v3`.
> These rules enforce brand integrity, performance standards, and architectural consistency.

---

## 1. Non-Negotiable Styling Rules

### ❌ NEVER:

1. **Never use blurred drop shadows**: Neubrutalism requires crisp zero-blur hard offsets (`shadow-brutal` = `0px 4px 0 0 #18181B`). Do not use `shadow-md`, `shadow-lg`, or arbitrary blur radii.
2. **Never break the 3-layer squircle fallback**: Never apply `rounded-full` alone on buttons or cards without `@supports (corner-shape: squircle)`. Always follow the pattern:
   `rounded-[fallback] corner-squircle supports-[corner-shape:squircle]:rounded-[target]` or use `@utility squircle-*`.
3. **Never alter the `--color-canvas` hex value**: The root background MUST remain Sage Mint (`#DEF2E0` / `#E2F2DF`) because all 11 pre-rendered WebM avatar videos in `public/avatar/` were rendered on this exact color. Changing the canvas will reveal visible rectangular video borders.
4. **Never re-install ESLint or Prettier**: This repository is strictly managed by the Rust-based **OXC** toolchain (`oxlint` + `oxfmt`).
5. **Never install `@radix-ui/react-*` directly**: This repository exclusively uses `@base-ui/react` headless primitives integrated with `components.json`.
6. **Never write arbitrary bracket syntax `[...]` when a theme token exists**: The IDE triggers `tailwindcss(suggestCanonicalClasses)` warnings. E.g., never write `border-b-[2px]`, write `border-b-brutal`; never write `shadow-[0px_4px_...]`, write `shadow-brutal`.

### ✅ ALWAYS:

1. **Always use Base UI (`@base-ui/react`)**: When building dialogs, tooltips, popovers, tabs, or accordions, use `@base-ui/react` primitives.
2. **Always follow `components.json` layout**: Atomic primitives belong in `@/components/ui/*` and use `cn()` class merging.
3. **Always include interactive click feedback**: Buttons and interactive controls must translate vertically on active press (`active:translate-y-0.5`) with shadow reduction.
4. **Always use outset ring for clickable buttons and floating pills**: Use `ring-2 ring-ink shadow-brutal` instead of `border-brutal` on buttons and floating navigation docks to eliminate sub-pixel anti-aliasing gaps and corner-shape desync. Pair with `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink`. Never combine with `focus-visible:outline-none`, which suppresses keyboard focus rings.
5. **Always register custom tokens in `extendTailwindMerge`**: When introducing new custom theme tokens used with `cn()`, ensure they are added to `customTwMerge` in `@/lib/utils` so `tailwind-merge` does not drop them. Never use `!` (e.g. `border-brutal!`) to bypass class stripping.
6. **Always use font variables correctly**:
   - Hero name & high-impact statements: `font-display` (`Plus Jakarta Sans`)
   - Headings (`<h2>`, `<h3>`): `font-heading` (`Space Grotesk`)
   - Body text & descriptions: `font-body` (`DM Sans`)
   - Tags, badges, code, numbers: `font-mono` (`JetBrains Mono`)
7. **Always ensure WCAG 2.2 contrast**: Small text must have at least 4.5:1 contrast against its background. Text on pastel accents (`coral`, `yellow`, `mint`) must use either deep ink `#18181B` or white `#FFFFFF` depending on contrast validation.
8. **Always use canonical classes from the substitution table below**:

#### Canonical Classes Lookup Table

| ❌ NEVER WRITE (Arbitrary)           | ✅ ALWAYS WRITE (Canonical) | CSS Target                    |
| ------------------------------------ | --------------------------- | ----------------------------- |
| `border-[2px]`                       | `border-brutal`             | `border-width: 2px;`          |
| `border-b-[2px]`                     | `border-b-brutal`           | `border-bottom-width: 2px;`   |
| `border-t-[2px]`                     | `border-t-brutal`           | `border-top-width: 2px;`      |
| `border-x-[2px]`                     | `border-x-brutal`           | `border-left/right: 2px;`     |
| `border-[1.5px]`                     | `border-subtle`             | `border-width: 1.5px;`        |
| `border-b-[1.5px]`                   | `border-b-subtle`           | `border-bottom-width: 1.5px;` |
| `border-[3px]`                       | `border-thick`              | `border-width: 3px;`          |
| `border-b-[3px]`                     | `border-b-thick`            | `border-bottom-width: 3px;`   |
| `shadow-[0px_2px_...]`               | `shadow-brutal-xs`          | `0px 2px 0px 0px #18181B;`    |
| `shadow-[0px_3px_...]`               | `shadow-brutal-sm`          | `0px 3px 0px 0px #18181B;`    |
| `shadow-[0px_4px_...]`               | `shadow-brutal`             | `0px 4px 0px 0px #18181B;`    |
| `shadow-[0px_6px_...]`               | `shadow-brutal-lg`          | `0px 6px 0px 0px #18181B;`    |
| `shadow-[0px_8px_...]`               | `shadow-brutal-xl`          | `0px 8px 0px 0px #18181B;`    |
| `bg-[#DEF2E0]`                       | `bg-canvas`                 | Sage Mint Canvas              |
| `text-[#18181B]`, `border-[#18181B]` | `text-ink`, `border-ink`    | Deep Ink                      |
| `bg-[#FF6B57]`                       | `bg-coral`                  | Warm Coral                    |
| `bg-[#FDE047]`                       | `bg-yellow`                 | Buttercup Yellow              |
| `bg-[#EBE6FF]`                       | `bg-lavender`               | Soft Lavender                 |
| `bg-[#BAE6FD]`                       | `bg-sky`                    | Sky Mist                      |
| `bg-[#86EFAC]`                       | `bg-mint`                   | Fresh Mint                    |
| `rounded-[9999px]`                   | `rounded-full`              | Full radius (squircle target) |
| `bg-[repeating-linear...]`           | `bg-striped-rail`           | 315° diagonal hatching rail   |

9. **Always use the 3-column architectural framework with striped rails**: Wrap page content using the 3-column architectural grid with flanking vertical striped rails (`bg-striped-rail border-x border-ink/15 hidden md:block`).
10. **Always verify mobile responsiveness and prevent horizontal scroll**: Enforce `w-full overflow-x-clip` on root wrappers, specify explicit `grid-cols-1` on mobile grid containers, and ensure child columns use `min-w-0 w-full` to avoid unintended horizontal scrollbars.
11. **Always provide motion-reduction variants on animations**: All CSS keyframe animations (such as `animate-spin`, `animate-pulse`) MUST include `motion-reduce:animate-none` to honor `prefers-reduced-motion` preferences (WCAG 2.2.2 / 2.3.3).
12. **Always support 200% zoom reflow on multi-column card metrics**: Metric stat cards must use responsive flex stacking (`flex-col items-start gap-1.5 md:flex-row md:items-center md:gap-4`) to stack vertically on narrow widths, preventing text clipping and horizontal truncation during high zoom (WCAG 1.4.4 / 1.4.10).
13. **Always anchor avatar floating badges to an inner stage wrapper**: When anchoring floating badges or visual accents around the avatar, wrap the avatar and badges in a tight inner stage wrapper (`relative w-full max-w-65 sm:max-w-85 md:max-w-95 lg:max-w-100`) rather than the outer layout column. This guarantees absolute coordinates anchor directly to the avatar silhouette across all viewports (desktop, tablet, mobile) and prevents badges from drifting across full-width columns.
14. **Strict Component Directory Boundaries (`components/ui/` vs `components/custom/`)**: `@/components/ui/*` is STRICTLY RESERVED for headless/unstyled primitives installed or scaffolded from shadcn and its official registries (`button`, `badge`, `card`, `dialog`, `tooltip`). Keep this directory pristine. All app-specific custom components, bespoke interactive features, and micro-experience controllers (e.g. `CustomCursor`, `Click`, future SFX managers, custom widgets) MUST be decoupled and placed in `@/components/custom/*` (or dedicated feature folders like `@/components/avatar/`, `@/components/sections/`, `@/components/page-layout/`). NEVER pollute `@/components/ui/*` with bespoke app code.
15. **Direct Module Imports Over Barrel Files (Anti-Barrel Policy)**: Do NOT obsessively create barrel files (`index.ts`) in every directory. Never create nested or multi-tier barrels (e.g. `sections/index.ts` re-exporting `hero/index.ts`). Always prefer direct imports (`@/components/custom/cursor`, `@/components/sections/hero/hero-section`, `@/components/page-layout/grid-section`, `@/components/ui/button`). Direct imports eliminate circular dependency hazards, prevent bundle size bloat, and maximize Turbopack/Next.js HMR compilation speed (Vercel `bundle-barrel-imports` performance guidance). A barrel file is only acceptable for cohesive packages with 5+ tightly-coupled public modules forming an external public API, and must never use wildcard `export *`.

---

## 2. File Organization & Architecture

```text
app/
├── fonts.ts          # Google Fonts loading & variable definitions
├── globals.css       # Tailwind v4 @theme, @utility, and resets
├── layout.tsx        # Root HTML wrapper, metadata, and font classes
└── page.tsx          # Homepage view composition
components/
├── ui/               # Strictly Base UI & shadcn registry primitives (dialog, tooltip, button, card, badge)
├── custom/           # Bespoke app-specific features & interactive controllers (cursor, click)
├── avatar/           # Avatar video player & mouse-tracking controller (interactive-avatar, use-avatar-gaze)
├── page-layout/      # 3-column architectural layout & rails (navbar, grid-section, page-layout)
└── sections/         # Page sections (hero, projects, experience, contact)
docs/                 # Modular design system & architecture blueprints
lib/
└── utils.ts          # cn() class merging utility (clsx + tailwind-merge)
public/
└── avatar/           # 11 WebM clips + avatar-idle.webp poster
```

---

## 3. Formatting & Pre-Commit Verification

Before concluding any coding turn:

1. Run `npm run lint` (`oxlint`) to ensure zero static analysis errors.
2. Run `npm run format` (`oxfmt`) to auto-format syntax and alphabetize Tailwind classes.
3. Ensure no unused imports or loose console logs remain in production components.
4. **NEVER run `git commit` or `git push` autonomously**: Always leave changes uncommitted for user review, and ask or wait for explicit confirmation before committing/pushing.

---

## 4. Installed Agent Skills Reference

Agents working on this repository should consult the skills located in `.agents/skills/`:

- `.agents/skills/migrate-radix-to-base/SKILL.md`: Guidance on mapping Radix component primitives to `@base-ui/react`.
- `.agents/skills/shadcn/SKILL.md`: shadcn patterns and registry best practices.
- `.agents/skills/vercel-react-best-practices/SKILL.md`: Next.js & React 19 performance guidelines.
- `.agents/skills/web-design-guidelines/SKILL.md`: Visual hierarchy, spacing, and micro-interaction principles.
- `.agents/skills/frontend-a11y/SKILL.md`: Accessibility and WCAG compliance.
- `.agents/skills/frontend-design/SKILL.md`: Distinctive, non-templated frontend visual design direction.
