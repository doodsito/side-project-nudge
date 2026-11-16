# PostHog now measures visits, with session replay

- **Date:** 2026-11-15
- **Author:** Robin, with Claude Code
- **Pull request:** https://github.com/doodsito/side-project-nudge/pull/93

**Why:** we want to see how visitors move through the site and where they get stuck, beyond the visit counts Google Analytics gives us.

**What changed:**

- PostHog loads only after a visitor clicks "Accept all" (or turns on analytics), like Google Analytics. Every existing `track()` event now also reaches PostHog.
- Session replay is on; anything typed in a field is hidden before it is sent.
- The cookie banner, `/cookies` and `/privacy-policy` (French and English) now name PostHog.
- The token and host come from two Vercel environment variables, already set.

**Files:** `apps/web/src/components/layout/consent-manager.tsx`, `apps/web/src/lib/analytics-env.d.ts`, `apps/web/src/lib/analytics.ts`, `apps/web/src/app/cookies/page.tsx`, `apps/web/src/app/privacy-policy/page.tsx`, `apps/web/.env.example`

**Checked:** lint, typecheck and build pass; on the preview, nothing goes to PostHog before consent.

**Next:** turn on "Record user sessions" in PostHog's project settings if it is off.
