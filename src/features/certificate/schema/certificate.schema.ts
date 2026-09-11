import { z } from "zod";

export const certificateFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  issuer: z.string().min(1, "Issuer or organization is required"),
  issuedAt: z.string().min(1, "Issue date is required"),
  url: z.string().url("Invalid credential URL").min(1, "Credential URL is required"),
  imageUrl: z.string().min(1, "Certificate image is required"),
});

export type CertificateFormSchemaType = z.infer<typeof certificateFormSchema>;
