# Refresh the landing page and analytics consent

- **Date:** 2026-11-20
- **Author:** Emma, with Codex
- **Pull request:** <link, once opened>

**Why:** Give visitors a clearer view of the product and make sure analytics follows their consent.
**What changed:** The marketing home uses the updated landing experience. PostHog now follows the analytics consent choice; dashboard preview links avoid unnecessary prefetching.
**Files:** `apps/web/src/app/`, `apps/web/src/components/`, `apps/web/src/lib/`, `docs/brand.md`, `docs/design/design-system.md`
**Checked:** lint and typecheck pass. The build is blocked by the Next.js security advisory covered by PR #100.
**Next:** Rerun the build after PR #100 merges, then review the Vercel preview.
