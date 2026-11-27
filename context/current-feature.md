# Current Feature

Mock data dashboard

## Status

In Progress

## Goals

- `src/lib/mock-data.ts`: typed mock data drawn from `context/inventory.csv`, shaped like the Prisma draft (categories and subcategories, nested locations, people, items, stock rows, activities)
- `src/lib/inventory.ts`: async query functions the page uses, so only this file changes when Prisma replaces the mock data
- Dashboard on `/` following the overview layout: sidebar (categories with subcategories, activities), top bar, collection cards coloured by category, item cards with a category-coloured border
- Dark Breakpoint-style theme in `globals.css` (`@theme`), Barlow Condensed via `next/font`, Lucide icons
- `npm run build` and `npm run lint` pass

## Out of scope

- Item drawer, filters, search, item CRUD, database, auth
- Mobile sidebar drawer (the sidebar is hidden below `md` for now)

## Notes

- Locations and owners in the mock data are placeholders; the CSV has neither.
- The search box and Add button are placeholders (disabled).
- `Category.color` holds a palette key (`"blue"`), not a hex: Tailwind can't build classes from runtime values and inline styles are banned. `src/lib/category-colors.ts` maps keys to classes.
- Octin Stencil is a commercial font and isn't in the repo; headings use Barlow Condensed SemiBold until a licensed file is added to `src/app/fonts/`.
- Verified: build and lint pass; `/` server-renders 15 collections and 124 items, split stock rows and unknown locations. Browser check still to do (headless Chromium in WSL lacks `libnspr4`).

## History

<!-- Keep this updated. Earliest to latest -->

- 26 November 2026: added CLAUDE.md and context docs
- 26 November 2026: Phase 0 offline prototype (Next.js scaffold, Serwist, offline fallback, manifest)
