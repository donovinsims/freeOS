"use client";

import { Platform, URLType } from "@/lib/types";
import { cn } from "@/lib/utils";

interface FilterBarProps {
  selectedPlatforms: Platform[];
  selectedURLTypes: URLType[];
  onPlatformChange: (platforms: Platform[]) => void;
  onURLTypeChange: (types: URLType[]) => void;
  onReset: () => void;
}

export function FilterBar({
  selectedPlatforms,
  selectedURLTypes,
  onPlatformChange,
  onURLTypeChange,
  onReset,
}: FilterBarProps) {
  const platforms: Platform[] = ["iOS", "macOS", "Web"];
  const urlTypes: URLType[] = ["App Store", "GitHub", "Website", "Direct Download"];

  const togglePlatform = (platform: Platform) => {
    if (selectedPlatforms.includes(platform)) {
      onPlatformChange(selectedPlatforms.filter((p) => p !== platform));
    } else {
      onPlatformChange([...selectedPlatforms, platform]);
    }
  };

  const toggleURLType = (type: URLType) => {
    if (selectedURLTypes.includes(type)) {
      onURLTypeChange(selectedURLTypes.filter((t) => t !== type));
    } else {
      onURLTypeChange([...selectedURLTypes, type]);
    }
  };

  const hasActiveFilters = selectedPlatforms.length > 0 || selectedURLTypes.length > 0;

  return (
    <div className="flex flex-col gap-6">
      {/* Platform Filters */}
      <div>
        <h3 className="text-[15px] font-medium mb-3">Platform</h3>
        <div className="flex flex-wrap gap-2">
          {platforms.map((platform) => (
            <button
              key={platform}
              onClick={() => togglePlatform(platform)}
              className={cn(
                "px-4 py-2 rounded-[10px] text-[14px] font-medium transition-colors",
                selectedPlatforms.includes(platform)
                  ? "bg-black dark:bg-white text-white dark:text-black"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              )}
            >
              {platform}
            </button>
          ))}
        </div>
      </div>

      {/* URL Type Filters */}
      <div>
        <h3 className="text-[15px] font-medium mb-3">Source</h3>
        <div className="flex flex-wrap gap-2">
          {urlTypes.map((type) => (
            <button
              key={type}
              onClick={() => toggleURLType(type)}
              className={cn(
                "px-4 py-2 rounded-[10px] text-[14px] font-medium transition-colors",
                selectedURLTypes.includes(type)
                  ? "bg-black dark:bg-white text-white dark:text-black"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              )}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Reset Button */}
      {hasActiveFilters && (
        <button
          onClick={onReset}
          className="text-[14px] text-gray-600 dark:text-gray-400 underline hover:no-underline self-start"
        >
          Reset filters
        </button>
      )}
    </div>
  );
}

