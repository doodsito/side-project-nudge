# Refresh the Portfolio and Profile screens
- **Date:** 2026-11-08
- **Author:** Emma, with Codex
- **Pull request:** https://github.com/doodsito/side-project-nudge/pull/82

**Why:** The beta Portfolio and Profile should match their current Figma screens.

**What changed:**
- Added the virtual balance, simulated chart, allocation and Learn action.
- Refined Profile styling while preserving account data and actions.
- Kept French and US copy in sync.

**Files:** `apps/web/src/app/dashboard/portfolio/page.tsx`, `apps/web/src/app/dashboard/account/page.tsx`, `apps/web/src/components/dashboard/portfolio-preview.tsx`
**Checked:** lint, typecheck and build pass. Portfolio preview opens on mobile; Profile needs local Supabase settings to render.
**Next:** Review Profile with local Supabase settings.
