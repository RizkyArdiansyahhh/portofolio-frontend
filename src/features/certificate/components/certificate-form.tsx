"use client";

import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  certificateFormSchema,
  CertificateFormSchemaType,
} from "../schema/certificate.schema";
import {
  Field,
  FieldError,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { MonthYearPicker } from "@/components/shared/date-picker";
import { UploadImage } from "@/features/upload/components/upload-image";
import { useCreateCertificate } from "../api/create-certificate";
import { useUpdateCertificate } from "../api/update-certificate";
import { Certificate } from "../types";

export interface CertificateFormProps {
  certificate?: Certificate | null;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export const CertificateForm = ({
  certificate,
  onSuccess,
  onCancel,
}: CertificateFormProps) => {
  const isEditing = Boolean(certificate?.id);

  const form = useForm<CertificateFormSchemaType>({
    resolver: zodResolver(certificateFormSchema),
    defaultValues: {
      title: "",
      issuer: "",
      issuedAt: "",
      url: "",
      imageUrl: "",
    },
  });

  useEffect(() => {
    if (certificate) {
      let formattedDate = certificate.issuedAt;
      if (certificate.issuedAt && certificate.issuedAt.includes("T")) {
        formattedDate = certificate.issuedAt.slice(0, 7);
      }

      form.reset({
        title: certificate.title,
        issuer: certificate.issuer,
        issuedAt: formattedDate,
        url: certificate.url,
        imageUrl: certificate.imageUrl,
      });
    } else {
      form.reset({
        title: "",
        issuer: "",
        issuedAt: "",
        url: "",
        imageUrl: "",
      });
    }
  }, [certificate, form]);

  const { mutate: createCertificate, isPending: isCreating } =
    useCreateCertificate({
      mutationConfig: {
        onSuccess: () => {
          form.reset();
          onSuccess?.();
        },
      },
    });

  const { mutate: updateCertificate, isPending: isUpdating } =
    useUpdateCertificate({
      mutationConfig: {
        onSuccess: () => {
          onSuccess?.();
        },
      },
    });

  const isPending = isCreating || isUpdating;

  const onSubmit = (data: CertificateFormSchemaType) => {
    const isoDate = new Date(data.issuedAt).toISOString();
    const payload = {
      ...data,
      issuedAt: isoDate,
    };

    if (certificate?.id) {
      updateCertificate({
        id: certificate.id,
        payload,
      });
    } else {
      createCertificate(payload);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <FieldSet className="space-y-4">
        {/* Certificate Image Upload */}
        <Controller
          name="imageUrl"
          control={form.control}
          render={({ field, fieldState }) => (
            <UploadImage
              label="Certificate Image / Badge"
              description="Upload certificate badge or preview (max 2MB)."
              folder="certificate"
              value={field.value}
              onChange={field.onChange}
              invalid={fieldState.invalid}
              error={fieldState.error?.message}
            />
          )}
        />

        {/* Title */}
        <Controller
          name="title"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Certificate Title</FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="e.g. AWS Certified Solutions Architect - Associate"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Issuer */}
        <Controller
          name="issuer"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Issuer / Organization</FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="e.g. Amazon Web Services, Google Cloud, Coursera"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Issued Date */}
        <Controller
          name="issuedAt"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Issue Date</FieldLabel>
              <MonthYearPicker
                id={field.name}
                value={field.value}
                onChange={field.onChange}
                aria-invalid={fieldState.invalid}
                placeholder="Select issue month & year"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Credential URL */}
        <Controller
          name="url"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Credential URL</FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="https://www.credly.com/badges/..."
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldSet>

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-2 pt-2">
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onCancel}
            disabled={isPending}
          >
            Cancel
          </Button>
        )}
        <Button
          type="submit"
          size="sm"
          disabled={isPending}
          className="gap-2 font-mono text-xs cursor-pointer"
        >
          {isPending ? (
            <>
              <Spinner className="w-3.5 h-3.5" />
              Saving...
            </>
          ) : isEditing ? (
            "Update Certificate"
          ) : (
            "Add Certificate"
          )}
        </Button>
      </div>
    </form>
  );
};
