# Landing page and practice flow split into atomic design levels

- **Date:** 2026-09-29
- **Author:** Robin, with Claude Code
- **Pull request:** https://github.com/doodsito/side-project-nudge/pull/5

**Why:** two large files held every section of the site; split into small
components, the pieces can be found, reused and changed one at a time.

**What changed:**
- `components/` now only holds `ui/`, atoms, molecules, organisms and templates;
  `landing/`, `practice/`, `reveal.tsx` and `nudge-logo.tsx` are gone.
- The three copies of the answer card became one `choice-button` atom.
- The practice questions and feedback rules moved to `lib/practice-scenario.ts`.

**Files:** `apps/web/src/components/`, `apps/web/src/app/`, `apps/web/src/lib/`,
`apps/web/src/hooks/`, `AGENTS.md`, `docs/ui.md`

**Checked:** lint, typecheck and build pass; 32 screenshots of `/` and
`/practice` (every step and state, desktop and mobile) match `main` pixel for
pixel, and the compiled CSS is byte-identical.

**Next:** give the `components/ui/` primitives the Nudge look by default.
