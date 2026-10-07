# Node 22 only, weekly dependency updates and security headers

- **Date:** 2026-10-06
- **Author:** Robin, with Claude Code
- **Pull request:** link once opened

**Why:** three small safeguards found while reviewing the repository.

**What changed:**
- The project now asks for Node.js 22 exactly (it said "22 or later"): Node 24 breaks the build on a computer, and Vercel follows this setting too.
- Dependabot opens a pull request every week when a dependency or a GitHub Action has a new version; small updates come grouped in one pull request.
- Every page sends four security headers: no embedding the site in another site, no guessing file types, fewer details in the address shared with other sites, camera, microphone and location turned off.

**Files:** `package.json`, `package-lock.json`, `.github/dependabot.yml`, `apps/web/next.config.ts`

**Checked:** lint, typecheck and build pass on Node 22; the four headers are present on the built site.

**Next:** check that the Vercel preview builds with Node 22.
