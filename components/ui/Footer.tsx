import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 mt-16 py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-heading text-[20px] mb-4">FreeMac</h3>
            <p className="text-[15px] text-gray-600 dark:text-gray-400">
              Discover genuinely free iOS and macOS apps. No hidden costs, no trials.
            </p>
          </div>

          <div>
            <h4 className="font-heading text-[20px] mb-4">Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-[15px] text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/submit"
                  className="text-[15px] text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                >
                  Submit App
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-[20px] mb-4">Contact</h4>
            <p className="text-[15px] text-gray-600 dark:text-gray-400">
              Have questions or feedback?{" "}
              <Link
                href="/about#contact"
                className="underline hover:no-underline"
              >
                Get in touch
              </Link>
              .
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p className="text-[14px] text-gray-600 dark:text-gray-400 text-center">
            © {new Date().getFullYear()} FreeMac. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

