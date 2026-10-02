# An alternative homepage at /v2, built to convert

- **Date:** 2026-10-01
- **Author:** Robin, with Claude Code
- **Pull request:** <link, once opened>

**Why:** compare the current homepage with a classic landing page (problem, steps, benefits, comparison, FAQ) before choosing one.

**What changed:**
- New page `/v2`, hidden from search engines: hero, facts, problem, before and after, 3 steps, 4 benefits, comparison table, commitments, FAQ, then try a decision or join early access.
- No invented social proof: real facts and commitments instead. English only for now.
- Navbar, template and "How it works" accept optional props; other pages look the same.

**Files:** `apps/web/src/app/v2/`, `apps/web/src/lib/landing-v2-copy.ts`, 7 new organisms in `components/organisms/`

**Checked:** lint passes; screenshots at 1440 and 390 px, no console error, no horizontal scroll. Typecheck and build fail only on the existing `main` error in `nudge-next-copy.ts`.

**Next:** fix `main`, then choose a homepage; French copy if `/v2` is kept.
