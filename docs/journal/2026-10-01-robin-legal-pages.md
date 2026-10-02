# Legal pages, one footer on every page, and llms.txt

- **Date:** 2026-10-01
- **Author:** Robin, with Claude Code
- **Pull request:** none, pushed directly to `main` (`2c9ab26`); docs in `robin/beta-preview`

**Why:** the site collects emails and uses analytics, so it needs a privacy policy, terms and a legal notice, and visitors must be able to change their cookie choice from every page.

**What changed:**
- New pages `/privacy-policy`, `/terms-of-service`, `/legal-notice`, in English; they and `/cookies` share `LegalTemplate`.
- One footer for every page, added by `app/layout.tsx`: Privacy, Terms, Legal, Cookies (reopens the cookie settings), LLMs. Emma: it replaces the homepage footer, so the French footer and "Direction study" are gone.
- `llms.txt`, `sitemap.xml` and `robots.txt` are generated from `SITE_URL`.

**Files:** `apps/web/src/app/`, `components/organisms/footer.tsx`, `components/templates/legal-template.tsx`

**Checked:** lint passes; typecheck and build were blocked by `main` until `robin/beta-preview`; 79 browser checks there (footer everywhere, no Google request before consent).

**Next:** Robin proofreads the texts and signs the Supabase data processing agreement.
