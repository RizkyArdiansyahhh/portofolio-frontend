import { axiosInstance } from "@/lib/axios";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { QueryConfig } from "@/lib/reat-query";
import { Certificate } from "../types";
import { certificateKeys } from "./query_keys";

const getCertificateById = async (id: string) => {
  const { data } = await axiosInstance.get<{ data: Certificate }>(
    `/certificate/${id}`,
  );
  return data.data;
};

export const getCertificateByIdOptions = (id?: string) => {
  return queryOptions({
    queryKey: id ? certificateKeys.detail(id) : certificateKeys.all,
    queryFn: () => getCertificateById(id!),
    enabled: Boolean(id),
  });
};

type UseGetCertificateByIdParams = {
  id?: string;
  queryConfig?: QueryConfig<typeof getCertificateByIdOptions>;
};

export const useGetCertificateById = ({
  id,
  queryConfig,
}: UseGetCertificateByIdParams = {}) => {
  return useQuery({
    ...getCertificateByIdOptions(id),
    ...queryConfig,
    enabled: Boolean(id) && queryConfig?.enabled !== false,
  });
};
