# FutureMark Product Brand System

## Overview

Every FutureMark product icon is a **sibling** of the FM master mark — not a separate brand. The parent brand's geometric DNA appears in every product icon:

- **The diagonal**: all marks use the FM diagonal angle (~70° from horizontal, derived from the FM lettermark's characteristic slash)
- **Heavy geometric weight**: no thin lines, no hairline strokes, no decorative serifs
- **Rectangular/parallelogram forms**: all marks are built from the same rectangle-with-diagonal-cut primitive as the FM letters
- **Bold proportion**: marks fill approximately 53% of the container's surface area at their widest point

---

## The FM Diagonal

The FM lettermark's signature is a white diagonal slash cutting through the combined F+M monogram. The slash angle is approximately **70° from horizontal**, meaning:

- For a bar of height 88px, the horizontal offset is 32px (= 88 / tan(70°))
- The top edge of every parallelogram sits 32px to the RIGHT of the bottom edge
- This is the single geometric constraint inherited by all product marks

---

## Product Color System

Each product is assigned a distinct hue positioned around the color wheel — no two products share a hue family. Amber gold is reserved exclusively for FRI.

| Product | Name | Primary | Deep |
|---------|------|---------|------|
| FM | Future Marketing Studio | #2A2320 | #0A0806 |
| FRI | Future Review Intelligence | #D4920A | #7A4800 |
| FSEO | Future SEO | #1A6FD4 | #0A3A7A |
| FA | Future Ads | #D45A1A | #7A2800 |
| FC | Future Content | #1AAD57 | #0A5C2C |
| FAI | Future AI | #8C22D4 | #4A0A7A |
| FCR | Future CRM | #1A9FD4 | #0A5270 |
| FAN | Future Analytics | #D4721A | #7A3500 |
| FAU | Future Automations | #3D22D4 | #1A0A7A |
| FCM | Future Campaigns | #D41A7A | #7A0A40 |

---

## Icon Variants

Every icon ships in four variants:

| Variant | Container | Mark | Use |
|---------|-----------|------|-----|
| `color` | Product gradient | White | App icons, sidebar, primary use |
| `dark` | Deep product surface | Product primary | Dark UI contexts |
| `light` | Product light tint | Product deep | Light backgrounds, print |
| `mono` | Ink (#0A0806) | White | Single-color print, emboss |
| `mono-light` | Paper (#F9F8F6) | Ink | Single-color light contexts |

---

## FRI: Future Review Intelligence

The FRI mark uses **three data-bar parallelograms** — the simplest and most direct interpretation of review data as structured rows.

```
[████████████████/        ]   Bar 1: W=360 (narrowest)
[████████████████████████/]   Bar 2: W=500 (widest — center anchor)
[████████████████████████/ ]  Bar 3: W=420
```

The diagonal cut on each bar's terminals inherits the FM angle exactly. The varying widths (360 / 500 / 420) create visual rhythm — not a mechanical progression, but an organic data distribution.

**Why three bars?** Reviews are rows of data. The FRI product processes rows of text (reviews) into structured intelligence. Three rows suggest plurality and volume without overwhelming the icon at small sizes.

**Why widest in the middle?** It creates visual stability (widest at center of mass) while avoiding the cliché ascending bar chart that would make this read as a generic analytics icon.

---

## Sizing

The mark is designed in a 1000×1000 viewBox and scales without modification:

| Use case | Recommended size |
|----------|-----------------|
| Browser favicon | 32×32 (SVG, auto-scales) |
| Sidebar icon | 28–36px |
| App list icon | 48–64px |
| App icon (mobile) | 120×120 |
| Marketing display | 240–480px |
| Full-page display | Any — it's vector |

---

## Typography in Lockups

When pairing the FRI icon with text:

- **Primary label**: System-UI / -apple-system / Segoe UI, weight 700–800
- **Product name**: Same stack, weight 400–500
- **Byline** ("by Future Marketing Studio"): Same stack, weight 600, uppercase, letter-spacing 0.1em

Do not use custom display typefaces in product lockups — the icon carries the personality. Typography should be neutral and functional.

---

## What Not to Do

- Do not add drop shadows to the icon
- Do not use the icon on a gradient background that competes with the icon's own gradient
- Do not place the icon at less than 16px — use a simplified favicon version below 24px
- Do not modify the bar proportions or the diagonal angle — these are the brand DNA
- Do not use clip-art, stock illustrations, or emoji as substitutes in product communications
- Do not create product icons using different angles — all siblings must share the 70° diagonal

---

## Files

```
branding/
  svg/
    fri-icon.svg          Master FRI mark, 1000×1000, color
    fri-icon-dark.svg     Dark variant
    fri-icon-mono.svg     Monochrome variant
    fri-icon-light.svg    Light variant
    fri-horizontal.svg    Horizontal lockup with wordmark
    fm-mark.svg           FM master brand abstract mark
  logo-components/
    FRIIcon.jsx           React component, all variants
    ProductIcon.jsx       Generalized product icon system
  colors.ts              Full color system with TypeScript types
  product-brand-system.md  This document
```
