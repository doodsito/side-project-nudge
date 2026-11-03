# Show the selected language on the first render
- **Date:** 2026-11-02
- **Author:** Jules, with Codex
- **Pull request:** https://github.com/doodsito/side-project-nudge/pull/66

**Why:** The public practice lesson briefly rendered in French after selecting the United States because its client component used the French default until hydration.

**What changed:** Pass the server-read track into the practice lesson, footer and cookie controls so their initial text matches the visitor's choice. Set the document language from the saved track.

**Files:** `apps/web/src/app/`, `apps/web/src/components/layout/`
**Checked:** 73 tests, lint, typecheck and build pass. Initial HTML for the practice lesson is English with the US cookie and French with the France cookie.
