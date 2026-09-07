import React from "react";
import { BookOpen, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminPublicationPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight">Publications</h1>
          <p className="text-xs text-muted-foreground font-mono mt-1">
            Kelola publikasi karya ilmiah, artikel, atau tulisan.
          </p>
        </div>
        <Button size="sm" className="gap-2 font-mono text-xs">
          <Plus className="w-4 h-4" />
          Tambah Publikasi
        </Button>
      </div>

      <div className="rounded-xl border border-dashed border-border p-12 flex flex-col items-center justify-center text-center">
        <BookOpen className="w-8 h-8 text-muted-foreground mb-3" />
        <h3 className="text-sm font-semibold">Publikasi & Artikel</h3>
        <p className="text-xs text-muted-foreground mt-1 max-w-sm">
          Kelola jurnal, conference paper, dan artikel teknologi Anda.
        </p>
      </div>
    </div>
  );
}
