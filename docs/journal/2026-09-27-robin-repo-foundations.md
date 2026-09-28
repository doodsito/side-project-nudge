# Repository foundations: one repo, Lovable removed, team rules

- **Date:** 2026-09-27
- **Author:** Robin, with Claude Code
- **Pull request:** none, pushed to `main` before branch protection was switched on

**Why:** turn the Lovable landing page and Robin's Ante prototype into one clean
repository the whole team can work in, with Claude Code or Codex.

**What changed:**
- The Lovable landing page is the base of the site, now in `apps/web/` inside an
  npm workspaces monorepo. The Ante prototype was removed.
- Lovable tooling is gone: the build targets Vercel, the logo lives in the repo
  and canonical links point to nudge.doodsito.com.
- The code is formatted with Prettier, and lint, typecheck and build pass.
- CI checks, code owners, a pull request template and ESLint rules for atomic
  design.
- README, AGENTS.md, CLAUDE.md, the docs folder and this journal. The MIT license
  was replaced with "All rights reserved".

**Files:** most of the repository; see the commits from "Import the Lovable
landing page export as-is" onwards.

**Checked:** lint (0 errors), typecheck and build pass; a Vercel build was
simulated; screenshots of `/` and `/practice` match nudge-invest.lovable.app
pixel for pixel, apart from Lovable's "Edit with Lovable" badge.

**Next:** new Supabase project and waitlist form (email and profile), then the
Vercel deployment on nudge.doodsito.com.
