# Add the eight Nudge worlds to Home

- **Date:** 2026-11-11
- **Author:** Emma, with Codex
- **Pull request:** https://github.com/doodsito/side-project-nudge/pull/91

**Why:** Bring the preview branch up to date and make the beta’s eight worlds easier to explore, while keeping the current learning progress easy to resume.

**What changed:** Home/Accueil now shows the eight illustrated world cards. Learn/Apprendre keeps the current path and previews later worlds below it. Returning members land on their path; new accounts still start at lesson 0. The mobile header is removed across beta sections.

**Files:** `apps/web/src/app/dashboard/`, `apps/web/src/components/dashboard/`, `apps/web/src/lib/dictionaries/`

**Checked:** format, lint and typecheck pass. Local production build stops when Turbopack starts a worker; GitHub checks will verify the pushed commit.
**Next:** review the updated preview after its deployment completes.
