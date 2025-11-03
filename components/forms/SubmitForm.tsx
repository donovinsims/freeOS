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
      {/* App Name */}
      <div>
        <label htmlFor="appName" className="block text-[15px] font-medium mb-2">
          App Name *
        </label>
        <input
          type="text"
          id="appName"
          required
          value={formData.appName}
          onChange={(e) => setFormData({ ...formData, appName: e.target.value })}
          className={cn(
            "w-full px-4 py-3 rounded-[10px]",
            "bg-white dark:bg-gray-950",
            "border border-gray-200 dark:border-gray-800",
            "text-[15px] focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
          )}
        />
      </div>

      {/* URL */}
      <div>
        <label htmlFor="url" className="block text-[15px] font-medium mb-2">
          App URL *
        </label>
        <input
          type="url"
          id="url"
          required
          value={formData.url}
          onChange={(e) => setFormData({ ...formData, url: e.target.value })}
          className={cn(
            "w-full px-4 py-3 rounded-[10px]",
            "bg-white dark:bg-gray-950",
            "border border-gray-200 dark:border-gray-800",
            "text-[15px] focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
          )}
        />
      </div>

      {/* Short Description */}
      <div>
        <label htmlFor="shortDescription" className="block text-[15px] font-medium mb-2">
          Short Description *
        </label>
        <textarea
          id="shortDescription"
          required
          rows={3}
          value={formData.shortDescription}
          onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
          className={cn(
            "w-full px-4 py-3 rounded-[10px]",
            "bg-white dark:bg-gray-950",
            "border border-gray-200 dark:border-gray-800",
            "text-[15px] focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
          )}
        />
      </div>

      {/* Why Great */}
      <div>
        <label htmlFor="whyGreat" className="block text-[15px] font-medium mb-2">
          Why is this app great? *
        </label>
        <textarea
          id="whyGreat"
          required
          rows={5}
          value={formData.whyGreat}
          onChange={(e) => setFormData({ ...formData, whyGreat: e.target.value })}
          className={cn(
            "w-full px-4 py-3 rounded-[10px]",
            "bg-white dark:bg-gray-950",
            "border border-gray-200 dark:border-gray-800",
            "text-[15px] focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
          )}
        />
      </div>

      {/* Platform */}
      <div>
        <label className="block text-[15px] font-medium mb-2">Platform *</label>
        <div className="flex flex-wrap gap-2">
          {(["iOS", "macOS", "Web"] as const).map((platform) => (
            <button
              key={platform}
              type="button"
              onClick={() => togglePlatform(platform)}
              className={cn(
                "px-4 py-2 rounded-[10px] text-[14px] font-medium transition-colors",
                formData.platform?.includes(platform)
                  ? "bg-black dark:bg-white text-white dark:text-black"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              )}
            >
              {platform}
            </button>
          ))}
        </div>
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-[15px] font-medium mb-2">
          Your Email *
        </label>
        <input
          type="email"
          id="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className={cn(
            "w-full px-4 py-3 rounded-[10px]",
            "bg-white dark:bg-gray-950",
            "border border-gray-200 dark:border-gray-800",
            "text-[15px] focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
          )}
        />
      </div>

      {/* Submitter Name */}
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
            "w-full px-4 py-3 rounded-[10px]",
            "bg-white dark:bg-gray-950",
            "border border-gray-200 dark:border-gray-800",
            "text-[15px] focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
          )}
        />
      </div>

      {/* Status Messages */}
      {submitStatus === "success" && (
        <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-[10px]">
          <p className="text-[15px] text-green-800 dark:text-green-200">
            Thank you! Your submission has been received and will be reviewed.
          </p>
        </div>
      )}

      {submitStatus === "error" && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-[10px]">
          <p className="text-[15px] text-red-800 dark:text-red-200">
            Something went wrong. Please try again later.
          </p>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={cn(
          "w-full px-6 py-4 rounded-[10px]",
          "bg-black dark:bg-white text-white dark:text-black",
          "text-[15px] font-medium",
          "hover:opacity-90 transition-opacity",
          "disabled:opacity-50 disabled:cursor-not-allowed"
        )}
      >
        {isSubmitting ? "Submitting..." : "Submit App"}
      </button>
    </form>
  );
}

