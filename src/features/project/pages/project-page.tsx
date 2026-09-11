"use client";

import { useRouter } from "next/navigation";
import { Plus, FolderGit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProjectTable } from "../components/project-table";

export function ProjectPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight font-mono flex items-center gap-2">
              <FolderGit2 className="w-5 h-5 text-muted-foreground" />
              Projects Management
            </h1>
          </div>
          <p className="text-xs text-muted-foreground font-mono mt-1.5">
            Kelola portofolio proyek, studi kasus teknologi, dan tautan repositori Anda.
          </p>
        </div>

        {/* Create Action */}
        <Button
          size="sm"
          onClick={() => router.push("/admin/project/new")}
          className="gap-2 font-mono text-xs shadow-sm self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Tambah Project
        </Button>
      </div>

      {/* Main Table */}
      <ProjectTable />
    </div>
  );
}

export default ProjectPage;
