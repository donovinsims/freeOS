"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  className?: string;
  placeholder?: string;
  autoFocus?: boolean;
}

export function SearchBar({ 
  className, 
  placeholder = "Search apps...",
  autoFocus = false 
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  }, [query, router]);

  return (
    <form onSubmit={handleSubmit} className={cn("w-full", className)}>
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className={cn(
            "w-full px-8 py-4 rounded-[10px]",
            "bg-white dark:bg-gray-950",
            "border border-gray-200 dark:border-gray-800",
            "text-[15px] placeholder:text-gray-400 dark:placeholder:text-gray-600",
            "focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white",
            "transition-all"
          )}
        />
        <button
          type="submit"
          className="absolute right-4 top-1/2 -translate-y-1/2"
          aria-label="Search"
        >
          <svg
            className="w-5 h-5 text-gray-400 dark:text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
    </form>
  );
}

