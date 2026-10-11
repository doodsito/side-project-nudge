# A feedback form for beta testers, always one click away on the dashboard

- **Date:** 2026-10-11
- **Author:** Robin, with Claude Code
- **Pull request:** https://github.com/doodsito/side-project-nudge/pull/34

**Why:** beta testers need a clear, always-visible way to tell us about a bug, an idea, or anything else, without leaving the app.

**What changed:**
- A floating button (bottom-right, every `/dashboard/*` page) and a button in the dashboard header both open the same feedback dialog, so it is reachable from anywhere.
- The form asks for a category (bug / idea / other) and a free-text message (2000 characters max), then confirms with the same `Alert` style used elsewhere in the dashboard.
- Feedback is written to a new `feedback_submissions` table (Supabase migration), closed to the website except for a member inserting their own row (`auth.uid() = member_id`). No email notification yet: Robin reads it in the Supabase Table Editor.

**Files:** `apps/web/src/components/dashboard/feedback-widget.tsx`, `apps/web/src/components/dashboard/dashboard-template.tsx`, `apps/web/src/app/dashboard/actions.ts`, `apps/web/src/lib/dictionaries/fr.ts`, `apps/web/src/lib/dictionaries/us.ts`, `apps/web/src/integrations/supabase/types.ts`, `supabase/migrations/20261011182018_create_feedback_submissions.sql`

**Checked:** lint, typecheck and build pass. Could not exercise the signed-in dashboard in this environment (no `.env`, never committed); please check it on the Vercel preview with a real beta account.

**Next:** a superadmin dashboard page to read feedback inside the app instead of the Supabase Table Editor (noted by Robin, not in this pull request).
