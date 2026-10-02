# Nudge

Nudge is a gamified investing-education app for young working adults who know
they should invest but have never started. You practise real investing
decisions with virtual money, then get feedback on your reasoning. It is
education, never financial advice: Nudge does not recommend securities, take
commissions or touch real money.

This repository holds everything: the website (the landing page today, the web
app and dashboards later), the database schema and the team docs. A native
mobile app will join it later. The website lives at
https://nudge.doodsito.com.

## Where things are

| Folder | What it holds |
|---|---|
| `apps/web/` | The website: landing page now, web app and dashboards later |
| `packages/` | Code shared between apps. Empty until the mobile app starts |
| `supabase/` | Database schema and migrations: see [supabase/README.md](supabase/README.md) |
| `docs/` | How we work: workflow, UI rules, roadmap and journal |
| `.github/` | Automatic checks, pull request template and code owners |

## Run it on your computer

You need Node.js 22 or later and npm. Run every command from the repository
root.

```sh
npm install
npm run dev
```

The site opens at http://localhost:3000. To try the waitlist form, copy
`apps/web/.env.example` to `apps/web/.env.local` and fill in the two values
(ask Robin: they are public, not secret). Without them the site works and only
the form shows an error.

| Command | What it does |
|---|---|
| `npm run dev` | Starts the site with live reload at http://localhost:3000 |
| `npm run build` | Builds the production version |
| `npm start` | Serves that build at http://localhost:3000 |
| `npm run lint` | Checks code style and the UI import rules |
| `npm run typecheck` | Checks TypeScript types |
| `npm run format` | Reformats the code with Prettier |

## Working on Nudge

Read [docs/workflow.md](docs/workflow.md) before your first change. In short:
every change goes through a branch and a pull request, the automatic checks must
pass, and each pull request adds a short entry to the [journal](docs/journal/).

AI agents (Claude Code, Codex) follow [AGENTS.md](AGENTS.md).

## Stack

- [Next.js](https://nextjs.org) 16 (App Router) with React 19
- Tailwind CSS v4, with the design tokens in `apps/web/src/styles.css`
- shadcn/ui components built on Radix
- Supabase for the database, Vercel for hosting

## License

All rights reserved. See [LICENSE](LICENSE).
