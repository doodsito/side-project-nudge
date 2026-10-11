# ui: shadcn components

Components added with the shadcn CLI. Their look comes from the design tokens
in `src/styles.css`; brand changes go in their variants here, never in each
place they are used.

It only holds what the site uses. To add a standard component (dialog, tabs,
select...), run `npx shadcn@latest add <name>` inside `apps/web/` instead of
writing it by hand. Rules: [docs/ui.md](../../../../../docs/ui.md).
