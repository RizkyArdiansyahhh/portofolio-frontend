"use client";

import { useState } from "react";
import { Plus, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PublicationTable } from "../components/publication-table";
import { PublicationDialog } from "../components/publication-dialog";
import { Publication } from "../types";

export function PublicationPage() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingPublication, setEditingPublication] =
    useState<Publication | null>(null);

  const handleOpenCreate = () => {
    setEditingPublication(null);
    setDialogOpen(true);
  };

  const handleOpenEdit = (publication: Publication) => {
    setEditingPublication(publication);
    setDialogOpen(true);
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight font-mono flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-muted-foreground" />
              Publications Management
            </h1>
          </div>
          <p className="text-xs text-muted-foreground font-mono mt-1.5">
            Kelola publikasi karya ilmiah, jurnal, conference paper, dan artikel teknologi Anda.
          </p>
        </div>

        {/* Action Button */}
        <Button
          size="sm"
          onClick={handleOpenCreate}
          className="gap-2 font-mono text-xs shadow-sm self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Tambah Publikasi
        </Button>
      </div>

      {/* Main Table */}
      <PublicationTable onEdit={handleOpenEdit} />

      {/* Create / Edit Dialog */}
      <PublicationDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        publication={editingPublication}
      />
    </div>
  );
}

export default PublicationPage;
