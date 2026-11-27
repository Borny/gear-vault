import type { VaultStats } from "@/types/inventory";

interface StatsBannerProps {
  stats: VaultStats;
}

export function StatsBanner({ stats }: StatsBannerProps) {
  const entries = [
    { label: "Items", value: stats.items },
    { label: "Pieces", value: stats.pieces },
    { label: "Locations", value: stats.locations },
  ];

  return (
    <section
      aria-label="Vault totals"
      className="bg-hatch flex flex-wrap justify-center gap-x-12 gap-y-3 border-y border-line-strong bg-panel/80 px-6 py-4"
    >
      {entries.map((entry) => (
        <div key={entry.label} className="flex items-end gap-2">
          <span className="label-caps pb-1 font-light text-muted">{entry.label}</span>
          <span className="font-display text-4xl leading-none font-semibold tabular-nums">{entry.value}</span>
        </div>
      ))}
    </section>
  );
}
