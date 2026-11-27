import { MapPin } from "lucide-react";
import { categoryColor } from "@/lib/category-colors";
import type { ItemSummary } from "@/types/inventory";
import { CategoryIcon } from "./CategoryIcon";

interface ItemCardProps {
  item: ItemSummary;
}

export function ItemCard({ item }: ItemCardProps) {
  const color = categoryColor(item.color);
  const category = [item.categoryName, item.subcategoryName].filter(Boolean).join(" › ");

  return (
    <article className={`flex flex-col border bg-panel transition-colors hover:bg-panel-raised ${color.border}`}>
      <div className="flex items-start gap-3 p-3">
        <div className={`flex size-10 shrink-0 items-center justify-center ${color.tint}`}>
          <CategoryIcon name={item.icon} className={`size-5 ${color.text}`} />
        </div>
        <div className="min-w-0 flex-1">
          {item.brand && <p className="label-caps truncate font-light text-muted">{item.brand}</p>}
          <h3 className="truncate text-lg leading-tight font-medium">{item.name}</h3>
        </div>
        <p className="font-display text-xl leading-none font-semibold tabular-nums" aria-label="Total quantity">
          ×{item.totalQuantity}
        </p>
      </div>
      <div className="mt-auto space-y-1 border-t border-line px-3 py-2 text-sm font-light text-muted">
        {category && <p className={`label-caps truncate ${color.text}`}>{category}</p>}
        {item.locations.map((location) => (
          <p key={location} className="flex items-center gap-1.5 truncate">
            <MapPin aria-hidden className="size-3.5 shrink-0" strokeWidth={1.5} />
            {location}
          </p>
        ))}
      </div>
    </article>
  );
}
