"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Volume2, VolumeX } from "lucide-react";
import Image from "next/image";
import Section from "@/components/Section";
import { IMAGES } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: 14000, suffix: "+", label: "sq/ft rooftop", prefix: "" },
  { value: 5, suffix: "", label: "cuisines under one kitchen", prefix: "" },
  { value: 4.3, suffix: "", label: "from 1,355+ guests", prefix: "", isFloat: true, starSuffix: true },
  { value: 12, suffix: "", label: "PM \u2013 12 AM open daily", prefix: "" },
];

function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  isFloat = false,
  starSuffix = false,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  isFloat?: boolean;
  starSuffix?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      ref.current.textContent = `${prefix}${isFloat ? value.toFixed(1) : value.toLocaleString()}${suffix}${starSuffix ? "\u2605" : ""}`;
      return;
    }

    const counter = { val: 0 };

    const trigger = ScrollTrigger.create({
      trigger: ref.current,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.to(counter, {
          val: value,
          duration: 2,
          ease: "power2.out",
          onUpdate: () => {
            if (ref.current) {
              const display = isFloat
                ? counter.val.toFixed(1)
                : Math.floor(counter.val).toLocaleString();
              ref.current.textContent = `${prefix}${display}${suffix}${starSuffix ? "\u2605" : ""}`;
            }
          },
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, [value, suffix, prefix, isFloat, starSuffix]);

  return (
    <span ref={ref} className="heading-display text-copper block" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
      {prefix}0{suffix}
    </span>
  );
}

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  // Auto mute when scrolled out of view
  useEffect(() => {
    if (!videoRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            setIsMuted(true);
          }
        });
      },
      { threshold: 0 }
    );
    observer.observe(videoRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const els = containerRef.current.querySelectorAll(".reveal-item");

    gsap.set(els, { opacity: 0, y: 30 });

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 80%",
      once: true,
      onEnter: () => {
        gsap.to(els, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.08,
        });
      },
    });
  }, []);

  return (
    <Section id="about" glowPosition="top-right" glowColor="copper">
      <div ref={containerRef} className="max-w-7xl mx-auto px-6">
        {/* Asymmetric 60/40 split */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">
          {/* Text side — 60% */}
          <div className="lg:col-span-3 space-y-6">
            <span className="eyebrow mb-4 block reveal-item">THE STORY</span>
            <h2 className="heading-section mb-8 reveal-item">
              One of India&apos;s largest rooftop bars.{" "}
              <span className="text-copper">Built for Ranchi.</span>
            </h2>
            <p className="body-text mb-6 reveal-item">
              Loop sits on the 8th floor of Eastern Mall, Lalpur — 14,000
              sq/ft of rooftop kitchen, bar, and nightclub with a skyline
              view most cities don&apos;t get. It&apos;s not a restaurant with a bar
              attached, or a club with a kitchen as an afterthought.
              It&apos;s built as one experience: come for dinner, stay for the
              DJ.
            </p>
            <p className="body-text reveal-item">
              The kitchen runs American, Asian, Chinese, Indian, and Thai
              menus side by side. The bar runs full — cocktails, mocktails,
              and a mixology program that doesn&apos;t cut corners. And when the
              plates clear, the pro audio/visual setup takes over and the
              rooftop becomes Ranchi&apos;s nightclub.
            </p>
          </div>

          {/* Visual side — 40% */}
          <div className="lg:col-span-2">
            {/* Venue video */}
            <div 
              className="loop-card p-0 overflow-hidden mb-6 relative reveal-item" 
              style={{ aspectRatio: "4/5" }}
            >
              <video
                ref={videoRef}
                src="/images/loop-video.mp4"
                poster={IMAGES.signage}
                autoPlay
                loop
                muted={isMuted}
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-void/30 to-transparent pointer-events-none" />
              
              {/* Mute/Unmute Icon */}
              <div
                className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-void/60 backdrop-blur-sm border border-white/10 text-white shadow-lg pointer-events-none transition-transform active:scale-95"
              >
                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </div>

              {/* Click Overlay for Mobile & Desktop */}
              <button
                className="absolute inset-0 w-full h-full cursor-pointer z-20 opacity-0"
                onClick={() => setIsMuted(!isMuted)}
                aria-label={isMuted ? "Unmute video" : "Mute video"}
              />
            </div>
          </div>
        </div>

        {/* Stats Row — Full Width, Centered, Responsive */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 reveal-item">
          {STATS.map((stat, i) => (
            <div
              key={i}
              className="loop-card flex flex-col items-center justify-center text-center"
              style={{ padding: "32px 24px" }}
            >
              <AnimatedCounter
                value={stat.value}
                suffix={stat.suffix}
                prefix={stat.prefix}
                isFloat={stat.isFloat}
                starSuffix={stat.starSuffix}
              />
              <span className="text-text-muted text-xs mt-2 font-mono uppercase tracking-wider block">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
