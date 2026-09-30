# Agent instructions

These rules apply to every AI agent working in this repository: Codex reads this
file directly, Claude Code reads it through `CLAUDE.md`. The people you work
with are often new to code. Explain what you do in plain language, and never
leave them with a broken branch.

## The project

Nudge is a gamified investing-education app for young working adults who know
they should invest but have never started. Users practise investing decisions
with virtual money and get feedback on their reasoning. It is education, never
financial advice. This repository holds the website (`apps/web`), the database
schema (`supabase/`) and the team docs (`docs/`); a mobile app will follow.

## At the start of every session

1. Read this file.
2. Read the 5 most recent entries in `docs/journal/` (newest by file name).
3. Make sure you start from an up-to-date `main` before creating a branch.

## Where things go

| You are adding | Put it in |
|---|---|
| A page (a URL) | `apps/web/src/app/<url>/page.tsx` (Next.js App Router): read `apps/web/src/app/README.md` |
| A component downloaded from the web (shadcn, motion...) | `apps/web/src/components/ui/` |
| One of our own components | `apps/web/src/components/{atoms,molecules,organisms,templates}/`: read `docs/ui.md` |
| A colour, font, radius, shadow or animation | A token in `apps/web/src/styles.css` |
| A React hook | `apps/web/src/hooks/` |
| A helper that is not a component | `apps/web/src/lib/` |
| An analytics or tracking script (Google Analytics, a pixel...) | The `scripts` list in `apps/web/src/components/organisms/consent-manager.tsx`, so it only loads after consent; never a `<script>` tag or `next/script` |
| Supabase access | `apps/web/src/integrations/supabase/` |
| An image or other static file | `apps/web/public/` |
| A database change | `supabase/migrations/` (reserved: ask Robin): read `supabase/README.md` |
| Documentation | `docs/` |
| Code shared by several apps | `packages/`, only once the mobile app exists |

## Commands

Run everything from the repository root.

- `npm install`: install dependencies
- `npm run dev`: local site at http://localhost:3000
- `npm run lint`, `npm run typecheck`, `npm run build`: the three checks
- `npm install <package> -w @nudge/web`: add a dependency to the website (never at the root)

## Git workflow

1. Never commit to `main`. Create a branch named `<first-name>/<topic>`, for
   example `emma/faq-copy`.
2. Commit in small steps, with messages in the imperative: "Add a FAQ answer
   about fees".
3. Before opening a pull request, run `npm run lint`, `npm run typecheck` and
   `npm run build`. All three must pass.
4. Add a journal entry in the same pull request (see "Journal" below).
5. Open the pull request with the template filled in, then point the human to
   the Vercel preview link that appears on it.
6. Merge with "Squash and merge" once the checks are green. Pull requests that
   touch a reserved area wait for Robin's approval.
7. Never force-push, never rewrite pushed history, never delete someone else's
   branch.

## Reserved areas (Robin approves)

`.github/`, `supabase/`, the root `package.json`, `AGENTS.md`, `CLAUDE.md`,
`LICENSE`, `.gitignore`, `.gitattributes`, `.nvmrc`, and the configs in
`apps/web/` (`next.config.ts`, `postcss.config.mjs`, `tsconfig.json`,
`eslint.config.js`, `components.json`, `.prettierrc`, `.prettierignore`). `.github/CODEOWNERS`
enforces this.

Never weaken a check to make it pass: do not disable lint rules, loosen
TypeScript settings or edit the CI. Fix the code, or stop and ask.

## Secrets

- Never create, edit or commit `.env` files. Only `.env.example` files are
  committed, and they hold variable names, never values.
- The website only needs public values: the Supabase URL and publishable key.
  Never put a secret key (`sb_secret_...`, `service_role`), password or token in
  code, docs, commit messages or pull requests.
- If you find a secret anywhere in the repository, stop and tell the human to
  warn Robin.

## Code rules

- Stack: Next.js 16 (App Router) with React. Next.js 16 changed some APIs, so
  read the matching guide in `node_modules/next/dist/docs/` before writing
  Next.js code.
- Components are Server Components by default. Add `"use client";` at the top
  of a file only when it uses state, effects, event handlers or browser APIs.
- TypeScript is strict; do not use `any` to silence an error.
- Styling: Tailwind classes backed by design tokens (`bg-primary`,
  `text-muted-foreground`...). Never hard-code a colour in a component.
- File names are kebab-case (`waitlist-form.tsx`); components are PascalCase
  (`WaitlistForm`).
- Formatting belongs to Prettier: run `npm run format` rather than formatting by
  hand.
- Minimal change: do only what the task asks. No refactors, renames or
  reformatting of unrelated files.
- Reuse before adding: look in `components/ui/` and the atomic folders before
  creating a component, and in `apps/web/package.json` before adding a
  dependency. Justify any new dependency in the pull request.
- `components/ui/` only holds the primitives the site uses. If you need a
  standard one (dialog, tabs, select...), add it with
  `npx shadcn@latest add <name>` inside `apps/web/` instead of writing it by
  hand.

## Product rules

- Nudge teaches. It never gives investment advice, recommends a security or
  promises returns.
- No invented social proof: no fake numbers, testimonials, reviews or logos.
- Site copy is in English and amounts are in euros.
- Use `BRAND` and `SITE_URL` from `apps/web/src/lib/brand.ts` instead of
  writing the name or the address by hand.

## Journal

Every pull request adds one file to `docs/journal/`, named
`YYYY-MM-DD-<first-name>-<topic>.md` and following the template in
`docs/journal/README.md`. Keep it under 15 lines and in plain language. Write it
yourself, then show it to the human.

## When in doubt

Stop and ask the human you work with. If they are unsure too, they ask Robin.
Asking is always better than guessing when the database, secrets, the checks or
the live site are involved.
