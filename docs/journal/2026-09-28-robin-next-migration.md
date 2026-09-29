# Website moved from TanStack Start to Next.js

- **Date:** 2026-09-28
- **Author:** Robin, with Claude Code
- **Pull request:** https://github.com/doodsito/side-project-nudge/pull/2

**Why:** Next.js is what the team and its agents know best, Vercel runs it
natively, and it builds from any folder (TanStack broke on `Rob'1`).

**What changed:**
- Pages live in `apps/web/src/app/`; TanStack, Vite and Nitro are gone.
- Fonts are self-hosted with `next/font`; `/demo` redirects to `/practice`.
- Supabase variables are now `NEXT_PUBLIC_SUPABASE_*`.

**Files:** `apps/web/`, `AGENTS.md`, `README.md`, `docs/`, `.github/CODEOWNERS`

**Checked:** lint, typecheck and build pass; `/` and `/practice` match the old
site pixel for pixel, except the "→" arrow in the waitlist button.

**Next:** Vercel project, then the Supabase waitlist.
