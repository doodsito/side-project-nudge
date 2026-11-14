# Poggo animates in the landing Hero

- **Date:** 2026-11-13
- **Author:** Emma, with Codex
- **Pull request:** <link, once opened>

**Why:** The Hero used a still Poggo. The prepared eye layers let the existing mascot blink and wink without changing its artwork.
**What changed:**
- Replaced only the Hero mascot with an animated React component.
- Added idle movement, irregular eye changes, a hover reaction and reduced-motion support.
**Files:** `apps/web/src/components/marketing/`, `apps/web/public/assets/poggo/prepared/`
**Checked:** lint, typecheck, build, `/fr` and PNG alignment pass. Visual desktop/mobile preview remains to check.
**Next:** Check the Vercel preview on desktop and mobile.
