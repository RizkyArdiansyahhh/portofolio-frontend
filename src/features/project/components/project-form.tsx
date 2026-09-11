"use client";

import { useEffect } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {
  projectFormSchema,
  ProjectFormSchemaType,
} from "../schema/project.schema";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TechStackInput } from "./tech-stack-input";
import { ProjectImagesInput } from "./project-images-input";
import { useCreateProject } from "../api/create-project";
import { useUpdateProject } from "../api/update-project";
import { Project } from "../types";
import { Plus, Trash2, ArrowLeft, Globe, Users, ShieldCheck, Sparkles, Layers } from "lucide-react";
import { FaGithub } from "react-icons/fa6";

export interface ProjectFormProps {
  project?: Project | null;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const OWNERSHIP_OPTIONS = [
  "Personal Project",
  "Client Work / Freelance",
  "Company / Full-time",
  "Open Source",
  "Hackathon / Competition",
];

export const ProjectForm = ({
  project,
  onSuccess,
  onCancel,
}: ProjectFormProps) => {
  const router = useRouter();
  const isEditing = Boolean(project?.id);

  const form = useForm<ProjectFormSchemaType>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      title: "",
      description: "",
      liveUrl: "",
      githubUrl: "",
      ownership: "Personal Project",
      role: "",
      team: "",
      features: [""],
      techStack: [],
      impact: [""],
      images: [],
    },
  });

  const {
    fields: featureFields,
    append: appendFeature,
    remove: removeFeature,
  } = useFieldArray({
    control: form.control,
    name: "features" as never,
  });

  const {
    fields: impactFields,
    append: appendImpact,
    remove: removeImpact,
  } = useFieldArray({
    control: form.control,
    name: "impact" as never,
  });

  useEffect(() => {
    if (project) {
      form.reset({
        title: project.title,
        description: project.description,
        liveUrl: project.liveUrl || "",
        githubUrl: project.githubUrl || "",
        ownership: project.ownership || "Personal Project",
        role: project.role || "",
        team: project.team || "",
        features:
          project.features && project.features.length > 0
            ? project.features
            : [""],
        techStack: project.techStack || [],
        impact:
          project.impact && project.impact.length > 0 ? project.impact : [""],
        images: project.images || [],
      });
    }
  }, [project, form]);

  const { mutate: createProject, isPending: isCreating } = useCreateProject({
    mutationConfig: {
      onSuccess: () => {
        onSuccess?.();
        router.push("/admin/project");
      },
    },
  });

  const { mutate: updateProject, isPending: isUpdating } = useUpdateProject({
    mutationConfig: {
      onSuccess: () => {
        onSuccess?.();
        router.push("/admin/project");
      },
    },
  });

  const isPending = isCreating || isUpdating;

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      router.push("/admin/project");
    }
  };

  const onSubmit = (data: ProjectFormSchemaType) => {
    const cleanedFeatures = data.features
      .map((f) => f.trim())
      .filter((f) => f.length > 0);

    const cleanedImpact = (data.impact || [])
      .map((i) => i.trim())
      .filter((i) => i.length > 0);

    const payload = {
      ...data,
      liveUrl: data.liveUrl || undefined,
      githubUrl: data.githubUrl || undefined,
      team: data.team || undefined,
      features: cleanedFeatures.length > 0 ? cleanedFeatures : ["Key Features Included"],
      impact: cleanedImpact,
    };

    if (project?.id) {
      updateProject({
        id: project.id,
        payload,
      });
    } else {
      createProject(payload);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      {/* 2-Column Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Core Details (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Section 1: Basic Info */}
          <div className="border border-border/70 rounded-xl p-5 sm:p-6 bg-card/40 space-y-4">
            <div className="flex items-center gap-2 border-b border-border/60 pb-3">
              <Layers className="w-4 h-4 text-muted-foreground" />
              <h2 className="text-sm font-semibold font-mono tracking-tight">
                Project Overview
              </h2>
            </div>

            {/* Title */}
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Project Title</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="e.g. AI-Powered Medical Imaging Diagnosis Platform"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Description */}
            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                  <Textarea
                    {...field}
                    id={field.name}
                    rows={4}
                    aria-invalid={fieldState.invalid}
                    placeholder="Provide a comprehensive summary of what this project does, target users, and key problems it solves..."
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          {/* Section 2: Links & Collaboration */}
          <div className="border border-border/70 rounded-xl p-5 sm:p-6 bg-card/40 space-y-4">
            <div className="flex items-center gap-2 border-b border-border/60 pb-3">
              <Globe className="w-4 h-4 text-muted-foreground" />
              <h2 className="text-sm font-semibold font-mono tracking-tight">
                Links & Collaboration
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Live URL */}
              <Controller
                name="liveUrl"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name} className="flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5 text-muted-foreground" />
                      Live Demo URL
                    </FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="https://myproject.com"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* GitHub URL */}
              <Controller
                name="githubUrl"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name} className="flex items-center gap-1.5">
                      <FaGithub className="w-3.5 h-3.5 text-muted-foreground" />
                      GitHub Repository URL
                    </FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="https://github.com/username/repo"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Role */}
              <Controller
                name="role"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Your Role</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="e.g. Lead Fullstack"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Ownership */}
              <Controller
                name="ownership"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Ownership</FieldLabel>
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
                        <SelectValue placeholder="Select ownership" />
                      </SelectTrigger>
                      <SelectContent>
                        {OWNERSHIP_OPTIONS.map((opt) => (
                          <SelectItem key={opt} value={opt}>
                            {opt}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Team */}
              <Controller
                name="team"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Team / Partner</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="e.g. Solo / 3 Engineers"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>
          </div>

          {/* Section 3: Dynamic Key Features */}
          <div className="border border-border/70 rounded-xl p-5 sm:p-6 bg-card/40 space-y-4">
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-muted-foreground" />
                <h2 className="text-sm font-semibold font-mono tracking-tight">
                  Key Features
                </h2>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => appendFeature("" as never)}
                className="gap-1 font-mono text-xs cursor-pointer h-7"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Feature
              </Button>
            </div>

            <div className="space-y-2.5">
              {featureFields.map((fieldItem, idx) => (
                <div key={fieldItem.id} className="flex items-center gap-2">
                  <Controller
                    name={`features.${idx}`}
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <div className="flex-1">
                        <Input
                          {...field}
                          placeholder={`Feature ${idx + 1} (e.g. Real-time inference streaming via WebSocket)`}
                          aria-invalid={fieldState.invalid}
                          autoComplete="off"
                        />
                      </div>
                    )}
                  />
                  {featureFields.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFeature(idx)}
                      className="size-8 text-destructive hover:text-destructive cursor-pointer shrink-0"
                      title="Remove feature"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
            {form.formState.errors.features && (
              <p className="text-xs text-destructive font-mono">
                {form.formState.errors.features.message}
              </p>
            )}
          </div>

          {/* Section 4: Dynamic Impact & Outcomes */}
          <div className="border border-border/70 rounded-xl p-5 sm:p-6 bg-card/40 space-y-4">
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-muted-foreground" />
                <h2 className="text-sm font-semibold font-mono tracking-tight">
                  Project Impact & Results
                </h2>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => appendImpact("" as never)}
                className="gap-1 font-mono text-xs cursor-pointer h-7"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Impact
              </Button>
            </div>

            <div className="space-y-2.5">
              {impactFields.map((fieldItem, idx) => (
                <div key={fieldItem.id} className="flex items-center gap-2">
                  <Controller
                    name={`impact.${idx}`}
                    control={form.control}
                    render={({ field }) => (
                      <div className="flex-1">
                        <Input
                          {...field}
                          placeholder={`Impact ${idx + 1} (e.g. Reduced processing latency by 45%, 10k+ MAU)`}
                          autoComplete="off"
                        />
                      </div>
                    )}
                  />
                  {impactFields.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeImpact(idx)}
                      className="size-8 text-destructive hover:text-destructive cursor-pointer shrink-0"
                      title="Remove impact"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Tech Stack, Media & Save (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Section 5: Tech Stack */}
          <div className="border border-border/70 rounded-xl p-5 sm:p-6 bg-card/40 space-y-4">
            <Controller
              name="techStack"
              control={form.control}
              render={({ field, fieldState }) => (
                <TechStackInput
                  value={field.value}
                  onChange={field.onChange}
                  invalid={fieldState.invalid}
                  error={fieldState.error?.message}
                />
              )}
            />
          </div>

          {/* Section 6: Screenshots / Media Gallery */}
          <div className="border border-border/70 rounded-xl p-5 sm:p-6 bg-card/40 space-y-4">
            <Controller
              name="images"
              control={form.control}
              render={({ field, fieldState }) => (
                <ProjectImagesInput
                  value={field.value}
                  onChange={field.onChange}
                  invalid={fieldState.invalid}
                  error={fieldState.error?.message}
                />
              )}
            />
          </div>

          {/* Section 7: Action & Submission Card */}
          <div className="border border-border/70 rounded-xl p-5 bg-card/40 space-y-4 sticky top-6">
            <div className="flex flex-col gap-1">
              <h3 className="text-sm font-semibold font-mono">
                {isEditing ? "Save Changes" : "Publish Project"}
              </h3>
              <p className="text-xs text-muted-foreground font-mono">
                {isEditing
                  ? `Editing existing project "${project?.title}".`
                  : "Review all information before publishing to portfolio."}
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleCancel}
                disabled={isPending}
                className="w-full cursor-pointer"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                size="sm"
                disabled={isPending}
                className="w-full gap-2 font-mono text-xs cursor-pointer"
              >
                {isPending ? (
                  <>
                    <Spinner className="w-3.5 h-3.5" />
                    Saving...
                  </>
                ) : isEditing ? (
                  "Update Project"
                ) : (
                  "Create Project"
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
