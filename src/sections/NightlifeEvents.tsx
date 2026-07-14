"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Music, Speaker } from "lucide-react";
import Section from "@/components/Section";
import LoopCard from "@/components/LoopCard";
import IconBadge from "@/components/IconBadge";
import Button from "@/components/Button";
import { NIGHTLIFE_EVENTS, CONTACT } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";

gsap.registerPlugin(ScrollTrigger);

const EVENT_ICONS = [Music, Speaker, Music];

export default function NightlifeEvents() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const items = containerRef.current.querySelectorAll(".nightlife-card");
    gsap.set(items, { opacity: 0, y: 40 });

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 80%",
      once: true,
      onEnter: () => {
        gsap.to(items, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.12,
        });
      },
    });
  }, []);

  return (
    <Section id="nightlife" glowPosition="top-right" glowColor="violet">
      <div className="max-w-7xl mx-auto px-6">
        <span className="eyebrow mb-4 block" style={{ color: "var(--accent-violet)" }}>
          AFTER DARK
        </span>
        {/* Header */}
        <h2 className="heading-section mb-4">
          The rooftop doesn&apos;t close{" "}
          <span style={{ color: "var(--accent-violet)" }}>
            when dinner does.
          </span>
        </h2>
        
        <p className="body-text max-w-2xl mb-12">
          Resident DJs, live music nights, and themed party nights run
          through the week — from soulful live sets to full-production
          theme nights. Follow{" "}
          <a
            href={CONTACT.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-violet hover:underline"
            onClick={() => trackEvent("instagram_click")}
          >
            {CONTACT.instagramHandle}
          </a>{" "}
          for what&apos;s on.
        </p>

        {/* Event cards — Horizontal Slider */}
        <div
          ref={containerRef}
          className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {NIGHTLIFE_EVENTS.map((event, i) => (
            <div key={event.title} className="nightlife-card snap-start shrink-0 w-[300px] sm:w-[360px]">
              <LoopCard hoverAccent="violet" className="h-full flex flex-col">
                {event.image && (
                  <div className="mb-5 -mx-[28px] -mt-[28px] md:-mx-[28px] md:-mt-[28px] relative overflow-hidden rounded-t-[16px]" style={{ aspectRatio: "4/3" }}>
                    <img
                      src={event.image}
                      alt={event.title}
                      className="absolute inset-0 w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-void/40 to-transparent" />
                  </div>
                )}
                
                <div className="flex-1 flex flex-col">
                  <h3 className="text-text-primary font-semibold text-xl mb-2 font-display">
                    {event.title}
                  </h3>
                  <p className="text-text-muted text-sm mb-4 line-clamp-2">
                    {event.description}
                  </p>
                  <span
                    className="text-xs font-mono uppercase tracking-wider block mb-6"
                    style={{ color: "var(--accent-violet)" }}
                  >
                    {event.schedule}
                  </span>
                  <div className="mt-auto">
                    <Button
                      as="link"
                      href={event.ctaLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="secondary"
                      size="sm"
                      className="border-violet text-violet hover:bg-violet/10 w-full justify-center"
                      onClick={() => trackEvent("instagram_click")}
                    >
                      {event.cta}
                    </Button>
                  </div>
                </div>
              </LoopCard>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
