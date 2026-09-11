"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/[locale]/(admin)/admin/components/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ExternalLink,
  Globe,
  Layers,
  MoreHorizontalIcon,
  Pencil,
  Trash2,
} from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { Spinner } from "@/components/ui/spinner";
import { useGetProjects } from "../api/get-projects";
import { useDeleteProject } from "../api/delete-project";
import { Project } from "../types";

export const ProjectTable = () => {
  const router = useRouter();
  const { data: projects, isLoading, isError } = useGetProjects();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const { mutate: deleteProject } = useDeleteProject({
    mutationConfig: {
      onSettled: () => {
        setDeletingId(null);
      },
    },
  });

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete project "${title}"?`)) {
      setDeletingId(id);
      deleteProject(id);
    }
  };

  const handleEdit = (id: string) => {
    router.push(`/admin/project/${id}/edit`);
  };

  if (isLoading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center">
        <Spinner className="w-6 h-6 text-muted-foreground" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="py-12 text-center text-sm font-mono text-destructive">
        <p>Something went wrong while fetching projects.</p>
      </div>
    );
  }

  if (!projects || projects.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border/80 bg-muted/10 p-12 flex flex-col items-center justify-center text-center">
        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground mb-3">
          <Layers className="w-5 h-5" />
        </div>
        <h3 className="text-sm font-semibold font-mono">No Projects Yet</h3>
        <p className="text-xs text-muted-foreground font-mono mt-1 max-w-sm">
          Your portfolio projects, repositories, and case studies will appear here once added.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full border border-border/60 rounded-xl overflow-hidden bg-card/40">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-16">Cover</TableHead>
            <TableHead className="w-[30%]">Project</TableHead>
            <TableHead>Role & Ownership</TableHead>
            <TableHead>Tech Stack</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((item: Project) => {
            const coverImage = item.images?.[0];

            return (
              <TableRow key={item.id}>
                {/* Cover Image Thumbnail */}
                <TableCell>
                  <div className="w-16 h-10 rounded-lg overflow-hidden border border-border/60 bg-muted/20 flex items-center justify-center shrink-0">
                    {coverImage ? (
                      <img
                        src={coverImage}
                        alt={item.title}
                        className="size-full object-cover"
                      />
                    ) : (
                      <Layers className="size-4 text-muted-foreground" />
                    )}
                  </div>
                </TableCell>

                {/* Title & Slug & Links */}
                <TableCell className="font-medium">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold line-clamp-1">
                        {item.title}
                      </span>
                      {/* External links */}
                      {item.liveUrl && (
                        <a
                          href={item.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-foreground transition-colors shrink-0"
                          title="Open Live Demo"
                        >
                          <Globe className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {item.githubUrl && (
                        <a
                          href={item.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-foreground transition-colors shrink-0"
                          title="Open GitHub Repo"
                        >
                          <FaGithub className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                    <div className="text-[11px] text-muted-foreground font-mono">
                      /{item.slug}
                    </div>
                  </div>
                </TableCell>

                {/* Role & Ownership */}
                <TableCell>
                  <div className="space-y-0.5">
                    <div className="text-xs font-medium">{item.role}</div>
                    <div className="text-[11px] text-muted-foreground font-mono">
                      {item.ownership} {item.team ? `• ${item.team}` : ""}
                    </div>
                  </div>
                </TableCell>

                {/* Tech Stack Preview */}
                <TableCell>
                  <div className="flex flex-wrap gap-1 max-w-xs">
                    {item.techStack?.slice(0, 3).map((tech) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="text-[10px] px-1.5 py-0 font-mono"
                      >
                        {tech}
                      </Badge>
                    ))}
                    {item.techStack && item.techStack.length > 3 && (
                      <span className="text-[10px] text-muted-foreground font-mono self-center">
                        +{item.techStack.length - 3}
                      </span>
                    )}
                  </div>
                </TableCell>

                {/* Actions Dropdown */}
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      render={
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-8 cursor-pointer"
                          disabled={deletingId === item.id}
                        >
                          {deletingId === item.id ? (
                            <Spinner className="w-4 h-4" />
                          ) : (
                            <MoreHorizontalIcon className="w-4 h-4" />
                          )}
                          <span className="sr-only">Open menu</span>
                        </Button>
                      }
                    />
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => handleEdit(item.id)}
                        className="gap-2 cursor-pointer"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                        Edit Project
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        variant="destructive"
                        onClick={() => handleDelete(item.id, item.title)}
                        className="gap-2 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
