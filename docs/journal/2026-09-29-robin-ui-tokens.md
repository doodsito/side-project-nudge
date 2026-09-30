# Buttons share the Nudge sizes from components/ui

- **Date:** 2026-09-29
- **Author:** Robin, with Claude Code
- **Pull request:** none, pushed directly to `main` by Robin's decision

**Why:** every button repeated the same classes by hand; the shared button now
carries the Nudge look, so new screens get it with one word.

**What changed:**
- `Button` has two Nudge sizes, `lg` and `xl`, and the primary one uses the
  `shadow-soft` token; three links styled by hand became real buttons.
- The "→" character, missing from our font, is now the arrow icon.
- Visible: practice buttons share one shadow and one text size; the hero's
  secondary button no longer wraps onto two lines.

**Files:** `apps/web/src/components/`, `docs/ui.md`

**Checked:** lint, typecheck and build pass; 32 screenshots compared with
`main`, every difference approved by Robin before the push.

**Next:** cookie consent banner, Google Analytics and a `/cookies` page.
