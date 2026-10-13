# Bug hunt follow-up: guessing codes, a page rebuilt on load, unused files

- **Date:** 2026-10-13
- **Author:** Robin, with Claude Code
- **Pull request:** <link, once opened>

**Why:** the rest of the bug hunt from #39: findings that needed a database change or a closer look.

**What changed:**
- Access codes can no longer be guessed by trying them in a row: after 20 wrong codes in a minute, every code check is refused for that minute ("Too many attempts"). The limit is for the whole site; existing members are never blocked. A code redeemed twice at the same moment by one account now counts once.
- French visitors on a page outside `/fr` (dashboard, lessons, sign-in) no longer have the whole page thrown away and rebuilt just after it loads: the cookie banner now changes language without restarting.
- Five unused practice components (the old case) are deleted.

**Files:** `supabase/migrations/20261013224134_limit_access_code_attempts.sql`, `supabase/README.md`, `apps/web/src/app/(auth)/actions.ts`, `apps/web/src/components/layout/consent-manager.tsx`, `apps/web/src/components/practice/`

**Checked:** lint, typecheck, build and the 23 unit tests pass; the migration passed 8 scenarios on a local Postgres 17; banner language and "no rebuild" checked in headless Chrome, before and after.

**Next:** Robin applies the migration (`npx supabase db push`) after merging.
