# Make the new experience the homepage

- **Date:** 2026-10-01
- **Author:** Emma, with Codex
- **Pull request:** pending

**Why:** Make the approved Nudge direction the first page visitors see while keeping `/nudge-next` available for public previews.
**What changed:**
- The homepage now renders the interactive Nudge experience with indexable homepage metadata and the folded-N favicon.
- `/nudge-next` remains a separate URL with its existing noindex setting.
**Files:** `apps/web/src/app/page.tsx`, `apps/web/src/styles.css`, `docs/nudge-next-review.md`

**Checked:** lint, typecheck, build and eight tests pass; both routes and mobile width checked locally.

**Next:** Keep future preview-only changes isolated from the homepage before publishing them.
