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
  Award,
  ExternalLink,
  MoreHorizontalIcon,
  Pencil,
  Trash2,
} from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { useGetCertificates } from "../api/get-certificates";
import { useDeleteCertificate } from "../api/delete-certificate";
import { Certificate } from "../types";

export interface CertificateTableProps {
  onEdit: (certificate: Certificate) => void;
}

export const CertificateTable = ({ onEdit }: CertificateTableProps) => {
  const { data: certificates, isLoading, isError } = useGetCertificates();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const { mutate: deleteCertificate } = useDeleteCertificate({
    mutationConfig: {
      onSettled: () => {
        setDeletingId(null);
      },
    },
  });

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Delete certificate "${title}"?`)) {
      setDeletingId(id);
      deleteCertificate(id);
    }
  };

  const formatIssuedDate = (dateStr: string) => {
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
        <p>Something went wrong while fetching certificates.</p>
      </div>
    );
  }

  if (!certificates || certificates.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border/80 bg-muted/10 p-12 flex flex-col items-center justify-center text-center">
        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground mb-3">
          <Award className="w-5 h-5" />
        </div>
        <h3 className="text-sm font-semibold font-mono">No Certificates Yet</h3>
        <p className="text-xs text-muted-foreground font-mono mt-1 max-w-sm">
          Certificates, licenses, and professional credentials will appear here once added.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full border border-border/60 rounded-xl overflow-hidden bg-card/40">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">Badge</TableHead>
            <TableHead className="w-[40%]">Title</TableHead>
            <TableHead>Issuer</TableHead>
            <TableHead>Issue Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {certificates.map((item: Certificate) => (
            <TableRow key={item.id}>
              {/* Badge Thumbnail */}
              <TableCell>
                <div className="size-10 rounded-lg overflow-hidden border border-border/60 bg-muted/20 flex items-center justify-center shrink-0">
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="size-full object-cover"
                    />
                  ) : (
                    <Award className="size-5 text-muted-foreground" />
                  )}
                </div>
              </TableCell>

              {/* Title & Credential Link */}
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  <span className="line-clamp-1">{item.title}</span>
                  {item.url && (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors shrink-0"
                      title="Open credential URL"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </TableCell>

              {/* Issuer */}
              <TableCell className="text-muted-foreground">
                <span className="line-clamp-1">{item.issuer}</span>
              </TableCell>

              {/* Issue Date */}
              <TableCell className="text-muted-foreground font-mono text-xs">
                {formatIssuedDate(item.issuedAt)}
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
