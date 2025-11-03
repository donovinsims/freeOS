"use client";

import { useState, FormEvent } from "react";
import { AppSubmission } from "@/lib/types";
import { cn } from "@/lib/utils";

interface SubmitFormProps {
  onSubmit: (submission: AppSubmission) => Promise<boolean>;
}

export function SubmitForm({ onSubmit }: SubmitFormProps) {
  const [formData, setFormData] = useState<AppSubmission>({
    appName: "",
    url: "",
    shortDescription: "",
    whyGreat: "",
    email: "",
    platform: [],
    submitterName: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const success = await onSubmit(formData);
      if (success) {
        setSubmitStatus("success");
        setFormData({
          appName: "",
          url: "",
          shortDescription: "",
          whyGreat: "",
          email: "",
          platform: [],
          submitterName: "",
        });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const togglePlatform = (platform: "iOS" | "macOS" | "Web") => {
    const current = formData.platform || [];
    if (current.includes(platform)) {
      setFormData({ ...formData, platform: current.filter((p) => p !== platform) });
    } else {
      setFormData({ ...formData, platform: [...current, platform] });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-md">
      <div>
        <label htmlFor="appName" className="block text-[15px] font-medium mb-2">
          App Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="appName"
          required
          value={formData.appName}
          onChange={(e) => setFormData({ ...formData, appName: e.target.value })}
          className={cn(
            "w-full px-6 py-2 rounded-[10px]",
            "bg-white dark:bg-card-dark",
            "border border-gray-200 dark:border-gray-800",
            "focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
          )}
        />
      </div>

      <div>
        <label htmlFor="url" className="block text-[15px] font-medium mb-2">
          URL <span className="text-red-500">*</span>
        </label>
        <input
          type="url"
          id="url"
          required
          value={formData.url}
          onChange={(e) => setFormData({ ...formData, url: e.target.value })}
          placeholder="App Store link, GitHub repo, or website"
          className={cn(
            "w-full px-6 py-2 rounded-[10px]",
            "bg-white dark:bg-card-dark",
            "border border-gray-200 dark:border-gray-800",
            "focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
          )}
        />
      </div>

      <div>
        <label htmlFor="shortDescription" className="block text-[15px] font-medium mb-2">
          Short Description <span className="text-red-500">*</span>
        </label>
        <textarea
          id="shortDescription"
          required
          rows={2}
          value={formData.shortDescription}
          onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
          placeholder="What does this app do? (1-2 sentences)"
          className={cn(
            "w-full px-6 py-2 rounded-[10px]",
            "bg-white dark:bg-card-dark",
            "border border-gray-200 dark:border-gray-800",
            "focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
          )}
        />
      </div>

      <div>
        <label htmlFor="whyGreat" className="block text-[15px] font-medium mb-2">
          Why It's Great <span className="text-red-500">*</span>
        </label>
        <textarea
          id="whyGreat"
          required
          rows={3}
          value={formData.whyGreat}
          onChange={(e) => setFormData({ ...formData, whyGreat: e.target.value })}
          placeholder="What makes this app stand out?"
          className={cn(
            "w-full px-6 py-2 rounded-[10px]",
            "bg-white dark:bg-card-dark",
            "border border-gray-200 dark:border-gray-800",
            "focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
          )}
        />
      </div>

      <div>
        <label className="block text-[15px] font-medium mb-2">Platform (optional)</label>
        <div className="flex flex-wrap gap-4">
          {(["iOS", "macOS", "Web"] as const).map((platform) => (
            <label
              key={platform}
              className={cn(
                "flex items-center gap-2 cursor-pointer",
                "px-4 py-1 rounded-[10px]",
                "border border-gray-200 dark:border-gray-800",
                formData.platform?.includes(platform)
                  ? "bg-black dark:bg-white text-white dark:text-black"
                  : "bg-white dark:bg-gray-950"
              )}
            >
              <input
                type="checkbox"
                checked={formData.platform?.includes(platform) || false}
                onChange={() => togglePlatform(platform)}
                className="sr-only"
              />
              <span className="text-[14px]">{platform}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-[15px] font-medium mb-2">
          Your Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className={cn(
            "w-full px-6 py-2 rounded-[10px]",
            "bg-white dark:bg-card-dark",
            "border border-gray-200 dark:border-gray-800",
            "focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
          )}
        />
      </div>

      <div>
        <label htmlFor="submitterName" className="block text-[15px] font-medium mb-2">
          Your Name (optional)
        </label>
        <input
          type="text"
          id="submitterName"
          value={formData.submitterName}
          onChange={(e) => setFormData({ ...formData, submitterName: e.target.value })}
          className={cn(
            "w-full px-6 py-2 rounded-[10px]",
            "bg-white dark:bg-card-dark",
            "border border-gray-200 dark:border-gray-800",
            "focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
          )}
        />
      </div>

      {submitStatus === "success" && (
        <div className="p-md bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-[10px]">
          Thanks for the submission! We'll review within 2 weeks.
        </div>
      )}

      {submitStatus === "error" && (
        <div className="p-md bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-[10px]">
          Something went wrong. Please try again later.
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className={cn(
          "w-full md:w-auto px-8 py-4 rounded-[10px]",
          "bg-black dark:bg-white text-white dark:text-black",
          "font-heading text-[20px]",
          "hover:opacity-80 transition-opacity",
          "disabled:opacity-50 disabled:cursor-not-allowed"
        )}
      >
        {isSubmitting ? "Submitting..." : "Submit App"}
      </button>
    </form>
  );
}

