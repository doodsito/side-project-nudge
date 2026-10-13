# One welcome dialog for the version and cookies

- **Date:** 2026-10-13
- **Author:** Robin, with Claude Code
- **Pull request:** https://github.com/doodsito/side-project-nudge/pull/41

**Why:** a first visit showed two pop-ups in a row (version, then cookies), and the version choice was full of jargon (PEA, 401(k)...).

**What changed:**

- One dialog now asks both: pick France or the United States, then "Reject all" or "Accept all" saves both choices. "Customize" opens the cookie settings. Closing it keeps the version and the usual cookie banner asks.
- The two cookie buttons look the same: the CNIL wants refusing to be as easy as accepting.
- Simpler versions: "In French, in euros" and "In English, in dollars".
- Flags look like Apple emojis (rounded, soft shine, shadow), in CSS: no new images or packages.

**Files:** `components/layout/track-dialog.tsx`, `components/shared/track-option.tsx`, `styles.css`, `lib/dictionaries/fr.ts` and `us.ts`

**Checked:** lint, typecheck and build pass; in a local browser (desktop and mobile): accept loads Google Analytics, reject does not, closing shows the banner.

**Next:** Nothing.
