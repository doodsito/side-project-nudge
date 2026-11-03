# Nudge — Design system (Colour System C)

**Status:** Approved colour foundation, light mode only. Other design tokens require implementation audit and/or explicit approval.

**Source of truth:** `references/Nudge_Colour_System_C_Only.pdf` (five-page C-only colour reference). Keep the PDF in the repository alongside this document. If a rule here conflicts with the PDF, review and reconcile before changing the UI.

## Brand palette and backgrounds

- `brand.primary`: Violet 600 `#6236E8`
- `brand.secondary`: Gold 300 `#E6B44A`
- `brand.accent`: Teal 300 `#2DC9BE`
- `surface.canvas`: `#F3F0FF`; `surface.card`: `#FFFFFF`
- `text.primary`: Neutral 900 `#222039`

60 / 30 / 10 is a composition guide for **branded areas**, not a pixel quota. Neutral reading surfaces are intentional.

## Scales (source: Colour System C PDF)

| Step | Violet    | Gold      | Teal      | Neutral   |
| ---- | --------- | --------- | --------- | --------- |
| 0    | —         | —         | —         | `#FFFFFF` |
| 50   | `#F4F0FF` | `#FFF9E8` | `#EDFCFA` | `#F8F7FA` |
| 100  | `#EDE5FF` | `#FFF0C5` | `#CFF7F0` | `#F0EEF4` |
| 200  | `#D8C8FF` | `#F5D887` | `#95EADF` | `#E3DFEA` |
| 300  | `#BDA2FF` | `#E6B44A` | `#2DC9BE` | `#C8C2D4` |
| 400  | `#9D76FA` | `#C99628` | `#1BAEAB` | `#ABA2BB` |
| 500  | `#8154F2` | `#AA7A16` | `#118E8C` | `#8B849E` |
| 600  | `#6236E8` | `#875E0E` | `#0D7274` | `#655F78` |
| 700  | `#522ACD` | `#6F4B0D` | `#09595D` | `#4B455F` |
| 800  | `#4321AD` | `#583B0B` | `#07474B` | `#353048` |
| 900  | `#361C87` | `#432D0A` | `#063B3E` | `#222039` |
| 950  | `#251457` | —         | —         | `#171323` |

## Semantic token contract (recommended mapping based on reference)

| Role                         | Colour or behaviour            |
| ---------------------------- | ------------------------------ |
| `action.primary.default`     | Violet 600, white text         |
| `action.primary.hover`       | Violet 700, white text         |
| `action.primary.pressed`     | Violet 800, white text         |
| `action.secondary`           | Violet outline and violet text |
| `action.secondary.hoverBg`   | Violet 50                      |
| `action.secondary.pressedBg` | Violet 100                     |
| `selection.bg`               | Violet 100                     |
| `selection.border`           | Violet 600                     |
| `border.control`             | Neutral 500                    |
| `border.subtle`              | Neutral 200                    |
| `text.secondary`             | Neutral 600                    |
| `brand.secondary.fill`       | Gold 300, ink text             |
| `brand.accent.fill`          | Teal 300, ink text             |

Keep raw HEX values in **one token definition**, and consume semantic role names from components. Adapt the exact token syntax to the existing frontend stack; **do not assume a particular framework**.

## Status / feedback palettes (independent of brand accents)

| Status      | Background | Text      | Border and icon |
| ----------- | ---------- | --------- | --------------- |
| Success     | `#E8F5EE`  | `#123C2C` | `#146C43`       |
| Warning     | `#FFF4D6`  | `#623B00` | `#946200`       |
| Error       | `#FDECEF`  | `#82232F` | `#B3263B`       |
| Information | `#EBF2FF`  | `#143D77` | `#245DB4`       |

The feedback backgrounds are shown in the C-only reference; their exact values are also defined in the original Colour Systems source document. They are not Gold or Teal fills.

## States and accessibility

- Primary button: Violet 600 default / 700 hover / 800 pressed. White label.
- Secondary button: violet outline and text; Violet 50 hover / Violet 100 pressed.
- Underline links; never rely on hue alone to show clickability.
- Keyboard focus: **3px visible outline with 3px gap**; use white ring on violet surfaces; never clip outlines.
- Form border: Neutral 500; placeholder: Neutral 600; keep input labels visible.
- Disabled controls: explain unavailability; loading state: keep label plus progress indicator.
- Quiz flow: **selected before submit → correct or try again only after checking**. Selection and correctness must look distinct.
- Minimum contrast from reference: **4.5:1 normal text, 3:1 large text, 3:1 essential UI boundaries**. Ink on Gold 300: 8.24:1; ink on Teal 300: 7.66:1; white on Violet 600: 6.54:1. White on Gold and Teal signature fills does not meet normal-text AA.
- Use labels, icons, markers, or patterns in addition to colour. Test mobile, zoom, charts and colour-vision differences.
- **Light mode only.** Do not auto-generate a dark mode by inversion.

## Not yet specified

Approved font family/scale, spacing scale, breakpoints, radii, elevation, component API, and responsive layouts are **not defined in the colour PDF**. Audit the repository and propose them separately; do not present guesses as brand decisions.
