"use client";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import {
  experienceFormSchema,
  ExperienceFormSchemaType,
} from "../schema/experience.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateExperience } from "../api/create-experience";
import { useParams, useRouter } from "next/navigation";
import { useUpdateExperience } from "../api/update-experience";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MonthYearPicker } from "@/components/shared/date-picker";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Plus, Trash2, X } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { UploadImage } from "@/features/upload/components/upload-image";
import { Spinner } from "@/components/ui/spinner";
import { useGetExperienceById } from "../api/get-experience-byId";

export const ExperienceForm = () => {
  const router = useRouter();
  const params = useParams<{ id: string | undefined }>();
  const [skillInput, setSkillInput] = useState("");

  const { mutate: createExperience, isPending: isCreatingExperience } =
    useCreateExperience({
      mutationConfig: {
        onSuccess: () => {
          router.back();
        },
      },
    });

  const { mutate: updateExperience, isPending: isUpdatingExperience } =
    useUpdateExperience({
      mutationConfig: {
        onSuccess: () => {
          router.back();
        },
      },
    });

  const { data: experience, isLoading: isLoadingExperience } =
    useGetExperienceById({ id: params.id });

  const form = useForm<ExperienceFormSchemaType>({
    resolver: zodResolver(experienceFormSchema),
    defaultValues: {
      company: "",
      role: "",
      employmentType:
        "" as unknown as ExperienceFormSchemaType["employmentType"],
      workArrangement:
        "" as unknown as ExperienceFormSchemaType["workArrangement"],
      startDate: "",
      isCurrentlyWorking: false,
      endDate: "",
      description: [""],
      skills: [""],
    },
  });

  useEffect(() => {
    if (experience) {
      form.reset({
        company: experience.company,
        role: experience.role,
        employmentType: experience.employmentType,
        workArrangement: experience.workArrangement,
        startDate: experience.startDate,
        isCurrentlyWorking: !experience.endDate,
        endDate: experience.endDate ?? "",
        description: experience.description,
        skills: experience.skills,
      });
    }
  }, [experience, form]);

  const isCurrentlyWorking = form.watch("isCurrentlyWorking");

  const imageUrl = form.watch("companyLogo");
  console.log(imageUrl);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "description" as never,
  });

  useEffect(() => {
    if (isCurrentlyWorking) {
      form.setValue("endDate", "");
      form.clearErrors("endDate");
    }
  }, [isCurrentlyWorking]);

  const onSubmit = (data: ExperienceFormSchemaType) => {
    console.log(data);
    const { isCurrentlyWorking, ...rest } = data;
    const payload = {
      ...rest,
      endDate: isCurrentlyWorking || !data.endDate ? null : data.endDate,
    };

    if (params.id) {
      updateExperience({
        id: params.id,
        payload: payload,
      });
    } else {
      createExperience(payload);
    }
  };

  const handleAddSkill = (
    currentSkills: string[],
    onChange: (val: string[]) => void,
  ) => {
    const trimmed = skillInput.trim();
    if (trimmed && !currentSkills.includes(trimmed)) {
      onChange([...currentSkills.filter(Boolean), trimmed]);
      setSkillInput("");
    }
  };
  const handleRemoveSkill = (
    skillToRemove: string,
    currentSkills: string[],
    onChange: (val: string[]) => void,
  ) => {
    onChange(currentSkills.filter((s) => s !== skillToRemove));
  };

  return (
    <>
      <div>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldSet>
            <Controller
              name="company"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Company</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Example: Google"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="role"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Job Title</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Example: Software Engineer"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="location"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Location</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="City or Region"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="employmentType"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Employment Type</FieldLabel>
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
                      <SelectValue placeholder="Select employment type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="FULL_TIME">Full Time</SelectItem>
                      <SelectItem value="PART_TIME">Part Time</SelectItem>
                      <SelectItem value="CONTRACT">Contract</SelectItem>
                      <SelectItem value="INTERN">Internship</SelectItem>
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="workArrangement"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Work Arrangement</FieldLabel>
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
                      <SelectValue placeholder="Select work arrangement" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ON_SITE">On Site</SelectItem>
                      <SelectItem value="REMOTE">Remote</SelectItem>
                      <SelectItem value="HYBRID">Hybrid</SelectItem>
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="isCurrentlyWorking"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field
                  data-invalid={fieldState.invalid}
                  orientation="horizontal"
                >
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    aria-invalid={fieldState.invalid}
                    id={field.name}
                  />
                  <FieldLabel htmlFor={field.name}>
                    I currently work here
                  </FieldLabel>
                </Field>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <Controller
                name="startDate"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Start Date</FieldLabel>
                    <MonthYearPicker
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="Select start date"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              {!isCurrentlyWorking && (
                <Controller
                  name="endDate"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>End Date</FieldLabel>
                      <MonthYearPicker
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        placeholder="Select end date"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              )}
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Job Descriptions</label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => append("")}
                >
                  <Plus className="size-4 mr-1" /> Add
                </Button>
              </div>
              {fields.map((fieldItem, index) => (
                <div key={fieldItem.id} className="flex items-start gap-2">
                  <Controller
                    name={`description.${index}`}
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field>
                        <Textarea
                          {...field}
                          rows={2}
                          placeholder={`Point ${index + 1}: e.g. Developed features using Next.js`}
                          className="flex-1"
                          aria-invalid={fieldState.invalid}
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                  {fields.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:text-destructive"
                      onClick={() => remove(index)}
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
            <Controller
              name="skills"
              control={form.control}
              render={({ field, fieldState }) => {
                const skillsList = Array.isArray(field.value)
                  ? field.value.filter(Boolean)
                  : [];

                return (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Skills</FieldLabel>
                    <FieldDescription>
                      Press Enter or click Add to add a skill (e.g. React,
                      TypeScript)
                    </FieldDescription>

                    {/* Input Bar */}
                    <div className="flex gap-2">
                      <Input
                        value={skillInput}
                        onChange={(e) => setSkillInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault(); // Cegah submit form
                            handleAddSkill(skillsList, field.onChange);
                          }
                        }}
                        placeholder="Type a skill and press Enter"
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() =>
                          handleAddSkill(skillsList, field.onChange)
                        }
                      >
                        <Plus className="size-4 mr-1" /> Add
                      </Button>
                    </div>

                    {/* Daftar Badge Skills */}
                    {skillsList.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {skillsList.map((skill) => (
                          <Badge
                            key={skill}
                            variant="secondary"
                            className="gap-1 pl-2.5 pr-1 py-1 text-xs"
                          >
                            {skill}
                            <button
                              type="button"
                              onClick={() =>
                                handleRemoveSkill(
                                  skill,
                                  skillsList,
                                  field.onChange,
                                )
                              }
                              className="rounded-full p-0.5 hover:bg-muted-foreground/20 cursor-pointer"
                            >
                              <X className="size-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    )}

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                );
              }}
            />
            <Controller
              name="companyLogo"
              control={form.control}
              render={({ field, fieldState }) => (
                <UploadImage
                  label="Company Logo"
                  value={field.value}
                  onChange={field.onChange}
                  folder="companies"
                  invalid={fieldState.invalid}
                  error={fieldState.error?.message}
                />
              )}
            />
            <Controller
              name="companyUrl"
              control={form.control}
              render={({ field }) => (
                <div className="flex flex-col gap-3">
                  <label className="text-sm font-medium">Company URL</label>
                  <Input
                    {...field}
                    placeholder="https://example.com"
                    className="flex-1"
                  />
                </div>
              )}
            />
            <Field>
              <Button
                type="submit"
                variant={"default"}
                className="cursor-pointer"
                disabled={
                  isCreatingExperience ||
                  isUpdatingExperience ||
                  !form.formState.isValid
                }
              >
                {isCreatingExperience ? (
                  <>
                    <Spinner />
                  </>
                ) : (
                  "Save"
                )}
              </Button>
            </Field>
          </FieldSet>
        </form>
      </div>
    </>
  );
};
