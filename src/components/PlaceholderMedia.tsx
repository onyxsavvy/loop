interface PlaceholderMediaProps {
  label: string;
  aspect?: string;
  glowColor?: "copper" | "violet";
  className?: string;
}

export default function PlaceholderMedia({
  label,
  aspect = "16/9",
  glowColor = "copper",
  className = "",
}: PlaceholderMediaProps) {
  const glowGradient =
    glowColor === "violet"
      ? "radial-gradient(ellipse at 30% 40%, rgba(155, 93, 229, 0.10) 0%, transparent 70%)"
      : "radial-gradient(ellipse at 70% 60%, rgba(216, 155, 74, 0.10) 0%, transparent 70%)";

  return (
    <div
      className={`placeholder-media w-full ${className}`}
      style={{ aspectRatio: aspect }}
    >
      {/* Accent glow layer */}
      <div
        className="absolute inset-0 z-0"
        style={{ background: glowGradient }}
        aria-hidden="true"
      />

      {/* Corner label — not centered, easy to miss on purpose */}
      <span className="placeholder-label">{label}</span>
    </div>
  );
}
