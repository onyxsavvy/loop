"use client";

import { useRef, useEffect } from "react";
import { MARQUEE_TEXT } from "@/lib/constants";

export default function Marquee() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      container.style.animationPlayState = "paused";
    }
  }, []);

  return (
    <div className="relative py-5 border-y border-hairline overflow-hidden bg-surface/50">
      <div
        ref={containerRef}
        className="flex whitespace-nowrap animate-marquee hover:[animation-play-state:paused]"
      >
        {/* Duplicate content for seamless loop */}
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className="inline-block font-cursive text-3xl sm:text-4xl capitalize tracking-wide text-copper/80 px-8"
          >
            {MARQUEE_TEXT.toLowerCase()}
          </span>
        ))}
      </div>
    </div>
  );
}
