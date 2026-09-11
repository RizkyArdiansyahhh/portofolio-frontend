"use client";

import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, FolderGit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useGetProjectById } from "../api/get-project-byId";
import { ProjectForm } from "../components/project-form";

export function EditProjectPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const { data: project, isLoading, isError } = useGetProjectById({
    id: params.id,
  });

  if (isLoading) {
    return (
      <div className="py-24 flex flex-col items-center justify-center">
        <Spinner className="w-8 h-8 text-muted-foreground" />
      </div>
    );
  }

  if (isError || !project) {
    return (
      <div className="py-16 text-center space-y-4">
        <p className="text-sm font-mono text-destructive">
          Project with ID &ldquo;{params.id}&rdquo; was not found.
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.push("/admin/project")}
          className="cursor-pointer"
        >
          Back to Projects
        </Button>
      </div>
    );
  }

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
            Edit Project
          </h1>
          <p className="text-xs text-muted-foreground font-mono mt-1">
            Updating details and screenshots for &ldquo;{project.title}&rdquo;.
          </p>
        </div>
      </div>

      {/* Main Form */}
      <ProjectForm project={project} />
    </div>
  );
}

export default EditProjectPage;
