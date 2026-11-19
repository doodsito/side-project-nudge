# Restart beta learners at World 0

- **Date:** 2026-11-18
- **Author:** Emma, with Codex
- **Pull request:** https://github.com/doodsito/side-project-nudge/pull/101

**Why:** Reset cleared lesson progress but sent learners past onboarding.

**What changed:** After clearing saved and local progress, send learners to World 0 onboarding. Keep the existing tab preloading.

**Files:** `apps/web/src/components/dashboard/reset-progress-section.tsx`, `apps/web/src/components/dashboard/dashboard-tabs.tsx`, `apps/web/src/components/dashboard/dashboard-template.tsx`

**Checked:** lint, typecheck and build pass; Next.js displayed its security reminder.

**Next:** Review the Vercel preview before merge.
