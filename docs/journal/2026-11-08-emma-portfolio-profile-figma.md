# Refresh Portfolio and Profile with the Figma design

- **Date:** 2026-11-08
- **Author:** Emma, with Codex
- **Pull request:** <link, once opened>

**Why:** The beta Portfolio and Profile screens needed to match the updated Figma sections.

**What changed:**
- Replaced the fictional portfolio chart with a concise construction screen and wallet illustration.
- Updated Profile layout and icons while keeping account details and actions.
- Kept the Learn, Portfolio and Profile navigation.

**Files:** `apps/web/src/app/dashboard/portfolio/page.tsx`, `apps/web/src/app/dashboard/account/page.tsx`, `apps/web/src/components/dashboard/portfolio-preview.tsx`

**Checked:** lint and typecheck pass; production build passes with a Next.js security upgrade reminder. Portfolio preview checked at 320, 375, 390 and 430px.

**Next:** Review the Vercel preview before merging.
