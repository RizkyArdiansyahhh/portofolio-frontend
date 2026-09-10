import { axiosInstance } from "@/lib/axios"
import { MutationConfig, queryClient, QueryConfig } from "@/lib/reat-query";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Stack } from "../types";
import { stackKeys } from "./query_keys";



export type CreateStackPayload = Omit<Stack, "id" | "createdAt" | "updatedAt">

const createStack = async (payload: CreateStackPayload) => {
    const {data} = await axiosInstance.post<{data : Stack}>("/stack", payload);
    return data.data
}

type UseCreateStack = {
    mutationConfig?: MutationConfig<typeof createStack>
}

export const useCreateStack = ({mutationConfig}:UseCreateStack ) => {
    return useMutation({
        mutationFn: createStack,
        ...mutationConfig,
        onSuccess :(...args) => {
            queryClient.invalidateQueries({queryKey: stackKeys.all})
            toast.success("Stack created successfully")
            mutationConfig?.onSuccess?.(...args)
        }
    })
}