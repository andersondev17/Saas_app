'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Draggable } from 'gsap/dist/Draggable';
import { useLayoutEffect, useRef } from 'react';

interface InfiniteCardSliderStyledProps {
    children: React.ReactNode[];
    spacing?: number;
    title?: string;
    subtitle?: string;
    showControls?: boolean;
}

export default function CardSlider({
    children,
    spacing = 0.1,
    title = 'Featured Companions',
    subtitle = 'Scroll, drag, or use arrows to explore',
    showControls = true,
}: InfiniteCardSliderStyledProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const galleryRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLUListElement>(null);
    const prevBtnRef = useRef<HTMLButtonElement>(null);
    const nextBtnRef = useRef<HTMLButtonElement>(null);
    const proxyRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (!cardsRef.current || !galleryRef.current || children.length === 0) return;

        gsap.registerPlugin(ScrollTrigger, Draggable);

        const cards = gsap.utils.toArray<HTMLElement>(cardsRef.current.children);

        gsap.set(cards, { xPercent: 400, opacity: 0, scale: 0 });

        let iteration = 0;

        const animateFunc = (element: HTMLElement) => {
            const tl = gsap.timeline();
            tl.fromTo(
                element,
                { scale: 0, opacity: 0 },
                {
                    scale: 1,
                    opacity: 1,
                    zIndex: 100,
                    duration: 0.5,
                    yoyo: true,
                    repeat: 1,
                    ease: 'power1.in',
                    immediateRender: false,
                }
            ).fromTo(
                element,
                { xPercent: 400 },
                {
                    xPercent: -400,
                    duration: 1,
                    ease: 'none',
                    immediateRender: false,
                },
                0
            );
            return tl;
        };

        const buildSeamlessLoop = (items: HTMLElement[]) => {
            const overlap = Math.ceil(1 / spacing);
            const startTime = items.length * spacing + 0.5;
            const loopTime = (items.length + overlap) * spacing + 1;
            const rawSequence = gsap.timeline({ paused: true });
            const loopTimeline = gsap.timeline({
                paused: true,
                repeat: -1,
                onRepeat() {
                    // @ts-ignore
                    this._time === this._dur && (this._tTime += this._dur - 0.01);
                },
            });

            const l = items.length + overlap * 2;

            for (let i = 0; i < l; i++) {
                const index = i % items.length;
                const time = i * spacing;
                rawSequence.add(animateFunc(items[index]), time);
                if (i <= items.length) {
                    loopTimeline.add('label' + i, time);
                }
            }

            rawSequence.time(startTime);
            loopTimeline
                .to(rawSequence, {
                    time: loopTime,
                    duration: loopTime - startTime,
                    ease: 'none',
                })
                .fromTo(
                    rawSequence,
                    { time: overlap * spacing + 1 },
                    {
                        time: startTime,
                        duration: startTime - (overlap * spacing + 1),
                        immediateRender: false,
                        ease: 'none',
                    }
                );

            return loopTimeline;
        };

        const loopTimeline = buildSeamlessLoop(cards);
        const snapTime = gsap.utils.snap(spacing);
        const playhead = { offset: 0 };
        const wrapTime = gsap.utils.wrap(0, loopTimeline.duration());

        const scrub = gsap.to(playhead, {
            offset: 0,
            onUpdate() {
                loopTimeline.time(wrapTime(playhead.offset));
            },
            duration: 0.5,
            ease: 'power3',
            paused: true,
        });

        const wrap = (iterationDelta: number, scrollTo: number) => {
            iteration += iterationDelta;
            trigger.scroll(scrollTo);
            trigger.update();
        };

        const progressToScroll = (progress: number) =>
            gsap.utils.clamp(1, trigger.end - 1, gsap.utils.wrap(0, 1, progress) * trigger.end);

        const trigger = ScrollTrigger.create({
            start: 0,
            end: `+=${cards.length * 2000}`, // end length scales with number of cards to maintain consistent scroll velocity
            onUpdate(self) {
                const scroll = self.scroll();
                if (scroll > self.end - 1) {
                    wrap(1, 2);
                } else if (scroll < 1 && self.direction < 0) {
                    wrap(-1, self.end - 2);
                } else {
                    scrub.vars.offset = (iteration + self.progress) * loopTimeline.duration();
                    scrub.invalidate().restart();
                }
            },
            pin: containerRef.current,
            anticipatePin: 1,
        });

        const scrollToOffset = (offset: number) => {
            const snappedTime = snapTime(offset);
            const progress =
                (snappedTime - loopTimeline.duration() * iteration) / loopTimeline.duration();
            const scroll = progressToScroll(progress);

            if (progress >= 1 || progress < 0) {
                return wrap(Math.floor(progress), scroll);
            }
            trigger.scroll(scroll);
        };

        const onScrollEnd = () => scrollToOffset(scrub.vars.offset);
        ScrollTrigger.addEventListener('scrollEnd', onScrollEnd);

        const onNext = () => scrollToOffset(scrub.vars.offset + spacing);
        const onPrev = () => scrollToOffset(scrub.vars.offset - spacing);

        prevBtnRef.current?.addEventListener('click', onPrev);
        nextBtnRef.current?.addEventListener('click', onNext);

        let draggableInstance: Draggable[] | null = null;
        if (proxyRef.current) {
            draggableInstance = Draggable.create(proxyRef.current, {
                type: 'x',
                trigger: galleryRef.current,
                onPress() {
                    // @ts-ignore
                    this.startOffset = scrub.vars.offset;
                },
                onDrag() {
                    // @ts-ignore
                    const ratio = (this.startX - this.x) / galleryRef.current.offsetWidth;
                    scrub.vars.offset = this.startOffset + ratio;
                    scrub.invalidate().restart();
                },
                onDragEnd() {
                    scrollToOffset(scrub.vars.offset);
                },
            });
        }

        return () => {
            ScrollTrigger.removeEventListener('scrollEnd', onScrollEnd);
            prevBtnRef.current?.removeEventListener('click', onPrev);
            nextBtnRef.current?.removeEventListener('click', onNext);
            trigger.kill();
            scrub.kill();
            loopTimeline.kill();
            draggableInstance?.forEach((d) => d.kill());
        };
    }, [spacing, children.length]);

    return (
        <div ref={containerRef} className="slider-container">


            <div ref={galleryRef} className="gallery">
                <ul ref={cardsRef} className="cards">
                    {children.map((child, index) => (
                        <li key={index}>{child}</li>
                    ))}
                </ul>
                <div ref={proxyRef} className="drag-proxy" />
            </div>

            {showControls && (
                <div className="actions ">
                    <button ref={prevBtnRef} className="control-btn  shadow-lg shadow-primary/70" aria-label="Previous">
                        Prev
                    </button>
                    <button ref={nextBtnRef} className="control-btn shadow-lg shadow-primary/70" aria-label="Next">
                        Next
                    </button>
                </div>
            )}

        </div>
    );
}