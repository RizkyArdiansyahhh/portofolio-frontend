import { axiosInstance } from "@/lib/axios";
import { MutationConfig, queryClient } from "@/lib/reat-query";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Project } from "../types";
import { projectKeys } from "./query_keys";

export type UpdateProjectPayload = Partial<
  Omit<Project, "id" | "slug" | "createdAt" | "updatedAt">
>;

type UpdateProjectRequest = {
  id: string;
  payload: UpdateProjectPayload;
};

const updateProject = async ({ id, payload }: UpdateProjectRequest) => {
  const { data } = await axiosInstance.patch<{ data: Project }>(
    `/projects/${id}`,
    payload,
  );
  return data.data;
};

type UseUpdateProject = {
  mutationConfig?: MutationConfig<typeof updateProject>;
};

export const useUpdateProject = ({
  mutationConfig,
}: UseUpdateProject = {}) => {
  return useMutation({
    mutationFn: updateProject,
    ...mutationConfig,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: projectKeys.all });
      toast.success("Project updated successfully");
      mutationConfig?.onSuccess?.(...args);
    },
  });
};
