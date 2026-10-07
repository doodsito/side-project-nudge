# Bring back the landing page with the waitlist on the homepage

- **Date:** 2026-10-02
- **Author:** Robin, with Claude Code
- **Pull request:** https://github.com/nudge-code/side-project-nudge/pull/12

**Why:** since #10 the waitlist form was shown nowhere, and the "Join early access" links pointed to sections that no longer existed. Robin chose to put the previous landing page back on `/`.

**What changed:**
- `/` shows the landing page again: hero, mini challenge, how it works, FAQ, early access form (saved to Supabase).
- Nudge Next stays available at `/nudge-next`.
- The waitlist form works again in the browser: it read the Supabase address in a way Next.js does not fill in, so every signup failed since #4.

**Files:** `apps/web/src/app/page.tsx`, `apps/web/src/integrations/supabase/client.ts`, `apps/web/src/integrations/supabase/env.d.ts`, `docs/ui.md`

**Checked:** lint and typecheck pass locally; build by the CI; Robin tests the waitlist form on the Vercel preview.

**Next:** remove the components nothing uses once the fixing phase is over.
