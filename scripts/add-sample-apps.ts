/**
 * Script to add sample apps to Airtable
 * 
 * Usage:
 * 1. Set up your .env.local file with Airtable credentials
 * 2. Run: npx tsx scripts/add-sample-apps.ts
 * 
 * This will add 10-20 sample apps across all 7 categories
 */

import Airtable from "airtable";
import * as dotenv from "dotenv";
import { Category, Platform, URLType } from "../lib/types";

// Load environment variables from .env.local
dotenv.config({ path: ".env.local" });

const base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY,
}).base(process.env.AIRTABLE_BASE_ID || "");

const TABLE_NAME = process.env.AIRTABLE_TABLE_NAME || "Apps";

interface SampleApp {
  name: string;
  shortDescription: string;
  fullDescription: string;
  category: Category;
  platforms: Platform[];
  primaryURL: string;
  urlType: URLType;
  tags?: string[];
  installationNotes?: string;
  featured?: boolean;
}

const sampleApps: SampleApp[] = [
  // Design Category
  {
    name: "Figma",
    shortDescription: "Collaborative design tool for teams. Create interfaces, prototypes, and more.",
    fullDescription: "Figma is a powerful, browser-based design tool that's completely free for individual use. It offers vector editing, prototyping, and real-time collaboration features. Perfect for UI/UX designers, the free tier includes unlimited files, unlimited collaborators, and all core design features without any hidden costs.",
    category: "design",
    platforms: ["Web", "macOS"],
    primaryURL: "https://www.figma.com",
    urlType: "Website",
    tags: ["design", "collaboration", "prototyping"],
    featured: true,
  },
  {
    name: "GIMP",
    shortDescription: "Free and open-source image editor with professional features.",
    fullDescription: "GIMP (GNU Image Manipulation Program) is a free, open-source raster graphics editor. It provides tools for photo retouching, image composition, and image authoring. While it has a learning curve, it's incredibly powerful and completely free with no limitations.",
    category: "design",
    platforms: ["macOS"],
    primaryURL: "https://www.gimp.org",
    urlType: "Website",
    tags: ["design", "photo-editing", "open-source"],
  },
  {
    name: "Photopea",
    shortDescription: "Online Photoshop alternative that works in your browser.",
    fullDescription: "Photopea is a free online image editor that works directly in your browser. It supports PSD, XCF, Sketch, and other formats. No installation required, no account needed, and no hidden costs. It's perfect for quick edits and learning Photoshop tools.",
    category: "design",
    platforms: ["Web"],
    primaryURL: "https://www.photopea.com",
    urlType: "Website",
    tags: ["design", "photo-editing", "beginner-friendly"],
  },

  // Development Category
  {
    name: "VS Code",
    shortDescription: "Free, open-source code editor with extensions and IntelliSense.",
    fullDescription: "Visual Studio Code is a free, lightweight code editor from Microsoft. It supports hundreds of programming languages, has built-in Git integration, debugging, and an extensive extension marketplace. Completely free with no premium tier required for core functionality.",
    category: "development",
    platforms: ["macOS"],
    primaryURL: "https://code.visualstudio.com",
    urlType: "Website",
    tags: ["development", "code-editor", "open-source"],
    featured: true,
  },
  {
    name: "iTerm2",
    shortDescription: "Enhanced terminal emulator for macOS with advanced features.",
    fullDescription: "iTerm2 is a terminal emulator for macOS that brings modern features like split panes, search, autocomplete, and extensive customization. It's completely free and open-source, making it the go-to terminal for macOS developers.",
    category: "development",
    platforms: ["macOS"],
    primaryURL: "https://iterm2.com",
    urlType: "Website",
    tags: ["development", "terminal", "open-source"],
  },
  {
    name: "Postman",
    shortDescription: "API testing and development platform with free tier.",
    fullDescription: "Postman is an API platform for building and testing APIs. The free tier includes unlimited collections, up to 3 team members, and all core API testing features. Perfect for developers who need to test REST APIs without any cost.",
    category: "development",
    platforms: ["macOS", "Web"],
    primaryURL: "https://www.postman.com",
    urlType: "Website",
    tags: ["development", "api-testing"],
  },

  // Productivity Category
  {
    name: "Obsidian",
    shortDescription: "Powerful note-taking app with markdown support and linking.",
    fullDescription: "Obsidian is a free note-taking app that uses markdown files stored locally on your device. It features bidirectional linking, graph view, plugins, and themes. The core app is completely free with no subscription required. Premium features are optional and don't affect core functionality.",
    category: "productivity",
    platforms: ["macOS", "iOS"],
    primaryURL: "https://obsidian.md",
    urlType: "Website",
    tags: ["productivity", "note-taking", "markdown"],
    featured: true,
  },
  {
    name: "TickTick",
    shortDescription: "Task management app with reminders, lists, and calendar view.",
    fullDescription: "TickTick is a powerful task management app with a generous free tier. It includes unlimited tasks, lists, reminders, calendar view, and basic collaboration features. The free version is fully functional for personal use without any trial limitations.",
    category: "productivity",
    platforms: ["iOS", "macOS", "Web"],
    primaryURL: "https://www.ticktick.com",
    urlType: "App Store",
    tags: ["productivity", "task-management"],
  },
  {
    name: "Logseq",
    shortDescription: "Privacy-first, open-source knowledge base with block-based editing.",
    fullDescription: "Logseq is a free, open-source knowledge base that works locally. It uses block-based editing, supports markdown, and features powerful linking and query capabilities. All your data stays on your device, and the app is completely free.",
    category: "productivity",
    platforms: ["macOS", "Web"],
    primaryURL: "https://logseq.com",
    urlType: "Website",
    tags: ["productivity", "note-taking", "open-source"],
  },

  // Security Category
  {
    name: "Bitwarden",
    shortDescription: "Free, open-source password manager with unlimited devices.",
    fullDescription: "Bitwarden is a free, open-source password manager with unlimited vault items, unlimited devices, and core features available at no cost. The free tier includes secure password generation, sync across devices, and basic sharing. Premium features are optional.",
    category: "security",
    platforms: ["iOS", "macOS", "Web"],
    primaryURL: "https://bitwarden.com",
    urlType: "Website",
    tags: ["security", "password-manager", "open-source"],
    featured: true,
  },
  {
    name: "ProtonVPN",
    shortDescription: "Secure VPN service with free tier and no data limits.",
    fullDescription: "ProtonVPN offers a free tier with no data limits, no ads, and strong encryption. While it has some speed and server limitations compared to paid plans, the free tier is genuinely usable for basic VPN needs without any hidden costs or trials.",
    category: "security",
    platforms: ["iOS", "macOS"],
    primaryURL: "https://protonvpn.com",
    urlType: "App Store",
    tags: ["security", "vpn", "privacy"],
  },

  // Automation Category
  {
    name: "Rectangle",
    shortDescription: "Open-source window management for macOS.",
    fullDescription: "Rectangle is a free, open-source window manager for macOS. It lets you move and resize windows using keyboard shortcuts or snap areas. Completely free with no limitations, built by the community for the community.",
    category: "automation",
    platforms: ["macOS"],
    primaryURL: "https://rectangleapp.com",
    urlType: "Website",
    tags: ["automation", "window-management", "open-source"],
  },
  {
    name: "Raycast",
    shortDescription: "Lightning-fast launcher and productivity tool for macOS.",
    fullDescription: "Raycast is a powerful launcher and productivity tool for macOS. The free tier includes app launching, clipboard history, window management, calculator, and many extensions. Core features are free forever with no trial limitations.",
    category: "automation",
    platforms: ["macOS"],
    primaryURL: "https://www.raycast.com",
    urlType: "Website",
    tags: ["automation", "launcher", "productivity"],
  },
  {
    name: "Maccy",
    shortDescription: "Open-source clipboard manager for macOS.",
    fullDescription: "Maccy is a lightweight, open-source clipboard manager for macOS. It stores your clipboard history and lets you search through it. Completely free with no limitations, perfect for developers and power users.",
    category: "automation",
    platforms: ["macOS"],
    primaryURL: "https://github.com/p0deje/Maccy",
    urlType: "GitHub",
    tags: ["automation", "clipboard", "open-source"],
  },

  // Communication Category
  {
    name: "Signal",
    shortDescription: "Private messaging app with end-to-end encryption.",
    fullDescription: "Signal is a free, open-source messaging app focused on privacy and security. All messages are end-to-end encrypted, and the app includes voice and video calls. Completely free with no ads, no tracking, and no premium features.",
    category: "communication",
    platforms: ["iOS", "macOS"],
    primaryURL: "https://signal.org",
    urlType: "App Store",
    tags: ["communication", "privacy", "open-source"],
  },
  {
    name: "Discord",
    shortDescription: "Voice and text chat for communities and teams.",
    fullDescription: "Discord is a free communication platform for communities and teams. The free tier includes unlimited messages, voice and video calls, screen sharing, and file sharing. Perfect for communities, gaming, and remote teams without any cost.",
    category: "communication",
    platforms: ["iOS", "macOS", "Web"],
    primaryURL: "https://discord.com",
    urlType: "Website",
    tags: ["communication", "chat", "voice"],
  },

  // Utilities Category
  {
    name: "VLC",
    shortDescription: "Free, open-source media player that plays almost any format.",
    fullDescription: "VLC Media Player is a free, open-source media player that can play virtually any video or audio format. It includes DVD playback, streaming, and conversion features. Completely free with no ads, no tracking, and no limitations.",
    category: "utilities",
    platforms: ["macOS"],
    primaryURL: "https://www.videolan.org",
    urlType: "Website",
    tags: ["utilities", "media-player", "open-source"],
    featured: true,
  },
  {
    name: "ImageOptim",
    shortDescription: "Free tool to compress images and reduce file sizes.",
    fullDescription: "ImageOptim is a free app for macOS that compresses images without losing quality. It supports JPEG, PNG, GIF, and more formats. Perfect for web developers and designers who need to optimize images. Completely free with no premium features.",
    category: "utilities",
    platforms: ["macOS"],
    primaryURL: "https://imageoptim.com",
    urlType: "Website",
    tags: ["utilities", "image-compression"],
  },
  {
    name: "HandBrake",
    shortDescription: "Free, open-source video transcoder.",
    fullDescription: "HandBrake is a free, open-source tool for converting video files from nearly any format. It's powerful, easy to use, and completely free. Perfect for converting videos for different devices or reducing file sizes.",
    category: "utilities",
    platforms: ["macOS"],
    primaryURL: "https://handbrake.fr",
    urlType: "Website",
    tags: ["utilities", "video-converter", "open-source"],
  },
];

function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function addSampleApps() {
  console.log(`Adding ${sampleApps.length} sample apps to Airtable...\n`);

  for (const app of sampleApps) {
    try {
      const slug = generateSlug(app.name);
      const today = new Date().toISOString().split('T')[0];

      await base(TABLE_NAME).create([
        {
          fields: {
            "App Name": app.name,
            Slug: slug,
            "Short Description": app.shortDescription,
            "Full Description": app.fullDescription,
            Category: app.category,
            Platform: app.platforms,
            "Primary URL": app.primaryURL,
            "URL Type": app.urlType,
            Tags: app.tags || [],
            "Installation Notes": app.installationNotes || "",
            "Last Verified": today,
            "Verified By": "System",
            Featured: app.featured || false,
            Status: "Published",
          },
        },
      ]);

      console.log(`✅ Added: ${app.name}`);
    } catch (error: any) {
      if (error.message?.includes("duplicate")) {
        console.log(`⚠️  Skipped (duplicate): ${app.name}`);
      } else {
        console.error(`❌ Error adding ${app.name}:`, error.message);
      }
    }
  }

  console.log(`\n✅ Done! Added ${sampleApps.length} sample apps.`);
}

addSampleApps().catch(console.error);

