import { categoryColor } from "@/lib/category-colors";
import type { Collection } from "@/types/inventory";
import { CategoryIcon } from "./CategoryIcon";

interface CollectionCardProps {
  collection: Collection;
}

export function CollectionCard({ collection }: CollectionCardProps) {
  const color = categoryColor(collection.color);

  return (
    <article
      className={`bg-hatch relative overflow-hidden border border-line p-4 transition-colors hover:border-line-strong ${color.tint}`}
    >
      <span className={`absolute inset-y-0 left-0 w-1 ${color.bar}`} />
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-lg font-semibold tracking-[0.08em] uppercase">{collection.name}</h3>
        <CategoryIcon name={collection.icon} className={`size-5 shrink-0 ${color.text}`} />
      </div>
      <p className="label-caps mt-3 font-light text-muted">
        <span className="text-foreground">{collection.itemCount}</span> items ·{" "}
        <span className="text-foreground">{collection.totalQuantity}</span> pieces
      </p>
    </article>
  );
}
