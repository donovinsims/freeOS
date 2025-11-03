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
                Too much time gets wasted researching apps that turn out to be &quot;free trials&quot; or &quot;freemium&quot; with aggressive paywalls.
              </p>
              <p className="text-[15px] text-gray-600 dark:text-gray-400 leading-relaxed">
                Every app featured here has been personally verified to ensure it&apos;s actually usable without paying, 
                hidden trials, or deceptive pricing. We save you time, money, and frustration.
              </p>
            </div>
          </section>

          {/* Standards */}
          <section className="mb-12">
            <h2 className="font-heading text-[22px] mb-6">Our Standards</h2>
            <ul className="space-y-4">
              <li className="text-[15px] text-gray-600 dark:text-gray-400">
                <strong className="text-black dark:text-white">100% Free:</strong> No hidden costs, no paid upgrades required for core functionality
              </li>
              <li className="text-[15px] text-gray-600 dark:text-gray-400">
                <strong className="text-black dark:text-white">No Trials:</strong> We don&apos;t feature apps with time-limited free trials
              </li>
              <li className="text-[15px] text-gray-600 dark:text-gray-400">
                <strong className="text-black dark:text-white">Actually Useful:</strong> Every app must provide real value without payment
              </li>
              <li className="text-[15px] text-gray-600 dark:text-gray-400">
                <strong className="text-black dark:text-white">Personally Verified:</strong> We test each app before adding it to our directory
              </li>
            </ul>
          </section>

          {/* Contact */}
          <section id="contact" className="mb-12">
            <h2 className="font-heading text-[22px] mb-6">Contact</h2>
            <p className="text-[15px] text-gray-600 dark:text-gray-400 mb-4">
              Have questions, suggestions, or found an app that should be featured? We&apos;d love to hear from you!
            </p>
            <p className="text-[15px] text-gray-600 dark:text-gray-400">
              Submit an app through our <a href="/submit" className="underline hover:no-underline">submission form</a> or reach out with feedback.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

