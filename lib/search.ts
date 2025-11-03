import { App, Platform, URLType } from "./types";

export function filterApps(
  apps: App[],
  filters: {
    platforms?: Platform[];
    urlTypes?: URLType[];
    searchQuery?: string;
  }
): App[] {
  let filtered = [...apps];

  // Platform filter
  if (filters.platforms && filters.platforms.length > 0) {
    filtered = filtered.filter((app) =>
      filters.platforms!.some((platform) => app.platforms.includes(platform))
    );
  }

  // URL type filter
  if (filters.urlTypes && filters.urlTypes.length > 0) {
    filtered = filtered.filter((app) =>
      filters.urlTypes!.includes(app.urlType)
    );
  }

  // Search query
  if (filters.searchQuery) {
    const query = filters.searchQuery.toLowerCase();
    filtered = filtered.filter((app) => {
      const matchesName = app.name.toLowerCase().includes(query);
      const matchesDescription =
        app.shortDescription.toLowerCase().includes(query) ||
        app.fullDescription.toLowerCase().includes(query);
      const matchesTags = app.tags?.some((tag) =>
        tag.toLowerCase().includes(query)
      );

      return matchesName || matchesDescription || matchesTags;
    });
  }

  return filtered;
}

