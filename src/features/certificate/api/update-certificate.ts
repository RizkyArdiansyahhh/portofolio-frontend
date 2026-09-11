import { axiosInstance } from "@/lib/axios";
import { MutationConfig, queryClient } from "@/lib/reat-query";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Certificate } from "../types";
import { certificateKeys } from "./query_keys";

export type UpdateCertificatePayload = Partial<
  Omit<Certificate, "id" | "createdAt" | "updatedAt">
>;

type UpdateCertificateRequest = {
  id: string;
  payload: UpdateCertificatePayload;
};

const updateCertificate = async ({ id, payload }: UpdateCertificateRequest) => {
  const { data } = await axiosInstance.patch<{ data: Certificate }>(
    `/certificate/${id}`,
    payload,
  );
  return data.data;
};

type UseUpdateCertificate = {
  mutationConfig?: MutationConfig<typeof updateCertificate>;
};

export const useUpdateCertificate = ({
  mutationConfig,
}: UseUpdateCertificate = {}) => {
  return useMutation({
    mutationFn: updateCertificate,
    ...mutationConfig,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: certificateKeys.all });
      toast.success("Certificate updated successfully");
      mutationConfig?.onSuccess?.(...args);
    },
  });
};
