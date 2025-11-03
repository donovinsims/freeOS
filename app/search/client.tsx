"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { AppCard } from "@/components/ui/AppCard";
import { FilterBar } from "@/components/ui/FilterBar";
import { Platform, URLType } from "@/lib/types";
import { filterApps } from "@/lib/search";

type App = import("@/lib/types").App;

interface SearchPageClientProps {
  allApps: App[];
}

export default function SearchPageClient({ allApps }: SearchPageClientProps) {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>([]);
  const [selectedURLTypes, setSelectedURLTypes] = useState<URLType[]>([]);
  const [filteredApps, setFilteredApps] = useState<App[]>([]);

  useEffect(() => {
    const filtered = filterApps(allApps, {
      platforms: selectedPlatforms.length > 0 ? selectedPlatforms : undefined,
      urlTypes: selectedURLTypes.length > 0 ? selectedURLTypes : undefined,
      searchQuery: query || undefined,
    });
    setFilteredApps(filtered);
  }, [allApps, selectedPlatforms, selectedURLTypes, query]);

  const handleReset = () => {
    setSelectedPlatforms([]);
    setSelectedURLTypes([]);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
          <h1 className="font-heading text-[48px] mb-8">Search Results</h1>

          {query && (
            <p className="text-[15px] text-gray-600 dark:text-gray-400 mb-8">
              {filteredApps.length} {filteredApps.length === 1 ? "result" : "results"} for &quot;{query}&quot;
            </p>
          )}

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

          {/* Results */}
          {filteredApps.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-[15px] text-gray-600 dark:text-gray-400 mb-6">
                No apps found. Try adjusting your search or filters.
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

