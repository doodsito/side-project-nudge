# Fixes from a full test run: lessons, courses page and beta survey

- **Date:** 2026-11-10
- **Author:** Robin, with Claude Code
- **Pull request:** to be linked

**Why:** Robin walked the whole beta as a tester and noted what was unclear or broken.

**What changed:**
- Lessons: after a correct answer, the next screen opens by itself after 1.5 seconds (the button stays to go faster). World 0 loses its "When will Alex need the money?" note, and lesson 1 now states Sam's phone bill in the question itself.
- The "all courses" page has a "Back to Learn" link.
- Beta survey: clearer wording, the "most frustrating moment" question is gone (7 questions), and the thank-you screen now shows. It was skipped because sending the answers reloaded the page, which redirected to the dashboard.
- The thank-you screen has an optional name field, saved in a new `contact_name` column. The privacy policy mentions it.

**Files:** `apps/web/src/hooks/use-auto-continue.ts`, `apps/web/src/components/lessons/`, `apps/web/src/components/dashboard/beta-survey-flow.tsx`, `apps/web/src/app/beta-survey/`, `apps/web/src/lib/dictionaries/`, `supabase/migrations/20261110120000_add_beta_survey_contact_name.sql`

**Checked:** lint, typecheck and build pass; 81 of 82 tests pass (the failing one already fails on `main`). Not opened in a browser yet: walk World 0, lesson 1 and the survey on the Vercel preview. Apply the migration before merging.
