import { Suspense } from "react";
import { getAllApps } from "@/lib/airtable";
import SearchPageClient from "./client";

// ISR: Revalidate every 15 minutes (900 seconds)
export const revalidate = 900;

export default async function SearchPage() {
  const allApps = await getAllApps();

  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-[15px]">Loading...</div>
      </div>
    }>
      <SearchPageClient allApps={allApps} />
    </Suspense>
  );
}

