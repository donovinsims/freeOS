import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { AppCard } from "@/components/ui/AppCard";
import { getAppBySlug, getAllApps } from "@/lib/airtable";
import { CATEGORIES, Platform } from "@/lib/types";
import { formatDate } from "@/lib/utils";

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
            <p className="text-[15px] text-lg mb-6 leading-relaxed">
              {app.shortDescription}
            </p>
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-[15px] text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-line">
                {app.fullDescription}
              </p>
            </div>
            {app.tags && app.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-6">
                {app.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-[14px]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </section>

          {/* Access & Installation */}
          <section className="mb-12 p-lg bg-white dark:bg-gray-950 rounded-xl border border-gray-200 dark:border-gray-800">
            <h2 className="font-heading text-[22px] mb-6">Access & Installation</h2>
            <div className="mb-6">
              <a
                href={app.primaryURL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-4 bg-black dark:bg-white text-white dark:text-black rounded-[10px] font-heading text-[20px] hover:opacity-80 transition-opacity mb-4"
              >
                {app.urlType === "App Store" ? "Download" : "Visit Website"}
              </a>
            </div>
            <p className="text-[15px] text-gray-600 dark:text-gray-400 mb-4">
              Available on {app.urlType}
            </p>
            {app.installationNotes && (
              <div className="mt-6 p-md bg-gray-50 dark:bg-gray-900 rounded-[10px]">
                <p className="text-[14px] font-medium mb-2">Installation Notes:</p>
                <p className="text-[15px] text-gray-700 dark:text-gray-300">
                  {app.installationNotes}
                </p>
              </div>
            )}
          </section>

          {/* Details */}
          <section className="mb-12">
            <h2 className="font-heading text-[22px] mb-6">Details</h2>
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {app.lastVerified && (
                <>
                  <dt className="text-[14px] font-medium text-gray-600 dark:text-gray-400">
                    Last Verified
                  </dt>
                  <dd className="text-[15px]">{formatDate(app.lastVerified)}</dd>
                </>
              )}
              {app.platforms.length > 0 && (
                <>
                  <dt className="text-[14px] font-medium text-gray-600 dark:text-gray-400">
                    Platform Compatibility
                  </dt>
                  <dd className="text-[15px]">{app.platforms.join(", ")}</dd>
                </>
              )}
              {app.verifiedBy && (
                <>
                  <dt className="text-[14px] font-medium text-gray-600 dark:text-gray-400">
                    Verified By
                  </dt>
                  <dd className="text-[15px]">{app.verifiedBy}</dd>
                </>
              )}
            </dl>
          </section>

          {/* Report/Feedback */}
          <section className="mb-12">
            <div className="flex flex-wrap gap-4">
              <Link
                href="/about#contact"
                className="text-[15px] underline hover:no-underline"
              >
                Report an Issue
              </Link>
              <span className="text-[15px] text-gray-400">•</span>
              <Link
                href="/about#contact"
                className="text-[15px] underline hover:no-underline"
              >
                Suggest an Edit
              </Link>
            </div>
          </section>

          {/* Related Apps */}
          {relatedApps.length > 0 && (
            <section>
              <h2 className="font-heading text-[22px] mb-6">Related Apps</h2>
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

