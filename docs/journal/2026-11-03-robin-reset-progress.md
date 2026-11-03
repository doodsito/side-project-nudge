# A button to restart the courses from the beginning

- **Date:** 2026-11-03
- **Author:** Robin, with Claude Code
- **Pull request:** to be added once opened

**Why:** testers and the team need to replay the courses from the start without creating a new account.

**What changed:**
- The Account page has a new "Reset my progress" section, with a confirmation that shows how many completed lessons will be lost.
- Resetting erases completed lessons, the World 0 skip and the World 1 discovery, plus the Learn state stored in this browser, then returns to the dashboard.
- The track, cookie choice, invitation code, email and sent feedback stay the same. No database change.

**Files:** `apps/web/src/components/dashboard/reset-progress-section.tsx`, `apps/web/src/app/dashboard/actions.ts`, `apps/web/src/app/dashboard/account/page.tsx`, `apps/web/src/lib/course-progress.ts`, `apps/web/src/lib/learn-map-motion.ts`, `apps/web/src/lib/dictionaries/fr.ts`, `apps/web/src/lib/dictionaries/us.ts`, `apps/web/tests/course-progress.test.mjs`

**Checked:** see the pull request.

**Next:** voice feedback, in its own pull request.
