# Current Feature

<!-- Feature Name -->

Phase 0: offline prototype

## Status

<!-- Not Started|In Progress|Completed -->

In Progress

## Goals

<!-- Goals & requirements -->

- Scaffold the Next.js app in the repo root
- Add Serwist (Turbopack) so a server-rendered page opens with the server stopped
- Offline fallback page for pages never visited
- Web app manifest and icons so the app is installable
- `npm run build` passes

Spec: @context/features/phase-0-offline-prototype.md

## Notes

<!-- Any extra notes -->

- Uses `src/` (per coding standards), so paths are `src/app/...` instead of the spec's `app/...`.
- Serwist caching only works in a production build (`npm run build && npm run start`).
- Database and sign-in are out of scope; they complete the Phase 0 "done when".
- Icons in `public/` are placeholders (GV on dark, lime outline).
- npm blocked the install scripts for `esbuild` and `@swc/core`; the build works without them.
- Verified: build and lint pass; `/serwist/sw.js`, the manifest, `/~offline` and the icons are served, and `/~offline` is precached.
- Browser test passed (26 November 2026, Windows browser via WSL): with the server stopped, `/` showed the saved page and `/never-visited` showed the offline message.

## History

<!-- Keep this updated. Earliest to latest -->

- 26 November 2026: added CLAUDE.md and context docs
- 26 November 2026: Phase 0 offline prototype (Next.js scaffold, Serwist, offline fallback, manifest)
