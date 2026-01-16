import CompanionCard from "@/components/CompanionCard";
import CreateCompanionCard from "@/components/CreateCompanionCard";
import SearchInput from "@/components/SearchInput";
import SubjectFilter from "@/components/SubjectFilter";
import { getAllCompanions } from "@/lib/actions/companion.actions";
import { getSubjectColor } from "@/lib/utils";

const Companion = async ({ searchParams }: SearchParams) => {
  const filters = await searchParams;
  const subject = filters.subject ? filters.subject : '';
  const topic = filters.topic ? filters.topic : '';

  const companions = await getAllCompanions({ subject, topic });
  const hasResults = companions.length > 0;
  const hasFilters = Boolean(subject || topic);

  return (
    <main>
      <section className="flex justify-between gap-4 max-sm:flex-col">
        <h1>Companions</h1>
        <div className="flex gap-4">
          <SearchInput />
          <SubjectFilter />
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
        <section className="companions-grid">
          {!hasFilters && <CreateCompanionCard />}

          {companions.map((companion) => (
            <CompanionCard
              key={companion.id}
              {...companion}
              color={getSubjectColor(companion.subject)}
            />
          ))}
        </section>
      )}

    </main>
  )
}

export default Companion;