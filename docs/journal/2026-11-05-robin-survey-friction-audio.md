# Voice answers on the survey's second-to-last question

- **Date:** 2026-11-05
- **Author:** Robin, with Claude Code
- **Pull request:** to be added once opened

**Why:** testers could already answer the last survey question by voice, but not "the most frustrating moment", where speaking is often easier.

**What changed:**
- The second-to-last question now accepts text or a voice message, exactly like the last one. Both recordings are sent with the survey at the end.
- The database has a new `friction_audio_path` column, with the same "text or audio" rule. The recordings go to the existing private bucket.
- `supabase/README.md` explains where to find these recordings and now includes survey recordings in the monthly 12-month clean-up.

**Files:** `supabase/migrations/20261105120000_add_beta_survey_friction_audio.sql`, `apps/web/src/components/dashboard/beta-survey-flow.tsx`, `apps/web/src/lib/beta-survey.ts`, `apps/web/src/app/beta-survey/actions.ts`, `apps/web/src/integrations/supabase/types.ts`, `apps/web/tests/beta-survey.test.mjs`, `supabase/README.md`

**Checked:** lint, typecheck and build pass; survey tests pass. Recorder walked in Chromium on mobile with a simulated microphone and a temporary local page. Real sign-in, sending and upload still to test once the migration is applied. Apply the migration before merging.
