# Waitlist saved to Supabase, with a required profile

- **Date:** 2026-09-29
- **Author:** Robin, with Claude Code
- **Pull request:** https://github.com/nudge-code/side-project-nudge/pull/4

**Why:** the early access form pointed at the old Lovable database and could
not save anything.

**What changed:**
- New `supabase/` folder: a `waitlist_signups` table closed to the website, and
  a `join_waitlist` function, the only thing the website can call.
- The form asks for a profile (student, young professional, other) and keeps
  the email when it shows an error.

**Files:** `supabase/`, `apps/web/src/components/landing/early-access-form.tsx`,
`apps/web/src/integrations/supabase/`, `AGENTS.md`, `README.md`, `docs/roadmap.md`

**Checked:** lint, typecheck and build pass; signups, duplicates and invalid
input tested against the live database; the list cannot be read with the
public key.

**Next:** custom domain nudge.doodsito.com.
