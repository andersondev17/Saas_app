'use client';

import { gsap } from 'gsap';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

interface RouteTransitionProps {
    children: React.ReactNode;
}

const RouteTransition = ({ children }: RouteTransitionProps) => {
    const pathname = usePathname();
    const [displayChildren, setDisplayChildren] = useState(children);
    const [isAnimating, setIsAnimating] = useState(false);
    const pathRef = useRef<SVGPathElement>(null);
    const timelineRef = useRef<gsap.core.Timeline | null>(null);
    const prevPathnameRef = useRef(pathname);

    useEffect(() => {
        if (!pathRef.current) return;

        // SVG path states for the morph animation
        const initial = "M 0 100 V 100 Q 50 100 100 100 V 100 z";
        const start = "M 0 100 V 50 Q 50 0 100 50 V 100 z";
        const end = "M 0 100 V 0 Q 50 0 100 0 V 100 z";

        // Create timeline for the route transition
        const tl = gsap.timeline({
            paused: true,
            onComplete: () => {
                setIsAnimating(false);
                setDisplayChildren(children);
            }
        });

        // Animation sequence
        tl.set(pathRef.current, { attr: { d: initial } })
            .to(pathRef.current, {
                attr: { d: start },
                duration: 0.4,
                ease: "power2.in"
            })
            .to(pathRef.current, {
                attr: { d: end },
                duration: 0.4,
                ease: "power2.out"
            })
            .to(pathRef.current, {
                attr: { d: initial },
                duration: 0.4,
                ease: "power2.in",
                delay: 0.1
            });

        timelineRef.current = tl;

        return () => {
            tl.kill();
        };
    }, [children]);

    useEffect(() => {
        // Trigger animation on route change
        if (pathname !== prevPathnameRef.current && timelineRef.current) {
            setIsAnimating(true);
            timelineRef.current.restart();
            prevPathnameRef.current = pathname;
        }
    }, [pathname]);

    return (
        <>
            {/* SVG Transition Overlay */}
            <svg
                className={`fixed inset-0 w-full h-full pointer-events-none z-[9999] transition-opacity duration-300 ${isAnimating ? 'opacity-100' : 'opacity-0'
                    }`}
                viewBox="0 0 100 100"
                preserveAspectRatio="xMidYMin slice"
            >
                <defs>
                    <linearGradient
                        id="route-transition-grad"
                        x1="0"
                        y1="0"
                        x2="99"
                        y2="99"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop offset="0.2" stopColor="var(--primary)" />
                        <stop offset="0.7" stopColor="var(--cta-gold)" />
                    </linearGradient>
                </defs>
                <path
                    ref={pathRef}
                    stroke="url(#route-transition-grad)"
                    fill="url(#route-transition-grad)"
                    strokeWidth="2px"
                    vectorEffect="non-scaling-stroke"
                    d="M 0 100 V 100 Q 50 100 100 100 V 100 z"
                />
            </svg>

            {/* Content */}
            <div className={isAnimating ? 'opacity-0' : 'opacity-100 transition-opacity duration-300'}>
                {displayChildren}
            </div>
        </>
    );
};

export default RouteTransition;