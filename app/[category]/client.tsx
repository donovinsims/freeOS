"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { AppCard } from "@/components/ui/AppCard";
import { FilterBar } from "@/components/ui/FilterBar";
import { CATEGORIES, Category, Platform, URLType } from "@/lib/types";
import { filterApps } from "@/lib/search";

interface CategoryPageClientProps {
  category: Category;
  allApps: App[];
}

type App = import("@/lib/types").App;

export default function CategoryPageClient({ category, allApps }: CategoryPageClientProps) {
  const categoryInfo = CATEGORIES[category];
  const categoryApps = allApps.filter((app) => app.category === category);

  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>([]);
  const [selectedURLTypes, setSelectedURLTypes] = useState<URLType[]>([]);
  const [filteredApps, setFilteredApps] = useState<App[]>([]);

  useEffect(() => {
    const filtered = filterApps(categoryApps, {
      platforms: selectedPlatforms.length > 0 ? selectedPlatforms : undefined,
      urlTypes: selectedURLTypes.length > 0 ? selectedURLTypes : undefined,
    });
    setFilteredApps(filtered);
  }, [categoryApps, selectedPlatforms, selectedURLTypes]);

  const handleReset = () => {
    setSelectedPlatforms([]);
    setSelectedURLTypes([]);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
          {/* Category Header */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-4xl">{categoryInfo.emoji}</span>
              <h1 className="font-heading text-[22px]">{categoryInfo.name}</h1>
            </div>
            <p className="text-[15px] text-gray-600 dark:text-gray-400 mb-4">
              {categoryInfo.description}
            </p>
            <p className="text-[14px] text-gray-500 dark:text-gray-500">
              {categoryApps.length} {categoryApps.length === 1 ? "app" : "apps"} in this category
            </p>
          </div>

          {/* Filter Bar */}
          <div className="mb-8">
            <FilterBar
              selectedPlatforms={selectedPlatforms}
              selectedURLTypes={selectedURLTypes}
              onPlatformChange={setSelectedPlatforms}
              onURLTypeChange={setSelectedURLTypes}
              onReset={handleReset}
            />
          </div>

          {/* App Grid */}
          {filteredApps.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-[15px] text-gray-600 dark:text-gray-400 mb-6">
                No apps found. Try adjusting your filters or browse other categories.
              </p>
              <a
                href="/"
                className="text-[15px] underline hover:no-underline"
              >
                Browse all categories
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredApps.map((app) => (
                <AppCard key={app.id} app={app} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

