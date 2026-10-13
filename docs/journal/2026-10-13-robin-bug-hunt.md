# Bug hunt: clearer password meter, account icon and exits

- **Date:** 2026-10-13
- **Author:** Robin, with Claude Code
- **Pull request:** <link, once opened>

**Why:** small bugs and confusing details found while testing the site.

**What changed:**
- The password meter now reads "Mot de passe faible / moyen / fort" ("Weak / Fair / Strong password") instead of "Solidité : Solide".
- The account menu in the navbar is now a round profile icon, so it no longer looks like a button.
- Visitors without an account who leave or finish lesson 1 go home instead of to the log-in page.
- Progress bars in the dashboard are announced to screen readers; odd `?error=` values in auth URLs are ignored.

**Files:** `components/auth/password-strength.tsx`, `components/layout/navbar.tsx`, `lib/dictionaries/`, `components/practice/practice-header.tsx`, `components/lessons/first-paycheque-lesson.tsx`, `components/dashboard/`, `app/(auth)/shared.tsx`

**Checked:** lint, typecheck and build pass. Please check the sign-up form and the navbar (signed in) on the Vercel preview.

**Next:** Nothing
