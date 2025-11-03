import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { AppCard } from "@/components/ui/AppCard";
import { getAppBySlug, getAllApps } from "@/lib/airtable";
import { CATEGORIES, Platform } from "@/lib/types";
import { formatDate } from "@/lib/utils";

// ISR: Revalidate every 15 minutes (900 seconds)
export const revalidate = 900;

interface AppDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function AppDetailPage({ params }: AppDetailPageProps) {
  const { slug } = await params;
  const app = await getAppBySlug(slug);

  if (!app) {
    notFound();
  }

  const allApps = await getAllApps();
  const relatedApps = allApps
    .filter((a) => a.category === app.category && a.id !== app.id)
    .slice(0, 4);

  const categoryInfo = CATEGORIES[app.category];

  return (
    <>
      <Header />
      <main className="min-h-screen">
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
          {/* App Header */}
          <div className="flex items-start gap-6 mb-12">
            {app.icon && (
              <Image
                src={app.icon}
                alt={app.name}
                width={128}
                height={128}
                className="rounded-xl"
              />
            )}
            <div className="flex-1">
              <h1 className="font-heading text-[48px] mb-4">{app.name}</h1>
              <div className="flex flex-wrap gap-2 mb-6">
                {app.platforms.map((platform) => (
                  <span
                    key={platform}
                    className="px-4 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-[14px] font-medium"
                  >
                    {platform}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Key Info */}
          <section className="mb-12">
            <p className="text-[15px] text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              {app.shortDescription}
            </p>
            <a
              href={app.primaryURL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-[10px] text-[15px] font-medium hover:opacity-90 transition-opacity"
            >
              Visit {app.urlType === "App Store" ? "App Store" : "Website"} →
            </a>
          </section>

          {/* Full Description */}
          <section className="mb-12">
            <h2 className="font-heading text-[22px] mb-4">About</h2>
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-[15px] text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-line">
                {app.fullDescription}
              </p>
            </div>
          </section>

          {/* Installation Notes */}
          {app.installationNotes && (
            <section className="mb-12">
              <h2 className="font-heading text-[22px] mb-4">Installation Notes</h2>
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-[15px] text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-line">
                  {app.installationNotes}
                </p>
              </div>
            </section>
          )}

          {/* Tags */}
          {app.tags && app.tags.length > 0 && (
            <section className="mb-12">
              <h2 className="font-heading text-[22px] mb-4">Tags</h2>
              <div className="flex flex-wrap gap-2">
                {app.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-[14px] text-gray-700 dark:text-gray-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Verification Info */}
          {app.lastVerified && (
            <section className="mb-12">
              <p className="text-[14px] text-gray-500 dark:text-gray-500">
                Last verified: {formatDate(app.lastVerified)}
                {app.verifiedBy && ` by ${app.verifiedBy}`}
              </p>
            </section>
          )}

          {/* Category Link */}
          <section className="mb-12">
            <Link
              href={`/${app.category}`}
              className="text-[15px] text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
            >
              ← Back to {categoryInfo.name}
            </Link>
          </section>

          {/* Related Apps */}
          {relatedApps.length > 0 && (
            <section className="border-t border-gray-200 dark:border-gray-800 pt-12">
              <h2 className="font-heading text-[22px] mb-8">More {categoryInfo.name} Apps</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedApps.map((relatedApp) => (
                  <AppCard key={relatedApp.id} app={relatedApp} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

