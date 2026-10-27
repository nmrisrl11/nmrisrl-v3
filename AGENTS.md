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

| ❌ NEVER WRITE (Arbitrary)    | ✅ ALWAYS WRITE (Canonical) | Underlying CSS / Value                    |
| ----------------------------- | --------------------------- | ----------------------------------------- |
| `border-[2px]`                | `border-brutal`             | `border-width: 2px;`                      |
| `border-b-[2px]`              | `border-b-brutal`           | `border-bottom-width: 2px;`               |
| `border-t-[2px]`              | `border-t-brutal`           | `border-top-width: 2px;`                  |
| `border-x-[2px]`              | `border-x-brutal`           | `border-left/right: 2px;`                 |
| `border-[1.5px]`              | `border-subtle`             | `border-width: 1.5px;`                    |
| `border-b-[1.5px]`            | `border-b-subtle`           | `border-bottom-width: 1.5px;`             |
| `border-[3px]`                | `border-thick`              | `border-width: 3px;`                      |
| `border-b-[3px]`              | `border-b-thick`            | `border-bottom-width: 3px;`               |
| `shadow-[0px_2px_...]`        | `shadow-brutal-xs`          | `0px 2px 0px 0px #18181B;`                |
| `shadow-[0px_3px_...]`        | `shadow-brutal-sm`          | `0px 3px 0px 0px #18181B;`                |
| `shadow-[0px_4px_...]`        | `shadow-brutal`             | `0px 4px 0px 0px #18181B;`                |
| `shadow-[0px_6px_...]`        | `shadow-brutal-lg`          | `0px 6px 0px 0px #18181B;`                |
| `shadow-[0px_8px_...]`        | `shadow-brutal-xl`          | `0px 8px 0px 0px #18181B;`                |
| `drop-shadow-[0_1.5px_0_...]` | `drop-shadow-brutal-xs`     | `filter: drop-shadow(0 1.5px 0 #18181B);` |
| `drop-shadow-[0_2px_0_...]`   | `drop-shadow-brutal-sm`     | `filter: drop-shadow(0 2px 0 #18181B);`   |
| `drop-shadow-[0_3px_0_...]`   | `drop-shadow-brutal`        | `filter: drop-shadow(0 3px 0 #18181B);`   |
| `drop-shadow-[0_4px_0_...]`   | `drop-shadow-brutal-lg`     | `filter: drop-shadow(0 4px 0 #18181B);`   |
| `bg-[#DEF2E0]`                | `bg-canvas`                 | Sage Mint Canvas                          |
| `text-[#18181B]`              | `text-ink`                  | Deep Ink Text                             |
| `border-[#18181B]`            | `border-ink`                | Deep Ink Border                           |
| `bg-[#FF6B57]`                | `bg-coral`                  | Warm Coral                                |
| `bg-[#FDE047]`                | `bg-yellow`                 | Buttercup Yellow                          |
| `bg-[#EBE6FF]`                | `bg-lavender`               | Soft Lavender                             |
| `bg-[#BAE6FD]`                | `bg-sky`                    | Sky Mist                                  |
| `bg-[#86EFAC]`                | `bg-mint`                   | Fresh Mint                                |
| `rounded-[9999px]`            | `rounded-full`              | Full radius (squircle target)             |
| `bg-[repeating-linear...]`    | `bg-striped-rail`           | 315° diagonal hatching rail               |
| `text-[10px]`                 | `text-2xs`                  | 0.625rem / 10px blueprint micro label     |

### 📌 Squircle Class Pattern

Always use:
`rounded-[fallback] corner-squircle supports-[corner-shape:squircle]:rounded-[target]`
Or use the pre-built utilities: `squircle-btn`, `squircle-card`, `squircle-badge`.

### 📌 Architecture & Component System

- **`@/components/ui/*` is STRICTLY RESERVED for registry-backed primitives & styled wrappers**: Only place registry-backed primitives and their local styled wrappers installed or scaffolded from Base UI and shadcn registries (`button`, `badge`, `card`, `dialog`, `tooltip`) in this folder. Keep it pristine.
- **`@/components/custom/*` for App-Specific Interactive Features**: Decouple and place all bespoke, app-specific UI features, interactive controllers, and experience enhancements (e.g., `CustomCursor`, `Click` effect, future SFX managers, custom widgets) in `@/components/custom/*` (or dedicated feature directories like `@/components/avatar/`, `@/components/sections/`, `@/components/page-layout/`). **NEVER pollute `@/components/ui/*` with app-specific custom code.**
- **`@/components/neu-icons/*` for Bespoke Neubrutalist SVG Accents**: Dedicated library of 10 handcrafted Soft Neubrutalism SVG accent icons. Features shared `NeuIconProps`, default `size-6 inline-block shrink-0 fill-current select-none`, `size` shorthand, and accessible defaults. **Always import from the `@/components/neu-icons` barrel file** using explicit named exports (e.g. `import { DiamondStarIcon, CrossStarIcon } from "@/components/neu-icons";`). Do not bypass the barrel file with direct sub-path imports.
- Always use `@base-ui/react` for headless accessible components. Do NOT install `@radix-ui/*`.
- **Buttons, Floating Elements & Squircle Utilities**: Use outset **`ring-2 ring-ink shadow-brutal`** (not `border-brutal`) on interactive buttons and navigation docks to eliminate sub-pixel anti-aliasing gaps and corner-shape desync. Similarly, pre-built utilities `squircle-card` and `squircle-badge` utilize `--card-ring` / `--badge-ring` compound box-shadows (`border: none`) to guarantee seamless superellipse perimeters, paired with `@media (forced-colors: active)` system-colored borders (`ButtonText`, `CanvasText`) to preserve boundary visibility in high-contrast mode. Pair interactive elements with `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink`. Never combine with `focus-visible:outline-none`, which suppresses keyboard focus rings.
- **Technical Matrix & Skills Architecture (`@/components/sections/skills/*`)**: Decouple technical capabilities into `SkillsSection`, `SkillsCard`, `SkillsFilter`, `SkillsSkeleton`, `TechBadge`, and `skills-icons.tsx`. Centralize the 10-domain taxonomy in `constants/stack-and-skills-data.ts` and blueprint copy in `Skills_Section_Data` in `constants/data.ts`. Manage filter state via `useSkillsFilter` with React 19 concurrent transitions (`useTransition`), `<AnimatePresence mode="sync">` for card stability across filter slices, and dynamic column spans via `getFilteredColSpan`. Enforce the 3-tier icon fallback pipeline in `TechBadge` (Bespoke SVG with `aria-hidden="true"` -> Simple Icons CDN with empty `alt=""` and `onError` fallback -> Neu-Icon Blueprint Glyph).
- **SVG Silhouette Shadows vs Box Shadows**: Never apply `shadow-brutal*` (`box-shadow`) directly to `<svg>` icons or transparent graphics. Browsers cast `box-shadow` on the element's rectangular bounding box, producing a flat black line/bar under the SVG. Always use `drop-shadow-brutal*` (`filter: drop-shadow`), which hugs the vector silhouette and alpha channel. `GridMarker` automatically adapts `shadow-brutal*` to `drop-shadow-brutal*` for SVG neu-icon variants using boundary-safe negative lookarounds (`(?<![\w-])shadow-brutal*`).
- **Architectural Grid Line Markers (`GridMarker` & `GridSection`)**: Corner junction markers on section divider borders are managed by `@/components/page-layout/grid-marker.tsx`. `GridSection` defaults to `"squircle"` (10px squircle box with progressive enhancement fallback: `rounded-xs corner-squircle supports-[corner-shape:squircle]:rounded-full border border-ink/40 bg-surface`). Supports dynamic Neu-Icons (`marker="diamond-star"`, `"rounded-cross"`, `"sunburst-flower"`, etc.), custom `ReactElement` overrides (which safely receive `markerClassName` via `cloneElement` without disturbing corner coordinates), `markerClassName`, and toggle props `showMarker` (defaults to `true`) and `showTopMarker` (defaults to `false`). Markers use `hidden md:flex` and `z-20` (paired with `relative z-10` on the center main stage in `PageLayout`) to display exclusively when flanking rails exist and stack cleanly above rails and marquee gradients without mobile viewport clipping.
- **Structural Dividers & Rails**: Keep standard `border-subtle`, `border-brutal` (2px), and `border-thick` for directional lines (`border-x`, `border-t`, `border-b`).
- **3-Column Architectural Grid**: Wrap main content with flanking vertical striped rails (`bg-striped-rail border-x border-ink/15`). Keep rails `hidden md:block` so mobile viewports have full width.
- **Motion Reduction (WCAG 2.3.3) & SVG Resting State Overrides**: All continuous CSS animations (`animate-spin`, `animate-pulse`) MUST include `motion-reduce:animate-none` to honor `prefers-reduced-motion`. For custom SVG visual models and 3D assemblies:
  1. **Never Alter Default Animation Properties**: Keep normal animation keyframes, filter blur radii, and default SVG markup untouched when reduced motion is off.
  2. **Explicit Resting State Overrides**: When animations drive dynamic properties (such as `opacity` in pulsing shadows or expanding pulse rings), setting `animation: none !important` strips keyframe values and causes properties to revert to browser defaults (e.g. SVG `opacity: 1`, turning subtle shadows into pitch-black blobs). Always declare explicit resting state rules inside `@media (prefers-reduced-motion: reduce)` (e.g., softened shadow opacity `0.14 !important`, hiding transient pulse rings `opacity: 0 !important`, and eliminating duplicate overlapping center shadows).
  3. **Avoid Unintended SVG Transform Origins**: Never declare ad-hoc `transform-origin: center` in external CSS on SVG vector primitives without understanding SVG coordinate bounding boxes, as this causes SVG shapes to scale relative to the entire canvas instead of their local vector centers.
- **Avatar Stage & Floating Accents Anchor Pattern**: When anchoring floating badges or visual accents around the avatar, wrap the avatar and badges in a tight inner stage wrapper (`relative w-full max-w-65 sm:max-w-85 md:max-w-95 lg:max-w-100`) rather than the outer layout column. This guarantees absolute coordinates anchor directly to the avatar silhouette across all viewports (desktop, tablet, mobile) and prevents badges from drifting across full-width columns.
- **Tailwind Merge**: All custom brutal tokens are registered in `customTwMerge` via `extendTailwindMerge` in `@/lib/utils`. Never append `!` (e.g. `border-brutal!`) to force class retention.
- **Strict Barrel File & Module Import Protocol**:
  1. **Always Import From an Existing Barrel File**: If a folder has an existing barrel file (`index.ts`)—such as `@/components/neu-icons`—**ALWAYS** import through the barrel file using named imports. Never bypass an existing barrel file with direct sub-module imports.
     - ✅ `import { DiamondStarIcon, CrossStarIcon } from "@/components/neu-icons";`
     - ❌ `import { DiamondStarIcon } from "@/components/neu-icons/diamond-star";` (bypasses established barrel)
  2. **Direct Module Imports When No Barrel Exists**: When a directory does NOT have a barrel file, always use direct, specific module imports:
     - ✅ `import { Button } from "@/components/ui/button";`
     - ✅ `import { GridSection } from "@/components/page-layout/grid-section";`
     - ✅ `import { CustomCursor } from "@/components/custom/cursor";`
     - ✅ `import { HeroSection } from "@/components/sections/hero/hero-section";`
  3. **Anti-Barrel Proliferation**: Do NOT arbitrarily create new barrel files for small 1–3 file folders (e.g. no `@/components/custom/index.ts` or `@/components/ui/index.ts`). Never create nested or multi-tier barrels (e.g. `sections/index.ts` re-exporting `hero/index.ts`). Direct imports eliminate circular dependency hazards, prevent bundle size bloat, and maximize Turbopack/Next.js HMR compilation speed (Vercel `bundle-barrel-imports` best practice). A barrel file is only acceptable for cohesive packages with 5+ tightly-coupled public modules forming an established external API (such as `@/components/neu-icons`), and must never use wildcard `export *`.
- **Editorial Blueprint Section Headers**: For portfolio sections, use `GridSection`'s `figure` and `figureMeta?: string | readonly string[]` props (e.g. `figure="FIG. 02 // IDENTITY & BACKGROUND"`, `figureMeta={["SPECIALIZATION", "CRAFT & SYSTEMS"]}`) to maintain consistent architectural blueprint kicker labels above section titles.
- **Feature-Colocated Brand SVGs (Simple Icons Pattern)**: When integrating external brand or technology icons (e.g. Simple Icons for React, Next.js, TypeScript), colocate them in a dedicated file inside their feature directory (e.g. `@/components/sections/about/about-icons.tsx`) instead of installing heavy external icon packages. Standardize with `viewBox="0 0 24 24"`, scalable attributes, accessible `<title>`, and `fill="currentColor"`.
- **Centralized Personal & Domain Data (`@/constants/data`)**: Never hardcode developer personal info (name, bio, role), domain names (`cleanUrl`, `fullUrl`), contact email, social profiles, or portfolio section copy directly in pages, sections, or metadata. Always import and reference the `Data` and `About_Data` constants from `@/constants/data`.
- **Component Reuse over Reinvention (`@/components/ui/*`)**: Never build ad-hoc raw HTML elements (e.g. `<button>` styled with manual brutal rings/borders/shadows) when established primitives exist in `@/components/ui/` (`Button`, `Card`, `Badge`, `Dialog`, `Tooltip`). Always utilize the existing primitives with appropriate `variant`, `size`, and `shape`.
- **Cross-Route Hash Navigation**: When handling internal anchor navigation (`#section`), ensure handlers check whether the target anchor exists in the active DOM (`document.querySelector(href)`). If the anchor is missing (such as when triggered on a 404 or future sub-route), fall back to root navigation (`router.push('/' + href)`).
- **Hand-Drawn Vector Annotations (`rough-notation` & `react-rough-notation`)**:
  1. **Centralized Hook (`@/hooks/use-rough-notation`)**: Always consume `useRoughNotation()` to coordinate annotation rendering across components (`Navbar`, `HeroNarrative`). It automatically handles font-ready layout synchronization (waiting for `document.fonts.ready` followed by a settle delay timeout) and listens to `(prefers-reduced-motion: reduce)` via `useSyncExternalStore` to avoid cascading render warnings and bounding box discrepancies.
  2. **Motion Reduction (WCAG 2.3.3)**: Always pass `animate={!reducedMotion}` to all `<RoughNotation>` components.
  3. **Responsive Multiline Support**: Set `multiline={true}` on annotations applied to inline phrases (e.g. roles, descriptions) that might wrap across multiple lines on smaller viewports.
- **Modular Bento Subcomponent Decomposition (`components/sections/<section>/bento-XX/`)**: When architecting complex interactive sections or Bento grids with rich visual models (e.g. 3D assemblies, interactive SVG engines, canvas simulations), decompose each card into a dedicated subfolder (`bento-01/`, `bento-02/`, etc.) containing the card wrapper (`specialization.tsx`, `philosophy.tsx`) and its co-located visual assembly (`tech-stack-reactor.tsx`, `drone-assembly.tsx`). Keep the main section component (`about-section.tsx`) lightweight and focused on grid layout and blueprint metadata.
- **Theme Variables & Opacity (`color-mix`)**: Never hardcode hex codes or raw rgba values (e.g. `#FF6B57`, `rgba(253, 224, 71, 0.75)`) in component props, defaults, or SVG styles. Always use CSS theme variables (`var(--color-*)`) for solid tokens. When opacity/transparency is needed in JavaScript props, inline styles, or SVG filters, use `color-mix(in srgb, var(--color-<name>) <opacity>%, transparent)` (e.g. `color="color-mix(in srgb, var(--color-yellow) 75%, transparent)"`).
- **Accessible Modal Dossier & External Media Patterns**:
  1. **Strict Dialog Semantics**: Always provide `role="dialog"`, `aria-modal="true"`, and `aria-labelledby` referencing the modal title/heading.
  2. **Body Scroll Lock**: Implement body scroll locking on mount (`document.body.style.overflow = "hidden"`) and restore previous overflow state upon unmount.
  3. **Focus Management & Containment**: Move focus into the dialog upon open (`requestAnimationFrame`), contain keyboard navigation within the modal boundaries (`Tab`/`Shift+Tab`), guard against outside focus leakage (`focusin`), and restore focus to the triggering card (`experience-card-${id}`) or active element on close.
  4. **Directional Keyboard Navigation**: Listen for `Escape` to close, and `ArrowLeft`/`ArrowRight` to navigate sequential items or roles.
  5. **Responsive Viewport Height & Overflow Architecture**: Adapt modals for short or zoomed displays (`height < 44rem`) via `dossier-modal` (`calc(100dvh - 1.5rem)` with `overflow-y: auto`) and `dossier-content` (`min-height: 14rem` with `overflow-y: visible`) to avoid double scrollbars and prevent content crushing, while preserving stationary pinned controls at taller viewport heights.
  6. **External CDN Media**: Centralize external brand and logo assets in `constants/` (e.g., `constants/company-logos.ts`) and configure allowed domains under `images.remotePatterns` in `next.config.ts` (e.g., `res.cloudinary.com`).
- **Avatar Interactive State & Priority Hierarchy (`avatarStore`)**: Contextual character gestures (`coding`, `thumbsup`, `fingerheart`, `thinking`, `wave`) must be triggered via `avatarStore` (`components/avatar/avatar-store.ts`) respecting the `ActionPriority` hierarchy (`idle` < `hover` < `click`). Background hovers (e.g. CTA buttons) use `priority: "hover"` with debouncing (`80ms`); tactile user clicks (interactive badges, direct avatar clicks) use `priority: "click"` with a safety duration (`3000ms`). Hover interactions must never preempt active click actions. Interactive badges must be semantic `<button>` elements with accessible `aria-label`, visible keyboard focus states (`focus-visible:outline-2`), and active press translation (`active:translate-y-0.5`).
- Consult installed agent skills in `.agents/skills/` (`migrate-radix-to-base`, `shadcn`, `vercel-react-best-practices`, `web-design-guidelines`, `frontend-a11y`, `frontend-design`).
- Always run `npm run lint` (`oxlint`) and `npm run format` (`oxfmt`) before ending your turn.
- **NEVER run `git commit` or `git push` autonomously.** Always wait for explicit user instruction or ask before committing/pushing.
