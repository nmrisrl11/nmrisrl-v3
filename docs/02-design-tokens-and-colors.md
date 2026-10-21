# 02 — Design Tokens & Color Palette

## 1. Palette Architecture

All 11 avatar video clips in `public/avatar/` were generated and encoded over an exact solid background. To ensure the character sits inside the UI without rectangular border seams or compression halos, the root canvas is anchored directly to **Sage Mint**.

```mermaid
flowchart LR
    subgraph Canvas Surfaces
        C1["Sage Mint #DEF2E0<br/>(Root Canvas)"]
        C2["Chalk White #FFFFFF<br/>(Card Surface)"]
        C3["Muted Surface #F3F8F5<br/>(Subtle Blocks)"]
    end

    subgraph Ink & Structure
        I1["Deep Ink #18181B<br/>(Text, Borders, Shadows)"]
        I2["Muted Ink #52525B<br/>(Secondary Text)"]
    end

    subgraph Pastel Accents
        A1["Warm Coral #FF6B57<br/>(Primary CTA)"]
        A2["Buttercup Yellow #FDE047<br/>(Highlighter / Badges)"]
        A3["Soft Lavender #EBE6FF<br/>(Skill Chips)"]
        A4["Sky Mist #BAE6FD<br/>(Tech Stack)"]
        A5["Fresh Mint #86EFAC<br/>(Status Indicator)"]
    end
```

---

## 2. Complete Token Table

| Token Variable          | Tailwind Class            | Hex Code  | OKLCH                     | Primary Application                                               |
| ----------------------- | ------------------------- | --------- | ------------------------- | ----------------------------------------------------------------- |
| `--color-canvas`        | `bg-canvas`               | `#DEF2E0` | `oklch(0.938 0.035 142)`  | Root viewport background; melts into avatar WebM video background |
| `--color-canvas-subtle` | `bg-canvas-subtle`        | `#EAF6EC` | `oklch(0.962 0.022 142)`  | Section alternation, container fills                              |
| `--color-surface`       | `bg-surface`              | `#FFFFFF` | `oklch(1 0 0)`            | Floating cards, modal sheets, dropdowns                           |
| `--color-surface-muted` | `bg-surface-muted`        | `#F3F8F5` | `oklch(0.974 0.012 145)`  | Inactive tab fills, code block headers                            |
| `--color-ink`           | `text-ink` / `border-ink` | `#18181B` | `oklch(0.205 0.005 285)`  | Primary typography, container outlines, drop shadows (Deep Zinc)  |
| `--color-ink-muted`     | `text-ink-muted`          | `#52525B` | `oklch(0.448 0.012 285)`  | Subtitles, date ranges, secondary metadata                        |
| `--color-coral`         | `bg-coral` / `text-coral` | `#FF6B57` | `oklch(0.685 0.198 28.5)` | Primary call-to-action buttons, high-energy accents               |
| `--color-yellow`        | `bg-yellow`               | `#FDE047` | `oklch(0.898 0.155 98.2)` | Highlight spans, notice badges, featured project tags             |
| `--color-lavender`      | `bg-lavender`             | `#EBE6FF` | `oklch(0.932 0.052 292)`  | Design/creative tags, secondary category badges                   |
| `--color-sky`           | `bg-sky`                  | `#BAE6FD` | `oklch(0.892 0.065 220)`  | Tech stack badges, code language pills                            |
| `--color-mint`          | `bg-mint`                 | `#86EFAC` | `oklch(0.885 0.125 152)`  | "Available for Work" pulsing indicator, success toast             |

---

## 3. Physical Neubrutalist Tokens

### Border Widths

| Theme Token             | Canonical Utility                   | Value   | Primary Application                      |
| ----------------------- | ----------------------------------- | ------- | ---------------------------------------- |
| `--border-width-subtle` | `border-subtle` / `border-b-subtle` | `1.5px` | Badges, small chips, close buttons       |
| `default / 2px`         | `border-2` / `border`               | `2px`   | Standard buttons, input outlines         |
| `--border-width-brutal` | `border-brutal` / `border-b-brutal` | `2px`   | Cards, showcase containers, modal frames |
| `--border-width-thick`  | `border-thick` / `border-b-thick`   | `3px`   | Section dividers, sticky nav border      |

### Zero-Blur Hard Shadow Matrix (3D Vertical Pop)

> [!IMPORTANT]
> **Strict Neubrutalist Rule**: Never add blur (`blur-radius > 0`) to neubrutalist shadows. Drop shadows must be crisp offsets with solid `#18181B`. Shadows use pure-vertical drop offsets (`0px Ypx 0px 0px #18181B`) for balanced, symmetrical 3D elevation.

| Shadow Token         | Tailwind Utility   | CSS Value                 | Use Case                                     |
| -------------------- | ------------------ | ------------------------- | -------------------------------------------- |
| `--shadow-brutal-xs` | `shadow-brutal-xs` | `0px 2px 0px 0px #18181B` | Small badges, active button press state      |
| `--shadow-brutal-sm` | `shadow-brutal-sm` | `0px 3px 0px 0px #18181B` | Badges, secondary pill controls              |
| `--shadow-brutal`    | `shadow-brutal`    | `0px 4px 0px 0px #18181B` | Standard buttons, project cards, navbar dock |
| `--shadow-brutal-lg` | `shadow-brutal-lg` | `0px 6px 0px 0px #18181B` | Button hover elevation, modal frames         |
| `--shadow-brutal-xl` | `shadow-brutal-xl` | `0px 8px 0px 0px #18181B` | Hero callouts, elevated overlay dialogs      |

### Zero-Blur Silhouette Drop Shadows for SVGs & Icons

Unlike HTML cards and buttons where `box-shadow` applies to the element's outer rectangle, transparent SVG icons require CSS `filter: drop-shadow(...)` to cast zero-blur shadows directly hugging the vector silhouette and alpha channel.

| Silhouette Shadow Token | Tailwind Utility        | CSS Filter Value                          | Use Case                                  |
| ----------------------- | ----------------------- | ----------------------------------------- | ----------------------------------------- |
| —                       | `drop-shadow-brutal-xs` | `filter: drop-shadow(0 1.5px 0 #18181B);` | Micro SVG icons (12px–14px), small badges |
| —                       | `drop-shadow-brutal-sm` | `filter: drop-shadow(0 2px 0 #18181B);`   | Mid-size SVG icons, tech chips            |
| —                       | `drop-shadow-brutal`    | `filter: drop-shadow(0 3px 0 #18181B);`   | Standard SVG badges, Neu-Icons            |
| —                       | `drop-shadow-brutal-lg` | `filter: drop-shadow(0 4px 0 #18181B);`   | Large accent icons, decorative stamps     |

---

## 4. Tailwind CSS v4 `@theme` Block

Defined in `app/globals.css`:

```css
@theme {
	--color-canvas: #def2e0;
	--color-canvas-subtle: #eaf6ec;
	--color-surface: #ffffff;
	--color-surface-muted: #f3f8f5;
	--color-ink: #18181b;
	--color-ink-muted: #52525b;

	--color-coral: #ff6b57;
	--color-yellow: #fde047;
	--color-lavender: #ebe6ff;
	--color-sky: #bae6fd;
	--color-mint: #86efac;

	--shadow-brutal-xs: 0px 2px 0px 0px #18181b;
	--shadow-brutal-sm: 0px 3px 0px 0px #18181b;
	--shadow-brutal: 0px 4px 0px 0px #18181b;
	--shadow-brutal-lg: 0px 6px 0px 0px #18181b;
	--shadow-brutal-xl: 0px 8px 0px 0px #18181b;

	--border-width-subtle: 1.5px;
	--border-width-brutal: 2px;
	--border-width-thick: 3px;
}
```

---

## 5. Architectural Utilities & Visual Patterns

Defined in `app/globals.css`:

### A. Decorative Diagonal Striped Rail (`bg-striped-rail`)

Inspired by `tailwindcss.com`, this utility generates a viewport-locked 315° diagonal hatching pattern using `repeating-linear-gradient` with `background-attachment: fixed`:

```css
@utility bg-striped-rail {
	--pattern-fg: color-mix(in srgb, var(--color-ink) 9%, transparent);
	background-image: repeating-linear-gradient(
		315deg,
		var(--pattern-fg) 0,
		var(--pattern-fg) 1px,
		transparent 0,
		transparent 50%
	);
	background-size: 10px 10px;
	background-attachment: fixed;
}
```

- **Viewport Locking (`fixed`)**: Prevents visual crawling during scroll and ensures that vertical side rails and any horizontal hatched bands share the identical coordinate grid with zero seam offset.
- **Applications**: Vertical architectural gutter rails (`PageLayout`), horizontal divider ribbons, card hatching.

### B. Alpha Gradient Edge Mask (`mask-edge-fade`)

```css
@utility mask-edge-fade {
	mask-image: linear-gradient(to right, transparent 0%, #000 8%, #000 92%, transparent 100%);
	-webkit-mask-image: linear-gradient(
		to right,
		transparent 0%,
		#000 8%,
		#000 92%,
		transparent 100%
	);
}
```
