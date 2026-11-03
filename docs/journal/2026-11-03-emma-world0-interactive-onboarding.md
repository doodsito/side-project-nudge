# Bring World 0 into interactive onboarding

- **Date:** 2026-11-03
- **Author:** Emma, with Codex
- **Pull request:** Not opened

**Why:** New learners should make a money decision before reading an introduction.

**What changed:**
- Built the five-stage World 0 flow from the approved prototype, in French and US English.
- Added choice feedback, a compound-growth slider, a risk quiz, and a World 1 handoff.
- Save World 0 through its existing progress record only when learners continue to World 1.

**Files:** `apps/web/src/app/lessons/why-invest/`, `apps/web/src/lib/dictionaries/`
**Checked:** lint, typecheck, tests and 320–430px preview; production build cannot fetch Google Fonts in this environment.
**Next:** Review the local preview and rerun the build when Google Fonts is reachable.
