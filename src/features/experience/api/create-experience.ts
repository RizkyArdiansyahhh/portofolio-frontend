import { axiosInstance } from "@/lib/axios"
import { Experience } from "../types"
import { MutationConfig, queryClient, QueryConfig } from "@/lib/reat-query";
import { useMutation } from "@tanstack/react-query";
import { experienceKeys } from "./query-keys";
import { toast } from "sonner";



export type CreateExperiencePayload = Omit<Experience, "id" | "createdAt" | "updatedAt">

const createExperience = async (payload: CreateExperiencePayload) => {
    const {data} = await axiosInstance.post<{data : Experience}>("/experience", payload);
    return data.data
}

type UseCreateExperience = {
    mutationConfig?: MutationConfig<typeof createExperience>
}

export const useCreateExperience = ({mutationConfig}:UseCreateExperience ) => {
    return useMutation({
        mutationFn: createExperience,
        ...mutationConfig,
        onSuccess :(...args) => {
            queryClient.invalidateQueries({queryKey: experienceKeys.all})
            toast.success("Experience created successfully")
            mutationConfig?.onSuccess?.(...args)
        }
    })
}