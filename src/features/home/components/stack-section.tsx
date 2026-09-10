"use client";

import React from "react";
import HatchedPattern from "@/components/ui/hatched-pattern";
import { useGetStacks } from "@/features/stack/api/get-stacks";
import { Stack, StackCategory } from "@/features/stack/types";
import { StackItem } from "./stack-item";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, Layers, RefreshCw } from "lucide-react";

// Konfigurasi label dan nomor urut tiap kategori
const CATEGORY_CONFIG: Record<
  StackCategory,
  { number: string; label: string; order: number }
> = {
  AI_ML: { number: "01", label: "AI / ML", order: 1 },
  FRONTEND: { number: "02", label: "Frontend", order: 2 },
  BACKEND: { number: "03", label: "Backend", order: 3 },
  CLOUD_DEVOPS: { number: "04", label: "DevOps / Cloud", order: 4 },
  MOBILE: { number: "05", label: "Mobile", order: 5 },
  DATA_SCIENCE: { number: "06", label: "Data Science", order: 6 },
};

export function StackSection() {
  const { data: stacks, isLoading, isError, refetch } = useGetStacks();

  // Kelompokkan stack berdasarkan kategori yang ada datanya
  const groupedCategories = React.useMemo(() => {
    if (!stacks || stacks.length === 0) return [];

    const map = new Map<StackCategory, Stack[]>();
    stacks.forEach((s) => {
      const list = map.get(s.category) || [];
      list.push(s);
      map.set(s.category, list);
    });

    return Array.from(map.entries())
      .map(([category, items]) => ({
        category,
        config: CATEGORY_CONFIG[category] ?? {
          number: "99",
          label: category,
          order: 99,
        },
        items,
      }))
      .sort((a, b) => a.config.order - b.config.order);
  }, [stacks]);

  return (
    <>
      <section className="w-full text-zinc-300 font-mono text-sm px-5 py-6 space-y-6">
        {/* 🏷️ Header: Stack */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-zinc-200 tracking-tight">
            Stack
          </h2>
          <span className="text-xs text-zinc-500 font-mono">
            {isLoading ? "Loading..." : `${stacks?.length ?? 0} Technologies`}
          </span>
        </div>

        {/* 1. Loading State */}
        {isLoading && (
          <div className="space-y-4">
            <Skeleton className="w-full h-24 rounded-xl bg-zinc-900/60 border border-zinc-800/60" />
            <Skeleton className="w-full h-24 rounded-xl bg-zinc-900/60 border border-zinc-800/60" />
          </div>
        )}

        {/* 2. Error State */}
        {!isLoading && isError && (
          <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-6 flex flex-col items-center justify-center text-center">
            <AlertCircle className="w-6 h-6 text-red-400 mb-2" />
            <h3 className="text-sm font-medium text-zinc-200">
              Failed to load tech stack
            </h3>
            <p className="text-xs text-zinc-500 mt-1 max-w-xs">
              An error occurred while fetching technologies.
            </p>
            <button
              type="button"
              onClick={() => refetch()}
              className="mt-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-700 transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Try Again
            </button>
          </div>
        )}

        {/* 3. Empty State */}
        {!isLoading && !isError && groupedCategories.length === 0 && (
          <div className="rounded-xl border border-dashed border-zinc-800 bg-zinc-950/40 p-8 flex flex-col items-center justify-center text-center">
            <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 mb-3">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-medium text-zinc-300">
              No technologies yet
            </h3>
            <p className="text-xs text-zinc-500 mt-1 max-w-xs">
              Technologies and tools will appear here once added.
            </p>
          </div>
        )}

        {/* 4. Loaded Categories List */}
        {!isLoading && !isError && groupedCategories.length > 0 && (
          <div className="w-full border-t border-zinc-800/60">
            {groupedCategories.map(({ category, config, items }) => (
              <div
                key={category}
                className="flex flex-col sm:flex-row border-b border-zinc-800/60"
              >
                {/* Kolom Kiri: Nomor & Nama Kategori dengan Garis Putus-putus */}
                <div className="sm:w-44 shrink-0 px-4 py-4 sm:border-r border-dashed border-zinc-800/80 flex items-start">
                  <span className="text-xs sm:text-sm font-mono text-zinc-400 font-medium">
                    {config.number} {config.label}
                  </span>
                </div>

                {/* Kolom Kanan: Badges / Pills Stack Items */}
                <div className="flex-1 p-4 flex flex-wrap gap-2 items-center">
                  {items.map((stack) => (
                    <StackItem key={stack.id} stack={stack} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <HatchedPattern />
    </>
  );
}

export default StackSection;
