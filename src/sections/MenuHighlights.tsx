"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Section from "@/components/Section";
import LoopCard from "@/components/LoopCard";
import Button from "@/components/Button";
import { MENU_HIGHLIGHTS, CUISINES, PRICE } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";

gsap.registerPlugin(ScrollTrigger);

export default function MenuHighlights() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionContentRef.current) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const items = sectionContentRef.current.querySelectorAll(".menu-reveal");
    gsap.set(items, { opacity: 0, y: 30 });

    ScrollTrigger.create({
      trigger: sectionContentRef.current,
      start: "top 80%",
      once: true,
      onEnter: () => {
        gsap.to(items, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
        });
      },
    });
  }, []);

  return (
    <Section id="menu" glowPosition="top-right" glowColor="copper">
      <div ref={sectionContentRef} className="max-w-7xl mx-auto px-6">
        <span className="eyebrow mb-4 block menu-reveal">FROM THE KITCHEN</span>
        <h2 className="heading-section mb-4 menu-reveal">
          Five cuisines.{" "}
          <span className="text-copper">One rooftop kitchen.</span>
        </h2>

        {/* Cuisine chips */}
        <div className="flex flex-wrap gap-2 mb-10 menu-reveal">
          {CUISINES.map((cuisine) => (
            <span
              key={cuisine}
              className="px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider bg-surface-2 border border-hairline text-text-muted"
            >
              {cuisine}
            </span>
          ))}
        </div>

        {/* Horizontal drag-scroll row wrapper */}
        <div className="relative group menu-reveal">
          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {MENU_HIGHLIGHTS.map((dish) => (
              <div
                key={dish.name}
                className="snap-start shrink-0 w-[300px] sm:w-[340px]"
              >
                <LoopCard className="h-full flex flex-col">
                  <div className="mb-4 -mx-5 -mt-5 sm:-mx-7 sm:-mt-7 relative overflow-hidden rounded-t-[16px]" style={{ aspectRatio: "4/3" }}>
                    <Image
                      src={dish.image}
                      alt={dish.alt}
                      fill
                      className="object-cover"
                      sizes="340px"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-void/30 to-transparent" />
                  </div>
                  <h3 className="text-text-primary font-semibold text-lg mb-1 font-display">
                    {dish.name}
                  </h3>
                  <p className="text-text-muted text-sm leading-relaxed">
                    {dish.description}
                  </p>
                </LoopCard>
              </div>
            ))}
          </div>

          {/* Floating Navigation Buttons (Desktop Only) */}
          <div className="hidden md:block opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button 
              onClick={() => scrollRef.current?.scrollBy({ left: -360, behavior: "smooth" })}
              className="absolute -left-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-void border border-hairline hover:bg-surface-2 transition-colors text-text-primary shadow-2xl"
              aria-label="Scroll left"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </button>
            <button 
              onClick={() => scrollRef.current?.scrollBy({ left: 360, behavior: "smooth" })}
              className="absolute -right-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-void border border-hairline hover:bg-surface-2 transition-colors text-text-primary shadow-2xl"
              aria-label="Scroll right"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </button>
          </div>
        </div>

        {/* Price note + CTA */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-8 menu-reveal">
          <span className="text-text-muted text-sm font-mono uppercase tracking-wider">
            {PRICE.display} &middot; Full bar available
          </span>
          <Button
            as="link"
            href="#"
            variant="secondary"
            size="default"
            onClick={() => trackEvent("menu_view_click")}
          >
            View Full Menu
          </Button>
        </div>
      </div>
    </Section>
  );
}
