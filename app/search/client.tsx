import { Suspense } from "react";
import { getAllApps } from "@/lib/airtable";
import SearchPageClient from "./client";

export default async function SearchPage() {
  const allApps = await getAllApps();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchPageClient allApps={allApps} />
    </Suspense>
  );
}

