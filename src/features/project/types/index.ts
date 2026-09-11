export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  liveUrl?: string;
  githubUrl?: string;
  ownership: string;
  role: string;
  team?: string | null;
  features: string[];
  techStack: string[];
  impact: string[];
  images: string[];
  createdAt: string;
  updatedAt: string;
}
