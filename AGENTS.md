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
| `border-[2.5px]`           | `border-brutal`             | `border-width: 2.5px;`        |
| `border-b-[2.5px]`         | `border-b-brutal`           | `border-bottom-width: 2.5px;` |
| `border-t-[2.5px]`         | `border-t-brutal`           | `border-top-width: 2.5px;`    |
| `border-x-[2.5px]`         | `border-x-brutal`           | `border-left/right: 2.5px;`   |
| `border-[1.5px]`           | `border-subtle`             | `border-width: 1.5px;`        |
| `border-b-[1.5px]`         | `border-b-subtle`           | `border-bottom-width: 1.5px;` |
| `border-[3px]`             | `border-thick`              | `border-width: 3px;`          |
| `border-b-[3px]`           | `border-b-thick`            | `border-bottom-width: 3px;`   |
| `shadow-[2px_2px_...]`     | `shadow-brutal-xs`          | `2px 2px 0px 0px #18181B;`    |
| `shadow-[3px_3px_...]`     | `shadow-brutal-sm`          | `3px 3px 0px 0px #18181B;`    |
| `shadow-[4px_4px_...]`     | `shadow-brutal`             | `4px 4px 0px 0px #18181B;`    |
| `shadow-[6px_6px_...]`     | `shadow-brutal-lg`          | `6px 6px 0px 0px #18181B;`    |
| `shadow-[8px_8px_...]`     | `shadow-brutal-xl`          | `8px 8px 0px 0px #18181B;`    |
| `bg-[#DEF2E0]`             | `bg-canvas`                 | Sage Mint Canvas              |
| `text-[#18181B]`           | `text-ink`                  | Deep Ink Text                 |
| `border-[#18181B]`         | `border-ink`                | Deep Ink Border               |
| `bg-[#FF6B57]`             | `bg-coral`                  | Warm Coral                    |
| `bg-[#FDE047]`             | `bg-yellow`                 | Buttercup Yellow              |
| `bg-[#EBE6FF]`             | `bg-lavender`               | Soft Lavender                 |
| `bg-[#BAE6FD]`             | `bg-sky`                    | Sky Mist                      |
| `bg-[#86EFAC]`             | `bg-mint`                   | Fresh Mint                    |
| `rounded-[9999px]`         | `rounded-full`              | Full radius (squircle target) |

### 📌 Squircle Class Pattern

Always use:
`rounded-[fallback] corner-squircle supports-[corner-shape:squircle]:rounded-[target]`
Or use the pre-built utilities: `squircle-btn`, `squircle-card`, `squircle-badge`.

### 📌 Architecture & Component System

- Always place reusable primitives in `@/components/ui/*`.
- Always use `@base-ui/react` for headless accessible components. Do NOT install `@radix-ui/*`.
- Consult installed agent skills in `.agents/skills/` (`migrate-radix-to-base`, `shadcn`, `vercel-react-best-practices`, `web-design-guidelines`, `frontend-a11y`, `frontend-design`).
- Always run `npm run lint` (`oxlint`) and `npm run format` (`oxfmt`) before ending your turn.
- **NEVER run `git commit` or `git push` autonomously.** Always wait for explicit user instruction or ask before committing/pushing.
