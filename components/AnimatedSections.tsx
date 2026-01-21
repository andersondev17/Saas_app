'use client'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'

type AnimatedSectionsProps = {
    children: React.ReactNode[]
}

export default function AnimatedSections({ children }: AnimatedSectionsProps) {
    const sectionsRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!sectionsRef.current) return

        gsap.registerPlugin(ScrollTrigger)

        const panels = gsap.utils.toArray<HTMLElement>('.animated-panel')

        if (panels.length === 0) return

        const mm = gsap.matchMedia()

        mm.add("(min-width: 1024px)", () => {
            panels.forEach((panel) => {
                ScrollTrigger.create({
                    trigger: panel,
                    start: "top top",
                    end: () => "+=" + panel.offsetHeight,
                    pin: true,
                    pinSpacing: false,
                })
            })
        })
        mm.add("(max-width: 1023px)", () => {
            panels.forEach((panel) => {
                ScrollTrigger.create({
                    trigger: panel,
                    start: "top top",
                    end: () => "+=" + panel.offsetHeight,
                    pin: true,
                    pinSpacing: false,
                })
            })
        })

        const pageScrollTrigger = ScrollTrigger.create({
            snap: {
                snapTo: 1 / panels.length,
                duration: 200,
                ease: 'power1.inOut',
            },
        })

        return () => {
            pageScrollTrigger.kill()
            ScrollTrigger.getAll().forEach((st) => st.kill())
            mm.revert()
        }
    }, [])

    return (
        <div ref={sectionsRef} className="relative w-full">
            {children.map((child, index) => (
                <section key={index} className="animated-panel">
                    {child}
                </section>
            ))}
        </div>
    )
}