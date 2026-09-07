import { axiosInstance } from "@/lib/axios"
import { queryOptions, useQuery } from "@tanstack/react-query"
import { experienceKeys } from "./query-keys"
import { QueryConfig } from "@/lib/reat-query"
import { Experience } from "../types"

const getExperienceById = async (id: string) => {
    const {data}  = await axiosInstance.get<{data : Experience}>(`/experience/${id}`)
    return data.data
}

 const getExperienceByIdOptions = (id: string) => {
    return queryOptions({
        queryKey: experienceKeys.detail(id),
        queryFn: () => getExperienceById(id),
    })
}

type UseGetExperienceByIdParams = {
    id: string
    queryConfig?: QueryConfig<typeof getExperienceById>
}

export const useGetExperienceById = (params : UseGetExperienceByIdParams) => {
    return useQuery({
        ...getExperienceByIdOptions(params.id),
        ...params.queryConfig
    })
}