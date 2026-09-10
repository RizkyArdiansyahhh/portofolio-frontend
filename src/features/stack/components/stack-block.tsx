"use client";

import React, { useState } from "react";
import { useGetStacks } from "../api/get-stacks";
import { useDeleteStack } from "../api/delete-stack";
import { Stack, StackCategory } from "../types";
import { StackIcon } from "./stack-icon";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertCircle,
  ExternalLink,
  Layers,
  RefreshCw,
  Trash2,
} from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

const CATEGORY_ORDER: Record<
  StackCategory,
  { label: string; number: string; order: number }
> = {
  FRONTEND: { label: "Frontend", number: "01", order: 1 },
  BACKEND: { label: "Backend", number: "02", order: 2 },
  CLOUD_DEVOPS: { label: "Cloud & DevOps", number: "03", order: 3 },
  AI_ML: { label: "AI & Machine Learning", number: "04", order: 4 },
  MOBILE: { label: "Mobile Development", number: "05", order: 5 },
  DATA_SCIENCE: { label: "Data Science", number: "06", order: 6 },
};

export const StackBlock = () => {
  const {
    data: stacks,
    isLoading: isStackLoading,
    isError,
    refetch,
  } = useGetStacks();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const { mutate: deleteStack } = useDeleteStack({
    mutationConfig: {
      onSettled: () => {
        setDeletingId(null);
      },
    },
  });

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Delete "${name}" from tech stack?`)) {
      setDeletingId(id);
      deleteStack(id);
    }
  };

  // Group data by category
  const groupedStacks = React.useMemo(() => {
    if (!stacks || stacks.length === 0) return [];

    const map = new Map<StackCategory, Stack[]>();
    stacks.forEach((s) => {
      const items = map.get(s.category) || [];
      items.push(s);
      map.set(s.category, items);
    });

    return Array.from(map.entries())
      .map(([category, items]) => ({
        category,
        meta: CATEGORY_ORDER[category] ?? {
          label: category,
          number: "99",
          order: 99,
        },
        items,
      }))
      .sort((a, b) => a.meta.order - b.meta.order);
  }, [stacks]);

  // 1. Loading State
  if (isStackLoading) {
    return (
      <div className="space-y-6 w-full">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="p-4 rounded-xl border border-border/60 bg-card/40 space-y-3"
          >
            <Skeleton className="h-5 w-32 bg-muted" />
            <div className="flex flex-wrap gap-2">
              <Skeleton className="h-8 w-24 rounded-lg bg-muted" />
              <Skeleton className="h-8 w-28 rounded-lg bg-muted" />
              <Skeleton className="h-8 w-20 rounded-lg bg-muted" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // 2. Error State
  if (isError) {
    return (
      <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-6 flex flex-col items-center justify-center text-center">
        <AlertCircle className="w-6 h-6 text-destructive mb-2" />
        <h3 className="text-sm font-medium">Failed to load stack data</h3>
        <p className="text-xs text-muted-foreground mt-1 max-w-xs">
          An error occurred while fetching technology data.
        </p>
        <button
          type="button"
          onClick={() => refetch()}
          className="mt-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono bg-secondary hover:bg-secondary/80 text-foreground transition-colors cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Try Again
        </button>
      </div>
    );
  }

  // 3. Empty State
  if (!stacks || stacks.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border/80 bg-muted/20 p-12 flex flex-col items-center justify-center text-center">
        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground mb-3">
          <Layers className="w-5 h-5" />
        </div>
        <h3 className="text-sm font-semibold">No Technologies Yet</h3>
        <p className="text-xs text-muted-foreground mt-1 max-w-xs">
          Technologies and tools added via the form will appear here, grouped by category.
        </p>
      </div>
    );
  }

  // 4. Grouped Stacks List
  return (
    <div className="space-y-6 w-full">
      {groupedStacks.map(({ category, meta, items }) => (
        <div
          key={category}
          className="rounded-xl border border-border/60 bg-card/60 overflow-hidden shadow-xs"
        >
          {/* Category Header */}
          <div className="px-4 py-3 bg-muted/40 border-b border-border/60 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-muted-foreground font-semibold">
                {meta.number}
              </span>
              <h4 className="text-sm font-semibold font-mono tracking-tight text-foreground">
                {meta.label}
              </h4>
            </div>
            <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-muted text-muted-foreground border border-border/50">
              {items.length} {items.length === 1 ? "stack" : "stacks"}
            </span>
          </div>

          {/* Item Badges List */}
          <div className="p-4 flex flex-wrap gap-2.5">
            {items.map((stack) => (
              <div
                key={stack.id}
                className="group flex items-center gap-2 pl-3 pr-2 py-1.5 rounded-lg bg-background border border-border/80 text-xs font-mono hover:border-foreground/30 transition-all shadow-2xs"
              >
                {/* Icon */}
                <StackIcon
                  iconName={stack.icon}
                  className="w-4 h-4 text-muted-foreground group-hover:text-foreground shrink-0 transition-colors"
                />

                {/* Name */}
                <span className="font-medium text-foreground">
                  {stack.name}
                </span>

                {/* Link Preview */}
                {stack.stackUrl && (
                  <a
                    href={stack.stackUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground/60 hover:text-foreground transition-colors p-0.5"
                    title={`Open ${stack.stackUrl}`}
                  >
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}

                {/* Delete Button */}
                <button
                  type="button"
                  onClick={() => handleDelete(stack.id, stack.name)}
                  disabled={deletingId === stack.id}
                  className="ml-1 text-muted-foreground/50 hover:text-destructive transition-colors p-0.5 rounded hover:bg-destructive/10 cursor-pointer disabled:opacity-50"
                  title="Delete stack"
                >
                  {deletingId === stack.id ? (
                    <Spinner />
                  ) : (
                    <Trash2 className="w-3 h-3" />
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StackBlock;
