import { axiosInstance } from "@/lib/axios";
import { MutationConfig, queryClient } from "@/lib/reat-query";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Project } from "../types";
import { projectKeys } from "./query_keys";

export type CreateProjectPayload = Omit<
  Project,
  "id" | "slug" | "createdAt" | "updatedAt"
>;

const createProject = async (payload: CreateProjectPayload) => {
  const { data } = await axiosInstance.post<{ data: Project }>(
    "/projects",
    payload,
  );
  return data.data;
};

type UseCreateProject = {
  mutationConfig?: MutationConfig<typeof createProject>;
};

export const useCreateProject = ({
  mutationConfig,
}: UseCreateProject = {}) => {
  return useMutation({
    mutationFn: createProject,
    ...mutationConfig,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: projectKeys.all });
      toast.success("Project created successfully");
      mutationConfig?.onSuccess?.(...args);
    },
  });
};
