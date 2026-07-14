"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Section from "@/components/Section";
import LoopCard from "@/components/LoopCard";
import Lightbox from "@/components/Lightbox";
import { GALLERY_ITEMS } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

// Equal aspect grid configuration

export default function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const tiles = gridRef.current.querySelectorAll(".gallery-tile");
    gsap.set(tiles, { opacity: 0, y: 30, scale: 0.95 });

    ScrollTrigger.create({
      trigger: gridRef.current,
      start: "top 80%",
      once: true,
      onEnter: () => {
        gsap.to(tiles, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.08,
        });
      },
    });
  }, []);

  return (
    <Section id="gallery" glowPosition="bottom-left" glowColor="copper">
      <div className="max-w-7xl mx-auto px-6">
        <span className="eyebrow mb-4 block">THE VIBE</span>
        <h2 className="heading-section mb-12">
          What 14,000 sq/ft{" "}
          <span className="text-copper">actually looks like.</span>
        </h2>

        {/* Uniform Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
        >
          {GALLERY_ITEMS.map((item, i) => (
            <div
              key={i}
              className="gallery-tile aspect-[4/3] relative rounded-2xl overflow-hidden cursor-pointer group"
              onClick={() => setLightboxIndex(i)}
            >
              <Image
                src={item.image}
                alt={item.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
                loading="lazy"
              />
              {/* Subtle gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-void/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          isOpen={true}
          onClose={() => setLightboxIndex(null)}
          label={GALLERY_ITEMS[lightboxIndex].label}
          imageSrc={GALLERY_ITEMS[lightboxIndex].image}
          imageAlt={GALLERY_ITEMS[lightboxIndex].alt}
        />
      )}
    </Section>
  );
}
