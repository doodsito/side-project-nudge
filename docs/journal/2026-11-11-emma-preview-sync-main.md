# Add the eight Nudge worlds to Home

- **Date:** 2026-11-11
- **Author:** Emma, with Codex
- **Pull request:** https://github.com/doodsito/side-project-nudge/pull/91

**Why:** Bring the preview branch up to date and make the beta’s eight worlds easier to explore, while keeping the current learning progress easy to resume.

**What changed:** Home/Accueil shows eight world cards; Learn/Apprendre keeps the current path and previews later worlds. Returning members land on their path; new accounts still start at lesson 0. The beta header stays hidden on mobile; Home cards are wider with white backgrounds and unchanged illustrations. Worlds 5 and 7 use supplied Figma SVGs; the portfolio art shows only the wallet. Removed the redundant virtual-portfolio teaser from the path.

**Files:** `apps/web/src/app/dashboard/`, `apps/web/src/components/dashboard/`, `apps/web/src/lib/dictionaries/`, `apps/web/public/brand/learn-map/worlds/world-05-wallet.svg`, `apps/web/public/brand/learn-map/worlds/world-07-purchase.svg`

**Checked:** format, lint and typecheck pass. Local production build stops when Turbopack starts a worker; GitHub checks will verify the pushed commit.
**Next:** review the updated preview after its deployment completes.
