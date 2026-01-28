import Image from "next/image"
import Link from "next/link"
import { InteractiveHoverButton } from "./ui/interactive-hover-button"

const CTA = () => {
  return (
    <section className="cta-section">
      <h2 className="text-3xl font-bold">
        Build and personalize Learning Companion
      </h2>
      <p>Pick a name, subject, voice  and personality </p>
      <Image src="/images/cta.svg" alt="cta" width={362} height={232} />
      <div className="mt-6 flex items-center gap-4">
        <InteractiveHoverButton className=" bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400">
          <Link href="/companions/new" className="relative z-10 flex items-center gap-2">
            <Image src="/icons/plus.svg" alt="plus" width={16} height={16} />
            <p>Build a New Companion</p>

          </Link>
        </InteractiveHoverButton>
      </div>
    </section>
  )
}

export default CTA