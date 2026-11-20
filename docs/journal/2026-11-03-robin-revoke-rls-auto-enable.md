# Close a database function nobody needs to call

- **Date:** 2026-11-03
- **Author:** Robin, with Claude Code
- **Pull request:** https://github.com/doodsito/side-project-nudge/pull/73

**Why:** the Supabase security advisor warns that `rls_auto_enable()` is open to everyone. Postgres already refuses direct calls, so this was not an active risk, but closing it removes the warning.

**What changed:**
- A migration removes the right to run this function from the public roles.
- The automatic trigger that uses it keeps turning on row level security for new tables.

**Files:** `supabase/migrations/20261103233000_revoke_rls_auto_enable_execute.sql`

**Checked:** read the function and trigger in production. To check after applying: the warning is gone and new tables still get row level security.
