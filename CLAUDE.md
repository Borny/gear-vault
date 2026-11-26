# Gear Vault

A personal inventory app: know what I own, where it is, and what to pack for each activity. Status: **planning** (no app code yet; everything lives in `context/`).

## Context files

Read these before working on a feature:

- @context/project-overview.md — problem, features, data model, stack, architecture, UI, roadmap, decisions
- @context/coding-standards.md — TypeScript, React, Next.js, Tailwind v4, naming, file layout
- @context/ai-interaction.md — how to work with me: workflow, branching, commits
- @context/current-feature.md — the feature in progress (goals, notes, history)
- `context/features/` — specs for individual features (e.g. `phase-0-offline-prototype.md`)
- `context/project-spec.md` — original raw notes; the overview supersedes it
- `context/screenshots/` — reference images

## Stack

Next.js 16 (App Router) + React + TypeScript (strict) · PostgreSQL on Neon · Prisma ORM 7 (install `prisma@7`; v8 is current) · Better Auth (email/password) · Cloudflare R2 for images · Tailwind CSS v4 + shadcn/ui · Lucide icons · Serwist (PWA) · Dexie/IndexedDB for offline data · Vercel.

## Key rules

- **Tailwind v4:** no `tailwind.config.*`. Theme lives in `src/app/globals.css` via `@theme`.
- **Server components by default**; `'use client'` only for interactivity or browser APIs.
- **Mutations:** Server Actions returning `{ success, data, error }`; API routes only where coding-standards lists a reason (uploads, offline/mobile clients, etc.).
- **No `any`**, no inline styles, no commented-out code, no unused imports.
- **Dark mode first**, light optional.
- **Don't add features beyond the spec.** Items marked 💡 in the overview are proposals, not commitments; ask before building them.

## Domain model essentials

- `Person` (owns things) is separate from `User` (logs in). Owners don't need accounts. One vault, one account.
- `Category` and `Location` are self-referencing trees. Filtering by a parent must include its descendants.
- Quantity and location live in `ItemStock`: an item's total quantity is the sum of its stock rows, and location filters go through it. A new item gets one stock row (qty 1, no location).
- Only `name` is required on an item.
- Images: store the object-storage key (`imageKey`), never the file. Compress before upload.

## Offline (v1)

Installable PWA. Browsing, search, filters and activity lists work offline; creating and editing need a connection. SSR vs offline is the main architectural risk; check Serwist's current guide for Turbopack compatibility.

## Workflow

1. Document the feature in `context/current-feature.md`
2. Branch: `feature/<name>` or `fix/<name>`
3. Implement with minimal, focused changes
4. Verify in the browser and run `npm run build`; fix all errors
5. **Ask before committing.** Conventional commits (`feat:`, `fix:`, `chore:`). No "Generated with Claude" in commit messages
6. Merge to main, then ask before deleting the branch
7. Mark the feature completed in `current-feature.md` and add it to History

Ask before large refactors or architectural changes. Never delete files without confirmation. If something fails after 2–3 attempts, stop and explain.

## Commands

None yet: the Next.js app hasn't been scaffolded. Add `dev`, `build`, `lint` and Prisma commands here once it is.
