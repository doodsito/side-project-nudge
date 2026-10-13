# Replace the Nudge logos with the Bascule

- **Date:** 2026-10-13
- **Author:** Emma, with Codex

**Why:** use the approved violet Bascule on a teal background across the website and beta.

**What changed:** one shared vector mark, matching PNG assets and favicon; existing logo components now display it, including the dashboard and lessons.

**Files:** `apps/web/public/brand/`, `apps/web/public/favicon.png`, `apps/web/src/components/brand/`.

**Checked:** local lint, typecheck and build pass; public pages checked on desktop and mobile. Local sign-in cannot be tested because Supabase configuration is missing. Routes, authentication and access rules are unchanged.

**Next:** verify the deployed beta with a member account.
