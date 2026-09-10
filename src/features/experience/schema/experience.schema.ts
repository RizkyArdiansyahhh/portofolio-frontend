import { z } from "zod";

export const experienceFormSchema = z.object({
  company: z.string().min(1, "Company is required"),
  role: z.string().min(1, "Role is required"),
  companyLogo: z.string().optional(),
  companyUrl: z.url("Invalid URL").optional().or(z.literal("")),
  location: z.string().optional(),

  employmentType: z.enum(["FULL_TIME", "PART_TIME", "CONTRACT", "INTERN"], {
    message: "Employment type is required",
  }),
  workArrangement: z.enum(["ON_SITE", "REMOTE", "HYBRID"], {
    message: "Work arrangement is required",
  }),

  startDate: z.string().min(1, "Start date is required"),
  isCurrentlyWorking: z.boolean(),
  endDate: z.string().optional(),
  description: z
    .array(z.string().trim().min(1, "Description cannot be empty"))
    .min(1, "Description is required"),
  skills: z.array(z.string().trim().min(1, "Skill cannot be empty")).min(1, "Skills is required"),
});

export type ExperienceFormSchemaType = z.infer<typeof experienceFormSchema>;
