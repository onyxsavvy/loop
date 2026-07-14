"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface ButtonBaseProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "default" | "sm" | "lg";
  glowPulse?: boolean;
  className?: string;
}

interface ButtonAsButtonProps extends ButtonBaseProps {
  as?: "button";
  onClick?: () => void;
  href?: never;
  target?: never;
  rel?: never;
}

interface ButtonAsLinkProps extends ButtonBaseProps {
  as: "link";
  href: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
}

type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

export default function Button({
  children,
  variant = "primary",
  size = "default",
  glowPulse = false,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 font-medium rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper focus-visible:ring-offset-2 focus-visible:ring-offset-void";

  const sizeStyles = {
    sm: "px-4 py-2 text-sm",
    default: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  const variantStyles = {
    primary:
      "bg-copper text-void font-semibold hover:bg-copper/90",
    secondary:
      "bg-transparent border border-copper text-copper hover:bg-copper/10",
    ghost:
      "bg-transparent text-text-muted hover:text-text-primary hover:bg-surface-2",
  };

  const combinedClassName = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${glowPulse ? "animate-glow-pulse" : ""} ${className}`;

  if (props.as === "link") {
    const { href, target, rel, onClick } = props;
    return (
      <motion.div
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="inline-block"
      >
        <Link
          href={href}
          target={target}
          rel={rel}
          onClick={onClick}
          className={combinedClassName}
        >
          {children}
        </Link>
      </motion.div>
    );
  }

  const { onClick } = props as ButtonAsButtonProps;
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={combinedClassName}
    >
      {children}
    </motion.button>
  );
}
