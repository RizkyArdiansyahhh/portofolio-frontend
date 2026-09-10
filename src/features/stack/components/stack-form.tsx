"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { stackFormSchema, StackFormSchemaType } from "../schema/stack.schema";
import { Field, FieldError, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useCreateExperience } from "@/features/experience/api/create-experience";
import { useCreateStack } from "../api/create-stack";

export const StackForm = () => {
  const form = useForm<StackFormSchemaType>({
    resolver: zodResolver(stackFormSchema),
    defaultValues: {
      name: "",
      category: "FRONTEND",
      icon: "",
      stackUrl: "",
    },
  });

  const { mutate: createStack, isPending: isCreatingStack } = useCreateStack({
    mutationConfig: {
      onSuccess: () => {
        form.reset();
      },
    },
  });

  function handleSubmit(data: StackFormSchemaType) {
    createStack({
      ...data,
      stackUrl: data.stackUrl || undefined,
    });
  }

  return (
    <>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <FieldSet>
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Stack Tech</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  placeholder="Enter your stack name"
                />
                {fieldState.error && (
                  <FieldError
                    errors={[{ message: fieldState.error.message }]}
                  />
                )}
              </Field>
            )}
          />
          <Controller
            name="category"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Category</FieldLabel>
                <Select
                  name={field.name}
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    className="w-full"
                  >
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="FRONTEND">Frontend</SelectItem>
                    <SelectItem value="BACKEND">Backend</SelectItem>
                    <SelectItem value="CLOUD_DEVOPS">Cloud & DevOps</SelectItem>
                    <SelectItem value="AI_ML">AI & Machine Learning</SelectItem>
                    <SelectItem value="MOBILE">Mobile</SelectItem>
                    <SelectItem value="DATA_SCIENCE">Data Science</SelectItem>
                  </SelectContent>
                </Select>
                {fieldState.error && (
                  <FieldError
                    errors={[{ message: fieldState.error.message }]}
                  />
                )}
              </Field>
            )}
          />
          <Controller
            name="icon"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Icon</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  placeholder="Enter your icon"
                />
                {fieldState.error && (
                  <FieldError
                    errors={[{ message: fieldState.error.message }]}
                  />
                )}
              </Field>
            )}
          />
          <Controller
            name="stackUrl"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Link Stack</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  placeholder="Enter your stack url"
                />
                {fieldState.error && (
                  <FieldError
                    errors={[{ message: fieldState.error.message }]}
                  />
                )}
              </Field>
            )}
          />
          <Button
            type="submit"
            variant={"default"}
            className={"cursor-pointer"}
            disabled={isCreatingStack || !form.formState.isValid}
          >
            {isCreatingStack ? <Spinner></Spinner> : "Add Stack"}
          </Button>
        </FieldSet>
      </form>
    </>
  );
};
