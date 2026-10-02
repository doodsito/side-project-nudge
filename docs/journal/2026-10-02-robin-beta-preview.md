# Previous homepage back, and a private beta with sign-in

- **Date:** 2026-10-02
- **Author:** Robin, with Claude Code
- **Pull request:** branch `robin/beta-preview`, link once opened

**Why:** `main` stopped building after #8, and the team needs a first user journey to try: "Get started", an access code, sign-in, then a dashboard.

**What changed:**
- `/` shows the previous landing page again (with the waitlist); Emma's version stays at `/nudge-next`, which builds again.
- "Get started" opens `/get-started`: enter the beta code, then sign in with Google or an email link (no password). New `access_codes` and `profiles` tables decide who gets in.
- `/dashboard` has three tabs: Courses (the practice case), Portfolio (coming soon) and Account (details, sign out, how to delete).
- Privacy, cookie and terms pages describe the accounts. New dependency `@supabase/ssr`, Supabase's official package for sessions in Next.js.

**Files:** `apps/web/src/app/`, `apps/web/src/lib/auth.ts`, `apps/web/src/integrations/supabase/`, `supabase/migrations/`

**Checked:** lint, typecheck and build pass; 24 database tests; 52 browser checks of the sign-in journey against a stand-in for Supabase.

**Next:** Robin applies the migration, adds the code, sets up Google sign-in and the allowed addresses in Supabase.
