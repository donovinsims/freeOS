import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getAllApps } from "@/lib/airtable";
import { CATEGORIES, Category } from "@/lib/types";
import CategoryPageClient from "./client";

// ISR: Revalidate every 15 minutes (900 seconds)
export const revalidate = 900;

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  
  if (!(category in CATEGORIES)) {
    notFound();
  }

  const allApps = await getAllApps();

  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-[15px]">Loading...</div>
      </div>
    }>
      <CategoryPageClient category={category as Category} allApps={allApps} />
    </Suspense>
  );
}

