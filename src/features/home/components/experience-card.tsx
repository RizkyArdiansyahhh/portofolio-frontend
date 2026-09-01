"use client";

import { useState } from "react";
import Image from "next/image";
import { Sparkles, ChevronsUpDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ExperienceCardProps {
  company: string;
  companyLogo?: string;
  role: string;
  employmentType: string;
  startDate: string;
  endDate?: string;
  duration?: string;
  descriptions?: string[];
  skills?: string[];
  defaultOpen?: boolean;
}

export function ExperienceCard({
  company,
  companyLogo,
  role,
  employmentType,
  startDate,
  endDate = "Present",
  duration,
  descriptions = [],
  skills = [],
  defaultOpen = false,
}: ExperienceCardProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="w-full text-zinc-200 font-sans select-none">
      {/* 🏢 1. Company Header (Logo + Nama PT) */}
      <div className="flex items-center gap-2.5 mb-2.5">
        <div className="relative w-6 h-6 rounded-full overflow-hidden bg-zinc-800 flex items-center justify-center border border-zinc-700/60 shrink-0">
          {companyLogo ? (
            <Image
              src={companyLogo}
              alt={company}
              width={24}
              height={24}
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-linear-to-tr from-amber-500 via-sky-400 to-emerald-400" />
          )}
        </div>
        <h3 className="font-semibold text-sm text-zinc-100 tracking-tight">
          {company}
        </h3>
      </div>

      {/* 🌳 2. Timeline Tree Block */}
      <div className="relative flex">
        {/* Kolom Kiri: Icon Sparkle + Garis Cabang Timeline */}
        <div className="relative flex flex-col items-center shrink-0 w-7 mr-2.5">
          {/* Kotak Icon Sparkle (Sejajar dengan Judul Role) */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="w-7 h-7 rounded-lg bg-zinc-950 border border-zinc-800 flex items-center justify-center text-zinc-400 cursor-pointer hover:text-zinc-200 hover:border-zinc-700 transition-colors z-10"
          >
            <Sparkles className="w-3.5 h-3.5" />
          </button>

          {/* 🌿 Garis Cabang Pohon yang Menuju ke Baris Metadata/Deskripsi */}
          <div
            className={cn(
              "absolute left-3.5 top-7 w-3 border-l border-b border-zinc-800 rounded-bl-md transition-all duration-300 pointer-events-none",
              isOpen ? "bottom-3" : "h-4",
            )}
          />
        </div>

        {/* Kolom Kanan: Role Title, Metadata, dan Konten */}
        <div className="flex-1 min-w-0">
          {/* Baris 1: Judul Role & Tombol Expand (Sejajar Icon Sparkle) */}
          <div
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-between cursor-pointer h-7 group"
          >
            <h4 className="font-medium text-sm text-zinc-100 group-hover:text-white transition-colors">
              {role}
            </h4>
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="text-zinc-500 group-hover:text-zinc-300 p-1"
            >
              <ChevronsUpDown className="w-4 h-4" />
            </motion.div>
          </div>

          {/* Baris 2: Metadata (Internship | Date | Duration) - Ujung garis cabang mengarah ke sini saat collapsed */}
          <div className="flex items-center gap-1.5 text-xs text-zinc-500 font-mono mt-0.5">
            <span>{employmentType}</span>
            <span className="text-zinc-700">|</span>
            <span>
              {startDate} - {endDate}
            </span>
            {duration && (
              <>
                <span className="text-zinc-700">|</span>
                <span>{duration}</span>
              </>
            )}
          </div>

          {/* Baris 3: Konten Bullet Points (Expanded) */}
          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                key="content"
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: "auto",
                  opacity: 1,
                  transition: {
                    height: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
                    opacity: { duration: 0.2, delay: 0.05 },
                  },
                }}
                exit={{
                  height: 0,
                  opacity: 0,
                  transition: {
                    height: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
                    opacity: { duration: 0.15 },
                  },
                }}
                className="overflow-hidden"
              >
                <div className="pt-3 pb-2 space-y-2.5">
                  {descriptions.length > 0 && (
                    <ul className="space-y-2.5">
                      {descriptions.map((desc, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2.5 text-xs text-zinc-300/90 leading-relaxed font-sans"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-zinc-600 shrink-0 mt-1.5" />
                          <span>{desc}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {skills.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 text-[10px] font-mono rounded bg-zinc-900 border border-zinc-800 text-zinc-400"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default ExperienceCard;
