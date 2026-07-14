"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, Clock, Phone, Navigation } from "lucide-react";
import Section from "@/components/Section";
import IconBadge from "@/components/IconBadge";
import Button from "@/components/Button";
import { LOCATION, HOURS, CONTACT } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";

gsap.registerPlugin(ScrollTrigger);

export default function LocationHours() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const items = containerRef.current.querySelectorAll(".loc-reveal");
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
  }, []);

  return (
    <Section id="location" glowPosition="top-left" glowColor="copper">
      <div ref={containerRef} className="max-w-7xl mx-auto px-6">
        <span className="eyebrow mb-4 block loc-reveal">FIND US</span>
        <h2 className="heading-section mb-12 loc-reveal">
          8th Floor, <span className="text-copper">Eastern Mall.</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Info block */}
          <div className="space-y-6 loc-reveal">
            {/* Address */}
            <div className="flex items-start gap-4">
              <IconBadge icon={MapPin} />
              <div>
                <h3 className="text-text-primary font-semibold text-sm mb-1">
                  Address
                </h3>
                <p className="text-text-muted text-sm leading-relaxed">
                  {LOCATION.address}
                </p>
              </div>
            </div>

            {/* Hours */}
            <div className="flex items-start gap-4">
              <IconBadge icon={Clock} />
              <div>
                <h3 className="text-text-primary font-semibold text-sm mb-1">
                  Hours
                </h3>
                <p className="text-text-muted text-sm">
                  {HOURS.display}, {HOURS.label}
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-4">
              <IconBadge icon={Phone} />
              <div>
                <h3 className="text-text-primary font-semibold text-sm mb-1">
                  Phone
                </h3>
                <a
                  href={`tel:${CONTACT.phone}`}
                  className="text-copper text-sm hover:underline"
                  onClick={() => trackEvent("call_click")}
                >
                  {CONTACT.phoneDisplay}
                </a>
              </div>
            </div>

            {/* Directions CTA */}
            <div className="pt-2">
              <Button
                as="link"
                href={LOCATION.mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                onClick={() => trackEvent("directions_click")}
              >
                <Navigation size={16} strokeWidth={1.5} />
                Get Directions
              </Button>
            </div>
          </div>

          {/* Interactive Map */}
          <div className="loc-reveal w-full h-[350px] lg:h-[400px]">
            <div className="loop-card overflow-hidden p-0 w-full h-full relative group">
              <iframe
                src="https://maps.google.com/maps?q=Eastern%20Mall,%20Lalpur,%20Ranchi&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{
                  border: 0,
                  filter: "invert(100%) hue-rotate(180deg) brightness(85%) contrast(85%) grayscale(15%)",
                }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 w-full h-full"
                title="Loop Location Map"
              />
              <div className="absolute inset-0 border border-white/5 rounded-2xl pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
