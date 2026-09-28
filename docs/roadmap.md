# Roadmap

What the team is building, in order. Robin keeps this list up to date; propose
changes through a pull request.

## Now: foundations

- [x] One repository on GitHub for the website, the database and the docs
- [x] Lovable code cleaned up; checks, code owners and team docs in place
- [ ] Waitlist on a new Supabase project, with email and profile both required
- [ ] Website live on nudge.doodsito.com through Vercel, with a preview for
      every pull request

## Next

- [ ] **Priority:** split the landing page and the practice flow into atomic
      design levels, and restyle `components/ui/` with our tokens, without
      changing how the pages look
- [ ] Remove AI-writing tics from the landing copy (em dashes, inconsistencies)
- [ ] Custom 404 page
- [ ] Legal pages: legal notice, privacy policy, cookie policy with a consent
      banner
- [ ] Google Analytics with a new GA4 property, behind the consent banner
- [ ] Logo options for the team to choose from

## Later

- [ ] Web app: onboarding, profile, learning paths, virtual portfolio
- [ ] Superadmin dashboard
- [ ] Product brief for agents (`docs/product.md`)
- [ ] Mobile app in `apps/mobile/`, sharing tokens, types and the Supabase
      client through `packages/`
- [ ] Sign in with Apple: when the iOS app offers Google or another social
      login, the App Store requires an equivalent privacy-friendly option
