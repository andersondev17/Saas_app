'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { useEffect, useRef, useState } from 'react';

gsap.registerPlugin(DrawSVGPlugin);

interface MobileMenuToggleProps {
    onToggle?: (isOpen: boolean) => void;
    className?: string;
}

export default function MobileMenuToggle({ onToggle, className = '' }: MobileMenuToggleProps) {
    const [isOpen, setIsOpen] = useState(false);
    const topLineRef = useRef<SVGPathElement>(null);
    const midLineRef = useRef<SVGPathElement>(null);
    const botLineRef = useRef<SVGPathElement>(null);
    const timelineRef = useRef<gsap.core.Timeline>(null);

    const xLine1Ref = useRef<SVGPathElement>(null);
    const xLine2Ref = useRef<SVGPathElement>(null);



    const prefersReducedMotion = useRef(false);

    useEffect(() => {
        prefersReducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }, []);

    useGSAP(() => {
        if (
            !topLineRef.current ||
            !midLineRef.current ||
            !botLineRef.current ||
            !xLine1Ref.current ||
            !xLine2Ref.current
        ) return;

        const duration = prefersReducedMotion.current ? 0 : 0.55;
        const easeMain = 'power3.inOut';

        gsap.set(
            [topLineRef.current, midLineRef.current, botLineRef.current],
            { drawSVG: '20% 80%' }
        );

        gsap.set([xLine1Ref.current, xLine2Ref.current], {
            drawSVG: '50% 50%',
            opacity: 1
        });

        timelineRef.current = gsap.timeline({ paused: true })

            // 1️ Hamburger retracta
            .to(
                [topLineRef.current, midLineRef.current, botLineRef.current],
                {
                    drawSVG: '50% 50%',
                    duration: duration * 0.25,
                    ease: easeMain
                }
            )

            // 2️ Centro colapsa
            .to(
                midLineRef.current,
                {
                    opacity: 0,
                    duration: duration * 0.15
                },
                '<'
            )

            // 3️ X se dibuja desde el centro
            .to(
                [xLine1Ref.current, xLine2Ref.current],
                {
                    drawSVG: '0% 100%',
                    duration: duration * 0.6,
                    ease: easeMain,
                    stagger: 0.08
                },
                '<+=0.05'
            );
    }, []);


    const handleToggle = () => {
        if (!timelineRef.current) return;

        const newState = !isOpen;
        setIsOpen(newState);
        onToggle?.(newState);

        if (prefersReducedMotion.current) {
            timelineRef.current.progress(newState ? 1 : 0);
        } else {
            newState ? timelineRef.current.play() : timelineRef.current.reverse();
        }
    };

    return (
        <button
            onClick={handleToggle}
            className={`md:hidden relative p-3 -mr-3 ${className}`}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
        >
            <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="overflow-visible"
            >
                {/* Hamburger */}
                <path ref={topLineRef} d="M4 6H20" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
                <path ref={midLineRef} d="M4 12H20" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
                <path ref={botLineRef} d="M4 18H20" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />

                {/* X paths */}
                <path
                    ref={xLine1Ref}
                    d="M6 6L18 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                />
                <path
                    ref={xLine2Ref}
                    d="M18 6L6 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                />
            </svg>

        </button>
    );
}