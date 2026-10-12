# Lesson 1 for complete beginners, with a skip quiz

- **Date:** 2026-10-12
- **Author:** Harish, with Claude Code
- **Pull request:** <link, once opened>

**Why:** testers found the lessons too advanced. Task 06 (Notion) asks for one idea, a new-situation question, retries and an optional deeper read.

**What changed:**
- Plain words: "need / want" instead of "essential / flexible", "money you might save" instead of "saving capacity".
- Wrong answers show a hint and "Try again"; Next appears only once the answer is right.
- New-situation question: Sam (summer job $600, spent $475, $25 phone bill → $100 free) replaces the €65 transport pass.
- "I know this" on the first screen opens a 3-question check: 3/3 marks the lesson done, otherwise a refresher starts.
- Dollars on the US track, euros otherwise; an optional "Why we say might" card on the last screen. Copy stays in English for both tracks, as before.

**Files:** `apps/web/src/lib/first-paycheque-lesson.ts`, `apps/web/src/components/lessons/first-paycheque-lesson.tsx`, `apps/web/src/app/practice/`, `apps/web/tests/first-paycheque-lesson.test.mjs`

**Checked:** lint, typecheck, build and 20 unit tests pass; every path clicked through on a phone-size window, US and France tracks (saving progress needs Supabase, untested locally).

**Next:** Jules checks the numbers; the French team writes the French version.
