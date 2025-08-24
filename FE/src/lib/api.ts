import axios, { AxiosRequestConfig } from "axios";

const defaultConfig: AxiosRequestConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8001",
};

export const api = axios.create(defaultConfig);

// 🟢 Hàm tạo instance tạm thời (override baseURL, headers khi cần)
export const createApi = (config?: AxiosRequestConfig) => {
  return axios.create({
    ...defaultConfig,
    ...config,
    headers: {
      ...defaultConfig.headers,
      ...config?.headers,
    },
  });
};
