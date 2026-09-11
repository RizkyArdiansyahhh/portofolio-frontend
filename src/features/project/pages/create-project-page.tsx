"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, FolderGit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProjectForm } from "../components/project-form";

export function CreateProjectPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-6 w-full max-w-6xl mx-auto pb-12">
      {/* Header & Back Navigation */}
      <div className="flex items-center gap-3 border-b border-border/60 pb-5">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => router.push("/admin/project")}
          className="size-8 cursor-pointer shrink-0"
          title="Back to projects"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight font-mono flex items-center gap-2">
            <FolderGit2 className="w-5 h-5 text-muted-foreground" />
            Add New Project
          </h1>
          <p className="text-xs text-muted-foreground font-mono mt-1">
            Fill in the details below to add a new project showcase to your portfolio.
          </p>
        </div>
      </div>

      {/* Main Form */}
      <ProjectForm />
    </div>
  );
}

export default CreateProjectPage;
