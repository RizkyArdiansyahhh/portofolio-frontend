"use client";

import HatchedPattern from "@/components/ui/hatched-pattern";
import { ExperienceCard } from "./experience-card";
import { useGetExperiences } from "@/features/experience/api/get-experience";
import { AlertCircle, Briefcase, RefreshCw } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";

export function ExperienceSection() {
  const {
    data: experience,
    isLoading: isLoadingExperience,
    isError,
    refetch,
  } = useGetExperiences();

  return (
    <>
      <section className="w-full text-zinc-300 font-mono text-sm px-5 py-6 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-zinc-200 tracking-tight">
            Experience
          </h2>
          <span className="text-xs text-zinc-500 font-mono">
            {isLoadingExperience
              ? "Loading..."
              : `${experience?.length ?? 0} Roles`}
          </span>
        </div>

        <div className="space-y-6">
          {/* 1. Loading State (Single Skeleton Box) */}
          {isLoadingExperience && (
            <Skeleton className="w-full h-36 rounded-xl bg-zinc-900/60 border border-zinc-800/60" />
          )}

          {/* 2. Error State */}
          {!isLoadingExperience && isError && (
            <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-6 flex flex-col items-center justify-center text-center">
              <AlertCircle className="w-6 h-6 text-red-400 mb-2" />
              <h3 className="text-sm font-medium text-zinc-200">
                Gagal memuat data experience
              </h3>
              <p className="text-xs text-zinc-500 mt-1 max-w-xs">
                Terjadi kesalahan saat mengambil riwayat pengalaman kerja.
              </p>
              <button
                type="button"
                onClick={() => refetch()}
                className="mt-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-700 transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Coba Lagi
              </button>
            </div>
          )}

          {/* 3. Empty State */}
          {!isLoadingExperience && !isError && experience?.length === 0 && (
            <div className="rounded-xl border border-dashed border-zinc-800 bg-zinc-950/40 p-8 flex flex-col items-center justify-center text-center">
              <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 mb-3">
                <Briefcase className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-medium text-zinc-300">
                Belum ada pengalaman kerja
              </h3>
              <p className="text-xs text-zinc-500 mt-1 max-w-xs">
                Riwayat pengalaman kerja yang ditambahkan akan muncul di sini.
              </p>
            </div>
          )}

          {/* 4. Success / Data Loaded State */}
          {!isLoadingExperience &&
            !isError &&
            experience &&
            experience.length > 0 &&
            experience.map((exp) => <ExperienceCard key={exp.id} {...exp} />)}
        </div>
      </section>
      <HatchedPattern />
    </>
  );
}

export default ExperienceSection;
