import { axiosInstance } from "@/lib/axios"
import { Experience } from "../types"
import { MutationConfig, queryClient } from "@/lib/reat-query"
import { experienceKeys } from "./query-keys"
import { toast } from "sonner"
import { useMutation } from "@tanstack/react-query"

export type UpdateExperiencePayload = Partial<Omit<Experience, "id" | "createdAt" | "updatedAt">>

type UpdateExperienceRequest = {
    id: string
    payload: UpdateExperiencePayload
}

const updateExperience = async  (param : UpdateExperienceRequest) =>{
const {data} = await axiosInstance.patch<{data : Experience}>(`/experience/${param.id}` , param.payload)
return data.data
}


type UseUpdateExperience = {
    mutationConfig? : MutationConfig<typeof updateExperience>
}

export const useUpdateExperience = ({mutationConfig}: UseUpdateExperience) => {
    return useMutation({
        mutationFn:updateExperience,
        ...mutationConfig,
        onSuccess: (...args) => {
            queryClient.invalidateQueries({queryKey: experienceKeys.all})
            toast.success("Experience updated successfully")
            mutationConfig?.onSuccess?.(...args)
        }
    })
}