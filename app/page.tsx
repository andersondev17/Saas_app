import AnimatedSections from '@/components/AnimatedSections'
import CompanionCard from '@/components/CompanionCard'
import CompanionsList from '@/components/CompanionsList'
import CTA from '@/components/CTA'
import HeroSection from '@/components/HeroSection'
import { getAllCompanions, getRecentSessions } from '@/lib/actions/companion.actions'
import { getSubjectColor } from '@/lib/utils'

const Page = async () => {
  const companion = await getAllCompanions({ limit: 4 })
  const recentSessionsCompanions = await getRecentSessions(3)

  return (
    <main className="home-animated">
      <AnimatedSections>
        <HeroSection />
        {/* Panel 1 */}
        <section className="w-full h-screen flex flex-col justify-center px-10 max-sm:px-6 bg-gradient-to-br from-emerald-100 to-white">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 pb-2 ">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-foreground/5 text-xs md:text-sm font-medium text-muted-foreground mb-1 md:mb-3 hidden md:block">
                Featured
              </span>
              <h2 className="text-2xl md:text-5xl font-bold tracking-tight text-foreground">
                Popular Companions
              </h2>
            </div>
            <p className="text-muted-foreground max-w-md ">
              Explore our most loved AI tutors, each designed to help you master new skills effortlessly.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4">
            {companion.map((companion) => (
              <CompanionCard
                key={companion.id}
                {...companion}
                color={getSubjectColor(companion.subject)}
              />
            )) }
          </div>
        </section>

        {/* Panel 2 */}
        <section className="w-full h-screen flex flex-col justify-start md:justify-center px-6 py-12 bg-gradient-to-br from-purple-100 to-white">
          <div className="mx-auto w-full">
            <CompanionsList
              title="Recently completed sessions"
              companions={recentSessionsCompanions}
            />
          </div>
        </section>

        {/* Panel 3 */}
        <section className="w-full h-screen flex flex-col justify-center px-6 py-12 bg-gradient-to-br from-neutral-900 to-purple-900">
          <div className="w-full h-full flex flex-col justify-center items-center px-14 max-sm:px-6">
            <CTA />
          </div>
        </section>

      </AnimatedSections>

    </main>
  )
}

export default Page