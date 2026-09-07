import { axiosInstance } from "@/lib/axios"
import { queryOptions, useQuery } from "@tanstack/react-query"
import { experienceKeys } from "./query-keys"
import { QueryConfig } from "@/lib/reat-query"
import { Experience } from "../types"

const getExperiences = async () => {
    const {data}  = await axiosInstance.get<{data : Experience[]}>('/experience')
    return data.data
}

 const getExperiencesOptions = () => {
    return queryOptions({
        queryKey: experienceKeys.all,
        queryFn: getExperiences,
    })
}

type UseGetExperiencesParams = {
    queryConfig?: QueryConfig<typeof getExperiences>
}

export const useGetExperiences = (params : UseGetExperiencesParams = {}) => {
    return useQuery({
        ...getExperiencesOptions(),
        ...params.queryConfig
    })
}