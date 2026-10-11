# Log in, sign up and an account menu

- **Date:** 2026-10-10
- **Author:** Robin, with Claude Code
- **Pull request:** <link, once opened>

**Why:** being logged in sent people to the dashboard without saying so, and the header mixed "Join the waitlist", "I have a code" and "Dashboard". We follow the usual pattern instead, and stop saying "beta".

**What changed:**
- Header: "Log in" and "Sign up" when logged out; "Open Nudge" and an account menu (Account, Log out) when logged in.
- `/beta` becomes `/signup` (invitation code, then account, with "No code yet? Join the waitlist"), `/login` and `/forgot-password`. Old `/beta` links redirect.
- Opening `/login` or `/signup` while logged in now says so, with "Open Nudge" and "Log out", instead of a silent redirect.
- "Access code" is now "invitation code"; "Sign in/out" is now "Log in/out". New shadcn component: dropdown menu.

**Files:** `apps/web/src/app/(auth)/`, `apps/web/src/components/layout/navbar.tsx`, `apps/web/next.config.ts`, auth redirects in `lib/`, `proxy.ts`, `auth/callback`

**Checked:** lint, typecheck and build pass; 22 browser checks against a fake Supabase (redirects, wrong and good codes, log in, menu, log out, mobile).

**Next:** FR/US tracks. No Supabase setting changes: emails still go through `/auth/callback`.
