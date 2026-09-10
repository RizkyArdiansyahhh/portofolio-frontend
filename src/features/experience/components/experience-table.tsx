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
import { MoreHorizontalIcon } from "lucide-react";
import { useGetExperiences } from "../api/get-experience";
import { Spinner } from "@/components/ui/spinner";
import { Experience } from "../types";
import { formatPeriod } from "@/lib/date";

export const ExperienceTable = () => {
  const { data: experiences, isLoading, isError } = useGetExperiences();

  if (isLoading) {
    return (
      <>
        <div className="mx-auto">
          <Spinner></Spinner>
        </div>
      </>
    );
  }
  if (isError) {
    return (
      <>
        <div className="mx-auto">
          <p>Something went wrong</p>
        </div>
      </>
    );
  }

  if (!experiences || experiences.length === 0) {
    return (
      <>
        <div className="mx-auto">
          <p className="text-center text-muted-foreground">
            No experience found
          </p>
        </div>
      </>
    );
  }
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Company</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Employment Type</TableHead>
            <TableHead>Work Arrangement</TableHead>
            <TableHead>Period</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={7} className="h-36 text-center">
                <Spinner className="mx-auto"></Spinner>
              </TableCell>
            </TableRow>
          ) : experiences.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="h-36 text-center">
                <p className="text-center text-muted-foreground">
                  No experience found
                </p>
              </TableCell>
            </TableRow>
          ) : (
            experiences.map((experience: Experience) => (
              <TableRow id={experience.id}>
                <TableCell className="font-medium">
                  {experience.company}
                </TableCell>
                <TableCell>{experience.role}</TableCell>
                <TableCell>{experience.location}</TableCell>
                <TableCell>{experience.employmentType}</TableCell>
                <TableCell>{experience.workArrangement}</TableCell>
                <TableCell>
                  {formatPeriod(experience.startDate, experience.endDate)}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      render={
                        <Button variant="ghost" size="icon" className="size-8">
                          <MoreHorizontalIcon />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      }
                    />
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Duplicate</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem variant="destructive">
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </>
  );
};
