---
description: Stage, commit with a conventional commit message (grouped by responsibilities like feat, fix, refactor, docs, chores), and push changes to the target branch (defaults to dev or active branch).
---

# Commit and Push Changes

This workflow guides an autonomous AI coding agent to inspect working tree changes, enforce pre-commit quality gates, compose a standardized Conventional Commit message grouped by responsibilities, stage all relevant changes, commit, and push to the specified target branch.

---

## 1. Safety & Branch Rules

- **Branch Selection**:
  - If the user specifies a `[target branch]` (e.g. `/commit-and-push main` or "push to dev"), target that branch.
  - If no branch is specified, check the current active branch using `git branch --show-current`. Default to `dev` if on `dev`, or the active feature branch.
  - Never push directly to `main` unless the user explicitly requested it.
- **Explicit Instruction Mandate**:
  - Running this workflow satisfies the `AGENTS.md` mandate requiring explicit user authorization before running `git commit` and `git push`.

---

## 2. Pre-Commit Quality Verification

Before staging or committing any code, verify that all quality gates pass:

1. **Static Analysis & Linting**:
   ```bash
   npm run lint
   ```
   Must pass with **0 errors and 0 warnings** (`oxlint`).

2. **Code & CSS Formatting**:
   ```bash
   npm run format:check
   ```
   If formatting fails, auto-format using:
   ```bash
   npm run format
   ```

3. **Optional Static Build Validation**:
   If significant structural changes, new pages, or route modifications were made:
   ```bash
   npm run build
   ```
   Ensure compilation succeeds with zero type or build errors.

---

## 3. Working Tree Inspection & Diff Analysis

1. Run `git status` to identify all modified, staged, unstaged, and untracked files.
2. Run `git diff` and examine newly created files to understand the exact scope of changes.
3. Determine which Conventional Commit categories apply:
   - **`Feats`**: New user-facing features, components, animations, interactions, or endpoints.
   - **`Fixes`**: Bug fixes, styling corrections, responsive overflow fixes, accessibility repairs.
   - **`Refactors`**: Code restructuring, component modularization, centralizing constants, performance refactoring without functional changes.
   - **`Styles`**: Design token changes, canonical Tailwind class substitutions, squircle tuning, spacing polish.
   - **`Docs`**: Updates to `docs/**`, `README.md`, `AGENTS.md`, or workflow guides.
   - **`Chores`**: Dependency updates, build configs (`.oxlintrc.json`, `package.json`), npm scripts, or agent workflows.

---

## 4. Conventional Commit Message Standard

### A. Title Format
```text
<type>(<scope>): <short imperative description in lowercase>
```
- **Type**: `feat`, `fix`, `refactor`, `style`, `docs`, or `chore`. Pick the dominant type.
- **Scope**: Area of the repository affected (e.g., `routes`, `avatar`, `ui`, `about`, `hero`, `layout`, `tokens`, `rules`).
- **Description**: Concise summary (50–72 characters) written in the imperative present tense ("add", "fix", "implement", "update" — not "added" or "adds").

### B. Body Grouped by Responsibilities
Group the bullet points cleanly using markdown headers for each active category:

```markdown
feat(routes): implement custom 404 page and centralize profile metadata

### Feats
- feat(not-found): add custom 404 route exception page (`app/not-found.tsx` and `components/sections/not-found/not-found-section.tsx`)
- feat(not-found): add interactive macOS terminal info card with developer excuse shuffler using PropellerStarIcon
- feat(not-found): implement 4-card waypoint escape bento grid guiding visitors back to core portfolio sections
- feat(navigation): add cross-route hash navigation fallback in Navbar (`router.push('/' + href)` when anchor is missing from active DOM)

### Refactors
- refactor(constants): centralize developer profile, URLs (`cleanUrl`, `fullUrl`), bio, and contact links into `constants/data.ts`
- refactor(profile): migrate hardcoded developer details across layout, hero, avatar, about, and seal components to `Data`
- refactor(ui): strictly utilize `@/components/ui/button` primitive for 404 shuffle and action buttons instead of ad-hoc markup

### Fixes
- fix(layout): resolve long-URL text overflow on 404 macOS terminal card with flex-wrap and truncation protection
- fix(navbar): resolve brand badge domain splitting dynamically using `Data.cleanUrl`

### Docs
- docs(system): add Section 10 (Route Exception Architecture) to `docs/05-component-system.md`
- docs(rules): add Rules 20-22 to `AGENTS.md` and `docs/08-agent-rules.md` for centralized Data, primitive reuse, and cross-route navigation
- docs(readme): update `README.md` directory tree and architectural mandate with 404 page, data constants, and button reuse
```

**Rules for Grouped Bullets**:
- Only include headers (`### Feats`, `### Fixes`, etc.) that have active changes. Omit empty sections.
- Prefix each bullet with its scoped conventional tag (e.g. `- feat(scope): ...`, `- fix(scope): ...`).
- Be specific: mention component names, utilities, or file paths where applicable. Avoid vague bullets like "Updated styling" or "Fixed bugs".

---

## 5. Execution Protocol

### Step 1: Stage Changes
```bash
git add .
```
(Or stage specific files if selectively committing).

### Step 2: Commit Using Scratch File
To avoid PowerShell / Windows command shell quote escaping, newline truncation, or encoding errors, write the full formatted commit message into a temporary scratch file (e.g. in `<artifactsDir>/scratch/commit_msg.txt`), then commit via:
```bash
git commit -F "<absolute-path-to-scratch-commit-msg>"
```

### Step 3: Push to Target Branch
```bash
git push origin <target-branch>
```
Verify the output confirms a successful push (e.g. `[branch] -> [branch]` with exit code `0`).

### Step 4: Verify Clean Working Tree
```bash
git status
```
Ensure working tree is clean.

---

## 6. Final Reporting Format

Conclude by presenting the user with:

```markdown
The changes have been committed and pushed to your **`<target-branch>`** branch on GitHub.

### 📌 Git Commit & Push Summary

**Commit:** `<short-hash>`  
**Branch:** `<target-branch>` $\rightarrow$ `origin/<target-branch>`  
**Message:**

\`\`\`markdown
<full conventional commit message with grouped responsibilities>
\`\`\`
```
