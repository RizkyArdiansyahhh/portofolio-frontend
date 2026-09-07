import { useMutation } from "@tanstack/react-query"
import { axiosInstance } from "@/lib/axios"
import { MutationConfig, queryClient } from "@/lib/reat-query"
import { experienceKeys } from "./query-keys"
import { toast } from "sonner"

const deleteExperience = async (id : string) => {
    const {data} = await axiosInstance.delete(`/experience/${id}`)
    return data.data
}

type UseDeleteExperience = {
    mutationConfig?: MutationConfig<typeof deleteExperience>
}

export const useDeleteExperience = ({mutationConfig}: UseDeleteExperience) => {
    return useMutation({
        mutationFn: (id: string) => deleteExperience(id),
        ...mutationConfig,
        onSuccess: (...args) => {
            queryClient.invalidateQueries({queryKey: experienceKeys.all})
            toast.success("Experience deleted successfully")
            mutationConfig?.onSuccess?.(...args)
        }
    })
}