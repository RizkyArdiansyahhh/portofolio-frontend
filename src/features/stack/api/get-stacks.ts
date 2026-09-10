import { axiosInstance } from "@/lib/axios"
import { queryOptions, useQuery } from "@tanstack/react-query"
import { QueryConfig } from "@/lib/reat-query"
import { Stack } from "../types"
import { stackKeys } from "./query_keys"

const getStacks = async () => {
    const {data}  = await axiosInstance.get<{data : Stack[]}>('/stack')
    return data.data
}

 const getStacksOptions = () => {
    return queryOptions({
        queryKey: stackKeys.all,
        queryFn: getStacks,
    })
}

type UseGetStacksParams = {
    queryConfig?: QueryConfig<typeof getStacks>
}

export const useGetStacks = (params : UseGetStacksParams = {}) => {
    return useQuery({
        ...getStacksOptions(),
        ...params.queryConfig
    })
}