# Fix landing page server rendering

- **Date:** 2026-11-17
- **Author:** Emma, with Codex
- **Pull request:** <link, once opened>

**Why:** The live homepage returned HTTP 500 because a client component received the full dictionary, including functions.

**What changed:**
- Pass only the landing copy needed by the client component.
- Keep French and US text, preview, and beta CTA unchanged.

**Files:** `apps/web/src/app/[track]/page.tsx`, `apps/web/src/app/dev/landing-preview/page.tsx`, `apps/web/src/components/marketing/landing-preview.tsx`

**Checked:** lint, typecheck and build pass; local `/fr`, `/us`, and `/dev/landing-preview` return 200. Next.js displayed its existing security reminder.

**Next:** Merge PR and check the production URL.
