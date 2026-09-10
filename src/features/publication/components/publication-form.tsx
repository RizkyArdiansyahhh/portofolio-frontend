"use client";

import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  publicationFormSchema,
  PublicationFormSchemaType,
} from "../schema/publication.schema";
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
import { useCreatePublication } from "../api/create-publication";
import { useUpdatePublication } from "../api/update-publication";
import { Publication } from "../types";

export interface PublicationFormProps {
  publication?: Publication | null;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export const PublicationForm = ({
  publication,
  onSuccess,
  onCancel,
}: PublicationFormProps) => {
  const isEditing = Boolean(publication?.id);

  const form = useForm<PublicationFormSchemaType>({
    resolver: zodResolver(publicationFormSchema),
    defaultValues: {
      title: "",
      venue: "",
      published: "",
      url: "",
    },
  });

  useEffect(() => {
    if (publication) {
      // Format existing published date into YYYY-MM if it's an ISO string
      let formattedDate = publication.published;
      if (publication.published && publication.published.includes("T")) {
        formattedDate = publication.published.slice(0, 7);
      }

      form.reset({
        title: publication.title,
        venue: publication.venue,
        published: formattedDate,
        url: publication.url,
      });
    } else {
      form.reset({
        title: "",
        venue: "",
        published: "",
        url: "",
      });
    }
  }, [publication, form]);

  const { mutate: createPublication, isPending: isCreating } =
    useCreatePublication({
      mutationConfig: {
        onSuccess: () => {
          form.reset();
          onSuccess?.();
        },
      },
    });

  const { mutate: updatePublication, isPending: isUpdating } =
    useUpdatePublication({
      mutationConfig: {
        onSuccess: () => {
          onSuccess?.();
        },
      },
    });

  const isPending = isCreating || isUpdating;

  const onSubmit = (data: PublicationFormSchemaType) => {
    // Pastikan published date berformat ISO standar yang valid
    const isoDate = new Date(data.published).toISOString();
    const payload = {
      ...data,
      published: isoDate,
    };

    if (publication?.id) {
      updatePublication({
        id: publication.id,
        payload,
      });
    } else {
      createPublication(payload);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <FieldSet className="space-y-4">
        {/* Title */}
        <Controller
          name="title"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Title</FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="e.g. Distributed AI Model Inference on Edge Devices"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Venue / Publisher */}
        <Controller
          name="venue"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Venue / Publisher</FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="e.g. IEEE Conference, NeurIPS, Medium, Journal of AI"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Published Date */}
        <Controller
          name="published"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Published Date</FieldLabel>
              <MonthYearPicker
                id={field.name}
                value={field.value}
                onChange={field.onChange}
                aria-invalid={fieldState.invalid}
                placeholder="Select published month & year"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* URL */}
        <Controller
          name="url"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Publication URL</FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="https://doi.org/... or https://arxiv.org/abs/..."
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
            "Update Publication"
          ) : (
            "Add Publication"
          )}
        </Button>
      </div>
    </form>
  );
};
