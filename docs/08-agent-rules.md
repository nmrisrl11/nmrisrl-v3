# 08 — Agent Rules & Engineering Guardrails

> [!IMPORTANT]
> **Mandatory reading for all autonomous AI coding agents (Antigravity, Claude, Cursor, Copilot)** executing tasks in `nmrisrl-v3`.
> These rules enforce brand integrity, performance standards, and architectural consistency.

---

## 1. Non-Negotiable Styling Rules

### ❌ NEVER:

1. **Never use blurred drop shadows**: Neubrutalism requires crisp zero-blur hard offsets (`shadow-brutal` = `4px 4px 0 0 #18181B`). Do not use `shadow-md`, `shadow-lg`, or arbitrary blur radii.
2. **Never break the 3-layer squircle fallback**: Never apply `rounded-full` alone on buttons or cards without `@supports (corner-shape: squircle)`. Always follow the pattern:
   `rounded-[fallback] corner-squircle supports-[corner-shape:squircle]:rounded-[target]` or use `@utility squircle-*`.
3. **Never alter the `--color-canvas` hex value**: The root background MUST remain Sage Mint (`#DEF2E0` / `#E2F2DF`) because all 11 pre-rendered WebM avatar videos in `public/avatar/` were rendered on this exact color. Changing the canvas will reveal visible rectangular video borders.
4. **Never re-install ESLint or Prettier**: This repository is strictly managed by the Rust-based **OXC** toolchain (`oxlint` + `oxfmt`).
5. **Never install `@radix-ui/react-*` directly**: This repository exclusively uses `@base-ui/react` headless primitives integrated with `components.json`.

### ✅ ALWAYS:

1. **Always use Base UI (`@base-ui/react`)**: When building dialogs, tooltips, popovers, tabs, or accordions, use `@base-ui/react` primitives.
2. **Always follow `components.json` layout**: Atomic primitives belong in `@/components/ui/*` and use `cn()` class merging.
3. **Always include interactive click feedback**: Buttons and interactive controls must translate on active press (`active:translate-x-0.5 active:translate-y-0.5`) with shadow reduction.
4. **Always use font variables correctly**:
   - Hero name & high-impact statements: `font-display` (`Syne`)
   - Headings (`<h2>`, `<h3>`): `font-heading` (`Space Grotesk`)
   - Body text & descriptions: `font-body` (`DM Sans`)
   - Tags, badges, code, numbers: `font-mono` (`JetBrains Mono`)
5. **Always ensure WCAG 2.2 contrast**: Small text must have at least 4.5:1 contrast against its background. Text on pastel accents (`coral`, `yellow`, `mint`) must use either deep ink `#18181B` or white `#FFFFFF` depending on contrast validation.

---

## 2. File Organization & Architecture

```text
app/
├── fonts.ts          # Google Fonts loading & variable definitions
├── globals.css       # Tailwind v4 @theme, @utility, and resets
├── layout.tsx        # Root HTML wrapper, metadata, and font classes
└── page.tsx          # Homepage view composition
components/
├── ui/               # Reusable atomic Base UI components (dialog, tooltip, button)
├── avatar/           # Avatar video player & mouse-tracking controller
├── sections/         # Page sections (hero, projects, experience, contact)
└── icons/            # SVG icons or Lucide re-exports
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
