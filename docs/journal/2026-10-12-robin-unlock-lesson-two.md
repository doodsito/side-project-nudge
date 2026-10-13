# Lesson 2 unlocks right after finishing lesson 1

- **Date:** 2026-10-12
- **Author:** Robin, with Claude Code
- **Pull request:** https://github.com/doodsito/side-project-nudge/pull/36

**Why:** after finishing lesson 1, World 1 still showed lesson 2 as locked, so Jules's work from #28 looked missing.

**What changed:**
- Progress was saved to the account, but pages read it from the session token, which only updates about once an hour. Saving lesson 1 now refreshes the session, as changing the track already does.
- Reminder: Jules's components from #28 moved in #31 to `components/dashboard/` and `components/lessons/`.

**Files:** `apps/web/src/app/practice/actions.ts`

**Checked:** lint, typecheck, build and the course-progress tests pass. Please check on the Vercel preview with a beta account: finish lesson 1, then lesson 2 should open.

**Next:** build the interactive content of lesson 2 (still an intro page).
