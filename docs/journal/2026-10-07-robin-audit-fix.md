# Update source-map-js to fix a security warning

- **Date:** 2026-10-07
- **Author:** Robin, with Claude Code
- **Pull request:** link once opened

**Why:** `npm audit` flagged a high-severity flaw in `source-map-js`, a package Tailwind uses while building the site.

**What changed:**
- `source-map-js` goes from 1.2.1 to 1.2.2 in `package-lock.json`; nothing else changes.
- The site's own packages now have no known flaw. Five warnings remain in the lint tools (`eslint-config-next`), which never reach visitors; their only fix today is an old version, so Dependabot will bring the real one.

**Files:** `package-lock.json`

**Checked:** lint passes; typecheck and build by the CI.

**Next:** Nothing.
