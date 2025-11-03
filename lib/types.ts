export type Platform = "iOS" | "macOS" | "Web";

export type Category = 
  | "design"
  | "development"
  | "productivity"
  | "security"
  | "automation"
  | "communication"
  | "utilities";

export type URLType = "App Store" | "GitHub" | "Website" | "Direct Download";

export type AppStatus = "Published" | "Pending Review" | "Archived";

export interface App {
  id: string;
  name: string;
  slug: string;
  icon?: string;
  shortDescription: string;
  fullDescription: string;
  category: Category;
  platforms: Platform[];
  primaryURL: string;
  urlType: URLType;
  tags?: string[];
  installationNotes?: string;
  lastVerified?: string;
  verifiedBy?: string;
  qualityScore?: number;
  featured?: boolean;
  status: AppStatus;
  createdAt?: string;
  updatedAt?: string;
}

export interface AppSubmission {
  appName: string;
  url: string;
  shortDescription: string;
  whyGreat: string;
  email: string;
  platform?: Platform[];
  submitterName?: string;
}

export interface CategoryInfo {
  id: Category;
  name: string;
  emoji: string;
  description: string;
}

export const CATEGORIES: Record<Category, CategoryInfo> = {
  design: {
    id: "design",
    name: "Design",
    emoji: "🎨",
    description: "Create stunning visuals, edit photos and videos, and bring your designs to life.",
  },
  development: {
    id: "development",
    name: "Development",
    emoji: "💻",
    description: "Write code, manage databases, and build software with powerful development tools.",
  },
  productivity: {
    id: "productivity",
    name: "Productivity",
    emoji: "⚡",
    description: "Organize your life, manage projects, and boost your productivity.",
  },
  security: {
    id: "security",
    name: "Security",
    emoji: "🔐",
    description: "Protect your privacy, secure your data, and stay safe online.",
  },
  automation: {
    id: "automation",
    name: "Automation",
    emoji: "🤖",
    description: "Automate repetitive tasks, streamline your workflow, and work smarter with AI.",
  },
  communication: {
    id: "communication",
    name: "Communication",
    emoji: "💬",
    description: "Connect with your team, chat with collaborators, and communicate effectively.",
  },
  utilities: {
    id: "utilities",
    name: "Utilities",
    emoji: "🛠️",
    description: "Essential tools for file management, system optimization, and everyday computing.",
  },
};

