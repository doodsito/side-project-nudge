# ui: downloaded primitives

Components taken from the web (shadcn, motion libraries...), restyled with our
design tokens and otherwise left as downloaded. This is the lowest level: files
here import nothing from atoms, molecules, organisms or templates.

It only holds what the site uses. To add a standard component (dialog, tabs,
select...), run `npx shadcn@latest add <name>` inside `apps/web/` instead of
writing it by hand. Rules: [docs/ui.md](../../../../../docs/ui.md).
