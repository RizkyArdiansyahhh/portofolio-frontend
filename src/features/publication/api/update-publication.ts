import { axiosInstance } from "@/lib/axios";
import { MutationConfig, queryClient } from "@/lib/reat-query";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Publication } from "../types";
import { publicationKeys } from "./query_keys";

export type UpdatePublicationPayload = Partial<
  Omit<Publication, "id" | "createdAt" | "updatedAt">
>;

type UpdatePublicationRequest = {
  id: string;
  payload: UpdatePublicationPayload;
};

const updatePublication = async ({ id, payload }: UpdatePublicationRequest) => {
  const { data } = await axiosInstance.patch<{ data: Publication }>(
    `/publication/${id}`,
    payload,
  );
  return data.data;
};

type UseUpdatePublication = {
  mutationConfig?: MutationConfig<typeof updatePublication>;
};

export const useUpdatePublication = ({
  mutationConfig,
}: UseUpdatePublication = {}) => {
  return useMutation({
    mutationFn: updatePublication,
    ...mutationConfig,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: publicationKeys.all });
      toast.success("Publication updated successfully");
      mutationConfig?.onSuccess?.(...args);
    },
  });
};
