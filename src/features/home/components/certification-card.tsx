"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Award } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CertificationCardProps {
  title: string;
  issuer: string;
  date: string;
  href?: string;
  logo?: string | React.ReactNode;
  className?: string;
}

export function CertificationCard({
  title,
  issuer,
  date,
  href = "#",
  logo,
  className,
}: CertificationCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group flex items-stretch border-b border-zinc-800/60 hover:bg-zinc-900/50 cursor-pointer",
        className,
      )}
    >
      {/* 🏅 Kolom Kiri: Logo Organisasi/Sertifikasi + Garis pembatas dashed */}
      <div className="flex items-center justify-center px-4 sm:px-5 py-4 border-r border-dashed border-zinc-800/80 shrink-0">
        <div className="w-10 h-10 rounded-xl bg-zinc-900/80 border border-zinc-800 flex items-center justify-center overflow-hidden shrink-0 group-hover:border-zinc-700">
          {typeof logo === "string" ? (
            <Image
              src={logo}
              alt={issuer}
              width={28}
              height={28}
              className="object-contain"
            />
          ) : logo ? (
            logo
          ) : (
            <Award className="w-5 h-5 text-zinc-400 group-hover:text-zinc-100" />
          )}
        </div>
      </div>

      {/* 📄 Kolom Kanan: Judul Sertifikat, Penerbit, Tanggal, & Icon Arrow */}
      <div className="flex-1 flex items-center justify-between px-4 sm:px-5 py-4 min-w-0">
        <div className="min-w-0 pr-4">
          <h3 className="text-sm font-medium text-zinc-100 group-hover:text-white line-clamp-1">
            {title}
          </h3>
          <p className="text-xs text-zinc-500 font-mono mt-1 flex flex-wrap items-center gap-1.5">
            <span>{issuer}</span>
            <span className="text-zinc-700">|</span>
            <span>{date}</span>
          </p>
        </div>

        <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-zinc-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-100 ease-out shrink-0" />
      </div>
    </Link>
  );
}

export default CertificationCard;
