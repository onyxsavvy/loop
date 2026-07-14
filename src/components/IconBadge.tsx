import { type LucideIcon } from "lucide-react";

interface IconBadgeProps {
  icon: LucideIcon;
  color?: "copper" | "violet";
  size?: number;
  className?: string;
}

export default function IconBadge({
  icon: Icon,
  color = "copper",
  size = 20,
  className = "",
}: IconBadgeProps) {
  const colorClass =
    color === "violet" ? "text-violet" : "text-copper";

  return (
    <div
      className={`flex items-center justify-center w-[44px] h-[44px] rounded-[10px] bg-surface-2 border border-hairline shrink-0 ${className}`}
    >
      <Icon
        size={size}
        strokeWidth={1.5}
        className={colorClass}
      />
    </div>
  );
}
