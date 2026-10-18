# 📚 nmrisrl-v3 — Architecture & Design System Documentation

Welcome to the technical blueprint and living design system documentation for **nmrisrl.dev (v3)**.

This directory contains modular, topic-focused documentation designed to be referenced by developers and AI coding agents (Antigravity, Claude, Cursor, Copilot) during feature implementation and maintenance.

---

## 🗺️ Documentation Directory Map

| Document                                                                | Topic                   | Description & Scope                                                                                                                     |
| ----------------------------------------------------------------------- | ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| [**01 — Brand & Philosophy**](./01-brand-and-philosophy.md)             | Identity & Ethos        | The principles of Soft Pastel Neubrutalism, inspiration from Taramon.app and Neubrutalism.com, and tactile design guidelines.           |
| [**02 — Design Tokens & Colors**](./02-design-tokens-and-colors.md)     | Palette & Surfaces      | Sage Mint foundation (`#DEF2E0`), deep ink strokes (`#18181B`), pastel accents, zero-blur hard shadow matrix, and Tailwind v4 `@theme`. |
| [**03 — Typography System**](./03-typography.md)                        | Font Hierarchy          | 4-tier font pairing (Plus Jakarta Sans, Space Grotesk, DM Sans, JetBrains Mono), Google Fonts loading, and typographic scale.           |
| [**04 — Squircle & Shapes**](./04-squircle-and-shapes.md)               | Superellipse Geometry   | `@toolwind/corner-shape` setup, the 3-layer progressive fallback pattern, and component radius presets.                                 |
| [**05 — Component System**](./05-component-system.md)                   | Base UI & Architecture  | Headless primitives with `@base-ui/react`, accessible focus styles, active button translation, and component patterns.                  |
| [**06 — Avatar Interactive Engine**](./06-avatar-interactive-engine.md) | 3D Character Controller | 11 pre-rendered WebM video clips, directional mouse tracking, spring physics (`motion`), state machine triggers.                        |
| [**07 — Tech Stack & Tooling**](./07-tech-stack-and-tooling.md)         | Core Stack & OXC        | Next.js 16 App Router, React 19, TypeScript, Rust-based OXC (`oxlint` + `oxfmt`), and project scripts.                                  |
| [**08 — Agent Rules & Guardrails**](./08-agent-rules.md)                | AI Assistant Guidelines | Explicit DOs and DON'Ts for autonomous coding agents modifying this codebase.                                                           |

---

## 🤖 How Coding Agents Should Use These Docs

When executing tasks in this repository, always reference the corresponding document:

- **Building a new UI component?** Consult [04 — Squircle & Shapes](./04-squircle-and-shapes.md) and [05 — Component System](./05-component-system.md).
- **Adding styles or color variables?** Consult [02 — Design Tokens & Colors](./02-design-tokens-and-colors.md).
- **Working with fonts or text?** Consult [03 — Typography System](./03-typography.md).
- **Hooking up avatar animations or mouse interactions?** Consult [06 — Avatar Interactive Engine](./06-avatar-interactive-engine.md).
- **Formatting or linting?** Consult [07 — Tech Stack & Tooling](./07-tech-stack-and-tooling.md).
- **Unsure about coding conventions or forbidden patterns?** Check [08 — Agent Rules & Guardrails](./08-agent-rules.md).
