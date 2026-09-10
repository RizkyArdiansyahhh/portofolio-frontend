"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/[locale]/(admin)/admin/components/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ExternalLink,
  MoreHorizontalIcon,
  Pencil,
  Trash2,
  BookOpen,
} from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { useGetPublications } from "../api/get-publications";
import { useDeletePublication } from "../api/delete-publication";
import { Publication } from "../types";

export interface PublicationTableProps {
  onEdit: (publication: Publication) => void;
}

export const PublicationTable = ({ onEdit }: PublicationTableProps) => {
  const { data: publications, isLoading, isError } = useGetPublications();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const { mutate: deletePublication } = useDeletePublication({
    mutationConfig: {
      onSettled: () => {
        setDeletingId(null);
      },
    },
  });

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Delete publication "${title}"?`)) {
      setDeletingId(id);
      deletePublication(id);
    }
  };

  const formatPublishedDate = (dateStr: string) => {
    if (!dateStr) return "-";
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return dateStr;
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
      });
    } catch {
      return dateStr;
    }
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
        <p>Something went wrong while fetching publications.</p>
      </div>
    );
  }

  if (!publications || publications.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border/80 bg-muted/10 p-12 flex flex-col items-center justify-center text-center">
        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground mb-3">
          <BookOpen className="w-5 h-5" />
        </div>
        <h3 className="text-sm font-semibold font-mono">No Publications Yet</h3>
        <p className="text-xs text-muted-foreground font-mono mt-1 max-w-sm">
          Scientific papers, conference talks, and technical articles will appear here once added.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full border border-border/60 rounded-xl overflow-hidden bg-card/40">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[45%]">Title</TableHead>
            <TableHead>Venue / Publisher</TableHead>
            <TableHead>Published Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {publications.map((item: Publication) => (
            <TableRow key={item.id}>
              {/* Title & Link */}
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  <span className="line-clamp-1">{item.title}</span>
                  {item.url && (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors shrink-0"
                      title="Open publication link"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </TableCell>

              {/* Venue */}
              <TableCell className="text-muted-foreground">
                <span className="line-clamp-1">{item.venue}</span>
              </TableCell>

              {/* Published */}
              <TableCell className="text-muted-foreground font-mono text-xs">
                {formatPublishedDate(item.published)}
              </TableCell>

              {/* Actions Menu */}
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
                      onClick={() => onEdit(item)}
                      className="gap-2 cursor-pointer"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                      Edit
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
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
