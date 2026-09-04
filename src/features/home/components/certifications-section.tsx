"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import HatchedPattern from "@/components/ui/hatched-pattern";
import { CertificationCard, type CertificationCardProps } from "./certification-card";

// Logo components yang presisi dengan screenshot
const MckinseyLogo = () => (
  <div className="w-full h-full bg-white flex items-center justify-center p-1.5">
    <svg viewBox="0 0 24 24" className="w-full h-full" fill="none">
      <path
        d="M12 2L2 22h20L12 2z"
        fill="url(#mckinsey-grad)"
      />
      <defs>
        <linearGradient id="mckinsey-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="50%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#ef4444" />
        </linearGradient>
      </defs>
    </svg>
  </div>
);

const DicodingLogo = () => (
  <div className="w-full h-full bg-linear-to-br from-zinc-900 to-black flex items-center justify-center font-mono font-bold text-sky-400 text-sm shadow-inner">
    <span>9</span>
  </div>
);

const dummyCertifications: CertificationCardProps[] = [
  {
    title: "McKinsey.org Forward Program",
    issuer: "@ McKinsey.org",
    date: "26.06.2026",
    href: "#",
    logo: <MckinseyLogo />,
  },
  {
    title: "Belajar Fundamental Analisis Data",
    issuer: "@ Dicoding Indonesia",
    date: "28.03.2026",
    href: "#",
    logo: <DicodingLogo />,
  },
  {
    title: "Membangun Aplikasi Gen AI dengan Microsoft Azure",
    issuer: "@ Dicoding Indonesia",
    date: "29.01.2026",
    href: "#",
    logo: <DicodingLogo />,
  },
];

export function CertificationsSection({
  totalCount = 31,
  certifications = dummyCertifications,
  initialVisible = 3,
}: {
  totalCount?: number;
  certifications?: CertificationCardProps[];
  initialVisible?: number;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const displayedCerts = isExpanded
    ? certifications
    : certifications.slice(0, initialVisible);

  return (
    <>
      <section className="w-full text-zinc-300 font-mono text-sm px-5 py-6 space-y-6">
        {/* 🏷️ Header: Certifications (31) */}
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <h2 className="text-2xl font-semibold text-zinc-200 tracking-tight">
              Certifications
            </h2>
            <span className="text-xs text-zinc-500 font-mono">
              ({totalCount})
            </span>
          </div>
        </div>

        {/* 📜 Certifications List */}
        <div className="w-full border-t border-zinc-800/60">
          {displayedCerts.map((cert, idx) => (
            <CertificationCard key={idx} {...cert} />
          ))}
        </div>

        {/* 🔘 Show More Button */}
        {certifications.length >= initialVisible && (
          <div className="flex justify-center pt-2">
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-800 text-xs font-mono text-zinc-300 hover:text-white transition-colors cursor-pointer"
            >
              <span>{isExpanded ? "Show less" : "Show more"}</span>
              {isExpanded ? (
                <ChevronUp className="w-3.5 h-3.5 text-zinc-400" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
              )}
            </button>
          </div>
        )}
      </section>

      <HatchedPattern />
    </>
  );
}

export default CertificationsSection;
