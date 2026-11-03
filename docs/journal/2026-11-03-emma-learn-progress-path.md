# Fix the Learn map progress path

- **Date:** 2026-11-03
- **Author:** Emma, with Codex
- **Pull request:** https://github.com/doodsito/side-project-nudge/pull/69

**Why:** The teal progress overlay could appear beside future lessons instead of stopping at the learner’s actual progress.

**What changed:**
- Draw the teal route only through consecutive completed lessons using the same geometry as the lavender path.
- Keep World 0 lavender when it was skipped and preserve the existing map design and interactions.

**Files:** `apps/web/src/components/dashboard/world-one-path.tsx`, `apps/web/src/styles.css`
**Checked:** lint, typecheck, six saved-progress states, and mobile previews on port 3002.
**Next:** Nothing.
