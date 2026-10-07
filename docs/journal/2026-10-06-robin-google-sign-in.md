# Sign in with Google on the beta

- **Date:** 2026-10-06
- **Author:** Robin, with Claude Code
- **Pull request:** link once opened

**Why:** testers can join the beta with their Google account instead of creating a password.

**What changed:**
- "Continue with Google" appears on `/beta` when you create your account (after the access code) and when you sign in. A Google account without an access code is still refused.
- The button follows Google's style: neutral, with Google's "G" logo (`public/brand/google-g.svg`).
- Google Cloud and Supabase settings are written down in `supabase/README.md`.

**Files:** `apps/web/src/lib/auth-rules.ts`, `apps/web/src/components/molecules/google-sign-in-button.tsx`, `apps/web/public/brand/`, `supabase/README.md`

**Checked:** lint, typecheck and build pass; browser checks against a stand-in for Supabase; Robin signs in with Google on the preview.

**Next:** a custom domain for Supabase before the public launch, so Google shows the Nudge address.
