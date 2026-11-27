import { categoryColor } from "@/lib/category-colors";
import type { ActivitySummary, CategoryNode } from "@/types/inventory";
import { CategoryIcon } from "./CategoryIcon";

interface SidebarProps {
  categories: CategoryNode[];
  activities: ActivitySummary[];
}

export function Sidebar({ categories, activities }: SidebarProps) {
  return (
    <aside className="sticky top-0 hidden h-dvh w-64 shrink-0 flex-col overflow-y-auto border-r border-line bg-panel md:flex">
      <div className="bg-hatch border-b border-line px-5 py-5">
        <p className="font-display text-2xl font-semibold tracking-[0.18em] uppercase">Gear Vault</p>
        <p className="label-caps mt-1 text-accent">Inventory</p>
      </div>

      <nav aria-label="Categories" className="px-3 py-4">
        <p className="label-caps px-2 pb-2 text-muted">Categories</p>
        <ul className="space-y-0.5">
          {categories.map((category) => (
            <li key={category.id}>
              <div className="flex items-center gap-2 rounded-sm px-2 py-1.5 hover:bg-panel-raised">
                <span className={`h-4 w-0.5 ${categoryColor(category.color ?? "gray").bar}`} />
                <CategoryIcon name={category.icon ?? "package"} className="size-4 text-muted" />
                <span className="flex-1 truncate">{category.name}</span>
                <span className="text-sm text-muted tabular-nums">{category.itemCount}</span>
              </div>
              {category.children.length > 0 && (
                <ul className="ml-7 border-l border-line">
                  {category.children.map((child) => (
                    <li key={child.id} className="flex items-center gap-2 py-0.5 pr-2 pl-3 text-sm font-light text-muted">
                      <span className="flex-1 truncate">{child.name}</span>
                      <span className="tabular-nums">{child.itemCount}</span>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>

      <nav aria-label="Activities" className="border-t border-line px-3 py-4">
        <p className="label-caps px-2 pb-2 text-muted">Activities</p>
        <ul className="space-y-0.5">
          {activities.map((activity) => (
            <li key={activity.id} className="flex items-center gap-2 rounded-sm px-2 py-1.5 hover:bg-panel-raised">
              <CategoryIcon name={activity.icon} className="size-4 text-accent" />
              <span className="flex-1 truncate">{activity.name}</span>
              <span className="text-sm text-muted tabular-nums">{activity.itemCount}</span>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
