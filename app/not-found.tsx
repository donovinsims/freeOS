import Link from "next/link";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-[48px] mb-6">404</h1>
          <p className="text-[15px] text-gray-600 dark:text-gray-400 mb-8">
            Page not found
          </p>
          <Link
            href="/"
            className="inline-block px-8 py-4 bg-black dark:bg-white text-white dark:text-black rounded-[10px] font-heading text-[20px] hover:opacity-80 transition-opacity"
          >
            Go Home
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}

