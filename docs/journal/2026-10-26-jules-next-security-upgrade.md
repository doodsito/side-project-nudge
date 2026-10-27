# Next.js security upgrade
- **Date:** 2026-10-26
- **Author:** Jules, with Codex
- **Pull request:** Pending
**Why:** The production build reported that Next.js 16.4.0 was affected by a published security advisory.
**What changed:**
- Upgraded Next.js and its ESLint config from 16.4.0 to 16.4.3 in an isolated worktree.
- Added the requested security-upgrade marker and updated the transitive Zod lock entry.
**Files:** `apps/web/package.json`, `apps/web/next.config.ts`, `package-lock.json`
**Checked:** clean install, 45 tests, lint, typecheck, build and npm audit pass; audit reports 0 vulnerabilities.
**Next:** Robin reviews the reserved Next.js configuration before merge.
