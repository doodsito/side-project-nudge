# Beta survey, available from the dashboard

- **Date:** 2026-11-03
- **Author:** Robin, with Claude Code
- **Pull request:** https://github.com/doodsito/side-project-nudge/pull/75

**Why:** we need one complete, quick round of feedback from testers, including those who stop before the end.

**What changed:**

- A new `/beta-survey` page asks 8 questions, one per screen, like a lesson; the last one accepts text or a voice message.
- A teal button shows on the dashboard from the first visit and on the lesson 8 finale, and disappears after answering.
- Answers go to a new `beta_survey_responses` table, one row per member, with the number of lessons finished. The privacy policy now mentions the survey.

**Files:** `supabase/migrations/20261103233000_create_beta_survey_responses.sql`, `apps/web/src/app/beta-survey/`, `apps/web/src/components/dashboard/beta-survey-flow.tsx`, `apps/web/src/lib/beta-survey.ts`

**Checked:** lint, typecheck, build and 81 tests pass. Full flow walked in Chromium on mobile and desktop with a temporary local page and no account. Real sign-in, sending and voice upload still to test on the Vercel preview once the migration is applied.
