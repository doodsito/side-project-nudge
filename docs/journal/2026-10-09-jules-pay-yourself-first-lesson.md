# Build the second financial foundation lesson

- **Date:** 2026-10-09 (brought up to date with `main` on 2026-10-12)
- **Author:** Jules, with Codex; ported to the current `main` by Robin, with Claude Code
- **Pull request:** https://github.com/doodsito/side-project-nudge/pull/37

**Why:** members need to practise putting a realistic saving goal before flexible spending.

**What changed:**
- Lesson 2 uses eight short screens continuing Alex's 100 and 65 example, in euros or dollars depending on the member's track.
- Completing it saves 2/8 progress, refreshes the session (as in #36) and opens a guarded introduction to lesson 3.
- Port: Jules's files moved to `components/lessons/` (#31); his own progress fix in `auth.ts` was dropped for the one from #36.

**Files:** `apps/web/src/app/lessons/`, `apps/web/src/components/lessons/`, `apps/web/src/lib/pay-yourself-first-lesson.ts`, `apps/web/src/proxy.ts`

**Checked:** lint, typecheck, build and 23 tests pass. Signed-in flow to check on the Vercel preview.

**Next:** build lesson 3 on choosing a saving amount.
