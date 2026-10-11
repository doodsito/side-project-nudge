# UI rules: one design system, built with shadcn/ui

Everything Nudge shows (the landing page, the web app, the dashboards) uses one
design system: the same tokens and the same components. We follow shadcn/ui and
its recommendations: standard components from shadcn, our brand in the design
tokens. This page explains where UI code goes.

## Folders

| Folder in `apps/web/src/components/` | What goes there |
|---|---|
| `ui/` | shadcn components, added with the CLI and left as downloaded |
| `layout/` | What frames the pages: navbar, footer, page layouts (marketing, legal), skip link, cookie consent |
| `brand/` | The Nudge logo and mark |
| `shared/` | Our small pieces used by several features: eyebrow label, answer card, educational note |
| `marketing/` | The landing page sections and their parts |
| `auth/` | Sign-in and sign-up: forms, buttons, the auth page layout |
| `dashboard/` | The members' area: layout, tabs, course worlds |
| `lessons/` | The lessons |
| `practice/` | The practice case (`/practice`) |
| `nudge-next/` | The `/nudge-next` preview |

A component used by a single feature lives in that feature's folder. When a
second feature needs it, move it to `shared/`. A page in `src/app/` assembles
these components with its content.

`lib/`, `hooks/` and `integrations/` hold no UI and can be imported from
anywhere.

## shadcn first

- Before writing a component, check `components/ui/`, then the shadcn catalogue
  (`npx shadcn@latest search <name>`). Compose shadcn components rather than
  building styled `div`s: `Dialog` for a modal, `DropdownMenu` for a menu,
  `Card` for a card, `Alert` for a callout, `Badge` for a tag, `Separator`
  instead of a border line.
- Add one with `npx shadcn@latest add <name>` inside `apps/web/`; the file lands
  in `components/ui/`. Its look comes from the tokens; if the brand needs more,
  change its variants in that file (as `button.tsx` does for its sizes), never
  each place it is used.
- Use the built-in variants and sizes (`variant="outline"`, `size="lg"`) before
  adding classes. `className` is for layout (spacing, width, position), not for
  colours or typography.
- Spacing with `flex` or `grid` and `gap-*`, not `space-x-*` or `space-y-*`;
  `size-*` when width and height are equal; `cn()` for conditional classes.
- A dialog or sheet always has a title (`DialogTitle`, `SheetTitle`), visually
  hidden with `sr-only` if needed.

## Tokens

The brand lives in `src/styles.css`: changing a token changes every screen.

- **Colours**: use the Tailwind classes backed by tokens, never a colour value
  in a component. The main ones: `bg-background`, `text-foreground`,
  `bg-surface`, `bg-surface-2`, `bg-primary`, `text-primary-foreground`,
  `bg-primary-soft`, `text-muted-foreground`, `border-border`, `bg-ink`,
  `text-ink-foreground`, `text-mint`, `text-market-up`, `text-market-down`.
- **Fonts**: headings use `font-display` (Manrope); body text uses the default
  `font-sans` (Inter).
- **Radii**: `rounded-sm` to `rounded-4xl`, all derived from `--radius`.
- **Shadows**: `shadow-soft`, `shadow-lift`, `shadow-device`.
- **Motion**: `animate-rise`, `animate-slide-up`, `animate-float`, and the
  `reveal` utility through `components/marketing/reveal.tsx`. `styles.css`
  already turns animations off for people who ask for reduced motion; keep it
  that way.
- **Buttons**: use `Button` from `components/ui/button.tsx` with a size rather
  than repeating classes: `size="lg"` for call-to-action buttons (48 px) and
  `size="xl"` for the large buttons of the practice flow (52 px). A link that
  looks like a button is `<Button asChild>` around the link.
- A new token goes in `src/styles.css`, in both the light (`:root`) and the
  dark (`.dark`) blocks.

## Current state

`components/ui/` only holds what the site uses today (accordion, button,
input); add the others from shadcn when you need them.

`/fr` and `/us` (the two tracks; `/` redirects to one) use
`layout/marketing-template.tsx` (navbar), with their copy from
`lib/dictionaries/`; the `/nudge-next` preview
uses `nudge-next/nudge-next-template.tsx`, `/practice` uses
`practice/practice-template.tsx`, and the legal pages (`/privacy-policy`,
`/terms-of-service`, `/legal-notice`, `/cookies`) use
`layout/legal-template.tsx`, which styles their headings, paragraphs, lists and
links. `/signup` (invitation code, then account), `/login` and `/forgot-password`
use `auth/auth-template.tsx`, and
the members' pages under `/dashboard` use `dashboard/dashboard-template.tsx`,
whose tabs (Courses, Portfolio, Account) are links to their own URLs. The
footer (`layout/footer.tsx`) is in no page layout: `app/layout.tsx` adds it to
every page, so the legal links and the cookie settings are always one click
away. The practice questions, answers and feedback rules are data in
`lib/practice-scenario.ts`, and the state of the flow (step, profile, decision)
lives in `app/practice/practice-flow.tsx`, next to its page, because no other
page uses it.
