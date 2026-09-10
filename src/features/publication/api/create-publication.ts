import { axiosInstance } from "@/lib/axios";
import { MutationConfig, queryClient } from "@/lib/reat-query";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Publication } from "../types";
import { publicationKeys } from "./query_keys";

export type CreatePublicationPayload = Omit<
  Publication,
  "id" | "createdAt" | "updatedAt"
>;

const createPublication = async (payload: CreatePublicationPayload) => {
  const { data } = await axiosInstance.post<{ data: Publication }>(
    "/publication",
    payload,
  );
  return data.data;
};

type UseCreatePublication = {
  mutationConfig?: MutationConfig<typeof createPublication>;
};

export const useCreatePublication = ({
  mutationConfig,
}: UseCreatePublication = {}) => {
  return useMutation({
    mutationFn: createPublication,
    ...mutationConfig,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: publicationKeys.all });
      toast.success("Publication created successfully");
      mutationConfig?.onSuccess?.(...args);
    },
  });
};
