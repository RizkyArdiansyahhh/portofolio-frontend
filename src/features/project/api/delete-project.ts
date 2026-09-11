import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { MutationConfig, queryClient } from "@/lib/reat-query";
import { toast } from "sonner";
import { projectKeys } from "./query_keys";

const deleteProject = async (id: string) => {
  const { data } = await axiosInstance.delete(`/projects/${id}`);
  return data.data;
};

type UseDeleteProject = {
  mutationConfig?: MutationConfig<typeof deleteProject>;
};

export const useDeleteProject = ({
  mutationConfig,
}: UseDeleteProject = {}) => {
  return useMutation({
    mutationFn: (id: string) => deleteProject(id),
    ...mutationConfig,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: projectKeys.all });
      toast.success("Project deleted successfully");
      mutationConfig?.onSuccess?.(...args);
    },
  });
};
