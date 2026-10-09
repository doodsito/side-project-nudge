# Save lesson progress and unlock the next step

- **Date:** 2026-10-08
- **Author:** Jules, with Codex
- **Pull request:** to add

**Why:** beta members need to see their progress after finishing a lesson and continue from where they stopped.

**What changed:**
- Completing lesson 1 now saves progress to the member's account and updates World 1 to 1/8.
- Lesson 2 unlocks with its own guarded introduction, while later lessons stay locked.

**Files:** `apps/web/src/app/practice/`, `apps/web/src/app/dashboard/courses/`, `apps/web/src/lib/course-progress.ts`
**Checked:** lint, typecheck and tests pass; production build will be confirmed in CI.
**Next:** build the complete interactive content for lesson 2.
