import React from "react";
import { cn } from "@/lib/utils";

export interface HatchedPatternProps extends React.HTMLAttributes<HTMLDivElement> {
  height?: string;
  angle?: number;
  thickness?: number;
  gap?: number;
  color?: string;
}

export function HatchedPattern({
  className,
  height = "h-10",
  angle = -45,
  thickness = 1.5,
  gap = 10,
  color = "var(--border)",
  style,
  ...props
}: HatchedPatternProps) {
  const total = thickness + gap;

  const backgroundPattern = `repeating-linear-gradient(${angle}deg, ${color}, ${color} ${thickness}px, transparent ${thickness}px, transparent ${total}px)`;

  return (
    <div
      role="presentation"
      aria-hidden="true"
      className={cn(
        "w-full border-y border-border bg-clip-padding overflow-hidden select-none", // 👈 Tambahkan bg-clip-padding
        height,
        className,
      )}
      style={{
        backgroundImage: backgroundPattern,
        ...style,
      }}
      {...props}
    />
  );
}

export default HatchedPattern;
