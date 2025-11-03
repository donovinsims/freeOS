import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { SubmitForm } from "@/components/forms/SubmitForm";
import { createAppSubmission } from "@/lib/airtable";

async function handleSubmit(formData: import("@/lib/types").AppSubmission) {
  "use server";
  return await createAppSubmission(formData);
}

export default function SubmitPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <div className="max-w-2xl mx-auto px-4 md:px-8 py-12">
          <h1 className="font-heading text-[48px] mb-6">Submit an App</h1>
          <p className="text-[15px] text-gray-600 dark:text-gray-400 mb-12">
            Found a genuinely free app that should be featured? We'd love to hear about it! 
            All submissions are verified before being published.
          </p>

          <SubmitForm onSubmit={handleSubmit} />
        </div>
      </main>
      <Footer />
    </>
  );
}
