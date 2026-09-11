"use client";

import * as React from "react";
import { useUploadImage } from "@/features/upload/api/create-upload";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Image as ImageIcon, Trash2, UploadCloud } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export interface ProjectImagesInputProps {
  label?: string;
  description?: string;
  value?: string[];
  onChange?: (urls: string[]) => void;
  invalid?: boolean;
  error?: string;
  maxSizeMB?: number;
}

export const ProjectImagesInput = ({
  label = "Project Screenshots / Gallery",
  description = "Upload project images. The first image will be used as the primary cover.",
  value = [],
  onChange,
  invalid = false,
  error,
  maxSizeMB = 5,
}: ProjectImagesInputProps) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const { mutate: uploadImage, isPending: isUploading } = useUploadImage({
    mutationConfig: {
      onSuccess: (res) => {
        onChange?.([...value, res.url]);
        toast.success("Image uploaded successfully");
      },
      onError: () => {
        toast.error("Failed to upload image");
      },
    },
  });

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.size > maxSizeMB * 1024 * 1024) {
        toast.error(`File "${file.name}" exceeds ${maxSizeMB}MB`);
        continue;
      }
      uploadImage({ file, folder: "projects" });
    }

    e.target.value = "";
  };

  const handleRemove = (indexToRemove: number) => {
    onChange?.(value.filter((_, idx) => idx !== indexToRemove));
  };

  return (
    <Field data-invalid={invalid} className="w-full space-y-2">
      <div className="flex items-center justify-between">
        {label && <FieldLabel>{label}</FieldLabel>}
        <span className="text-xs text-muted-foreground font-mono">
          {value.length} image{value.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Hidden File Input */}
      <Input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/png, image/jpeg, image/webp, image/avif"
        disabled={isUploading}
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Images Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {value.map((url, idx) => (
          <div
            key={url + idx}
            className="group relative aspect-video rounded-lg overflow-hidden border border-border/80 bg-muted/20"
          >
            <img
              src={url}
              alt={`Screenshot ${idx + 1}`}
              className="size-full object-cover transition-transform group-hover:scale-105"
            />

            {/* Cover Badge on first image */}
            {idx === 0 && (
              <div className="absolute top-2 left-2 pointer-events-none">
                <Badge variant="default" className="text-[10px] px-1.5 py-0 h-4">
                  Cover
                </Badge>
              </div>
            )}

            {/* Remove Action Overlay */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="size-8 cursor-pointer"
                onClick={() => handleRemove(idx)}
                title="Remove image"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}

        {/* Upload Trigger Card */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className={cn(
            "aspect-video rounded-lg border-2 border-dashed border-border/80 hover:border-primary/60 bg-muted/10 hover:bg-muted/30 transition-colors flex flex-col items-center justify-center gap-1.5 text-muted-foreground hover:text-foreground cursor-pointer p-3",
            isUploading && "pointer-events-none opacity-60",
            invalid && "border-destructive/60",
          )}
        >
          {isUploading ? (
            <>
              <Spinner className="size-5 text-primary" />
              <span className="text-[11px] font-mono">Uploading...</span>
            </>
          ) : (
            <>
              <UploadCloud className="size-5" />
              <span className="text-xs font-mono font-medium">Add Image</span>
              <span className="text-[10px] text-muted-foreground font-mono">
                PNG, JPG up to {maxSizeMB}MB
              </span>
            </>
          )}
        </button>
      </div>

      {description && <FieldDescription>{description}</FieldDescription>}
      {invalid && error && <FieldError errors={[{ message: error }]} />}
    </Field>
  );
};
