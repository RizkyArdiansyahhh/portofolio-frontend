import { axiosInstance } from "@/lib/axios";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { QueryConfig } from "@/lib/reat-query";
import { Project } from "../types";
import { projectKeys } from "./query_keys";

const getProjects = async () => {
  const { data } = await axiosInstance.get<{ data: Project[] }>("/projects");
  return data.data;
};

export const getProjectsOptions = () => {
  return queryOptions({
    queryKey: projectKeys.all,
    queryFn: getProjects,
  });
};

type UseGetProjectsParams = {
  queryConfig?: QueryConfig<typeof getProjectsOptions>;
};

export const useGetProjects = (params: UseGetProjectsParams = {}) => {
  return useQuery({
    ...getProjectsOptions(),
    ...params.queryConfig,
  });
};
