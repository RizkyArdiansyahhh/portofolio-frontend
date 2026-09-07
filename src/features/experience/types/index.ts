// 1. Enums (Persis dengan Prisma & DTO backend)
export type EmploymentType =
  | "FULL_TIME"
  | "PART_TIME"
  | "CONTRACT"
  | "INTERN";

export type WorkArrangement = "ON_SITE" | "REMOTE" | "HYBRID";

export interface Experience {
  id: string;
  company: string;
  companyLogo?: string | null;
  companyUrl?: string | null;
  location?: string | null;
  role: string;
  employmentType: EmploymentType;
  workArrangement: WorkArrangement;
  startDate: string;
  endDate?: string | null;
  description: string[];
  skills: string[];
  createdAt: string;
  updatedAt: string;
}