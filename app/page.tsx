import CompanionCard from '@/components/CompanionCard'
import CompanionsList from '@/components/CompanionsList'
import CTA from '@/components/CTA'
import { getAllCompanions, getRecentSessions } from '@/lib/actions/companion.actions'
import { getSubjectColor } from '@/lib/utils'

const Page =  async () => {
  const companion = await getAllCompanions({ limit: 3 });
  const recentSessionsCompanions = await getRecentSessions(3);
  return (
    <main>
      <h1>Popular Companions</h1>
      <section className='home-section'>
        { companion.map((companion) => (
          
          <CompanionCard 
            key={companion.id}
            {...companion}
            color={getSubjectColor(companion.subject)}
          /> 
        )) }
      </section> 

      <section className='home-section'>
        <CompanionsList 
          title="Recently completed sessions"
          companions={recentSessionsCompanions}
          classNames="w-2/3 max-lg:w-full"
        />
        <CTA />
      </section>
    </main>
  )
}

export default Page