"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CertificateForm } from "./certificate-form";
import { Certificate } from "../types";

export interface CertificateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  certificate?: Certificate | null;
}

export const CertificateDialog = ({
  open,
  onOpenChange,
  certificate,
}: CertificateDialogProps) => {
  const isEditing = Boolean(certificate?.id);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-mono text-base sm:text-lg">
            {isEditing ? "Edit Certificate" : "Add New Certificate"}
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground font-mono">
            {isEditing
              ? "Update your certification, license, or credential details."
              : "Enter details of your professional certification, license, or credential."}
          </DialogDescription>
        </DialogHeader>

        <div className="pt-2">
          <CertificateForm
            certificate={certificate}
            onSuccess={() => onOpenChange(false)}
            onCancel={() => onOpenChange(false)}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
