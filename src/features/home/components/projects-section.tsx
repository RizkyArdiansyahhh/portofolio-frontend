"use client";

import Link from "next/link";
import { Caveat } from "next/font/google";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import HatchedPattern from "@/components/ui/hatched-pattern";
import { ProjectCard, type ProjectCardProps } from "./project-card";

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["700"],
});

const dummyProjects: ProjectCardProps[] = [
  {
    title: "Narratio AI - Business Narrative Deck Generator",
    year: "2026",
    href: "#",
  },
  {
    title: "Custora - AI Customer Intelligence Platform",
    year: "2026",
    href: "#",
  },
];

export function ProjectsSection({
  totalCount = 13,
  projects = dummyProjects,
}: {
  totalCount?: number;
  projects?: ProjectCardProps[];
}) {
  return (
    <>
      <section className="relative w-full text-zinc-300 font-mono text-sm px-5 py-6 space-y-6">
        {/* ✍️ Outside Annotation Note (Left side in ambient background) */}
        <div className="hidden xl:flex absolute right-full top-12 mr-8 w-64 flex-col items-end text-right pointer-events-none select-none z-20">
          <p
            className={cn(
              "text-2xl leading-snug font-bold text-zinc-100 -rotate-2 tracking-wide drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]",
              caveat.className,
            )}
          >
            Ideas become real when the model, interface, and product decisions
            move together.
          </p>

          {/* Panah Coretan Melengkung (Doodle Arrow) */}
          <svg
            className="w-14 h-14 text-zinc-200 mt-2 mr-4 drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]"
            viewBox="0 0 50 50"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 6 C 10 24, 18 36, 42 40" />
            <path d="M33 33 L 42 40 L 34 47" />
          </svg>
        </div>

        {/* 🏷️ Header: Projects (13) & View all ↗ */}
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <h2 className="text-2xl font-semibold text-zinc-200 tracking-tight font-mono">
              Projects
            </h2>
            <span className="text-xs text-zinc-500 font-mono">
              ({totalCount})
            </span>
          </div>

          <Link
            href="/projects"
            className="group flex items-center gap-1 text-xs text-zinc-400 hover:text-zinc-200 font-mono"
          >
            <span>View all</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-zinc-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-100 ease-out" />
          </Link>
        </div>

        {/* 📂 Project List */}
        <div className="w-full border-t border-zinc-800/60">
          {projects.map((project, idx) => (
            <ProjectCard key={idx} {...project} />
          ))}
        </div>
      </section>

      <HatchedPattern />
    </>
  );
}

export default ProjectsSection;
