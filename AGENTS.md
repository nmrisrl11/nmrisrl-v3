<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

---

# 🚨 AGENT MANDATE: Always Use Canonical Tailwind Classes (NO ARBITRARY BRACKETS)

The IDE and Tailwind CSS Language Server enforce **`suggestCanonicalClasses`**.
Writing arbitrary square bracket syntax (e.g. `border-b-[2.5px]`, `shadow-[4px_4px_...]`) causes IDE linter diagnostics and breaks design token consistency.

### 📌 Mandatory Canonical Lookup Table

| ❌ NEVER WRITE (Arbitrary) | ✅ ALWAYS WRITE (Canonical) | Underlying CSS / Value        |
| -------------------------- | --------------------------- | ----------------------------- |
| `border-[2px]`             | `border-brutal`             | `border-width: 2px;`          |
| `border-b-[2px]`           | `border-b-brutal`           | `border-bottom-width: 2px;`   |
| `border-t-[2px]`           | `border-t-brutal`           | `border-top-width: 2px;`      |
| `border-x-[2px]`           | `border-x-brutal`           | `border-left/right: 2px;`     |
| `border-[1.5px]`           | `border-subtle`             | `border-width: 1.5px;`        |
| `border-b-[1.5px]`         | `border-b-subtle`           | `border-bottom-width: 1.5px;` |
| `border-[3px]`             | `border-thick`              | `border-width: 3px;`          |
| `border-b-[3px]`           | `border-b-thick`            | `border-bottom-width: 3px;`   |
| `shadow-[0px_2px_...]`     | `shadow-brutal-xs`          | `0px 2px 0px 0px #18181B;`    |
| `shadow-[0px_3px_...]`     | `shadow-brutal-sm`          | `0px 3px 0px 0px #18181B;`    |
| `shadow-[0px_4px_...]`     | `shadow-brutal`             | `0px 4px 0px 0px #18181B;`    |
| `shadow-[0px_6px_...]`     | `shadow-brutal-lg`          | `0px 6px 0px 0px #18181B;`    |
| `shadow-[0px_8px_...]`     | `shadow-brutal-xl`          | `0px 8px 0px 0px #18181B;`    |
| `bg-[#DEF2E0]`             | `bg-canvas`                 | Sage Mint Canvas              |
| `text-[#18181B]`           | `text-ink`                  | Deep Ink Text                 |
| `border-[#18181B]`         | `border-ink`                | Deep Ink Border               |
| `bg-[#FF6B57]`             | `bg-coral`                  | Warm Coral                    |
| `bg-[#FDE047]`             | `bg-yellow`                 | Buttercup Yellow              |
| `bg-[#EBE6FF]`             | `bg-lavender`               | Soft Lavender                 |
| `bg-[#BAE6FD]`             | `bg-sky`                    | Sky Mist                      |
| `bg-[#86EFAC]`             | `bg-mint`                   | Fresh Mint                    |
| `rounded-[9999px]`         | `rounded-full`              | Full radius (squircle target) |
| `bg-[repeating-linear...]` | `bg-striped-rail`           | 315° diagonal hatching rail   |

### 📌 Squircle Class Pattern

Always use:
`rounded-[fallback] corner-squircle supports-[corner-shape:squircle]:rounded-[target]`
Or use the pre-built utilities: `squircle-btn`, `squircle-card`, `squircle-badge`.

### 📌 Architecture & Component System

- **`@/components/ui/*` is STRICTLY RESERVED for shadcn & Base UI registry primitives**: Only place unstyled/headless primitives installed or scaffolded from shadcn and its official registries (`button`, `badge`, `card`, `dialog`, `tooltip`) in this folder. Keep it pristine.
- **`@/components/custom/*` for App-Specific Interactive Features**: Decouple and place all bespoke, app-specific UI features, interactive controllers, and experience enhancements (e.g., `CustomCursor`, `Click` effect, future SFX managers, custom widgets) in `@/components/custom/*` (or dedicated feature directories like `@/components/avatar/`, `@/components/sections/`, `@/components/page-layout/`). **NEVER pollute `@/components/ui/*` with app-specific custom code.**
- Always use `@base-ui/react` for headless accessible components. Do NOT install `@radix-ui/*`.
- **Buttons & Floating Elements**: Use outset **`ring-2 ring-ink shadow-brutal`** (not `border-brutal`) to eliminate sub-pixel anti-aliasing gaps and corner-shape desync. Pair with `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink`. Never combine with `focus-visible:outline-none`, which suppresses keyboard focus rings.
- **Structural Dividers & Rails**: Keep standard `border-subtle`, `border-brutal` (2px), and `border-thick` for directional lines (`border-x`, `border-t`, `border-b`).
- **3-Column Architectural Grid**: Wrap main content with flanking vertical striped rails (`bg-striped-rail border-x border-ink/15`). Keep rails `hidden md:block` so mobile viewports have full width.
- **Mobile Responsiveness & Overflow Prevention**: Always enforce `w-full overflow-x-clip` on root wrappers, specify explicit `grid-cols-1` on mobile grid containers, and ensure child columns use `min-w-0 w-full` to avoid unintended horizontal scrollbars.
- **Motion Reduction**: All continuous CSS animations (`animate-spin`, `animate-pulse`) MUST include `motion-reduce:animate-none` to honor `prefers-reduced-motion` (WCAG 2.3.3).
- **Text Zoom & Reflow**: Metric chips and side-by-side cards must support 200% text zoom by stacking vertically at narrow widths (`flex-col md:flex-row md:items-center`) to prevent content clipping (WCAG 1.4.4 / 1.4.10).
- **Avatar Stage & Floating Accents Anchor Pattern**: When anchoring floating badges or visual accents around the avatar, wrap the avatar and badges in a tight inner stage wrapper (`relative w-full max-w-65 sm:max-w-85 md:max-w-95 lg:max-w-100`) rather than the outer layout column. This guarantees absolute coordinates anchor directly to the avatar silhouette across all viewports (desktop, tablet, mobile) and prevents badges from drifting across full-width columns.
- **Tailwind Merge**: All custom brutal tokens are registered in `customTwMerge` via `extendTailwindMerge` in `@/lib/utils`. Never append `!` (e.g. `border-brutal!`) to force class retention.
- **Strict Anti-Barrel Policy (Direct Module Imports)**: Do NOT obsessively create barrel files (`index.ts`) in every directory. Never create multi-tier or nested barrels (e.g. `sections/index.ts` re-exporting `hero/index.ts`). Always use direct imports:
  - ✅ `import { CustomCursor } from "@/components/custom/cursor";`
  - ✅ `import { HeroSection } from "@/components/sections/hero/hero-section";`
  - ✅ `import { GridSection } from "@/components/page-layout/grid-section";`
  - ✅ `import { Button } from "@/components/ui/button";`
  - ❌ `import { ... } from "@/components/custom";` (superfluous barrel for 2 files)
  - ❌ `import { ... } from "@/components/sections";` (nested barrel-in-barrel)
    Direct imports eliminate circular dependency hazards, prevent bundle size bloat, and maximize Turbopack/Next.js HMR compilation speed (Vercel `bundle-barrel-imports` best practice). A barrel file is only acceptable for folders with 5+ tightly-coupled public modules forming an external public API, and must never use wildcard `export *`.
- Consult installed agent skills in `.agents/skills/` (`migrate-radix-to-base`, `shadcn`, `vercel-react-best-practices`, `web-design-guidelines`, `frontend-a11y`, `frontend-design`).
- Always run `npm run lint` (`oxlint`) and `npm run format` (`oxfmt`) before ending your turn.
- **NEVER run `git commit` or `git push` autonomously.** Always wait for explicit user instruction or ask before committing/pushing.
