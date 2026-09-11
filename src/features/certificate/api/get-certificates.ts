import { axiosInstance } from "@/lib/axios";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { QueryConfig } from "@/lib/reat-query";
import { Certificate } from "../types";
import { certificateKeys } from "./query_keys";

const getCertificates = async () => {
  const { data } = await axiosInstance.get<{ data: Certificate[] }>("/certificate");
  return data.data;
};

export const getCertificatesOptions = () => {
  return queryOptions({
    queryKey: certificateKeys.all,
    queryFn: getCertificates,
  });
};

type UseGetCertificatesParams = {
  queryConfig?: QueryConfig<typeof getCertificatesOptions>;
};

export const useGetCertificates = (params: UseGetCertificatesParams = {}) => {
  return useQuery({
    ...getCertificatesOptions(),
    ...params.queryConfig,
  });
};
