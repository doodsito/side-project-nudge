# Nudge — Design system (Colour System C)

**Status:** Colour foundation, onboarding foundations and the lesson and course screen bases approved (20 November 2026), light mode only. Details below extend the C-only colour reference with founder-approved product decisions.

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
| `selection.card.bg`          | White                           |
| `selection.card.border`      | Violet 600                      |
| `selection.marker.bg`        | Violet 600                      |
| `selection.marker.fg`        | White                           |
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

## Approved product foundations (20 November 2026)

- **Typography:** Manrope for titles; Inter for body text, descriptions, options and buttons. Use 26 px titles on mobile and 32 px on desktop, 16 px body text, 14 px secondary text and Inter Semi Bold (600) for primary actions.
- **Spacing:** use a 4 px base with recurring 8, 12, 16, 24, 32 and 40 px steps. Screens with the same purpose share a layout.
- **Onboarding:** center titles and introductions on choice screens; keep option copy left-aligned. Selected cards are white with a violet outline and a check marker. Place the primary action after the content with measured spacing. Use Poggo only where the pose explains something or marks a moment.
- **Lesson flow:** guide one phase at a time. Center the step title; align scenario text, explanations and choices to the left. Keep scenario text directly on lavender and reserve white surfaces for answer choices or content needing a distinct surface. Use one centered column, about 720 px maximum on desktop.
- **Lesson interaction:** the learner selects an answer, then presses “Vérifier mon choix”. Keep choices visible when feedback appears below. Quiz feedback distinguishes “juste” and “à revoir” using an icon and clear label, without adding a colour; scenario feedback explains trade-offs without judging one choice as universally right. After “à revoir”, Continue is primary and Retry is a secondary text link.
- **Lesson navigation:** show a discreet progress bar only. Provide separate controls to go back one phase and leave the lesson. Ask for confirmation before leaving; say the current session will not be kept and reassure the learner that the lesson can be restarted later.
- **Lesson completion:** lead with the learning takeaway, then the next action. Poggo marks completion quietly. Show one primary action: go to the next lesson, or return to the course path after the last lesson in a world.
- **Courses page:** put the current lesson’s title and “Reprendre” action first, without an extra description. Follow with one vertical course path. Give each world a heading, detail the current world and keep later worlds compact. Show locked lessons quietly with their specific unlock condition. Use lesson states to show progress; do not add a duplicate numeric counter. The current lesson uses a white surface, violet outline and violet “Reprendre” action.
- **Motion and writing:** keep interaction feedback restrained, honor reduced motion, and use direct, specific copy without generic motivation or decorative motion.

## Still to specify

The colour reference does not define global breakpoints, radii, elevation or component APIs. The approved 720 px content widths apply to onboarding and lesson layouts; other surfaces need their own review before these foundations are extended.
