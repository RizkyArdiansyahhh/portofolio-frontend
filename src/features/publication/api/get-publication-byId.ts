import { axiosInstance } from "@/lib/axios";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { QueryConfig } from "@/lib/reat-query";
import { Publication } from "../types";
import { publicationKeys } from "./query_keys";

const getPublicationById = async (id: string) => {
  const { data } = await axiosInstance.get<{ data: Publication }>(
    `/publication/${id}`,
  );
  return data.data;
};

export const getPublicationByIdOptions = (id?: string) => {
  return queryOptions({
    queryKey: id ? publicationKeys.detail(id) : publicationKeys.all,
    queryFn: () => getPublicationById(id!),
    enabled: Boolean(id),
  });
};

type UseGetPublicationByIdParams = {
  id?: string;
  queryConfig?: QueryConfig<typeof getPublicationByIdOptions>;
};

export const useGetPublicationById = ({
  id,
  queryConfig,
}: UseGetPublicationByIdParams = {}) => {
  return useQuery({
    ...getPublicationByIdOptions(id),
    ...queryConfig,
    enabled: Boolean(id) && queryConfig?.enabled !== false,
  });
};
