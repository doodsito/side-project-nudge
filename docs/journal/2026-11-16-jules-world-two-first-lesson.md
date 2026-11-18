# Build the first World 2 lesson

- **Date:** 2026-11-16
- **Author:** Jules, with Codex
- **Pull request:** https://github.com/doodsito/side-project-nudge/pull/99

**Why:** Teach beginners what they buy, how stocks, bonds and funds relate, and why value can fall.

**What changed:**
- Added a six-step lesson in French and US English, with matching, feedback and a quiz; a correct answer is required to continue.
- Added independent answer shuffling and a Vercel preview; saving is gated to an isolated V2 deployment.

**Files:** `apps/web/src/app/lessons/investment-basics/`, `apps/web/src/lib/dictionaries/`, `apps/web/tests/investment-basics-lesson.test.mjs`

**Checked:** New tests, lint, typecheck and build pass; preview-mode lesson and world link return HTTP 200. Two older World 0 tests still fail.

**Next:** Review the Vercel lesson preview, then add XP when a shared XP system exists.
