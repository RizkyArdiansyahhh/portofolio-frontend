"use client";

import HatchedPattern from "@/components/ui/hatched-pattern";
import { PublicationCard, type PublicationCardProps } from "./publication-card";

const dummyPublications: PublicationCardProps[] = [
  {
    title:
      "Implementasi Sistem Lost and Found Kampus Berbasis Web Terintegrasi Geolocation dan Evaluasi MOS",
    publisher: "@JUTISI (Jurnal Teknik Informatika dan Sistem Informasi)",
    date: "02.2026",
    href: "#",
  },
];

export function PublicationsSection({
  totalCount = 1,
  publications = dummyPublications,
}: {
  totalCount?: number;
  publications?: PublicationCardProps[];
}) {
  return (
    <>
      <section className="w-full text-zinc-300 font-mono text-sm px-5 py-6 space-y-6">
        {/* 🏷️ Header: Publications (1) */}
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <h2 className="text-2xl font-semibold text-zinc-200 tracking-tight">
              Publications
            </h2>
            <span className="text-xs text-zinc-500 font-mono">
              ({totalCount})
            </span>
          </div>
        </div>

        {/* 📚 Publications List */}
        <div className="w-full border-t border-zinc-800/60">
          {publications.map((pub, idx) => (
            <PublicationCard key={idx} {...pub} />
          ))}
        </div>
      </section>

      <HatchedPattern />
    </>
  );
}

export default PublicationsSection;
