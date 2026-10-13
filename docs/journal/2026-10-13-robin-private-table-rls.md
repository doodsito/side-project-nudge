# Row level security on the wrong-codes table

- **Date:** 2026-10-13
- **Author:** Robin, with Claude Code
- **Pull request:** <link, once opened>

**Why:** Supabase recommends row level security on every table, even in a private schema, as a second lock.

**What changed:**
- `private.access_code_failures` (the wrong access codes of the last hour, from #42) now has row level security on, with no policy. It was already unreachable from the website; it now stays closed even if the schema were exposed by mistake.
- The access code limit keeps working: its functions run as the table owner, which row level security does not apply to.

**Files:** `supabase/migrations/20261013234852_enable_rls_on_access_code_failures.sql`, `supabase/README.md`

**Checked:** applied to the database with `npx supabase db push`; row level security on, the code check still answers.

**Next:** Nothing
