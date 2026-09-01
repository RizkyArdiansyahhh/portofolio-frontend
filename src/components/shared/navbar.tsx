"use client";

import React, { useState } from "react";
import {
  Home,
  FolderClosed,
  FileText,
  Image,
  MessageSquare,
  Settings,
  ChevronDown,
} from "lucide-react";
import { HatchedPattern } from "@/components/ui/hatched-pattern";

interface NavItem {
  id: string;
  label?: string;
  icon: React.ReactNode;
  hasDropdown?: boolean;
}

export function Navbar() {
  const [activeTab, setActiveTab] = useState("home");

  const playClickSound = () => {
    try {
      const audio = new Audio("/sound/click-effect.mp3");
      audio.volume = 0.5;
      audio.currentTime = 0;
      audio.play().catch(() => {});
    } catch {
      // Audio autoplay policy fallback
    }
  };

  const navItems: NavItem[] = [
    {
      id: "home",
      label: "Home",
      icon: <Home className="w-4 h-4" />,
    },
    {
      id: "projects",
      icon: <FolderClosed className="w-4 h-4" />,
    },
    {
      id: "articles",
      icon: <FileText className="w-4 h-4" />,
    },
    {
      id: "gallery",
      icon: <Image className="w-4 h-4" />,
    },
    {
      id: "messages",
      icon: <MessageSquare className="w-4 h-4" />,
    },
    {
      id: "settings",
      icon: <Settings className="w-4 h-4" />,
      hasDropdown: true,
    },
  ];

  return (
    <nav className="w-full bg-background border-t border-border">
      <div className="flex items-center justify-between px-3 sm:px-6 overflow-x-auto no-scrollbar">
        <div className="flex items-center w-full justify-between">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  playClickSound();
                  setActiveTab(item.id);
                }}
                className={`relative flex items-center justify-center gap-2 py-3.5 px-3 text-xs sm:text-sm font-medium transition-colors group cursor-pointer ${
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span className="flex items-center gap-2">
                  {item.icon}
                  {item.label && <span>{item.label}</span>}
                </span>

                {item.hasDropdown && (
                  <ChevronDown className="w-3.5 h-3.5 text-muted-foreground group-hover:text-foreground transition-colors" />
                )}

                {/* Active Underline Indicator */}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </div>
      {/* Reusable Hatched Accent Pattern Component */}
      <HatchedPattern height="h-2" angle={45} thickness={1.5} gap={5} />
    </nav>
  );
}

export default Navbar;
