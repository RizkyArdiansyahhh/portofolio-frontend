import z from "zod";

export const stackFormSchema = z.object({
    name : z.string().min(1, "Name is required"),
    category : z.enum(["AI_ML", "BACKEND", "FRONTEND", "CLOUD_DEVOPS", "DATA_SCIENCE", "MOBILE"]),
    icon : z.string().min(1, "Icon is required"),
    stackUrl : z.url("Invalid URL").optional().or(z.literal(""))
})

export type StackFormSchemaType = z.infer<typeof stackFormSchema>