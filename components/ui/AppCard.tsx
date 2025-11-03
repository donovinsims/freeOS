import Image from "next/image";
import Link from "next/link";
import { App, Platform } from "@/lib/types";
import { cn } from "@/lib/utils";

interface AppCardProps {
  app: App;
  className?: string;
}

export function AppCard({ app, className }: AppCardProps) {
  return (
    <Link
      href={`/apps/${app.slug}`}
      className={cn(
        "group block bg-white dark:bg-gray-950 rounded-xl p-6",
        "border border-gray-200 dark:border-gray-800",
        "hover:border-gray-300 dark:hover:border-gray-700 transition-colors",
        "hover:shadow-lg transition-shadow",
        className
      )}
    >
      <div className="flex items-start gap-4">
        {app.icon && (
          <div className="flex-shrink-0">
            <Image
              src={app.icon}
              alt={app.name}
              width={64}
              height={64}
              className="rounded-lg"
            />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h3 className="font-heading text-[20px] mb-2 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
            {app.name}
          </h3>
          <p className="text-[15px] text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
            {app.shortDescription}
          </p>
          <div className="flex flex-wrap gap-2">
            {app.platforms.map((platform) => (
              <PlatformBadge key={platform} platform={platform} />
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}

function PlatformBadge({ platform }: { platform: Platform }) {
  const colors = {
    iOS: "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200",
    macOS: "bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200",
    Web: "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200",
  };

  return (
    <span
      className={cn(
        "text-[14px] px-2 py-0.5 rounded-full font-medium",
        colors[platform]
      )}
    >
      {platform}
    </span>
  );
}

