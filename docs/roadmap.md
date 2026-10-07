# Roadmap

What the team is building, in order. Robin keeps this list up to date; propose
changes through a pull request.

## Now: foundations

- [x] One repository on GitHub for the website, the database and the docs
- [x] Lovable code cleaned up; checks, code owners and team docs in place
- [x] Website moved from TanStack Start to Next.js, the team's usual framework
- [x] Waitlist on a new Supabase project, with email and profile both required
- [x] Website live on nudge.doodsito.com through Vercel, with a preview for
      every pull request
- [x] `main` protected: every change goes through a pull request, merged only
      once the checks pass on an up-to-date branch

## Next

- [x] **Priority:** split the landing page and the practice flow into atomic
      design levels, and restyle `components/ui/` with our tokens, without
      changing how the pages look
- [ ] Remove AI-writing tics from the landing copy (em dashes, inconsistencies)
- [x] Custom 404 page
- [x] Cookie policy (`/cookies`) with a consent banner
- [x] Legal pages: legal notice, privacy policy, terms of service, with a footer
      on every page
- [x] `llms.txt`, sitemap and robots.txt for search engines and AI crawlers
- [x] Google Analytics with a new GA4 property, behind the consent banner
- [ ] Logo options for the team to choose from
- [x] Private beta: "I have a code" (/beta) asks for an access code, then an account with
      an email and a password, then a dashboard (Courses, Portfolio, Account)
- [x] Sign in with Google

## Later

- [ ] Web app: onboarding, profile, learning paths, virtual portfolio
- [ ] Superadmin dashboard
- [ ] Product brief for agents (`docs/product.md`)
- [ ] Mobile app in `apps/mobile/`, sharing tokens, types and the Supabase
      client through `packages/`
- [ ] Sign in with Apple: when the iOS app offers Google or another social
      login, the App Store requires an equivalent privacy-friendly option
