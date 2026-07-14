"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star, StarHalf } from "lucide-react";
import Section from "@/components/Section";
import LoopCard from "@/components/LoopCard";
import { REVIEWS, STATS } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

export default function Reviews() {
  const containerRef = useRef<HTMLDivElement>(null);
  const ratingRef = useRef<HTMLSpanElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    setPrefersReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const doubledReviews = prefersReduced ? REVIEWS : [...REVIEWS, ...REVIEWS];

  // Helper to render star ratings dynamically
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<Star key={i} size={14} className="fill-copper text-copper" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<StarHalf key={i} size={14} className="fill-copper text-copper" />);
      } else {
        stars.push(<Star key={i} size={14} className="text-white/10 fill-transparent" />);
      }
    }
    return <div className="flex items-center gap-1 mb-4">{stars}</div>;
  };

  // Animate rating counter
  useEffect(() => {
    if (!ratingRef.current) return;

    if (prefersReduced) {
      ratingRef.current.textContent = `${STATS.rating}`;
      return;
    }

    const counter = { val: 0 };
    const trigger = ScrollTrigger.create({
      trigger: ratingRef.current,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.to(counter, {
          val: STATS.rating,
          duration: 2,
          ease: "power2.out",
          onUpdate: () => {
            if (ratingRef.current) {
              ratingRef.current.textContent = counter.val.toFixed(1);
            }
          },
        });
      },
    });

    return () => trigger.kill();
  }, [prefersReduced]);

  // GSAP entrance
  useEffect(() => {
    if (!containerRef.current || prefersReduced) return;
    const items = containerRef.current.querySelectorAll(".review-reveal");
    gsap.set(items, { opacity: 0, y: 30 });

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
          stagger: 0.1,
        });
      },
    });
  }, [prefersReduced]);

  // GSAP Marquee
  useEffect(() => {
    if (!trackRef.current || prefersReduced) return;

    tweenRef.current = gsap.to(trackRef.current, {
      xPercent: -50,
      ease: "none",
      duration: 40,
      repeat: -1,
    });

    return () => {
      tweenRef.current?.kill();
    };
  }, [prefersReduced]);

  const handlePause = () => tweenRef.current?.pause();
  const handleResume = () => tweenRef.current?.resume();

  return (
    <Section id="reviews" glowPosition="bottom-left" glowColor="copper">
      <div ref={containerRef} className="max-w-7xl mx-auto px-6 overflow-hidden">
        <span className="eyebrow mb-4 block review-reveal">GUEST REVIEWS</span>

        {/* Header & Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 review-reveal">
          {/* Rating headline */}
          <div className="flex items-baseline gap-3">
            <span
              ref={ratingRef}
              className="heading-display text-copper"
              style={{ fontSize: "clamp(3rem, 6vw, 5rem)" }}
            >
              0
            </span>
            <div>
              <span className="text-copper text-2xl">{"\u2605"}</span>
              <p className="text-text-muted text-sm font-mono uppercase tracking-wider">
                from 1,355+ people who&apos;ve been up here
              </p>
            </div>
          </div>
        </div>

        {/* Review marquee */}
        <div 
          className="relative review-reveal w-full"
          onMouseEnter={handlePause}
          onMouseLeave={handleResume}
          onTouchStart={handlePause}
          onTouchEnd={handleResume}
        >
          {prefersReduced ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {doubledReviews.map((review, i) => (
                <LoopCard key={i} className="h-full flex flex-col justify-between" as="article">
                  <div>
                    {renderStars(review.rating)}
                    <blockquote className="text-text-primary text-[15px] leading-relaxed mb-6 italic">
                      &ldquo;{review.quote}&rdquo;
                    </blockquote>
                  </div>
                  <div className="flex items-center gap-2 mt-auto">
                    <span className="text-text-primary text-sm font-semibold">
                      {review.author}
                    </span>
                  </div>
                </LoopCard>
              ))}
            </div>
          ) : (
            // Overflow container for touch-drag support
            <div 
              className="overflow-x-auto touch-pan-x flex w-full pb-4 scrollbar-hide" 
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              <div 
                ref={trackRef}
                className="flex gap-5 w-max will-change-transform" 
              >
                {doubledReviews.map((review, i) => (
                  <div
                    key={i}
                    className="shrink-0 w-[320px] sm:w-[380px]"
                  >
                    <LoopCard className="h-full flex flex-col justify-between min-h-[200px]" as="article">
                      <div>
                        {renderStars(review.rating)}
                        <blockquote className="text-text-primary text-[15px] leading-relaxed mb-6 italic">
                          &ldquo;{review.quote}&rdquo;
                        </blockquote>
                      </div>
                      <div className="flex items-center gap-2 mt-auto">
                        <span className="text-text-primary text-sm font-semibold">
                          {review.author}
                        </span>
                      </div>
                    </LoopCard>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}
