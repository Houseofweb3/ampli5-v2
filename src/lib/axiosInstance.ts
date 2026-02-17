import axios, { AxiosError, InternalAxiosRequestConfig, AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../store/auth";

const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL_BOUNTY}`,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = useAuthStore.getState().token;
    if (token && config.headers) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
      const router = useRouter();
      router.push("/");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
