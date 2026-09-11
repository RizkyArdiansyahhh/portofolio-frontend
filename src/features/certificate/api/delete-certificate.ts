import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { MutationConfig, queryClient } from "@/lib/reat-query";
import { toast } from "sonner";
import { certificateKeys } from "./query_keys";

const deleteCertificate = async (id: string) => {
  const { data } = await axiosInstance.delete(`/certificate/${id}`);
  return data.data;
};

type UseDeleteCertificate = {
  mutationConfig?: MutationConfig<typeof deleteCertificate>;
};

export const useDeleteCertificate = ({
  mutationConfig,
}: UseDeleteCertificate = {}) => {
  return useMutation({
    mutationFn: (id: string) => deleteCertificate(id),
    ...mutationConfig,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: certificateKeys.all });
      toast.success("Certificate deleted successfully");
      mutationConfig?.onSuccess?.(...args);
    },
  });
};
