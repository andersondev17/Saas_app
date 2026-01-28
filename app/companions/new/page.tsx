import CompanionForm from "@/components/CompanionForm";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { newCompanionPermissions } from "@/lib/actions/companion.actions";
import { auth } from "@clerk/nextjs/server";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
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

  const canCreateCompanion = await newCompanionPermissions();

  return (
    <main className="w-full max-w-7xl mx-auto">
      {canCreateCompanion ? (

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
      ) : (
        <article className="companion-limit">
          <Image src="/images/limit.svg" alt="Companion Limit Reached" width={460} height={230} />
          <div className="cta-badge">
            Upgrade your plan
          </div>
          <h1>            You've reached your limit          </h1>
          <p>You've reached your companion limit. Upgrade to create more companions and premium features.</p>
          <Link href="/subscription" >
             <InteractiveHoverButton className="btn-primary text-primary hover:text-white">
            Upgrade my plan
          </InteractiveHoverButton>
          </Link>
        </article>
      )}

    </main>
  )
}

export default NewCompanion;