import { useQuery, useMutation, UseQueryOptions, UseMutationOptions } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import { createApi } from "@/lib/api";

// 🟢 Hàm helper tạo instance tuỳ theo auth + config
const getApiClient = (auth: boolean, config?: AxiosRequestConfig) => {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  return createApi({
    ...config,
    headers: {
      ...(config?.headers || {}),
      ...(auth && token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
};

// 🟢 Hook GET
export function useApiQuery<TData = unknown, TError = unknown>(
  key: string[],
  url: string,
  options?: UseQueryOptions<TData, TError>,
  auth: boolean = false,
  config?: AxiosRequestConfig
) {
  return useQuery<TData, TError>({
    queryKey: key,
    queryFn: async () => {
      const client = getApiClient(auth, config);
      const res = await client.get<TData>(url);
      return res.data;
    },
    ...options,
  });
}

// 🟢 Hook POST/PUT/DELETE
export function useApiMutation<TData = unknown, TVariables = any, TError = unknown>(
  method: "post" | "put" | "delete" | "patch",
  url: string,
  options?: UseMutationOptions<TData, TError, TVariables>,
  auth: boolean = false,
  config?: AxiosRequestConfig
) {
  return useMutation<TData, TError, TVariables>({
    mutationFn: async (variables: TVariables) => {
      const client = getApiClient(auth, config);
      const res = await client.request<TData>({
        url,
        method,
        data: variables,
        ...config,
      });
      return res.data;
    },
    ...options,
  });
}
