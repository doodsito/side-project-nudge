# End-of-beta survey, available once World 1 is finished

- **Date:** 2026-11-03
- **Author:** Robin, with Claude Code
- **Pull request:** https://github.com/doodsito/side-project-nudge/pull/75

**Why:** we need one complete, quick round of feedback from testers who reached the end of the beta.

**What changed:**

- A new `/beta-survey` page asks 8 questions, one per screen, like a lesson; the last one accepts text or a voice message.
- A button appears on the dashboard and on the lesson 8 finale only once all 8 lessons are done, and disappears after answering.
- Answers go to a new `beta_survey_responses` table, one row per member. The privacy policy now mentions the survey.

**Files:** `supabase/migrations/20261103233000_create_beta_survey_responses.sql`, `apps/web/src/app/beta-survey/`, `apps/web/src/components/dashboard/beta-survey-flow.tsx`, `apps/web/src/lib/beta-survey.ts`

**Checked:** lint, typecheck, build and 80 tests pass. Full flow walked in Chromium on mobile and desktop with a temporary local page and no account. Real sign-in, sending and voice upload still to test on the Vercel preview once both migrations are applied.
