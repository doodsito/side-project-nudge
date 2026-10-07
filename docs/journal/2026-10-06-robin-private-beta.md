# A private beta with sign-in, next to the waitlist

- **Date:** 2026-10-06
- **Author:** Robin, with Claude Code
- **Pull request:** link once opened

**Why:** the team needs a first user journey to try with testers, while everyone else can still join the waitlist.

**What changed:**
- The header has "Join the waitlist" and "I have a code"; a signed-in member sees "Dashboard" instead. The hero keeps only "Join the waitlist".
- "I have a code" opens `/beta`: the access code, then an account with an email and a password (letters and numbers, with a strength meter), confirmed by email. "Forgot your password?" sends a link; an expired one asks for a new link. New `access_codes` and `profiles` tables decide who gets in; Google sign-in is ready but hidden.
- `/dashboard` has three tabs: Courses, Portfolio (coming soon) and Account. Emails are sent by Resend; Privacy, Cookies and Terms describe the accounts. New dependency `@supabase/ssr`, Supabase's official package for sessions in Next.js.
- Removed 7 components nothing used; the docs ask for Node.js 22.

**Files:** `apps/web/src/app/`, `apps/web/src/components/`, `apps/web/src/lib/auth.ts`, `apps/web/src/integrations/supabase/`, `supabase/`

**Checked:** lint, typecheck and build pass; 24 database tests; 33 browser checks (header, code, strength meter, sign-up, sign-in, new password, expired links) against a stand-in for Supabase.

**Next:** Robin finishes the Resend and Supabase settings and tests with a real address; then Google sign-in.
