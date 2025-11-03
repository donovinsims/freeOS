import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
          <h1 className="font-heading text-[48px] mb-12">About FreeMac</h1>

          {/* Mission */}
          <section className="mb-12">
            <h2 className="font-heading text-[22px] mb-6">Our Mission</h2>
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-[15px] text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                We built FreeMac to solve a real problem: finding genuinely free apps is harder than it should be. 
                Too much time gets wasted researching apps that turn out to be "free trials" or "freemium" with aggressive paywalls.
              </p>
              <p className="text-[15px] text-gray-600 dark:text-gray-400 leading-relaxed">
                Every app featured here has been personally verified to ensure it's actually usable without paying, 
                hidden trials, or deceptive pricing. We save you time, money, and frustration.
              </p>
            </div>
          </section>

          {/* Standards */}
          <section className="mb-12">
            <h2 className="font-heading text-[22px] mb-6">"Genuinely Free" Standards</h2>
            <p className="text-[15px] text-gray-600 dark:text-gray-400 mb-6">
              We only feature apps that are:
            </p>
            <ul className="space-y-sm list-disc list-inside text-[15px] text-gray-600 dark:text-gray-400">
              <li>Free to download and use with core features accessible without paying</li>
              <li>Not "free trials" that expire</li>
              <li>Not "freemium" with aggressive paywalls for basic tasks</li>
              <li>Not ad-riddled to the point of unusability</li>
            </ul>
          </section>

          {/* Distribution Methods */}
          <section className="mb-12">
            <h2 className="font-heading text-[22px] mb-6">Distribution Methods We Accept</h2>
            <ul className="space-y-sm list-disc list-inside text-[15px] text-gray-600 dark:text-gray-400">
              <li>
                <strong>App Store:</strong> Free apps with no in-app purchases required for core functionality
              </li>
              <li>
                <strong>GitHub:</strong> Open-source projects
              </li>
              <li>
                <strong>Official Website:</strong> Direct downloads with no signup walls
              </li>
              <li>
                <strong>Direct Download:</strong> Trusted sources only
              </li>
            </ul>
          </section>

          {/* Submit */}
          <section className="mb-12">
            <h2 className="font-heading text-[22px] mb-6">How to Submit Apps</h2>
            <p className="text-[15px] text-gray-600 dark:text-gray-400 mb-6">
              Have a free app you'd like to see featured? We'd love to hear about it!
            </p>
            <p className="text-[15px] text-gray-600 dark:text-gray-400 mb-6">
              All submissions are verified before featuring. We review submissions within 2 weeks.
            </p>
            <a
              href="/submit"
              className="inline-block px-8 py-4 bg-black dark:bg-white text-white dark:text-black rounded-[10px] font-heading text-[20px] hover:opacity-80 transition-opacity"
            >
              Submit an App
            </a>
          </section>

          {/* Contact */}
          <section id="contact" className="mb-12">
            <h2 className="font-heading text-[22px] mb-6">Contact</h2>
            <p className="text-[15px] text-gray-600 dark:text-gray-400 mb-6">
              Have questions, feedback, or want to report an issue? We're here to help.
            </p>
            <p className="text-[15px] text-gray-600 dark:text-gray-400">
              Please use the <a href="/submit" className="underline hover:no-underline">Submit App</a> form 
              for app submissions, or reach out via the contact methods listed there.
            </p>
            <p className="text-[15px] text-gray-600 dark:text-gray-400 mt-6">
              We review submissions and respond to inquiries within 2 weeks.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

