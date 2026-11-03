# Close a database function nobody needs to call

- **Date:** 2026-11-03
- **Author:** Robin, with Claude Code
- **Pull request:** to be added once opened

**Why:** the Supabase security advisor warns that `rls_auto_enable()` is open to everyone. Postgres already refuses direct calls, so this was not an active risk, but closing it removes the warning.

**What changed:**
- A migration removes the right to run this function from the public roles.
- The automatic trigger that uses it keeps turning on row level security for new tables.

**Files:** `supabase/migrations/20261103233000_revoke_rls_auto_enable_execute.sql`

**Checked:** see the pull request.
