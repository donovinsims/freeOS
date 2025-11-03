import Link from "next/link";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-[48px] mb-4">404</h1>
          <p className="text-[15px] text-gray-600 dark:text-gray-400 mb-8">
            The page you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link
            href="/"
            className="text-[15px] underline hover:no-underline"
          >
            Return home
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}

