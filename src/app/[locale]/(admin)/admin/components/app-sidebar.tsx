"use client";

import * as React from "react";
import { usePathname } from "@/i18n/navigation";
import { Link } from "@/i18n/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  FolderGit2,
  Briefcase,
  Layers,
  BookOpen,
  Award,
  Image as GalleryIcon,
  ExternalLink,
  Terminal,
  Sparkles,
} from "lucide-react";

// Struktur menu admin sesuai halaman yang ada di sistem
const adminNavigation = [
  {
    group: "Overview",
    items: [
      {
        title: "Dashboard",
        url: "/admin",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    group: "Portfolio Content",
    items: [
      {
        title: "Projects",
        url: "/admin/project",
        icon: FolderGit2,
      },
      {
        title: "Experiences",
        url: "/admin/experience",
        icon: Briefcase,
      },
      {
        title: "Tech Stacks",
        url: "/admin/stack",
        icon: Layers,
      },
      {
        title: "Publications",
        url: "/admin/publication",
        icon: BookOpen,
      },
      {
        title: "Certificates",
        url: "/admin/certificate",
        icon: Award,
      },
      {
        title: "Gallery",
        url: "/admin/gallery",
        icon: GalleryIcon,
      },
    ],
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  return (
    <Sidebar variant="floating" {...props}>
      {/* Header Admin Sidebar */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" render={<Link href="/admin" />}>
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-zinc-900 text-zinc-100 border border-zinc-800 shadow-sm">
                <Terminal className="size-4" />
              </div>
              <div className="flex flex-col gap-0.5 leading-none">
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-sm">Admin Studio</span>
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Live
                  </span>
                </div>
                <span className="text-xs text-muted-foreground font-mono">
                  Portfolio Control
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* Konten Menu Navigasi */}
      <SidebarContent>
        {adminNavigation.map((section) => (
          <SidebarGroup key={section.group}>
            <SidebarGroupLabel className="text-[11px] font-mono tracking-wider uppercase text-muted-foreground/70">
              {section.group}
            </SidebarGroupLabel>
            <SidebarMenu className="gap-1">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive =
                  item.url === "/admin"
                    ? pathname === "/admin"
                    : pathname === item.url || pathname.startsWith(`${item.url}/`);

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      isActive={isActive}
                      render={<Link href={item.url} />}
                      tooltip={item.title}
                      className="gap-3 font-medium transition-colors"
                    >
                      <Icon className="size-4 shrink-0" />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroup>
        ))}
      </SidebarContent>

      {/* Footer Navigasi ke Website Publik */}
      <SidebarFooter className="border-t border-sidebar-border/50 pt-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              render={
                <a
                  href="/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted-foreground hover:text-foreground"
                />
              }
            >
              <ExternalLink className="size-4 shrink-0" />
              <span>Lihat Portofolio</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

export default AppSidebar;
