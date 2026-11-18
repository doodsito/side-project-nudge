# Use the beta landing page as the homepage

- **Date:** 2026-11-17
- **Author:** Emma, with Codex
- **Pull request:** <link, once opened>

**Why:** The preview page had the approved landing design, while the real homepage still showed the old waitlist form.

**What changed:**
- The French and US homepages now use the approved landing page and its beta CTA.
- Headings, screen descriptions and beta feedback now follow the selected language.
- The preview route stays available and uses the same localized component.

**Files:** `apps/web/src/app/[track]/page.tsx`, `apps/web/src/components/marketing/landing-preview.tsx`, `apps/web/src/lib/dictionaries/`

**Checked:** lint, typecheck and build pass; the build showed an existing Next.js security upgrade reminder.

**Next:** Open PR and deploy preview.
