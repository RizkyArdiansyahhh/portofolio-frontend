import { z } from "zod";

export const publicationFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  venue: z.string().min(1, "Venue or publisher is required"),
  published: z.string().min(1, "Publication date is required"),
  url: z.string().url("Invalid URL").min(1, "URL is required"),
});

export type PublicationFormSchemaType = z.infer<typeof publicationFormSchema>;
