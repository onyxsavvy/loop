"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  label: string;
  imageSrc?: string;
  imageAlt?: string;
  glowColor?: "copper" | "violet";
}

export default function Lightbox({
  isOpen,
  onClose,
  label,
  imageSrc,
  imageAlt,
  glowColor = "copper",
}: LightboxProps) {
  const glowGradient =
    glowColor === "violet"
      ? "radial-gradient(ellipse at 30% 40%, rgba(155, 93, 229, 0.12) 0%, transparent 70%)"
      : "radial-gradient(ellipse at 70% 60%, rgba(216, 155, 74, 0.12) 0%, transparent 70%)";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-void/90 backdrop-blur-lg p-6"
          onClick={onClose}
        >
          {/* Close button */}
          <button
            className="absolute top-6 right-6 flex items-center justify-center w-11 h-11 rounded-xl bg-surface-2 border border-hairline text-text-primary hover:text-copper transition-colors z-10"
            onClick={onClose}
            aria-label="Close lightbox"
          >
            <X size={20} strokeWidth={1.5} />
          </button>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl max-h-[80vh] rounded-2xl overflow-hidden bg-surface"
            onClick={(e) => e.stopPropagation()}
            style={{ aspectRatio: "16/9" }}
          >
            {/* Real image or placeholder fallback */}
            {imageSrc ? (
              <Image
                src={imageSrc}
                alt={imageAlt || label}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 80vw"
                quality={90}
              />
            ) : (
              <>
                <div className="absolute inset-0" style={{ background: glowGradient }} />
                <div
                  className="absolute inset-0 opacity-[0.04]"
                  style={{
                    backgroundImage: "url(/noise.svg)",
                    backgroundRepeat: "repeat",
                    backgroundSize: "200px 200px",
                  }}
                />
              </>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-void/40 to-transparent" />
            <span
              className="absolute bottom-4 left-4 font-mono text-[11px] uppercase tracking-[0.15em] text-white/80 drop-shadow-lg"
            >
              {label}
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
