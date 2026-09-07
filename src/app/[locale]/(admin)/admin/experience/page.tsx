import React from "react";
import { Briefcase, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminExperiencePage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight">Experience Management</h1>
          <p className="text-xs text-muted-foreground font-mono mt-1">
            Kelola riwayat pekerjaan dan karier profesional Anda.
          </p>
        </div>
        <Button size="sm" className="gap-2 font-mono text-xs">
          <Plus className="w-4 h-4" />
          Tambah Experience
        </Button>
      </div>

      <div className="rounded-xl border border-dashed border-border p-12 flex flex-col items-center justify-center text-center">
        <Briefcase className="w-8 h-8 text-muted-foreground mb-3" />
        <h3 className="text-sm font-semibold">Riwayat Pengalaman Kerja</h3>
        <p className="text-xs text-muted-foreground mt-1 max-w-sm">
          Terhubung dengan endpoint <code className="text-foreground font-mono">/api/v1/experience</code>.
        </p>
      </div>
    </div>
  );
}
