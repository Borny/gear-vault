import { connection } from "next/server";
import { CollectionCard } from "@/components/dashboard/CollectionCard";
import { ItemCard } from "@/components/dashboard/ItemCard";
import { SectionHeading } from "@/components/dashboard/SectionHeading";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { StatsBanner } from "@/components/dashboard/StatsBanner";
import { TopBar } from "@/components/dashboard/TopBar";
import {
  getActivities,
  getCategoryTree,
  getCollections,
  getItems,
  getVaultStats,
} from "@/lib/inventory";

export default async function Home() {
  await connection(); // render on each request, like a real data page
  const [categories, activities, collections, items, stats] = await Promise.all([
    getCategoryTree(),
    getActivities(),
    getCollections(),
    getItems(),
    getVaultStats(),
  ]);

  return (
    <div className="flex min-h-dvh">
      <Sidebar categories={categories} activities={activities} />
      <div className="min-w-0 flex-1">
        <TopBar />
        <StatsBanner stats={stats} />
        <main className="space-y-10 px-4 py-8 md:px-8">
          <section>
            <SectionHeading title="Collections" count={collections.length} />
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5">
              {collections.map((collection) => (
                <CollectionCard key={collection.id} collection={collection} />
              ))}
            </div>
          </section>
          <section>
            <SectionHeading title="Items" count={items.length} />
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
              {items.map((item) => (
                <ItemCard key={item.id} item={item} />
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
