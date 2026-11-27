import { Plus, Search, SlidersHorizontal } from "lucide-react";

// Placeholder controls: search, filters and adding come in later phases
export function TopBar() {
  return (
    <header className="flex items-center gap-3 border-b border-line bg-background/90 px-4 py-3 md:px-8">
      <p className="font-display text-lg font-semibold tracking-[0.18em] uppercase md:hidden">Gear Vault</p>
      <label className="flex flex-1 items-center gap-2 border border-line bg-panel px-3 py-2 text-muted">
        <Search aria-hidden className="size-4" strokeWidth={1.5} />
        <span className="sr-only">Search</span>
        <input
          type="search"
          disabled
          placeholder="Search…"
          className="w-full bg-transparent outline-none placeholder:text-muted disabled:cursor-not-allowed"
        />
      </label>
      <button
        type="button"
        disabled
        className="label-caps hidden items-center gap-2 border border-line px-3 py-2.5 text-muted disabled:cursor-not-allowed sm:flex"
      >
        <SlidersHorizontal aria-hidden className="size-4" strokeWidth={1.5} />
        Filters
      </button>
      <button
        type="button"
        disabled
        className="label-caps flex items-center gap-2 border border-accent/50 px-3 py-2.5 text-accent disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Plus aria-hidden className="size-4" strokeWidth={1.5} />
        Add
      </button>
    </header>
  );
}
