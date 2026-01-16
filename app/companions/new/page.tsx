import CompanionForm from "@/components/CompanionForm";
import { auth } from "@clerk/nextjs/server";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: 'Create New Companion',
  description: 'Build your personalized AI companion to help you learn any subject',
  openGraph: {
    title: 'Create New Companion',
    description: 'Build your personalized AI companion to help you learn any subject',
  },
};

const NewCompanion = async () => {
  const { userId } = await auth();
  if (!userId) redirect('/sign-in/')

  return (
    <main className="w-full max-w-7xl mx-auto">
      <article className="w-full flex flex-col md:flex-row gap-8 md:gap-12 items-start">
        {/* Left Side - Text Content */}
        <div className="w-full md:w-1/2 flex flex-col gap-4 md:sticky md:top-24">
          <div className="inline-flex items-center justify-start">
            <span className="bg-gradient-to-r from-neutral-900 to-neutral-700 text-white text-xs font-semibold px-4 py-2 rounded-full shadow-md">
              ✨ AI-Powered Learning
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 bg-clip-text text-transparent">
            Companion Builder
          </h1>

          <p className="text-lg text-neutral-600 leading-relaxed">
            Create your personalized AI tutor in minutes. Choose the subject, voice, and teaching style that works best for you.
          </p>
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2">
          <CompanionForm />
        </div>
      </article>
    </main>
  )
}

export default NewCompanion;