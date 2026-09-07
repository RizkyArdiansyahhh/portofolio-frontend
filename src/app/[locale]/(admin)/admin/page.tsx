import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { FolderGit2, Briefcase, Layers, Award } from "lucide-react";

export default function AdminDashboardPage() {
  const statCards = [
    { title: "Total Projects", count: "12", icon: FolderGit2, desc: "Active & Archived" },
    { title: "Experiences", count: "4", icon: Briefcase, desc: "Career milestones" },
    { title: "Tech Stacks", count: "28", icon: Layers, desc: "Languages & Frameworks" },
    { title: "Certificates", count: "8", icon: Award, desc: "Verified credentials" },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-bold tracking-tight">Dashboard Overview</h1>
        <p className="text-xs text-muted-foreground font-mono mt-1">
          Selamat datang di panel kontrol portofolio Anda.
        </p>
      </div>

      {/* Grid Quick Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              className="rounded-xl border border-border bg-card p-5 shadow-sm space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-muted-foreground">
                  {card.title}
                </span>
                <Icon className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="text-2xl font-bold font-mono">{card.count}</div>
              <p className="text-[11px] text-muted-foreground">{card.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Quick Action / Placeholder content */}
      <div className="min-h-[300px] rounded-xl border border-dashed border-border flex items-center justify-center p-8 text-center text-muted-foreground text-xs font-mono">
        Pilih salah satu menu di sidebar untuk mengelola Projects, Experience, Stacks, Publications, Certificates, atau Gallery.
      </div>
    </div>
  );
}
