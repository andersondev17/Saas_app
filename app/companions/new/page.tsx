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
  if(!userId) redirect('/sign-in/')
    
  return (
    <main className="lg:w-1/3 md:w-2/3 items-center justify-center">
      <article className="w-full gap-4 flex flex-col">
        <h1>Companion Builder</h1>

        <CompanionForm  />
      </article>
    </main>
  )
}

export default NewCompanion;