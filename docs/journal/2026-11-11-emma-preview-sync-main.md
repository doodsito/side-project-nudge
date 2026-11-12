# Sync preview and remove beta header

- **Date:** 2026-11-11
- **Author:** Emma, with Codex
- **Pull request:** https://github.com/doodsito/side-project-nudge/pull/91

**Why:** `emma/preview` was 70 commits behind `main`. Keep its work while making the beta easier to use on mobile by removing the repeated top header.

**What changed:** Sync the preview branch with current `main` and remove the mobile header from every beta dashboard section. Keep the bottom navigation and account content intact.

**Files:** `apps/web/src/components/dashboard/dashboard-template.tsx`, `apps/web/src/components/layout/beta-colors.css`, `docs/journal/2026-11-11-emma-preview-sync-main.md`

**Checked:** lint and typecheck pass. Local build stops in Turbopack while starting a worker; GitHub checks will verify the pushed commit.
**Next:** review the updated preview after its deployment completes.
