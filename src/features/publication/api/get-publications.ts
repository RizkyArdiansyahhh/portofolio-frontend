import { axiosInstance } from "@/lib/axios";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { QueryConfig } from "@/lib/reat-query";
import { Publication } from "../types";
import { publicationKeys } from "./query_keys";

const getPublications = async () => {
  const { data } = await axiosInstance.get<{ data: Publication[] }>("/publication");
  return data.data;
};

export const getPublicationsOptions = () => {
  return queryOptions({
    queryKey: publicationKeys.all,
    queryFn: getPublications,
  });
};

type UseGetPublicationsParams = {
  queryConfig?: QueryConfig<typeof getPublicationsOptions>;
};

export const useGetPublications = (params: UseGetPublicationsParams = {}) => {
  return useQuery({
    ...getPublicationsOptions(),
    ...params.queryConfig,
  });
};
