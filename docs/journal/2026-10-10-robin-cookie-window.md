# A centred cookie window that no longer blocks buttons

- **Date:** 2026-10-10
- **Author:** Robin, with Claude Code
- **Pull request:** <link, once opened>

**Why:** the cookie banner was easy to miss, and its invisible full-width wrapper caught clicks: on a laptop screen (1366x680, 1280x720), "Sign in" on `/beta` could not be pressed before choosing.

**What changed:**
- The cookie choice opens centred over a dimmed page, which stays locked until the visitor accepts or rejects. The title starts with a cookie emoji.
- Only the card itself takes clicks now, so the rest of the page works around it.
- On `/privacy-policy` and `/cookies`, the card stays in its corner and the page stays readable.

**Files:** `apps/web/src/components/organisms/consent-manager.tsx`

**Checked:** lint, typecheck and build pass; a real click on "Sign in" works at 5 screen sizes after the choice; the window is centred and locks the page at each size; policy pages scroll; analytics loads only after "Accept all".

**Next:** header and sign-in pages (`/login`, `/signup`), then FR/US tracks.
