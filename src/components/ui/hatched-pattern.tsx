import React from "react";
import { cn } from "@/lib/utils";

export interface HatchedPatternProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Height in Tailwind classes or style (default: 'h-2') */
  height?: string;
  /** Angle in degrees (e.g. 45, -45, 135) */
  angle?: number;
  /** Stripe line thickness in px */
  thickness?: number;
  /** Gap between stripes in px */
  gap?: number;
  /** Stripe color (default: 'var(--border)') */
  color?: string;
}

export function HatchedPattern({
  className,
  height = "h-2",
  angle = 45,
  thickness = 1.5,
  gap = 6,
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
      className={cn("w-full border-t border-border select-none", height, className)}
      style={{
        backgroundImage: backgroundPattern,
        ...style,
      }}
      {...props}
    />
  );
}

export default HatchedPattern;
