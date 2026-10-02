# Bring back the landing page with the waitlist on the homepage

- **Date:** 2026-10-02
- **Author:** Robin, with Claude Code
- **Pull request:** <link, once opened>

**Why:** since #10 the waitlist form was shown nowhere, and the "Join early access" links pointed to sections that no longer existed. Robin chose to put the previous landing page back on `/`.

**What changed:**
- `/` shows the landing page again: hero, mini challenge, how it works, FAQ, early access form (saved to Supabase).
- Nudge Next stays available at `/nudge-next`.

**Files:** `apps/web/src/app/page.tsx`, `docs/ui.md`

**Checked:** lint and typecheck pass locally; build by the CI; Robin tests the waitlist form on the Vercel preview.

**Next:** remove the components nothing uses once the fixing phase is over.
