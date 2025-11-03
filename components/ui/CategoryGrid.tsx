import Link from "next/link";
import { CATEGORIES, Category } from "@/lib/types";
import { getAllApps } from "@/lib/airtable";
import { cn } from "@/lib/utils";

export async function CategoryGrid() {
  const allApps = await getAllApps();
  
  const categoryCounts = Object.keys(CATEGORIES).reduce((acc, catId) => {
    acc[catId as Category] = allApps.filter(
      (app) => app.category === catId
    ).length;
    return acc;
  }, {} as Record<Category, number>);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {Object.values(CATEGORIES).map((category) => (
        <Link
          key={category.id}
          href={`/${category.id}`}
          className={cn(
            "group bg-white dark:bg-gray-950 rounded-xl p-8",
            "border border-gray-200 dark:border-gray-800",
            "hover:border-gray-300 dark:hover:border-gray-700",
            "hover:shadow-lg transition-all",
            "flex flex-col items-center text-center"
          )}
        >
          <span className="text-4xl mb-4">{category.emoji}</span>
          <h3 className="font-heading text-[20px] mb-2">{category.name}</h3>
          <p className="text-[14px] text-gray-600 dark:text-gray-400">
            {categoryCounts[category.id]} {categoryCounts[category.id] === 1 ? "app" : "apps"}
          </p>
        </Link>
      ))}
    </div>
  );
}

