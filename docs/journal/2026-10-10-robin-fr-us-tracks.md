# Two versions of Nudge: France and the United States

- **Date:** 2026-10-10
- **Author:** Robin, with Claude Code
- **Pull request:** https://github.com/doodsito/side-project-nudge/pull/33

**Why:** a French visitor should learn with French money (euros, PEA, assurance vie) and an American one with US money. France comes first.

**What changed:**
- The home page lives at `/fr` (French, euros) and `/us` (American English, dollars). `/` sends each visitor to the version they chose, or else the one matching their country (France, Belgium, Switzerland, Luxembourg, Monaco: France; others: US; unknown: France).
- On a first visit, a window asks for the version, in the language of the country's track (flags, that track preselected), then the cookie window opens in that language.
- The choice is kept in a `nudge_track` cookie, on the account (`user_metadata.track`, the account wins at log-in), and can be changed in the footer and on the Account page. The sign-in pages (log in, sign up, password reset, their errors) and the dashboard interface are in both languages; the lessons are unchanged.
- Copy lives in `lib/dictionaries/fr.ts` and `us.ts`. Email templates in both languages: `supabase/email-templates.md`. Shared pieces: `TrackOption`, `TrackFlag`, `textLinkClass`, shadcn `Alert`.

**Checked:** lint, typecheck, build and unit tests pass; 30 browser checks for the tracks and 19 for the sign-in pages in French and English (redirects by country and by choice, dialog, cookie window language, footer and Account switches, account track at log-in).

**Next:** Robin pastes the email templates in Supabase. The practice case, the lessons and the legal pages are still in English.
