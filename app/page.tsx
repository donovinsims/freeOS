import { SearchBar } from "@/components/ui/SearchBar";
import { CategoryGrid } from "@/components/ui/CategoryGrid";
import { FeaturedApps } from "@/components/ui/FeaturedApps";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { getFeaturedApps } from "@/lib/airtable";

// ISR: Revalidate every 15 minutes (900 seconds)
export const revalidate = 900;

export default async function HomePage() {
  const featuredApps = await getFeaturedApps();

  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">
          <div className="text-center mb-12">
            <div className="inline-block mb-6">
              <span className="px-6 py-1 bg-black dark:bg-white text-white dark:text-black rounded-full text-[14px] font-medium">
                100% Free iOS & macOS Apps
              </span>
            </div>
            <h1 className="font-heading text-[48px] mb-6 text-balance">
              Discover the Best Free iOS & macOS Apps
            </h1>
            <p className="text-[15px] text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
              Genuinely free, personally verified, no hidden costs
            </p>
            <div className="max-w-2xl mx-auto">
              <SearchBar autoFocus />
            </div>
          </div>
        </section>

        {/* Category Grid */}
        <section className="py-12 max-w-7xl mx-auto px-4 md:px-8">
          <h2 className="font-heading text-[22px] mb-8 text-center">Browse by Category</h2>
          <CategoryGrid />
        </section>

        {/* Featured Apps */}
        {featuredApps.length > 0 && (
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <FeaturedApps apps={featuredApps} />
          </div>
        )}

        {/* Newsletter Signup Placeholder */}
        <section className="py-12 border-t border-gray-200 dark:border-gray-800 mt-12 max-w-7xl mx-auto px-4 md:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-heading text-[22px] mb-4">Stay Updated</h2>
            <p className="text-[15px] text-gray-600 dark:text-gray-400 mb-6">
              New free apps every week
            </p>
            <p className="text-[14px] text-gray-500 dark:text-gray-500">
              Newsletter coming soon
            </p>
          </div>
        </section>
        </main>
      <Footer />
    </>
  );
}

