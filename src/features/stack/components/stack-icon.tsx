"use client";

import React from "react";
import Image from "next/image";
import * as SiIcons from "react-icons/si";
import * as RiIcons from "react-icons/ri";
import * as VscIcons from "react-icons/vsc";
import * as TbIcons from "react-icons/tb";
import { Layers } from "lucide-react";

export interface StackIconProps {
  iconName: string;
  className?: string;
  size?: number;
}

export function StackIcon({ iconName, className = "w-4 h-4", size = 16 }: StackIconProps) {
  if (!iconName) return <Layers className={className} />;

  // 1. Cek jika URL gambar
  if (iconName.startsWith("http://") || iconName.startsWith("https://")) {
    return (
      <Image
        src={iconName}
        alt="Tech icon"
        width={size}
        height={size}
        className={`${className} object-contain rounded-xs`}
      />
    );
  }

  // 2. Simple Icons (Si...)
  const siMap = SiIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>;
  if (siMap[iconName]) {
    const Component = siMap[iconName];
    return <Component className={className} />;
  }

  // Cek dengan prefix Si (contoh: "React" -> "SiReact")
  const withSi = `Si${iconName.charAt(0).toUpperCase()}${iconName.slice(1)}`;
  if (siMap[withSi]) {
    const Component = siMap[withSi];
    return <Component className={className} />;
  }

  // 3. Remix Icons, VS Code Icons, Tabler Icons
  const riMap = RiIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>;
  if (riMap[iconName]) {
    const Component = riMap[iconName];
    return <Component className={className} />;
  }

  const vscMap = VscIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>;
  if (vscMap[iconName]) {
    const Component = vscMap[iconName];
    return <Component className={className} />;
  }

  const tbMap = TbIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>;
  if (tbMap[iconName]) {
    const Component = tbMap[iconName];
    return <Component className={className} />;
  }

  // Fallback
  return <Layers className={className} />;
}
