import { axiosInstance } from "@/lib/axios";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { QueryConfig } from "@/lib/reat-query";
import { Project } from "../types";
import { projectKeys } from "./query_keys";

const getProjectById = async (id: string) => {
  const { data } = await axiosInstance.get<{ data: Project }>(
    `/projects/id/${id}`,
  );
  return data.data;
};

export const getProjectByIdOptions = (id?: string) => {
  return queryOptions({
    queryKey: id ? projectKeys.detail(id) : projectKeys.all,
    queryFn: () => getProjectById(id!),
    enabled: Boolean(id),
  });
};

type UseGetProjectByIdParams = {
  id?: string;
  queryConfig?: QueryConfig<typeof getProjectByIdOptions>;
};

export const useGetProjectById = ({
  id,
  queryConfig,
}: UseGetProjectByIdParams = {}) => {
  return useQuery({
    ...getProjectByIdOptions(id),
    ...queryConfig,
    enabled: Boolean(id) && queryConfig?.enabled !== false,
  });
};
