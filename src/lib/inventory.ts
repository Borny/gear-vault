import {
  ACTIVITIES,
  ACTIVITY_ITEMS,
  CATEGORIES,
  ITEM_STOCK,
  ITEMS,
  LOCATIONS,
} from "@/lib/mock-data";
import type {
  ActivitySummary,
  Category,
  CategoryNode,
  Collection,
  ItemSummary,
  Location,
  VaultStats,
} from "@/types/inventory";

// Reads the mock data. When Prisma arrives, only this file changes.

const FALLBACK_ICON = "package";
const FALLBACK_COLOR = "gray";

const categoryById = new Map(CATEGORIES.map((c) => [c.id, c]));
const locationById = new Map(LOCATIONS.map((l) => [l.id, l]));

function topLevelOf(category: Category): Category {
  let current = category;
  while (current.parentId) {
    const parent = categoryById.get(current.parentId);
    if (!parent) break;
    current = parent;
  }
  return current;
}

// A category and all of its descendants, so filtering by a parent includes children
export function getDescendantIds(categoryId: string): Set<string> {
  const ids = new Set([categoryId]);
  for (const id of ids) {
    for (const c of CATEGORIES) if (c.parentId === id) ids.add(c.id);
  }
  return ids;
}

function locationPath(location: Location): string {
  const names = [location.name];
  let parentId = location.parentId;
  while (parentId) {
    const parent = locationById.get(parentId);
    if (!parent) break;
    names.unshift(parent.name);
    parentId = parent.parentId;
  }
  return names.join(" › ");
}

function totalQuantity(itemId: string): number {
  return ITEM_STOCK.filter((s) => s.itemId === itemId).reduce((sum, s) => sum + s.quantity, 0);
}

function itemCountIn(categoryIds: Set<string>): number {
  return ITEMS.filter((i) => i.categoryId && categoryIds.has(i.categoryId)).length;
}

export async function getItems(): Promise<ItemSummary[]> {
  return ITEMS.map((item) => {
    const category = item.categoryId ? categoryById.get(item.categoryId) : undefined;
    const top = category ? topLevelOf(category) : undefined;
    const locations = ITEM_STOCK.filter((s) => s.itemId === item.id).map((s) => {
      const location = s.locationId ? locationById.get(s.locationId) : undefined;
      const path = location ? locationPath(location) : "Unknown location";
      return s.quantity > 1 ? `${path} ×${s.quantity}` : path;
    });

    return {
      id: item.id,
      name: item.name,
      brand: item.brand,
      icon: item.icon ?? category?.icon ?? FALLBACK_ICON,
      color: top?.color ?? FALLBACK_COLOR,
      categoryName: top?.name ?? null,
      subcategoryName: category && category !== top ? category.name : null,
      totalQuantity: totalQuantity(item.id),
      locations,
      createdAt: item.createdAt,
    };
  }).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}

export async function getCategoryTree(): Promise<CategoryNode[]> {
  const build = (parentId: string | null): CategoryNode[] =>
    CATEGORIES.filter((c) => c.parentId === parentId).map((c) => ({
      ...c,
      children: build(c.id),
      itemCount: itemCountIn(getDescendantIds(c.id)),
    }));
  return build(null);
}

export async function getCollections(): Promise<Collection[]> {
  return CATEGORIES.filter((c) => c.parentId === null)
    .map((c) => {
      const ids = getDescendantIds(c.id);
      const items = ITEMS.filter((i) => i.categoryId && ids.has(i.categoryId));
      return {
        id: c.id,
        name: c.name,
        icon: c.icon ?? FALLBACK_ICON,
        color: c.color ?? FALLBACK_COLOR,
        itemCount: items.length,
        totalQuantity: items.reduce((sum, i) => sum + totalQuantity(i.id), 0),
      };
    })
    .filter((c) => c.itemCount > 0)
    .sort((a, b) => b.itemCount - a.itemCount);
}

export async function getActivities(): Promise<ActivitySummary[]> {
  return ACTIVITIES.map((a) => ({
    id: a.id,
    name: a.name,
    icon: a.icon ?? FALLBACK_ICON,
    itemCount: ACTIVITY_ITEMS.filter((ai) => ai.activityId === a.id).length,
  }));
}

export async function getVaultStats(): Promise<VaultStats> {
  return {
    items: ITEMS.length,
    pieces: ITEM_STOCK.reduce((sum, s) => sum + s.quantity, 0),
    locations: LOCATIONS.length,
  };
}
