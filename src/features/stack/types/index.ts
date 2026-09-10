export type StackCategory = "AI_ML" | "BACKEND" | "FRONTEND" | "CLOUD_DEVOPS" | "DATA_SCIENCE" | "MOBILE"

export interface Stack {
    id: string;
    name: string;
    category: StackCategory;
    icon: string;
    stackUrl?: string;
    createdAt: string;
    updatedAt: string;
}