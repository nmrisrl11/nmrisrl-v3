# 05 — Component System & shadcn + Base UI Architecture

## 1. The shadcn + Base UI Hybrid Architecture

In `nmrisrl-v3`, we combine **shadcn/ui's component distribution model** with **Base UI's headless primitives** ([`@base-ui/react`](https://base-ui.com)) and our **Soft Neubrutalism design tokens**.

```mermaid
flowchart TD
    subgraph Tooling Layer
        S["shadcn CLI (components.json)<br/>- Code scaffold generator<br/>- Zero runtime bundle overhead"]
    end

    subgraph Primitive Layer
        B["@base-ui/react Primitives<br/>- Unstyled headless state<br/>- Accessible keyboard & focus trapping<br/>- Native CSS Anchor Positioning"]
    end

    subgraph Design System Layer
        T["Soft Neubrutalism Tokens<br/>- Sage Mint canvas (#DEF2E0)<br/>- Deep Ink borders (#18181B)<br/>- Squircles via @toolwind/corner-shape<br/>- Zero-blur hard shadows"]
    end

    subgraph Output
        C["components/ui/*<br/>(Button, Badge, Card, Dialog, Tooltip)"]
    end

    S --> C
    B --> C
    T --> C
```

---

## 2. Why There Are Zero Bottlenecks or Conflicts

1. **No Monolithic Runtime**: `shadcn` is not a library dependency inside `package.json`. It is purely a CLI code generator that places editable TypeScript source files directly into `components/ui/`.
2. **Headless Base UI**: Unlike UI kits that ship heavy pre-baked CSS styles, `@base-ui/react` has zero default styles and renders zero redundant wrapper divs.
3. **Token Aliasing**: In `app/globals.css`, shadcn's expected semantic variables are linked directly to your neubrutalist tokens:

```css
@theme {
	/* Semantic shadcn / Base UI Aliases */
	--color-background: var(--color-canvas); /* #DEF2E0 */
	--color-foreground: var(--color-ink); /* #18181B */
	--color-card: var(--color-surface); /* #FFFFFF */
	--color-card-foreground: var(--color-ink); /* #18181B */
	--color-primary: var(--color-coral); /* #FF6B57 */
	--color-primary-foreground: #ffffff;
	--color-secondary: var(--color-canvas-subtle); /* #EAF6EC */
	--color-secondary-foreground: var(--color-ink);
	--color-border: var(--color-ink); /* #18181B */
	--color-ring: var(--color-ink);
}
```

_When an agent or developer adds a component using shadcn's conventional classes (`bg-primary`, `border-border`, `bg-background`), it automatically inherits your exact palette without manual re-theming._

---

## 3. Configuration: `components.json`

Located in the repository root:

```json
{
	"$schema": "https://ui.shadcn.com/schema.json",
	"style": "new-york",
	"rsc": true,
	"tsx": true,
	"tailwind": {
		"config": "",
		"css": "app/globals.css",
		"baseColor": "neutral",
		"cssVariables": true,
		"prefix": ""
	},
	"iconLibrary": "lucide",
	"rtl": false,
	"aliases": {
		"components": "@/components",
		"utils": "@/lib/utils",
		"ui": "@/components/ui",
		"lib": "@/lib",
		"hooks": "@/hooks"
	}
}
```

---

## 4. Core Component Manifest

All core components live inside `components/ui/`:

### A. Button (`components/ui/button.tsx`)

- **Behavior**: Purely vertical 3D tactile click physics (`hover:-translate-y-0.5 hover:shadow-brutal-lg`, `active:translate-y-0.5 active:shadow-brutal-xs`).
- **Border & Shadow Architecture**: Built on the outset **`ring-2 ring-ink shadow-brutal`** pattern to eliminate sub-pixel anti-aliasing seams and prevent squircle border/shadow divergence.
- **Accessible Focus**: Styled with `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink` so focus indicators never overwrite or collide with the 2px ring outline.
- **Shape**: Squircle fallback (`rounded-lg corner-squircle supports-[corner-shape:squircle]:rounded-full`).
- **Variants**: `default` (Coral), `secondary` (Surface White), `yellow`, `lavender`, `sky`, `outline`, `ghost`.
- **Polymorphism**: Supports `asChild` for seamless `<Link>` or `<a>` nesting without invalid nested button HTML.

### B. Badge (`components/ui/badge.tsx`)

- **Behavior**: Compact pill chip with canonical `border-subtle border-ink` and 3D vertical `shadow-brutal-xs`.
- **Variants**: `default`, `coral`, `yellow`, `lavender`, `sky`, `mint`, `outline`.

### C. Card (`components/ui/card.tsx`)

- **Behavior**: Structured floating container with canonical `border-brutal border-ink` (2px) and 3D vertical `shadow-brutal`.
- **Shape**: Continuous squircle curvature (`rounded-2xl corner-squircle supports-[corner-shape:squircle]:rounded-[28px]`).
- **Subcomponents**: `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`.

### D. Dialog / Modal (`components/ui/dialog.tsx`)

- **Powered by**: `@base-ui/react/dialog`.
- **Anatomy**: `Dialog`, `DialogTrigger`, `DialogContent`, `DialogHeader`, `DialogTitle`, `DialogDescription`, `DialogClose`.
- **Features**: Accessible focus lock, Escape key dismissal, backdrop dimming (`bg-ink/40 backdrop-blur-xs`), and `shadow-brutal-lg`.

### E. Tooltip (`components/ui/tooltip.tsx`)

- **Powered by**: `@base-ui/react/tooltip`.
- **Features**: Native CSS anchor positioning without JavaScript measurement jitter, squircle badge styling (`shadow-brutal-xs`).

---

## 5. Layout & Architectural Grid System (`components/page-layout/`)

The layout incorporates a structural grid line system with subtle hairline framing:

- **`PageLayout` (`components/page-layout/page-layout.tsx`)**: Master shell wrapping pages in a continuous central column framed by vertical `border-x border-ink/15` rails that push all the way to the top edge (`top-0`).
- **`Navbar` (`components/page-layout/navbar.tsx`)**: Sticky centered navigation dock that smoothly morphs on scroll (`scrollY > 20`):
  - **Unscrolled**: Flush `top-0`, full width (`max-w-6xl`), transparent background, `ring-0 ring-transparent shadow-none`.
  - **Scrolled**: Morphs via GPU `translate-y` into a compact floating pill dock (`max-w-2xl translate-y-3 sm:translate-y-4`), `bg-surface/95 backdrop-blur-md`, `ring-2 ring-ink shadow-brutal`.
  - **Mobile Menu**: Responsive squircle dropdown card attached directly under the navbar island.
- **`GridSection` (`components/page-layout/grid-section.tsx`)**: Reusable section container with `border-b border-ink/15`, numbered section headers, and corner intersection crosshairs (`+`) rendered on the joints (disabled on hero top border).

---

## 6. Hero Section & Marquee System (`components/sections/hero/`)

- **`HeroSection` (`components/sections/hero/hero-section.tsx`)**:
  - Natural content-driven height (`flex flex-col justify-between px-0! py-0`) avoiding excessive vertical empty space while maintaining visual balance.
  - **2-Column Layout**: Left column features the interactive character avatar with seamless canvas background matching; right column features the statement headline (`Plus Jakarta Sans`) with neobrutalist yellow highlight box and personalized subhead.
  - **Zero-Margin Collision**: The avatar's bottom sits flush against the top of the marquee with zero padding and zero margin (`items-end self-end`).

- **`MarqueeTechStack` (`components/sections/hero/marquee-tech-stack.tsx`)**:
  - Dual-track infinite counter-translating marquee powered by `motion/react`.
  - Top track translates Left; bottom track translates Right (reverse).
  - Populated strictly from [`ProfileCoreTech`](file:///C:/Users/NOMER%20ISRAEL/OneDrive/Desktop/Projects/nmrisrl-v3/constants/stack-and-skills-data.ts) in `constants/stack-and-skills-data.ts`.
  - Fully contained inside the grid rails (`w-full`) with refined borders (`border-t border-ink/20`, `border-b border-ink/15`).
