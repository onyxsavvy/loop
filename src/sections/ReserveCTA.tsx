"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Phone } from "lucide-react";
import Button from "@/components/Button";
import { CONTACT } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";

gsap.registerPlugin(ScrollTrigger);

export default function ReserveCTA() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const items = sectionRef.current.querySelectorAll(".cta-reveal");
    gsap.set(items, { opacity: 0, y: 30 });

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 85%",
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
    <section
      id="reserve"
      ref={sectionRef}
      className="loop-section relative overflow-hidden"
    >
      {/* High-contrast background band */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, var(--bg-surface) 0%, var(--bg-void) 50%, var(--bg-surface) 100%)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(216, 155, 74, 0.08) 0%, transparent 60%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-[1] max-w-3xl mx-auto px-6 text-center">
        <h2 className="heading-section mb-4 cta-reveal">
          Get a table before the{" "}
          <span className="text-copper">rooftop fills up.</span>
        </h2>
        <p className="body-text mb-10 cta-reveal">
          Walk-ins welcome, but the good spots go fast on weekends. Reserve
          ahead — it takes thirty seconds.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 cta-reveal">
          <Button
            as="link"
            href={`tel:${CONTACT.phone}`}
            size="lg"
            glowPulse
            onClick={() => trackEvent("call_click")}
          >
            <Phone size={18} strokeWidth={1.5} />
            Call to Reserve
          </Button>
          <Button
            as="link"
            href={CONTACT.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            variant="secondary"
            size="lg"
            onClick={() => trackEvent("whatsapp_click")}
          >
            Reserve on WhatsApp
          </Button>
        </div>

        <p className="text-text-muted text-xs font-mono uppercase tracking-wider cta-reveal">
          Open 12 PM – 12 AM, daily &middot; Dine-in &middot; Rooftop
          nightclub
        </p>
      </div>
    </section>
  );
}
