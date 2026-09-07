import React from "react";
import { Layers, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminStackPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight">Tech Stack & Skills</h1>
          <p className="text-xs text-muted-foreground font-mono mt-1">
            Kelola keahlian teknologi, bahasa pemrograman, dan tools.
          </p>
        </div>
        <Button size="sm" className="gap-2 font-mono text-xs">
          <Plus className="w-4 h-4" />
          Tambah Stack
        </Button>
      </div>

      <div className="rounded-xl border border-dashed border-border p-12 flex flex-col items-center justify-center text-center">
        <Layers className="w-8 h-8 text-muted-foreground mb-3" />
        <h3 className="text-sm font-semibold">Daftar Keahlian & Teknologi</h3>
        <p className="text-xs text-muted-foreground mt-1 max-w-sm">
          Terhubung dengan endpoint <code className="text-foreground font-mono">/api/v1/stack</code>.
        </p>
      </div>
    </div>
  );
}
