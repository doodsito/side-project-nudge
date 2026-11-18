# Refine the landing preview type scale

- **Date:** 2026-11-17
- **Author:** Emma, with Codex
- **Pull request:** pending

**Why:** Keep the hero as the clearest headline and make section titles, FAQ text and supporting copy easier to scan.

**What changed:**

- Set shared type sizes for the hero, section headings, subheadings, body copy and testimonials across laptop and mobile.
- Applied the same hierarchy to the FAQ and prevented its heading from taking over the page.
- Keep the phone sequence from starting when reduced motion is enabled.

**Files:** `apps/web/src/components/marketing/landing-preview.module.css`, `apps/web/src/components/marketing/landing-preview.tsx`

**Checked:** lint, typecheck and build pass. Build displays an existing Next.js security upgrade reminder.

**Next:** Open the pull request and review its Vercel preview before merge.
