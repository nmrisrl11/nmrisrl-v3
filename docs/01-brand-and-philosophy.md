# 01 — Brand & Philosophy: Soft Pastel Neubrutalism

## 1. The Core Philosophy

Traditional brutalism and early web brutalism (2010s) were intentionally anti-conventional, harsh, and abrasive. They favored unstyled HTML, clashing neon hues, and aggressive monochrome layouts designed to shock the viewer.

**Neubrutalism** (2020s) translated that rebellious spirit into a commercially usable, high-contrast design grammar:

- Conspicuous structural framing
- Thick solid outlines
- Zero-blur offset drop shadows
- Assertive typography

However, **nmrisrl.dev (v3)** takes this one evolutionary step further into **Soft Pastel Neubrutalism**:
We combine the **tactile physical punch** of neubrutalism with the **approachable warmth and organic personality** of a stylized 3D cartoon avatar and pastel palette (inspired by [Taramon.app](https://taramon.app) and [Neubrutalism.com](https://neubrutalism.com)).

---

## 2. The Three Brand Pillars

### Pillar 1: Tactile Materiality over Frictionless Sameness

Modern web applications often blend into identical, generic templates with floaty blurred drop shadows and invisible grey borders.
In v3:

- Every card, button, and badge has a defined physical boundary (`2px` to `2.5px` solid deep ink).
- Shadows have **zero blur radius** (`4px 4px 0 0 #18181B`), creating the sensation of paper cutouts, enamel pins, or stamped plastic cards.
- Interactive controls respond with physical mechanical clicks (`active:translate(2px, 2px)` with shadow collapse).

### Pillar 2: Soothing Pastels Anchored in Avatar Reality

Instead of piercing primary neon yellows or cyans:

- The root canvas is anchored in **Sage Mint (`#DEF2E0`)**, which matches the exact solid background of our 11 pre-rendered WebM avatar video clips.
- Accents utilize warm, joyful pastels: **Warm Coral (`#FF6B57`)**, **Buttercup Yellow (`#FDE047`)**, **Soft Lavender (`#EBE6FF`)**, and **Sky Mist (`#BAE6FD`)**.
- White cards (`#FFFFFF`) pop sharply against the mint background with high contrast while remaining easy on the eyes.

### Pillar 3: Continuous Curvature (Squircles)

Rather than harsh, razor-sharp 90° corners that clash with the organic curved geometry of the 3D avatar character:

- We utilize **Squircles (superellipses)** via `@toolwind/corner-shape`.
- A squircle retains the boxy, structured presence of neubrutalism in the corners while removing sharp tangent points.
- Always backed by our battle-tested **3-layer fallback pattern** for legacy browsers.

---

## 3. Brand Voice & Character

- **Identity**: Nomer Israel — Senior Front-end Developer & Creative Technologist.
- **Tone**: Confident, playful, craft-obsessed, highly technical, yet warm and approachable.
- **Mascot / Avatar**: A stylized 3D cartoon avatar in a navy jacket with dynamic facial expressions (waving, looking around, thumbs-up, fingerheart, and deep focus coding).
