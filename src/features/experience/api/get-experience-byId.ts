import { axiosInstance } from "@/lib/axios"
import { queryOptions, useQuery } from "@tanstack/react-query"
import { experienceKeys } from "./query-keys"
import { QueryConfig } from "@/lib/reat-query"
import { Experience } from "../types"

const getExperienceById = async (id: string) => {
    const {data}  = await axiosInstance.get<{data : Experience}>(`/experience/${id}`)
    return data.data
}

export const getExperienceByIdOptions = (id?: string) => {
    return queryOptions({
        queryKey: id ? experienceKeys.detail(id) : experienceKeys.all,
        queryFn: () => getExperienceById(id!),
        enabled: Boolean(id),
    })
}

type UseGetExperienceByIdParams = {
    id?: string
    queryConfig?: QueryConfig<typeof getExperienceByIdOptions>
}

export const useGetExperienceById = ({ id, queryConfig }: UseGetExperienceByIdParams = {}) => {
    return useQuery({
        ...getExperienceByIdOptions(id),
        ...queryConfig,
        enabled: Boolean(id) && (queryConfig?.enabled !== false),
    })
}