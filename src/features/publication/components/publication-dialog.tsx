"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PublicationForm } from "./publication-form";
import { Publication } from "../types";

export interface PublicationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  publication?: Publication | null;
}

export const PublicationDialog = ({
  open,
  onOpenChange,
  publication,
}: PublicationDialogProps) => {
  const isEditing = Boolean(publication?.id);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-mono text-base sm:text-lg">
            {isEditing ? "Edit Publication" : "Add New Publication"}
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground font-mono">
            {isEditing
              ? "Update your published paper, conference presentation, or article details."
              : "Enter details of your published scientific paper, conference talk, or technical article."}
          </DialogDescription>
        </DialogHeader>

        <div className="pt-2">
          <PublicationForm
            publication={publication}
            onSuccess={() => onOpenChange(false)}
            onCancel={() => onOpenChange(false)}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
