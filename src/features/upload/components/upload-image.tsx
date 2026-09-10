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
import { Building2, UploadCloud, X } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

export interface UploadImageProps {
  label?: string;
  description?: string;
  value?: string;
  onChange?: (url: string) => void;
  folder?: string;
  disabled?: boolean;
  invalid?: boolean;
  error?: string;
  maxSizeMB?: number;
  className?: string;
}

export function UploadImage({
  label,
  description = "Recommended square image, max 2MB.",
  value,
  onChange,
  folder = "general",
  disabled = false,
  invalid = false,
  error,
  maxSizeMB = 2,
  className,
}: UploadImageProps) {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const { mutate: uploadLogo, isPending: isUploading } = useUploadImage({
    mutationConfig: {
      onSuccess: (res) => {
        onChange?.(res.url);
        toast.success("Image uploaded successfully");
      },
      onError: () => {
        toast.error("Failed to upload image");
      },
    },
  });

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > maxSizeMB * 1024 * 1024) {
      toast.error(`Image size must be less than ${maxSizeMB}MB`);
      return;
    }

    uploadLogo({ file, folder });
    e.target.value = "";
  };

  const handleRemove = () => {
    onChange?.("");
  };

  return (
    <Field data-invalid={invalid} className={cn("w-full", className)}>
      {label && <FieldLabel>{label}</FieldLabel>}

      <div className="flex items-center gap-4">
        <div
          onClick={() =>
            !disabled && !isUploading && fileInputRef.current?.click()
          }
          className={cn(
            "relative flex size-16 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-lg border border-dashed border-input bg-muted/30 transition-colors hover:bg-muted/60",
            disabled && "cursor-not-allowed opacity-50",
            invalid && "border-destructive",
          )}
        >
          {isUploading ? (
            <Spinner className="size-6 text-primary" />
          ) : value ? (
            <img
              src={value}
              alt="Uploaded preview"
              className="size-full object-cover"
            />
          ) : (
            <Building2 className="size-6 text-muted-foreground" />
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-1.5">
          <Input
            ref={fileInputRef}
            type="file"
            accept="image/png, image/jpeg, image/webp, image/avif"
            disabled={disabled || isUploading}
            onChange={handleFileSelect}
            className="hidden"
          />

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={disabled || isUploading}
              onClick={() => fileInputRef.current?.click()}
            >
              <UploadCloud className="size-4 mr-1.5" />
              {value ? "Change Image" : "Upload Image"}
            </Button>

            {value && !disabled && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-destructive hover:text-destructive"
                onClick={handleRemove}
              >
                <X className="size-4 mr-1" />
                Remove
              </Button>
            )}
          </div>

          {description && <FieldDescription>{description}</FieldDescription>}
        </div>
      </div>

      {invalid && error && <FieldError errors={[{ message: error }]} />}
    </Field>
  );
}
