import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { MutationConfig, queryClient } from "@/lib/reat-query";
import { toast } from "sonner";
import { publicationKeys } from "./query_keys";

const deletePublication = async (id: string) => {
  const { data } = await axiosInstance.delete(`/publication/${id}`);
  return data.data;
};

type UseDeletePublication = {
  mutationConfig?: MutationConfig<typeof deletePublication>;
};

export const useDeletePublication = ({
  mutationConfig,
}: UseDeletePublication = {}) => {
  return useMutation({
    mutationFn: (id: string) => deletePublication(id),
    ...mutationConfig,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: publicationKeys.all });
      toast.success("Publication deleted successfully");
      mutationConfig?.onSuccess?.(...args);
    },
  });
};
