# Repository cleanup: unused components and dependencies removed

- **Date:** 2026-09-27
- **Author:** Robin, with Claude Code
- **Pull request:** https://github.com/doodsito/side-project-nudge/pull/1

**Why:** keep only what the site uses, so the repository is easier to read for
people and agents, installs faster and has fewer packages to keep safe.

**What changed:**
- Removed the 43 shadcn components the site never used (it uses accordion,
  button and input) and the `use-mobile` hook; any of them can be added back
  with `npx shadcn@latest add <name>`.
- Removed the 36 dependencies only those components needed (106 packages with
  their own dependencies).
- Added a README to `components/ui/` and to each atomic design folder, so the
  structure is visible before the first components land there.

**Files:** `apps/web/src/components/`, `apps/web/package.json`,
`package-lock.json`, `AGENTS.md`, `docs/ui.md`

**Checked:** lint, typecheck and build pass; `/` and `/practice` render
identically before and after.

**Next:** Supabase project and waitlist form.
