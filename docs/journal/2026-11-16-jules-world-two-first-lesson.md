# Build the first World 2 lesson

- **Date:** 2026-11-16
- **Author:** Jules, with Codex
- **Pull request:** Not opened; the GitHub connector returned 403.
**Why:** Teach beginners what they buy, how stocks, bonds and funds relate, and why value can fall.
**What changed:**
- Added a six-step lesson in French and US English, with matching, immediate feedback and a three-question quiz.
- Added independent answer shuffling and a local preview; saving is gated to an isolated V2 deployment.

**Files:** `apps/web/src/app/lessons/investment-basics/`, `apps/web/src/lib/dictionaries/`, `apps/web/tests/investment-basics-lesson.test.mjs`

**Checked:** New tests, lint, typecheck and build pass; FR/US preview checked on desktop and mobile. Two older World 0 tests still fail.

**Next:** Open a draft PR to jules/v2, review on an isolated preview, then add XP when a shared XP system exists.
