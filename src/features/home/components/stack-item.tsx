"use client";

import React from "react";
import Image from "next/image";
import * as SiIcons from "react-icons/si";
import * as RiIcons from "react-icons/ri";
import * as VscIcons from "react-icons/vsc";
import * as TbIcons from "react-icons/tb";
import { Layers } from "lucide-react";
import { Stack } from "@/features/stack/types";

export interface StackItemProps {
  stack: Stack;
}

// Helper untuk mengambil icon component berdasarkan nama string atau URL
function resolveIcon(iconName: string) {
  if (!iconName) return null;

  // 1. Cek jika URL gambar (Supabase/R2/External)
  if (iconName.startsWith("http://") || iconName.startsWith("https://")) {
    return { type: "image" as const, url: iconName };
  }

  // 2. Cek di SiIcons (Simple Icons)
  const siMap = SiIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>;
  if (siMap[iconName]) return { type: "component" as const, Component: siMap[iconName] };

  // Cek jika user input tanpa prefix "Si" (contoh: "React" -> "SiReact")
  const withSi = `Si${iconName.charAt(0).toUpperCase()}${iconName.slice(1)}`;
  if (siMap[withSi]) return { type: "component" as const, Component: siMap[withSi] };

  // 3. Cek di RiIcons, VscIcons, TbIcons
  const riMap = RiIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>;
  if (riMap[iconName]) return { type: "component" as const, Component: riMap[iconName] };

  const vscMap = VscIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>;
  if (vscMap[iconName]) return { type: "component" as const, Component: vscMap[iconName] };

  const tbMap = TbIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>;
  if (tbMap[iconName]) return { type: "component" as const, Component: tbMap[iconName] };

  // Fallback icon jika nama tidak cocok
  return { type: "component" as const, Component: Layers };
}

export function StackItem({ stack }: StackItemProps) {
  const iconData = resolveIcon(stack.icon);

  const content = (
    <div className="group inline-flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-zinc-950/80 border border-zinc-800/90 text-xs font-mono text-zinc-300 hover:border-zinc-700 hover:bg-zinc-900/60 transition-all cursor-pointer">
      {iconData?.type === "image" ? (
        <Image
          src={iconData.url}
          alt={stack.name}
          width={14}
          height={14}
          className="w-3.5 h-3.5 object-contain rounded-xs"
        />
      ) : iconData?.type === "component" ? (
        <iconData.Component className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-100 transition-colors shrink-0" />
      ) : (
        <Layers className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
      )}

      <span className="group-hover:text-white transition-colors">
        {stack.name}
      </span>
    </div>
  );

  if (stack.stackUrl) {
    return (
      <a
        href={stack.stackUrl}
        target="_blank"
        rel="noopener noreferrer"
        title={`Visit ${stack.name}`}
      >
        {content}
      </a>
    );
  }

  return content;
}
