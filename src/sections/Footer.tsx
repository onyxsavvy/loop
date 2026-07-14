"use client";

import Link from "next/link";
import Image from "next/image";
import { NAV_LINKS, CONTACT, LOCATION, HOURS, SITE, IMAGES } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";
import Button from "@/components/Button";

export default function Footer() {
  return (
    <footer className="relative bg-surface border-t border-hairline">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Brand column */}
          <div className="md:col-span-4">
            <img
              src={IMAGES.logo}
              alt="Loop Gastropub"
              className="h-14 w-auto object-contain mb-3"
            />
            <p className="text-text-muted text-sm mb-6">
              {SITE.tagline}, {SITE.city}
            </p>
            <Button
              as="link"
              href={`tel:${CONTACT.phone}`}
              size="default"
              onClick={() => trackEvent("reserve_cta_click")}
            >
              Reserve a Table
            </Button>
          </div>

          {/* Quick nav */}
          <div className="md:col-span-3">
            <h4 className="text-text-primary font-semibold text-sm mb-4 uppercase tracking-wider font-mono">
              Navigate
            </h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-text-muted text-sm hover:text-text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-3">
            <h4 className="text-text-primary font-semibold text-sm mb-4 uppercase tracking-wider font-mono">
              Contact
            </h4>
            <ul className="space-y-3 text-sm text-text-muted">
              <li>
                <a
                  href={`tel:${CONTACT.phone}`}
                  className="hover:text-copper transition-colors"
                  onClick={() => trackEvent("call_click")}
                >
                  {CONTACT.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="hover:text-copper transition-colors"
                >
                  {CONTACT.email}
                </a>
              </li>
              <li>
                <a
                  href={CONTACT.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-copper transition-colors"
                  onClick={() => trackEvent("whatsapp_click")}
                >
                  WhatsApp
                </a>
              </li>
            </ul>

            <h4 className="text-text-primary font-semibold text-sm mt-6 mb-3 uppercase tracking-wider font-mono">
              Social
            </h4>
            <a
              href={CONTACT.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-text-muted hover:text-copper transition-colors"
              onClick={() => trackEvent("instagram_click")}
            >
              Instagram {CONTACT.instagramHandle}
            </a>
          </div>

          {/* Hours & Address */}
          <div className="md:col-span-2">
            <h4 className="text-text-primary font-semibold text-sm mb-4 uppercase tracking-wider font-mono">
              Hours
            </h4>
            <p className="text-text-muted text-sm mb-6">
              {HOURS.display}
              <br />
              {HOURS.label}
            </p>

            <h4 className="text-text-primary font-semibold text-sm mb-3 uppercase tracking-wider font-mono">
              Address
            </h4>
            <p className="text-text-muted text-sm leading-relaxed">
              {LOCATION.addressShort}
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="section-divider mt-12 mb-6" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-text-muted text-xs">
            &copy; {new Date().getFullYear()} Loop. All rights reserved.
          </p>
          <p className="text-text-muted text-xs font-mono">
            Rooftop Gastropub & Nightclub, Ranchi
          </p>
        </div>
      </div>
    </footer>
  );
}
