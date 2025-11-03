import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "../styles/globals.css";
import { ThemeProvider } from "@/components/ui/ThemeProvider";

const inter = Inter({ 
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-inter",
});

const manrope = Manrope({ 
  subsets: ["latin"],
  weight: ["800"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "FreeMac - Discover the Best Free iOS & macOS Apps",
  description: "Genuinely free, personally verified, no hidden costs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${manrope.variable} font-sans`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

