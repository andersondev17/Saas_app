import CardSlider from "@/components/CardSlider";
import CompanionCard from "@/components/CompanionCard";
import SearchInput from "@/components/SearchInput";
import SubjectFilter from "@/components/SubjectFilter";
import { getAllCompanions } from "@/lib/actions/companion.actions";
import { getSubjectColor } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const Companion = async ({ searchParams }: SearchParams) => {
  const filters = await searchParams;
  const subject = filters.subject ? filters.subject : '';
  const topic = filters.topic ? filters.topic : '';

  const companions = await getAllCompanions({ subject, topic });
  const hasResults = companions.length > 0;
  const hasFilters = Boolean(subject || topic);

  return (
    <main className="min-h-screen">
      <section className="flex justify-between gap-4 max-sm:flex-col px-6 py-4 sticky top-16 bg-background z-10 border-b">
        <h1>Companions</h1>
        <div className="flex gap-4">
          <SearchInput />
          <SubjectFilter />
           <Link href="/companions/new" className="btn-primary">
                <Image src="/icons/plus.svg" alt="plus" width={32} height={32} />
            </Link>
        </div>
      </section>

      {!hasResults && hasFilters && (
        <section className="text-center py-12">
          <p className="text-muted-foreground">
            No companions found for your search. Try adjusting your filters.
          </p>
        </section>
      )}

      {hasResults && (
        <>
          {hasResults && !hasFilters && (
            <section className="py-8 md:py-12">
              <CardSlider
                title="Featured Companions"
                subtitle="Scroll, drag, or use arrows to explore"
                spacing={0.1}
                showControls={true}
              >
                {companions.map((companion) => (
                  <CompanionCard
                    key={companion.id}
                    {...companion}
                    color={getSubjectColor(companion.subject)}
                  />
                ))}
              </CardSlider>
            </section>
          )}

          {hasResults && hasFilters && (
            <section className="companions-grid px-6 py-8">
              {companions.map((companion) => (
                <CompanionCard
                  key={companion.id}
                  {...companion}
                  color={getSubjectColor(companion.subject)}
                />
              ))}
            </section>
          )}
        </>
      )}
    </main>
  )
}

export default Companion;