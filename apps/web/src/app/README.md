# Pages (Next.js App Router)

Every URL of the site is a folder in this directory with a `page.tsx` inside.
`layout.tsx` wraps every page: it loads the fonts, the global styles and the
default metadata.

## Conventions

| File                     | What it is                                         |
| ------------------------ | -------------------------------------------------- |
| `page.tsx`               | `/`                                                |
| `practice/page.tsx`      | `/practice`                                        |
| `about/page.tsx`         | `/about` (a new page is a new folder)              |
| `users/[id]/page.tsx`    | `/users/:id` (dynamic segment, read from `params`) |
| `(marketing)/layout.tsx` | a layout shared by a group of pages, without a URL |
| `layout.tsx`             | the root layout, wraps every page                  |
| `not-found.tsx`          | the 404 page                                       |
| `error.tsx`              | shown when a page crashes                          |

## Rules

- Pages are Server Components by default. A component that uses state,
  effects, event handlers or browser APIs starts with `"use client";`.
- Set the title and description with `export const metadata`, not with a
  `<head>` tag.
- Link between pages with `Link` from `next/link`.
- A page holds content and assembles components; the components themselves live
  in `src/components/` (see `docs/ui.md`).
- Next.js 16 changed some APIs: check the matching guide in
  `node_modules/next/dist/docs/` (at the repository root) before writing
  Next.js code.
