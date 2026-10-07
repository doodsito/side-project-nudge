# Make the first case reliable and easier to use on a phone

- **Date:** 2026-09-29
- **Author:** Emma, with Codex
- **Pull request:** https://github.com/nudge-code/side-project-nudge/pull/7

**Why:** Some explanations contradicted profile answers, and the mobile journey delayed practice.
**What changed:**
- Separate the fictional case from the learner, validate answers and explain each choice with a comprehension check.
- Shorten the home page; guide mobile questions, preserve answers on replay and support keyboard and browser navigation.
**Files:** `apps/web/src/`, `apps/web/tests/practice-scenario.test.mjs`
**Checked:** lint, typecheck, build and 243 profile/decision combinations pass; local mobile, landscape and desktop checked.
**Next:** Verify the Vercel preview, then build a second savings case and persistent progress.
