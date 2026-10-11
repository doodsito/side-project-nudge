# Components sorted by feature, the shadcn way

- **Date:** 2026-10-10
- **Author:** Robin, with Claude Code
- **Pull request:** <link, once opened>

**Why:** we drop atomic design and follow shadcn/ui and its recommendations, without changing the look.

**What changed:**
- `atoms/`, `molecules/`, `organisms/` and `templates/` are gone. Our components now sit in one folder per feature: `layout/`, `brand/`, `shared/`, `marketing/`, `auth/`, `dashboard/`, `lessons/`, `practice/`, `nudge-next/`. `ui/` keeps the shadcn components.
- Files were moved, not rewritten: nothing changes on screen.
- The ESLint rules that enforced the atomic levels are removed; `docs/ui.md` and `AGENTS.md` explain the new folders and the shadcn rules.

**Files:** `apps/web/src/components/**`, `apps/web/eslint.config.js`, `docs/ui.md`, `AGENTS.md`

**Checked:** lint, typecheck, build and the 14 unit tests pass; every page answers as before (200, 404 on `/nope`, `/dashboard` redirects).

**Next:** header and sign-in pages (`/login`, `/signup`). Open branches that add files to the old folders need to move them.
