# Phase 0: offline prototype

**Goal:** prove that a server-rendered Next.js page still opens with no server.

**Tested on 26 November 2026** with Next.js 16.4.6, Serwist 9.6.0 and Node 22, using a production build in Chromium with the server stopped. Not tested: a real phone, installing the app, or a deployed site.

## 1. Create the project

```bash
npx create-next-app@latest gear-vault --yes
cd gear-vault
npm i -D @serwist/turbopack@9 serwist@9 esbuild
```

## 2. Add the files

Replace a file if it already exists. In `next.config.ts`, keep the options the generator wrote and add the `withSerwist` wrapper.

**`next.config.ts`**

```ts
import type { NextConfig } from "next";
import { withSerwist } from "@serwist/turbopack";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  // Written by the generator; Tailwind needs it
  turbopack: {
    rules: {
      "*.css": { loaders: ["@tailwindcss/turbopack"], as: "*.css" },
    },
  },
};

export default withSerwist(nextConfig);
```

**`app/serwist/[path]/route.ts`**

```ts
import { createSerwistRoute } from "@serwist/turbopack";

// New value on every build, so the cached offline page gets refreshed
const revision = crypto.randomUUID();

export const { dynamic, dynamicParams, revalidate, generateStaticParams, GET } =
  createSerwistRoute({
    swSrc: "app/sw.ts",
    additionalPrecacheEntries: [{ url: "/~offline", revision }],
    useNativeEsbuild: true,
  });
```

**`app/sw.ts`**

```ts
/// <reference no-default-lib="true" />
/// <reference lib="esnext" />
/// <reference lib="webworker" />
import { defaultCache } from "@serwist/turbopack/worker";
import type { PrecacheEntry, SerwistGlobalConfig } from "serwist";
import { Serwist } from "serwist";

declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}

declare const self: ServiceWorkerGlobalScope;

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching: defaultCache,
  fallbacks: {
    entries: [
      {
        url: "/~offline",
        matcher: ({ request }) => request.destination === "document",
      },
    ],
  },
});

serwist.addEventListeners();
```

**`app/serwist-provider.ts`**

```ts
"use client";

export { SerwistProvider } from "@serwist/turbopack/react";
```

**`app/layout.tsx`**

```tsx
import type { Metadata, Viewport } from "next";
import { SerwistProvider } from "./serwist-provider";
import "./globals.css";

export const metadata: Metadata = { title: "Gear Vault" };
export const viewport: Viewport = { themeColor: "#0b0f0e" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SerwistProvider swUrl="/serwist/sw.js">{children}</SerwistProvider>
      </body>
    </html>
  );
}
```

**`app/page.tsx`**

```tsx
import { connection } from "next/server";

export default async function Home() {
  await connection(); // render on each request, like a real data page
  const items = ["DJI Mini 5 Pro"];

  return (
    <main>
      <h1>Gear Vault</h1>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <p>Rendered on the server at {new Date().toISOString()}</p>
    </main>
  );
}
```

**`app/loading.tsx`** (the build fails without it, because the page reads data on each request)

```tsx
export default function Loading() {
  return <p>Loading…</p>;
}
```

**`app/~offline/page.tsx`**

```tsx
export default function Offline() {
  return <h1>You are offline and this page is not saved yet.</h1>;
}
```

**`app/manifest.ts`**

```ts
import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Gear Vault",
    short_name: "Gear Vault",
    start_url: "/",
    display: "standalone",
    background_color: "#0b0f0e",
    theme_color: "#0b0f0e",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
```

Add two square PNG icons: `public/icon-192.png` and `public/icon-512.png`.

## 3. Test it

```bash
npm run build
npm run start
```

Use the production build: Serwist's default caching does nothing in development.

1. Open http://localhost:3000 and wait a few seconds.
2. **Reload once.** This is the visit that saves the page.
3. Stop the server with `Ctrl+C`.
4. Reload: you should see the page with its old render time.
5. Open `/never-visited`: you should see the offline message.

Before repeating the test, clear the site data in your browser's developer tools.

## Results

| Case | With the server stopped |
| --- | --- |
| One online visit to `/` | Offline message |
| Two online visits to `/` | Saved page |
| A page never visited | Offline message |

## What this means for Gear Vault

- **The risk is manageable:** server rendering and offline opening work together.
- **Only visited pages are saved.** Offline search across the whole vault needs a copy of the data in IndexedDB, as planned.
- **The first visit is not enough.** The app needs to save its data and shell itself after sign-in.
- **Saved pages stay on the device.** Once there is authentication, clear the caches on sign-out.
- **Phone testing needs HTTPS**, so deploy a preview first.

**Done when** (from the roadmap): you can sign in and a page opens offline. This covers the offline half; database and sign-in come next.
