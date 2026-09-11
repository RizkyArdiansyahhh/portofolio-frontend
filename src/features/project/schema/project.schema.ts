import { z } from "zod";

export const projectFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  liveUrl: z
    .string()
    .url("Must be a valid URL")
    .or(z.literal(""))
    .optional(),
  githubUrl: z
    .string()
    .url("Must be a valid URL")
    .or(z.literal(""))
    .optional(),
  ownership: z.string().min(1, "Ownership is required"),
  role: z.string().min(1, "Role is required"),
  team: z.string().optional(),
  features: z
    .array(z.string().min(1, "Feature point cannot be empty"))
    .min(1, "At least one feature point is required"),
  techStack: z
    .array(z.string())
    .min(1, "At least one tech stack tag is required"),
  impact: z.array(z.string()),
  images: z
    .array(z.string())
    .min(1, "At least one project image/screenshot is required"),
});

export type ProjectFormSchemaType = z.infer<typeof projectFormSchema>;
