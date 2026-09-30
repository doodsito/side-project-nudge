# Cookie banner, Google Analytics after consent and a cookie policy page

- **Date:** 2026-09-29
- **Author:** Robin, with Claude Code
- **Pull request:** none, pushed directly to `main` by Robin's decision

**Why:** measure visits with Google Analytics (property `G-G0TDDC3RS5`) while
following French and EU rules: no analytics cookie before the visitor agrees.

**What changed:**
- New dependency `@c15t/nextjs` (free, Apache-2.0): the banner, the settings
  dialog and the script loader. Google Analytics loads only after "Accept all".
- `/cookies` explains each cookie; the footer links to it and to the settings.
- Choice kept 6 months, analytics cookies 13 months at most (CNIL guidance).

**Files:** `apps/web/src/components/organisms/consent-manager.tsx`,
`apps/web/src/app/cookies/`, `apps/web/src/app/layout.tsx`, `AGENTS.md`

**Checked:** lint, typecheck and build pass; 21 browser checks (no request to
Google before consent, reject, accept, withdraw); the rest of the site is
unchanged apart from the footer.

**Next:** legal notice and privacy policy pages.
