import { ReactNode } from "react";

interface SectionProps {
  id: string;
  children: ReactNode;
  className?: string;
  glowPosition?: "top-right" | "bottom-left" | "top-left" | "bottom-right";
  glowColor?: "copper" | "violet";
  noPadding?: boolean;
}

export default function Section({
  id,
  children,
  className = "",
  glowPosition,
  glowColor = "copper",
  noPadding = false,
}: SectionProps) {
  const glowPositionStyles: Record<string, string> = {
    "top-right": "top-[-200px] right-[-200px]",
    "bottom-left": "bottom-[-200px] left-[-200px]",
    "top-left": "top-[-200px] left-[-200px]",
    "bottom-right": "bottom-[-200px] right-[-200px]",
  };

  return (
    <section
      id={id}
      className={`${noPadding ? "" : "loop-section"} relative overflow-hidden ${className}`}
    >
      {glowPosition && (
        <div
          className={`${glowColor === "copper" ? "glow-copper" : "glow-violet"} ${glowPositionStyles[glowPosition]}`}
          style={{ position: "absolute" }}
          aria-hidden="true"
        />
      )}
      <div className="relative z-[1]">{children}</div>
    </section>
  );
}
