import { App } from "@/lib/types";
import { AppCard } from "./AppCard";

interface FeaturedAppsProps {
  apps: App[];
}

export function FeaturedApps({ apps }: FeaturedAppsProps) {
  if (apps.length === 0) return null;

  return (
    <section className="py-12">
      <h2 className="font-heading text-[22px] mb-8">Featured Apps</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {apps.slice(0, 6).map((app) => (
          <AppCard key={app.id} app={app} />
        ))}
      </div>
    </section>
  );
}

