# Keep the whole site in the selected language

- **Date:** 2026-11-02
- **Author:** Jules, with Codex
- **Pull request:** Pending

**Why:** Changing country in the footer changed the browser cookie but left signed-in lessons on the account's previous track.

**What changed:**

- The country switch now saves the same track on the account and in the browser before opening its landing page.
- Legal pages, the design preview and error messages now follow the selected language.

**Files:** `apps/web/src/app/`, `apps/web/src/components/layout/`, `apps/web/src/lib/`

**Checked:** 73 tests, lint, typecheck and build pass; French and US landing pages, lesson 1 and policy pages checked locally. Signed-in switching needs the Vercel preview.
