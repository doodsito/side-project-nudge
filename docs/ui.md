# UI rules: one design system, built with atomic design

Everything Nudge shows (the landing page, the web app, the dashboards) uses one
design system: the same tokens and the same components. This page explains
where UI code goes. ESLint enforces the import rules, so a pull request that
breaks them fails the checks.

## The levels

Atomic design builds interfaces from small pieces up to full pages. Each level
may only use the levels below it.

| Level | Folder in `apps/web/src/` | What it is | Examples |
|---|---|---|---|
| Downloaded primitives | `components/ui/` | Components taken from the web (shadcn, motion libraries...), restyled with our tokens and otherwise left as downloaded | button, input, accordion, dialog |
| Atoms | `components/atoms/` | Our smallest pieces. They carry states (hover, disabled, sizes) but no behaviour of their own | logo, eyebrow label, section title |
| Molecules | `components/molecules/` | A few atoms combined into something with its own behaviour | waitlist form, FAQ item, stat card |
| Organisms | `components/organisms/` | Molecules and atoms forming a full section, still independent and reusable | navbar, hero, FAQ section, footer |
| Templates | `components/templates/` | The layout of a kind of page, without its content | marketing layout (navbar and footer), app layout (sidebar) |
| Pages | `routes/` | A template filled with real content, at a URL | `/`, `/practice` |

Design tokens (colours, fonts, radii, shadows, animations) sit under everything,
in `src/styles.css`.

Templates come before pages: a template is the empty layout, and a page is that
template filled with real content.

## Import rules

| A file in | May import from |
|---|---|
| `components/ui/` | other `ui` components only |
| `components/atoms/` | `ui` |
| `components/molecules/` | `ui`, `atoms` |
| `components/organisms/` | `ui`, `atoms`, `molecules` |
| `components/templates/` | `ui`, `atoms`, `molecules`, `organisms` |
| `routes/` | anything |

`lib/`, `hooks/` and `integrations/` hold no UI and can be imported from any
level.

## Tokens

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
  `reveal` utility through `components/reveal.tsx`. `styles.css` already turns
  animations off for people who ask for reduced motion; keep it that way.
- A new token goes in `src/styles.css`, in both the light (`:root`) and the
  dark (`.dark`) blocks.

## Adding a downloaded component

1. From shadcn: run `npx shadcn@latest add <name>` inside `apps/web/`; the file
   lands in `components/ui/`.
2. From anywhere else (a motion library, a snippet): put the file in
   `components/ui/`, then replace its colours, fonts and radii with our tokens.
3. Use it through an atom or a molecule rather than directly in a page, so every
   screen keeps the same look.

## Current state

The landing page and the practice flow were built before these rules, in
`components/landing/` and `components/practice/`. They will be split into the
levels above in a dedicated task (see the [roadmap](roadmap.md)). Until then, do
not add files to those folders: new components go into the atomic folders.
