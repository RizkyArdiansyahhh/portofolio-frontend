import React from "react";
import { Image as GalleryIcon, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminGalleryPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight">Media & Gallery</h1>
          <p className="text-xs text-muted-foreground font-mono mt-1">
            Kelola foto, screenshot, dan aset gambar portofolio.
          </p>
        </div>
        <Button size="sm" className="gap-2 font-mono text-xs">
          <Plus className="w-4 h-4" />
          Upload Gambar
        </Button>
      </div>

      <div className="rounded-xl border border-dashed border-border p-12 flex flex-col items-center justify-center text-center">
        <GalleryIcon className="w-8 h-8 text-muted-foreground mb-3" />
        <h3 className="text-sm font-semibold">Media Gallery</h3>
        <p className="text-xs text-muted-foreground mt-1 max-w-sm">
          Terhubung dengan upload storage Supabase via <code className="text-foreground font-mono">/api/v1/upload</code>.
        </p>
      </div>
    </div>
  );
}
