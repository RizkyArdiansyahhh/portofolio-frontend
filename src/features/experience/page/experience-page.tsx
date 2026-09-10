"use client";

import { Plus, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ExperienceTable } from "../components/experience-table";
import { Link } from "@/i18n/navigation";

export function ExperiencePage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight font-mono">
              Experience Management
            </h1>
          </div>
          <p className="text-xs text-muted-foreground font-mono mt-1.5">
            Kelola riwayat pekerjaan, jabatan, dan pencapaian karier profesional
            Anda.
          </p>
        </div>

        {/* Action Button */}
        <Button
          size="sm"
          className="gap-2 font-mono text-xs shadow-sm self-start sm:self-auto"
        >
          <Link
            href={"/admin/experience/new"}
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Tambah Experience
          </Link>
        </Button>
      </div>

      <ExperienceTable></ExperienceTable>
    </div>
  );
}

export default ExperiencePage;
