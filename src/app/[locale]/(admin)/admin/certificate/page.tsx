import React from "react";
import { Award, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminCertificatePage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight">Certifications</h1>
          <p className="text-xs text-muted-foreground font-mono mt-1">
            Kelola sertifikat kompetensi dan lisensi profesional.
          </p>
        </div>
        <Button size="sm" className="gap-2 font-mono text-xs">
          <Plus className="w-4 h-4" />
          Tambah Sertifikat
        </Button>
      </div>

      <div className="rounded-xl border border-dashed border-border p-12 flex flex-col items-center justify-center text-center">
        <Award className="w-8 h-8 text-muted-foreground mb-3" />
        <h3 className="text-sm font-semibold">Sertifikasi & Lisensi</h3>
        <p className="text-xs text-muted-foreground mt-1 max-w-sm">
          Kelola kredensial profesional dan lisensi keahlian Anda.
        </p>
      </div>
    </div>
  );
}
