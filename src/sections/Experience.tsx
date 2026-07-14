"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import Image from "next/image";
import { Building2, Speaker, Music, Martini, Mic2, Camera, type LucideIcon } from "lucide-react";
import Section from "@/components/Section";
import LoopCard from "@/components/LoopCard";
import IconBadge from "@/components/IconBadge";
import { EXPERIENCE_CARDS } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

const ICON_MAP: Record<string, LucideIcon> = {
  Building2,
  Speaker,
  Music,
  Martini,
  Mic2,
  Camera,
};

export default function Experience() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const cards = gridRef.current.querySelectorAll(".exp-card");
    gsap.set(cards, { opacity: 0, y: 40 });

    ScrollTrigger.create({
      trigger: gridRef.current,
      start: "top 80%",
      once: true,
      onEnter: () => {
        gsap.to(cards, {
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
    <Section id="experience" glowPosition="bottom-left" glowColor="copper">
      <div className="max-w-7xl mx-auto px-6">
        <span className="eyebrow mb-4 block">THE EXPERIENCE</span>
        <h2 className="heading-section mb-12">
          Six reasons to come up to the{" "}
          <span className="text-copper">8th floor.</span>
        </h2>

        {/* Bento Grid — not a uniform 3×2 */}
        <div
          ref={gridRef}
          className="grid gap-4 md:gap-5"
          style={{
            gridTemplateColumns: "repeat(12, 1fr)",
            gridTemplateRows: "auto",
          }}
        >
          {EXPERIENCE_CARDS.map((card, i) => {
            const Icon = ICON_MAP[card.icon];
            // Bento layout for 6 featured image cards:
            // Row 1: 7/5, Row 2: 4/8, Row 3: 6/6
            // This creates a highly attractive and aesthetic grid per the user's request
            const spanMap: Record<number, string> = {
              0: "md:col-span-7 col-span-12",   // Rooftop Lounge
              1: "md:col-span-5 col-span-12",   // Nightclub
              2: "md:col-span-4 col-span-12",   // Live Music
              3: "md:col-span-8 col-span-12",   // Mixology (wide bar shot)
              4: "md:col-span-6 col-span-12 sm:col-span-6",  // Karaoke
              5: "md:col-span-6 col-span-12 sm:col-span-6",  // Insta-Worthy
            };
            const colSpan = spanMap[i] || "md:col-span-6 col-span-12";

            return (
              <motion.div
                key={card.title}
                className={`exp-card ${colSpan}`}
                style={{ gridColumn: undefined }}
                whileHover={
                  typeof window !== "undefined" &&
                  window.matchMedia("(hover: hover)").matches
                    ? {
                        rotateX: -2,
                        rotateY: 3,
                        transition: { duration: 0.3 },
                      }
                    : undefined
                }
              >
                <LoopCard className="h-full flex flex-col">
                  {/* Real image for featured cards */}
                  {(() => {
                    const imgSrc = (card as { image?: string }).image;
                    const imgAlt = (card as { alt?: string }).alt || card.title;
                    if (card.featured && imgSrc) {
                      return (
                        <div className="mb-5 -mx-[28px] -mt-[28px] md:-mx-[28px] md:-mt-[28px] relative overflow-hidden rounded-t-[16px]" style={{ aspectRatio: "16/10" }}>
                          <Image
                            src={imgSrc}
                            alt={imgAlt}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 60vw"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-void/40 to-transparent" />
                        </div>
                      );
                    }
                    return null;
                  })()}

                  <div className="flex items-start gap-4">
                    <IconBadge icon={Icon} color="copper" />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-text-primary font-semibold text-lg mb-1 font-display">
                        {card.title}
                      </h3>
                      <p className="text-text-muted text-sm leading-relaxed">
                        {card.description}
                      </p>
                    </div>
                  </div>
                </LoopCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
