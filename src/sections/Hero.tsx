"use client";

import { useEffect, useRef, Suspense, lazy } from "react";
import { gsap } from "gsap";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import Button from "@/components/Button";
import { CONTACT, IMAGES } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      // Just show everything immediately
      [eyebrowRef, headlineRef, subheadRef, ctaRef].forEach(
        (ref) => {
          if (ref.current) {
            ref.current.style.opacity = "1";
            ref.current.style.transform = "none";
          }
        }
      );
      return;
    }

    const tl = gsap.timeline({ delay: 0.3 });

    // Set initial states
    [eyebrowRef, headlineRef, subheadRef, ctaRef].forEach(
      (ref) => {
        if (ref.current) {
          gsap.set(ref.current, { opacity: 0, y: 30 });
        }
      }
    );

    tl.to(eyebrowRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
    })
      .to(
        headlineRef.current,
        { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" },
        "-=0.5"
      )
      .to(
        subheadRef.current,
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.4"
      )
      .to(
        ctaRef.current,
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
        "-=0.3"
      );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src={IMAGES.hero}
          alt=""
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
          quality={90}
        />
        {/* Aesthetic gradient overlay for text contrast and blending into the next section */}
        <div className="absolute inset-0 bg-gradient-to-b from-void/30 via-void/70 to-void" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 40%, rgba(216, 155, 74, 0.15) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "url(/noise.svg)",
            backgroundRepeat: "repeat",
            backgroundSize: "200px 200px",
          }}
        />
      </div>


      {/* Content */}
      <div className="relative z-[2] text-center px-6 max-w-4xl mx-auto">
        <span
          ref={eyebrowRef}
          className="eyebrow mb-6 block opacity-0"
        >
          RANCHI&apos;S ROOFTOP &middot; 8TH FLOOR
        </span>

        <h1
          ref={headlineRef}
          className="heading-display mb-6 opacity-0"
          style={{
            fontSize: "clamp(2.5rem, 6vw, 5.5rem)",
            lineHeight: "1.02",
            maxHeight: "50vh",
            overflow: "visible",
          }}
        >
          Dinner. Rooftop. Nightclub.
          <br />
          <span className="text-copper">One floor, no compromise.</span>
        </h1>

        <p
          ref={subheadRef}
          className="body-text max-w-2xl mx-auto mb-10 opacity-0"
          style={{ fontSize: "clamp(1rem, 1.8vw, 1.125rem)" }}
        >
          A rooftop gastropub by day, a full-throttle nightclub by night —
          multi-cuisine kitchen, full bar, live music, and Ranchi&apos;s
          skyline as the backdrop.
        </p>

        <div ref={ctaRef} className="flex items-center justify-center gap-4 flex-wrap opacity-0">
          <Button
            as="link"
            href={`tel:${CONTACT.phone}`}
            size="lg"
            glowPulse
            onClick={() => trackEvent("reserve_cta_click")}
          >
            Reserve a Table
          </Button>
          <Button
            as="link"
            href="#menu"
            variant="secondary"
            size="lg"
            onClick={() => trackEvent("menu_view_click")}
          >
            View Menu
          </Button>
        </div>
      </div>

    </section>
  );
}
