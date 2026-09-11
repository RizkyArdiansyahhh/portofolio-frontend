"use client";

import { useState, KeyboardEvent } from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";

export interface TechStackInputProps {
  label?: string;
  description?: string;
  value?: string[];
  onChange?: (value: string[]) => void;
  invalid?: boolean;
  error?: string;
}

export const TechStackInput = ({
  label = "Tech Stack",
  description = "Press Enter or comma to add technologies (e.g. Next.js, TypeScript, PostgreSQL).",
  value = [],
  onChange,
  invalid = false,
  error,
}: TechStackInputProps) => {
  const [inputValue, setInputValue] = useState("");

  const handleAdd = () => {
    const trimmed = inputValue.trim().replace(/^,|,$/g, "");
    if (!trimmed) return;

    if (!value.includes(trimmed)) {
      onChange?.([...value, trimmed]);
    }
    setInputValue("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      handleAdd();
    }
  };

  const handleRemove = (tagToRemove: string) => {
    onChange?.(value.filter((tag) => tag !== tagToRemove));
  };

  return (
    <Field data-invalid={invalid} className="w-full">
      {label && <FieldLabel>{label}</FieldLabel>}

      <div className="flex gap-2">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="e.g. Next.js, Prisma, TailwindCSS..."
          aria-invalid={invalid}
          autoComplete="off"
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleAdd}
          className="gap-1 cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          Add
        </Button>
      </div>

      {description && <FieldDescription>{description}</FieldDescription>}

      {/* Badges Container */}
      {value.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-2">
          {value.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="gap-1.5 pr-1.5 py-1 text-xs font-mono"
            >
              <span>{tag}</span>
              <button
                type="button"
                onClick={() => handleRemove(tag)}
                className="rounded-full p-0.5 hover:bg-muted-foreground/20 text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
                title={`Remove ${tag}`}
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}

      {invalid && error && <FieldError errors={[{ message: error }]} />}
    </Field>
  );
};
