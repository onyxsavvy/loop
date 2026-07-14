"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { NAV_LINKS, CONTACT, IMAGES, SITE } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";
import Button from "./Button";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md"
        style={{
          height: "var(--nav-height)",
          backgroundColor: scrolled ? "rgba(11, 11, 13, 0.95)" : "rgba(11, 11, 13, 0.4)",
          borderBottom: scrolled
            ? "1px solid var(--border-hairline)"
            : "1px solid transparent",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          {/* Logo / Wordmark */}
          <Link
            href="#"
            className="relative block"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <img
              src={IMAGES.logo}
              alt="Loop Gastropub"
              className="h-14 w-auto object-contain"
            />
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-text-muted hover:text-text-primary transition-colors duration-200 font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Button
              as="link"
              href={`tel:${CONTACT.phone}`}
              size="sm"
              onClick={() => trackEvent("reserve_cta_click")}
            >
              Reserve a Table
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden flex items-center justify-center w-11 h-11 rounded-xl bg-surface-2 border border-hairline text-text-primary"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? (
              <X size={20} strokeWidth={1.5} />
            ) : (
              <Menu size={20} strokeWidth={1.5} />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-0 z-[60] bg-void/98 backdrop-blur-xl flex flex-col"
            style={{ paddingTop: "var(--nav-height)" }}
          >
            {/* Close button in drawer */}
            <button
              className="absolute top-5 right-6 flex items-center justify-center w-11 h-11 rounded-xl bg-surface-2 border border-hairline text-text-primary"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              <X size={20} strokeWidth={1.5} />
            </button>

            <div className="flex flex-col items-center justify-center flex-1 gap-6 px-6">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <Link
                    href={link.href}
                    className="text-2xl font-display font-semibold text-text-primary hover:text-copper transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: NAV_LINKS.length * 0.06 }}
                className="mt-4"
              >
                <Button
                  as="link"
                  href={`tel:${CONTACT.phone}`}
                  size="lg"
                  onClick={() => {
                    trackEvent("reserve_cta_click");
                    setMobileOpen(false);
                  }}
                >
                  Reserve a Table
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
