"use client";

import { useState } from "react";
import { Plus, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CertificateTable } from "../components/certificate-table";
import { CertificateDialog } from "../components/certificate-dialog";
import { Certificate } from "../types";

export function CertificatePage() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCertificate, setEditingCertificate] =
    useState<Certificate | null>(null);

  const handleOpenCreate = () => {
    setEditingCertificate(null);
    setDialogOpen(true);
  };

  const handleOpenEdit = (certificate: Certificate) => {
    setEditingCertificate(certificate);
    setDialogOpen(true);
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight font-mono flex items-center gap-2">
              <Award className="w-5 h-5 text-muted-foreground" />
              Certifications Management
            </h1>
          </div>
          <p className="text-xs text-muted-foreground font-mono mt-1.5">
            Kelola sertifikat kompetensi, lisensi keahlian, dan kredensial profesional Anda.
          </p>
        </div>

        {/* Action Button */}
        <Button
          size="sm"
          onClick={handleOpenCreate}
          className="gap-2 font-mono text-xs shadow-sm self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Tambah Sertifikat
        </Button>
      </div>

      {/* Main Table */}
      <CertificateTable onEdit={handleOpenEdit} />

      {/* Create / Edit Dialog */}
      <CertificateDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        certificate={editingCertificate}
      />
    </div>
  );
}

export default CertificatePage;
