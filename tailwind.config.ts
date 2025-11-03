import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: {
          light: "#FAFAFA",
          dark: "#171717",
        },
        card: {
          light: "#FFFFFF",
          dark: "#121212",
        },
        border: {
          light: "#E0E0E0",
          dark: "#262626",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        heading: ["var(--font-manrope)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "hero": ["48px", { lineHeight: "1.1", letterSpacing: "-2.5px", fontWeight: "800" }],
        "h2": ["22px", { lineHeight: "1.2", fontWeight: "800" }],
        "h3": ["20px", { lineHeight: "1.3", fontWeight: "800" }],
        "body": ["15px", { lineHeight: "1.5", fontWeight: "500" }],
        "caption": ["14px", { lineHeight: "1.4", fontWeight: "500" }],
      },
      spacing: {
        "xs": "8px",
        "sm": "16px",
        "md": "24px",
        "lg": "32px",
        "xl": "48px",
        "2xl": "64px",
      },
      borderRadius: {
        "button": "10px",
        "card": "12px",
        "modal": "16px",
      },
    },
  },
  plugins: [],
};
export default config;
