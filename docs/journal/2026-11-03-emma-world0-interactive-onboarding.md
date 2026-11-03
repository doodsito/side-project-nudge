# Complete World 0 and refine the Learn experience

- **Date:** 2026-11-03
- **Author:** Emma, with Codex
- **Pull request:** Pending

**Why:** New learners should start with a decision, and returning learners should find their next lesson quickly.

**What changed:**
- Added the five-stage World 0 experience, mobile Learn map refinements, and a one-time World 1 discovery for learners who skip.
- Saved skip and discovery preferences with existing user progress; no database change.
- Added the illustrated World 2 preview and expandable locked worlds, plus compact lesson headers and the Portfolio placeholder.

**Files:** `apps/web/src/components/dashboard/`, `apps/web/src/app/lessons/why-invest/`, `apps/web/src/lib/course-progress.ts`
**Checked:** lint, typecheck, tests, production build, and local mobile previews on port 3002.
**Next:** Merge after the pull request checks pass.
