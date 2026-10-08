# Turn the course list into a journey of worlds
- **Date:** 2026-10-08
- **Author:** Jules, with Codex
- **Pull request:** To add once opened
**Why:** beta members need to understand the complete learning journey before starting Alex's first practice case.
**What changed:**
- Courses now shows nine worlds, with the first open and the later worlds visibly locked.
- World 1 has an eight-lesson path, a final unlock and a working link to the existing Alex case.
**Files:** `apps/web/src/app/dashboard/courses/`, `apps/web/src/components/organisms/`, `apps/web/src/lib/course-worlds.ts`
**Checked:** lint and typecheck pass; desktop and mobile previews checked. Production build is checked before the pull request.
**Next:** build the first lesson and save real learner progress.
