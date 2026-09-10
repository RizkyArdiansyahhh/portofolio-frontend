import { useMutation } from "@tanstack/react-query"
import { axiosInstance } from "@/lib/axios"
import { MutationConfig, queryClient } from "@/lib/reat-query"
import { toast } from "sonner"
import { stackKeys } from "./query_keys"

const deleteStack = async (id : string) => {
    const {data} = await axiosInstance.delete(`/stack/${id}`)
    return data.data
}

type UseDeleteStack = {
    mutationConfig?: MutationConfig<typeof deleteStack>
}

export const useDeleteStack = ({mutationConfig}: UseDeleteStack) => {
    return useMutation({
        mutationFn: (id: string) => deleteStack(id),
        ...mutationConfig,
        onSuccess: (...args) => {
            queryClient.invalidateQueries({queryKey: stackKeys.all})
            toast.success("Stack deleted successfully")
            mutationConfig?.onSuccess?.(...args)
        }
    })
}