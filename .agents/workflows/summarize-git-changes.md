---
description: Analyze current uncommitted Git changes in nmrisrl-v3 and generate a specific, grouped, commit-ready summary using Conventional Commit categories (Feats, Fixes, Chores, Refactors, Docs, Styles).
---

# Summarize Git Changes

Review the current Git working tree in **`nmrisrl-v3`** and prepare a detailed, commit-ready summary of all current changes.

## Objective

Analyze the uncommitted Git changes and produce a clear, specific commit summary that accurately represents what was changed.

Inspect where necessary:
- `git status`
- Staged changes
- Unstaged changes
- Untracked files
- Relevant `git diff`
- Relevant file contents when the diff alone is insufficient

Do not modify, stage, unstage, commit, or reset any files.

---

## Commit Summary Requirements

### 1. Be Specific
Describe what actually changed. Avoid vague statements such as:
- ❌ "Updated components"
- ❌ "Improved styling"
- ❌ "Made some changes"
- ❌ "Fixed some issues"

Prefer specific, technically sound descriptions such as:
- ✅ "Add Base UI Dialog primitive with brutalist border, zero-blur shadow, and squircle fallback"
- ✅ "Replace arbitrary border and shadow syntax with canonical tokens border-brutal and shadow-brutal"
- ✅ "Integrate 11 pre-rendered WebM avatar clips into interactive pointer-tracking engine"
- ✅ "Add Agent Skills migrate-radix-to-base and vercel-react-best-practices via skills CLI"

### 2. Identify Conventional Commit Types
Use common Conventional Commit categories:
- **Feats**: New features, new UI components, interactive avatar controls
- **Fixes**: Bug fixes, styling glitches, hydration fixes, accessibility repairs
- **Styles**: Design token updates, canonical class substitutions, squircle tuning
- **Refactors**: Component cleanup, Base UI primitive restructuring without functional changes
- **Docs**: Updates to `docs/**`, `AGENTS.md`, or `README.md`
- **Chores**: Tooling, OXC configuration, dependencies, skills management

Include only categories that are actually represented by the current changes.

### 3. Group Related Changes
Group related changes together under their appropriate category with a generalized Conventional Commit title.

Format:

Feats
**feat(ui): add Base UI dialog and tooltip primitives**
- Create unstyled Base UI dialog with portal backdrop
- Style dialog popup with `border-brutal`, `shadow-brutal-lg`, and `squircle-card`
- Implement keyboard escape trapping and accessible title bindings

Docs
**docs(agent-rules): document canonical Tailwind classes and squircle fallbacks**
- Add canonical classes lookup table in AGENTS.md and docs/08-agent-rules.md
- Document 3-layer squircle fallback pattern with @toolwind/corner-shape

---

## Important Rules

- Do NOT execute `git commit`.
- Do NOT stage or unstage files.
- Do NOT modify the working tree.
- Keep the final output ready to copy directly into a commit message.
