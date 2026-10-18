---
description: Audit and synchronize project docs (README.md, docs/, and AGENTS.md) with the current codebase, UI components, architecture, design tokens, avatar engine, and rules. Update documentation with newly established conventions. Skip accurate files.
---

# Sync Project Documentation & Guidelines

Before closing a feature, merging changes, or concluding a development cycle in **`nmrisrl-v3`**, audit the project's documentation against the current codebase, recent git changes, UI components, design tokens, and engineering conventions.

The codebase is the **source of truth** for current implementation.

---

## 1. Documentation to Audit

Review and cross-reference:

- **`AGENTS.md`**: AI agent rules, canonical Tailwind classes lookup table, and core constraints.
- **`README.md`**: Project overview, stack summary, quickstart commands.
- **`docs/README.md`**: Master table of contents and blueprint index.
- **`docs/01-brand-and-philosophy.md`**: Brand personality, Soft Neubrutalism principles.
- **`docs/02-design-tokens-and-colors.md`**: Theme palette, brutal shadows, borders, radius.
- **`docs/03-typography.md`**: Font variables (`font-display`, `font-heading`, `font-body`, `font-mono`).
- **`docs/04-squircle-and-shapes.md`**: Squircle geometry and 3-layer fallback rules.
- **`docs/05-component-system.md`**: Base UI component inventory, variants, and anatomy.
- **`docs/06-avatar-interactive-engine.md`**: Avatar state machine, 11 WebM clips, canvas sync.
- **`docs/07-tech-stack-and-tooling.md`**: Dependencies, OXC tooling, and Agent Skills ecosystem.
- **`docs/08-agent-rules.md`**: Comprehensive engineering guardrails and non-negotiables.

---

## 2. Audit & Synchronize Criteria

Inspect the actual source code (`app/`, `components/`, `lib/`, `package.json`, `skills-lock.json`) and git history (`git log -n 5`, `git status`, `git diff`) to determine:

1. **New UI Components**:
   - If a new component was added to `components/ui/` (e.g. `sheet.tsx`, `dropdown.tsx`, `tabs.tsx`), document its anatomy, Base UI primitive mapping, and usage in [`docs/05-component-system.md`](file:///C:/Users/NOMER%20ISRAEL/OneDrive/Desktop/Projects/nmrisrl-v3/docs/05-component-system.md).
2. **Avatar Engine Updates**:
   - If new video assets, interactive transitions, or pointer-tracking hooks were added, update [`docs/06-avatar-interactive-engine.md`](file:///C:/Users/NOMER%20ISRAEL/OneDrive/Desktop/Projects/nmrisrl-v3/docs/06-avatar-interactive-engine.md).
3. **Design Tokens & Tailwind Utilities**:
   - If new utility classes or theme tokens were added to `app/globals.css`, document them in [`docs/02-design-tokens-and-colors.md`](file:///C:/Users/NOMER%20ISRAEL/OneDrive/Desktop/Projects/nmrisrl-v3/docs/02-design-tokens-and-colors.md).
4. **Canonical Tailwind Classes**:
   - If a new canonical class was introduced (e.g. `border-x-brutal`, `shadow-brutal-sm`), ensure it is added to the lookup table in both [`AGENTS.md`](file:///C:/Users/NOMER%20ISRAEL/OneDrive/Desktop/Projects/nmrisrl-v3/AGENTS.md) and [`docs/08-agent-rules.md`](file:///C:/Users/NOMER%20ISRAEL/OneDrive/Desktop/Projects/nmrisrl-v3/docs/08-agent-rules.md).
5. **New Agent Rules & Team Agreements**:
   - If user discussions or debugging revealed new constraints (e.g. specific animation timing, hydration handling, icon sizing), record them in [`AGENTS.md`](file:///C:/Users/NOMER%20ISRAEL/OneDrive/Desktop/Projects/nmrisrl-v3/AGENTS.md) and [`docs/08-agent-rules.md`](file:///C:/Users/NOMER%20ISRAEL/OneDrive/Desktop/Projects/nmrisrl-v3/docs/08-agent-rules.md).
6. **Dependencies & Agent Skills**:
   - If packages were installed or skills added via `skills add`, record them in [`docs/07-tech-stack-and-tooling.md`](file:///C:/Users/NOMER%20ISRAEL/OneDrive/Desktop/Projects/nmrisrl-v3/docs/07-tech-stack-and-tooling.md) and update the tech stack table in [`README.md`](file:///C:/Users/NOMER%20ISRAEL/OneDrive/Desktop/Projects/nmrisrl-v3/README.md).
7. **Root README.md High-Level Overview**:
   - If features, architecture, directory layout, or developer commands changed, update [`README.md`](file:///C:/Users/NOMER%20ISRAEL/OneDrive/Desktop/Projects/nmrisrl-v3/README.md) to keep the repository's public documentation accurate.

---

## 3. Root README.md Synchronization Guidelines

`README.md` is the primary public entry point and technical blueprint for the repository. Keep it synchronized whenever the codebase evolves:

- **Tech Stack Table**: Keep package names, versions, and purpose descriptions up to date when `package.json` changes.
- **Project Directory Tree**: Update the annotated file tree when new directories (e.g. `components/sections/`, `lib/hooks/`, `app/api/`) or key architectural files are added.
- **Features & Portfolio Sections**: Document newly completed portfolio sections (Hero, About, Projects, Experience, Contact) as they are built.
- **Avatar Engine Capabilities**: Update interaction states if new avatar animations, sound effects, gaze behaviors, or gesture modes are introduced.
- **Available Scripts**: Keep the scripts table current if new npm scripts are added (e.g. testing, deployment, bundle analysis).
- **Canonical Classes Table**: Synchronize with newly added tokens or canonical class pairs from `AGENTS.md`.
- **Documentation Blueprints Links**: Verify links to `docs/*.md` remain accurate if new chapters or guides are added.

---

## 4. Strict Rules of Synchronization

- ❌ **Do NOT modify application code**: This workflow is strictly for documentation auditing and synchronization.
- ❌ **Do NOT rewrite accurate documentation**: If a document is already 100% accurate, leave it untouched.
- ❌ **Do NOT invent speculative features or TODOs**: Document only what has actually been implemented and tested.
- ❌ **Never duplicate rules**: Before adding a rule to `AGENTS.md`, check if an equivalent exists. Update existing rules rather than creating contradictory duplicates.
- ✅ **Run formatter after editing**: Always run `npm run format` (`oxfmt`) after editing documentation to maintain clean Markdown formatting.

---

## 5. Skip When No Update Is Needed

Do **not** modify every file simply because it was reviewed.

- If all reviewed documents accurately reflect the current code, **make zero changes**.
- State clearly that the documentation is already synchronized.

---

## 6. Final Response Format

Conclude the audit with this structured report:

### Audited
List of files and directories reviewed (e.g., `components/ui/`, `app/globals.css`, `docs/05-component-system.md`).

### Updated
Only the files that were modified, along with a concise 1-sentence explanation of what changed and why.

### Guidelines Added/Updated
Specific new rules or tokens added to `AGENTS.md` or `docs/08-agent-rules.md` for future agents.

### Skipped
Documents that were audited and confirmed already accurate, requiring no modifications.

### Verification
Summary of how the documentation was verified against the real codebase (`oxfmt`, code inspection, git diff).

*(If no updates were necessary, output:)*
> "No documentation updates were necessary. The documentation and development guidelines are already synchronized with the current implementation."
