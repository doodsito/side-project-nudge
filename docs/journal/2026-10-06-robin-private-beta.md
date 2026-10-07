# Previous homepage back, and a private beta with sign-in

- **Date:** 2026-10-02
- **Author:** Robin, with Claude Code
- **Pull request:** branch `robin/beta-preview`, link once opened

**Why:** `main` stopped building after #8, and the team needs a first user journey to try: "Get started", an access code, sign-in, then a dashboard.

**What changed:**
- `/` shows the previous landing page again (with the waitlist); Emma's version stays at `/nudge-next`, which builds again.
- "Get started" opens `/get-started`: enter the beta code, then create an account with an email and a password (confirmed by email; "Forgot your password?" included). Google sign-in is ready but hidden until it is set up. New `access_codes` and `profiles` tables decide who gets in.
- `/dashboard` has three tabs: Courses (the practice case), Portfolio (coming soon) and Account (details, sign out, how to delete).
- Privacy, cookie and terms pages describe the accounts. New dependency `@supabase/ssr`, Supabase's official package for sessions in Next.js.

**Files:** `apps/web/src/app/`, `apps/web/src/lib/auth.ts`, `apps/web/src/integrations/supabase/`, `supabase/migrations/`

**Checked:** lint, typecheck and build pass; 24 database tests; 48 browser checks of the password journey (sign-up, confirmation, wrong password, reset) against a stand-in for Supabase.

**Next:** Robin applies the migration, adds the code and sets the email and address settings in Supabase; Google sign-in, step by step.
