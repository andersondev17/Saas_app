import CompanionCard from '@/components/CompanionCard'
import CompanionsList from '@/components/CompanionsList'
import CTA from '@/components/CTA'
import { recentSessions } from '@/constants'

const Page = () => {
  return (
    <main>
      <h1>Popular Companions</h1>
      <section className='home-section'>
        <CompanionCard 
          id="123"
          name="Neura the Brainy Explorer"
          topic="Neutral Networks of the Brain"
          subject="Science"
          duration={45}
          color="#ffda6e"
        />
        <CompanionCard
          id="456"
          name="Countsy Network of the Wizard"
          topic="Derivates and Integrals"
          subject="Maths"
          duration={30}
          color="#a5d0ff"
        />
        <CompanionCard
          id="789"
          name="Lumina the Lightbringer"
          topic="Language"
          subject="English and Literature"
          duration={30}
          color="#e5d0ff"
        />
      </section> 

      <section className='home-section'>
        <CompanionsList 
          title="Recently completed sessions"
          companions={recentSessions}
          classNames="w-2/3 max-lg:w-full"
        />
        <CTA />
      </section>
    </main>
  )
}

export default Page