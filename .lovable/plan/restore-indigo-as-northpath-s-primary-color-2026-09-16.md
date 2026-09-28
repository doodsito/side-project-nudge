# Restore indigo as Northpath's primary color

## Why this happened
The latest redesign brief listed "subtle green accent" among the style guidelines, and the green was applied as the main brand color, replacing the original electric indigo primary. This plan restores the original identity.

## Goal
- Electric indigo returns as the primary color (buttons, links, highlights, chart line, focus rings, logos, progress bars).
- Mint/green stays only where it belongs: small badges, "After practising" card, success states, and simulated market-up data.

## Changes

### 1. `src/styles.css` — light theme tokens (single source of truth)
- `--primary`, `--ring`, `--chart-1`, `--sidebar-primary`, `--sidebar-ring`: green (oklch hue 166) → electric indigo (oklch hue ~285), keeping the same lightness/chroma balance for contrast (AA on white and on primary-foreground text).
- `--primary-soft`, `--accent`, `--sidebar-accent`: green tint → soft indigo tint.
- `--accent-foreground`, `--sidebar-accent-foreground`: green → deep indigo.
- Keep `--mint`, `--mint-soft`, `--market-up`, `--market-down` unchanged (green/red reserved for simulated market moves and small success accents).

### 2. `src/styles.css` — dark theme tokens
- Dark theme already uses indigo (`oklch 0.66 0.19 288`) — verify only, no change expected.

### 3. Component check
- Components use semantic tokens (`bg-primary`, `text-primary`, `text-mint`, etc.), so no component edits are expected. Spot-check for any hardcoded green and fix if found.

## Verification
- Rebuild passes with no errors.
- Playwright check on desktop + mobile widths: homepage, `/practice` (profile → scenario → feedback → summary), mini challenge, early-access form — buttons, links, chart, focus rings render indigo; no horizontal overflow; no console errors.
- Contrast spot-check: indigo on warm off-white and white text on indigo buttons meet accessibility contrast.
