export type Condition = "NEW" | "GOOD" | "WORN";

export interface Person {
  id: string;
  name: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string | null;
  color: string | null;
  parentId: string | null;
}

export interface Location {
  id: string;
  name: string;
  parentId: string | null;
}

export interface Item {
  id: string;
  name: string;
  description: string | null;
  brand: string | null;
  value: number | null;
  condition: Condition | null;
  imageKey: string | null;
  icon: string | null;
  categoryId: string | null;
  ownerIds: string[];
  createdAt: Date;
}

export interface ItemStock {
  id: string;
  itemId: string;
  locationId: string | null;
  quantity: number;
}

export interface Activity {
  id: string;
  name: string;
  icon: string | null;
}

export interface ActivityItem {
  activityId: string;
  itemId: string;
  quantity: number;
}

export interface CategoryNode extends Category {
  children: CategoryNode[];
  itemCount: number;
}

export interface ItemSummary {
  id: string;
  name: string;
  brand: string | null;
  icon: string;
  color: string;
  categoryName: string | null;
  subcategoryName: string | null;
  totalQuantity: number;
  locations: string[];
  createdAt: Date;
}

export interface Collection {
  id: string;
  name: string;
  icon: string;
  color: string;
  itemCount: number;
  totalQuantity: number;
}

export interface ActivitySummary {
  id: string;
  name: string;
  icon: string;
  itemCount: number;
}

export interface VaultStats {
  items: number;
  pieces: number;
  locations: number;
}
