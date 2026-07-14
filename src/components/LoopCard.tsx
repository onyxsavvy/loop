"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface LoopCardProps {
  children: ReactNode;
  className?: string;
  hoverAccent?: "copper" | "violet";
  as?: "div" | "article";
  onClick?: () => void;
}

export default function LoopCard({
  children,
  className = "",
  hoverAccent = "copper",
  as = "div",
  onClick,
}: LoopCardProps) {
  const borderHoverColor =
    hoverAccent === "violet"
      ? "rgba(155, 93, 229, 0.4)"
      : "rgba(216, 155, 74, 0.4)";

  const Component = motion.create(as);

  return (
    <Component
      className={`loop-card ${className}`}
      onClick={onClick}
      style={{ cursor: onClick ? "pointer" : "default" }}
      whileHover={{
        y: -4,
        borderColor: borderHoverColor,
        transition: { duration: 0.3, ease: "easeOut" },
      }}
      whileTap={
        onClick
          ? {
              scale: 0.98,
              transition: { duration: 0.1 },
            }
          : undefined
      }
    >
      {children}
    </Component>
  );
}
