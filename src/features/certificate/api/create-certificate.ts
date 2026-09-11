import { axiosInstance } from "@/lib/axios";
import { MutationConfig, queryClient } from "@/lib/reat-query";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Certificate } from "../types";
import { certificateKeys } from "./query_keys";

export type CreateCertificatePayload = Omit<
  Certificate,
  "id" | "createdAt" | "updatedAt"
>;

const createCertificate = async (payload: CreateCertificatePayload) => {
  const { data } = await axiosInstance.post<{ data: Certificate }>(
    "/certificate",
    payload,
  );
  return data.data;
};

type UseCreateCertificate = {
  mutationConfig?: MutationConfig<typeof createCertificate>;
};

export const useCreateCertificate = ({
  mutationConfig,
}: UseCreateCertificate = {}) => {
  return useMutation({
    mutationFn: createCertificate,
    ...mutationConfig,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: certificateKeys.all });
      toast.success("Certificate created successfully");
      mutationConfig?.onSuccess?.(...args);
    },
  });
};
