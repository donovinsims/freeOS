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
      <div className="flex flex-wrap gap-6 items-center">
        <div className="flex flex-wrap gap-4">
          <span className="text-[15px] font-medium">Platform:</span>
          {platforms.map((platform) => (
            <label
              key={platform}
              className={cn(
                "flex items-center gap-2 cursor-pointer",
                "px-4 py-2 rounded-[10px]",
                "border border-gray-200 dark:border-gray-800",
                selectedPlatforms.includes(platform)
                  ? "bg-black dark:bg-white text-white dark:text-black"
                  : "bg-white dark:bg-gray-950"
              )}
            >
              <input
                type="checkbox"
                checked={selectedPlatforms.includes(platform)}
                onChange={() => togglePlatform(platform)}
                className="sr-only"
              />
              <span className="text-[14px]">{platform}</span>
            </label>
          ))}
        </div>

        <div className="flex flex-wrap gap-4">
          <span className="text-[15px] font-medium">Source:</span>
          {urlTypes.map((type) => (
            <label
              key={type}
              className={cn(
                "flex items-center gap-2 cursor-pointer",
                "px-4 py-2 rounded-[10px]",
                "border border-gray-200 dark:border-gray-800",
                selectedURLTypes.includes(type)
                  ? "bg-black dark:bg-white text-white dark:text-black"
                  : "bg-white dark:bg-gray-950"
              )}
            >
              <input
                type="checkbox"
                checked={selectedURLTypes.includes(type)}
                onChange={() => toggleURLType(type)}
                className="sr-only"
              />
              <span className="text-[14px]">{type}</span>
            </label>
          ))}
        </div>

        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="text-[14px] text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white underline"
          >
            Reset filters
          </button>
        )}
      </div>
    </div>
  );
}

