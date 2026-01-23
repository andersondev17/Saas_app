"use client"

import Link from "next/link"
import TrustBarVelocity from "./TrustBarVelocity"
import { InteractiveHoverButton } from "./ui/interactive-hover-button"
import { SplitTextAnimation } from "./ui/split-text"
import { VideoText } from "./ui/video-text"

export default function HeroSection() {
    return (
        <section
            className="relative w-full min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 pt-20 pb-16 overflow-hidden"
            aria-labelledby="hero-heading"
        >
            {/* Background layer*/}
            <div className="absolute inset-0 pointer-events-none">
                {/* Base gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-(--muted)" />

                {/* Radial glow top-left - teal */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,oklch(from_var(--accent)_l_c_h/0.08)_0%,transparent_50%)]" />

                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,oklch(from_var(--primary)_l_c_h/0.06)_0%,transparent_50%)]" />

            </div>

            <header className="relative z-10 w-full max-w-5xl mx-auto text-center space-y-8">

                <div className="relative h-27.5 w-full flex items-center justify-center">
                    <VideoText
                        src="https://cdn.magicui.design/ocean-small.webm"
                        fontSize={18}
                        className="font-bold"
                        aria-label="Learn"
                    >
                        Learn
                    </VideoText>
                </div>

                {/* Main heading */}
                <SplitTextAnimation
                    type="words"
                    trigger="load"
                    stagger={0.08}
                    duration={0.9}
                    ease="back.out(1.7)"
                    delay={0.5}
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]"
                >
                    <h1 id="hero-heading" className="inline">
                        with{" "}
                        <span className="relative inline-block whitespace-nowrap">
                            {/* Accent-highlighted headline */}
                            <span className="relative z-10 text-(--accent-strong)">
                                an AI that learns you
                            </span>

                            {/* Underline blur effect */}
                            <span
                                className="absolute bottom-1 sm:bottom-2 left-0 w-full h-3 sm:h-4 bg-(--accent)/25 -rotate-1 blur-sm"
                                aria-hidden="true"
                            />
                        </span>
                    </h1>
                </SplitTextAnimation>

                <SplitTextAnimation
                    type="lines"
                    trigger="load"
                    stagger={0.15}
                    duration={1}
                    ease="power3.out"
                    delay={0.8}
                    className="text-sm md:text-base lg:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto"
                >
                    <p className="inline">
                        A personal learning companion that adapts to you, not the syllabus.
                    </p>
                </SplitTextAnimation>

                {/* CTA  */}
                <div
                    className="pt-4 animate-in fade-in slide-in-from-bottom-4 fill-mode-both"
                    style={{ animationDelay: '1.2s' }}
                >
                    <Link href="/companions/new" aria-label="Start learning for free with AI companions">
                        <InteractiveHoverButton className="shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300">
                            Start Learning Free
                        </InteractiveHoverButton>
                    </Link>
                </div>
            </header>

            <aside className="relative z-10 w-full max-w-7xl mx-auto">
                <TrustBarVelocity />
            </aside>

        </section>
    )
}