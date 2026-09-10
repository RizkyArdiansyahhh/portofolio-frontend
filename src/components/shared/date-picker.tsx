"use client";

import * as React from "react";
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export interface MonthYearPickerProps {
  id?: string;
  name?: string;
  label?: string;
  value?: string; // Format: "YYYY-MM"
  onChange?: (value: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  "aria-invalid"?: boolean | "true" | "false";
}

export const MonthYearPicker = React.forwardRef<
  HTMLInputElement,
  MonthYearPickerProps
>(
  (
    {
      id,
      name,
      label,
      value,
      onChange,
      onBlur,
      placeholder = "Select month & year",
      disabled = false,
      className,
      "aria-invalid": ariaInvalid,
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false);
    const today = React.useMemo(() => new Date(), []);

    // Parse nilai "YYYY-MM"
    const parseValue = React.useCallback((val?: string) => {
      if (!val) return null;
      const parts = val.split("-");
      if (parts.length >= 2) {
        const y = parseInt(parts[0], 10);
        const m = parseInt(parts[1], 10);
        if (!isNaN(y) && !isNaN(m) && m >= 1 && m <= 12) {
          return { year: y, month: m - 1 };
        }
      }
      return null;
    }, []);

    const parsed = parseValue(value);

    const [selectedYear, setSelectedYear] = React.useState<number>(
      parsed?.year ?? today.getFullYear()
    );
    const [selectedMonth, setSelectedMonth] = React.useState<number | null>(
      parsed?.month ?? null
    );
    const [displayYear, setDisplayYear] = React.useState<number>(
      parsed?.year ?? today.getFullYear()
    );

    // Sinkronisasi saat value prop berubah dari luar (misal reset form)
    React.useEffect(() => {
      const p = parseValue(value);
      if (p) {
        setSelectedYear(p.year);
        setSelectedMonth(p.month);
        setDisplayYear(p.year);
      } else {
        setSelectedMonth(null);
      }
    }, [value, parseValue]);

    // Format tampilan label: "May 2026"
    const formattedDisplay = React.useMemo(() => {
      if (selectedMonth === null) return "";
      return new Date(selectedYear, selectedMonth).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      });
    }, [selectedYear, selectedMonth]);

    const handleSelectMonth = (monthIndex: number) => {
      setSelectedMonth(monthIndex);
      setSelectedYear(displayYear);

      const dateString = `${displayYear}-${String(monthIndex + 1).padStart(2, "0")}`;

      onChange?.(dateString);
      setOpen(false);
    };

    const handleOpenChange = (newOpen: boolean) => {
      if (newOpen) {
        setDisplayYear(selectedYear);
      }
      setOpen(newOpen);
    };

    const inputContent = (
      <InputGroup className={cn("w-full", className)}>
        <InputGroupInput
          ref={ref}
          id={id}
          name={name}
          value={formattedDisplay}
          placeholder={placeholder}
          readOnly
          disabled={disabled}
          aria-invalid={ariaInvalid}
          onClick={() => !disabled && handleOpenChange(true)}
          onBlur={onBlur}
          className="cursor-pointer"
        />
        <InputGroupAddon align="inline-end">
          <Popover open={open} onOpenChange={handleOpenChange}>
            <PopoverTrigger
              disabled={disabled}
              render={
                <InputGroupButton
                  type="button"
                  variant="ghost"
                  size="icon-xs"
                  aria-label="Select date"
                  disabled={disabled}
                >
                  <CalendarIcon className="size-4 text-muted-foreground" />
                </InputGroupButton>
              }
            />
            <PopoverContent
              className="w-64 p-3 bg-popover text-popover-foreground border rounded-lg shadow-md"
              align="end"
              sideOffset={8}
            >
              {/* Header Navigasi Tahun */}
              <div className="flex items-center justify-between pb-2 mb-2 border-b">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="size-7"
                  onClick={() => setDisplayYear((prev) => prev - 1)}
                >
                  <ChevronLeft className="size-4" />
                </Button>
                <span className="text-sm font-semibold">{displayYear}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="size-7"
                  onClick={() => setDisplayYear((prev) => prev + 1)}
                >
                  <ChevronRight className="size-4" />
                </Button>
              </div>

              {/* Grid 12 Bulan */}
              <div className="grid grid-cols-3 gap-2">
                {MONTHS.map((m, index) => {
                  const isSelected =
                    selectedMonth === index && selectedYear === displayYear;
                  const isCurrentMonth =
                    today.getMonth() === index &&
                    today.getFullYear() === displayYear;

                  return (
                    <Button
                      key={m}
                      type="button"
                      variant={isSelected ? "default" : "ghost"}
                      size="sm"
                      className={cn(
                        "h-8 text-xs font-normal",
                        isSelected &&
                          "bg-primary text-primary-foreground font-medium",
                        isCurrentMonth &&
                          !isSelected &&
                          "border border-primary/40 font-medium"
                      )}
                      onClick={() => handleSelectMonth(index)}
                    >
                      {m}
                    </Button>
                  );
                })}
              </div>
            </PopoverContent>
          </Popover>
        </InputGroupAddon>
      </InputGroup>
    );

    // Jika dipanggil dengan prop `label` mandiri di luar <Field>, bungkus dengan <Field>
    if (label) {
      return (
        <Field className="w-full">
          <FieldLabel htmlFor={id}>{label}</FieldLabel>
          {inputContent}
        </Field>
      );
    }

    return inputContent;
  }
);

MonthYearPicker.displayName = "MonthYearPicker";
