"use client";

import Link from "next/link";
import { ArrowUpRight, FolderGit2, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ProjectCardProps {
  title: string;
  year: string | number;
  href?: string;
  icon?: LucideIcon;
  className?: string;
}

export function ProjectCard({
  title,
  year,
  href = "#",
  icon: Icon = FolderGit2,
  className,
}: ProjectCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group flex items-stretch border-b border-zinc-800/60 hover:bg-zinc-900/50 cursor-pointer",
        className,
      )}
    >
      {/* 📁 Kolom Kiri: Icon Folder + Garis pembatas putus-putus (dashed) */}
      <div className="flex items-center justify-center px-4 sm:px-5 py-4 border-r border-dashed border-zinc-800/80 shrink-0">
        <div className="w-10 h-10 rounded-xl bg-zinc-900/80 border border-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-zinc-100 group-hover:border-zinc-700">
          <Icon className="w-5 h-5" />
        </div>
      </div>

      {/* 📄 Kolom Kanan: Judul Project, Tahun, & Icon Arrow */}
      <div className="flex-1 flex items-center justify-between px-4 sm:px-5 py-4 min-w-0">
        <div className="min-w-0 pr-4">
          <h3 className="text-sm font-medium text-zinc-100 group-hover:text-white truncate">
            {title}
          </h3>
          <p className="text-xs text-zinc-500 font-mono mt-1">{year}</p>
        </div>

        <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-zinc-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-100 ease-out shrink-0" />
      </div>
    </Link>
  );
}

export default ProjectCard;
