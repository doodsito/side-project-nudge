# Fix the build on main so the site deploys again

- **Date:** 2026-10-02
- **Author:** Robin, with Claude Code
- **Pull request:** https://github.com/nudge-code/side-project-nudge/pull/11

**Why:** since #8, `main` no longer compiled: #8 renamed a /practice choice that the homepage (Nudge Next, #10) reused. Vercel kept serving #10, so the legal pages and #8 never went live.

**What changed:**
- The homepage case keeps its own three choices and explanations instead of borrowing the /practice ones. What visitors see is unchanged.

**Files:** `apps/web/src/lib/nudge-next-copy.ts`, `apps/web/src/components/molecules/nudge-next-chart.tsx`, `apps/web/src/components/organisms/nudge-next-demo.tsx`

**Checked:** lint and typecheck pass locally; build checked by the CI and the Vercel preview.

**Next:** choose the homepage; protect `main` so two green pull requests cannot break it together.
