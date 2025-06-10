/* eslint-disable no-unused-vars */
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { ENDPOINTS } from "../utils/constants";
import { setAuthToken } from "../services/user";

const useHow3client = () => {
  const { data: session, update } = useSession();
  const [axiosInstance] = useState(() => {
    return axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      headers: {
        "Content-Type": "application/json",
      },
    });
  });

  const token = session?.user?.accessToken;

  useEffect(() => {
    let isRefreshing = false;
    let failedQueue: Array<{
      resolve: (token: string) => void;
      reject: (error: any) => void;
    }> = [];

    const processQueue = (
      error: AxiosError | null,
      token: string | null = null
    ) => {
      failedQueue.forEach((prom) => {
        if (error) {
          prom.reject(error);
        } else {
          prom.resolve(token ?? "");
        }
      });
      failedQueue = [];
    };

    const requestInterceptor = axiosInstance.interceptors.request.use(
      (config) => {
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      }
    );

    const responseInterceptor = axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      async (error: AxiosError) => {
        const originalRequest = error.config as AxiosRequestConfig & {
          _retry?: boolean;
        };

        if (error.response?.status === 401 && !originalRequest._retry) {
          if (isRefreshing) {
            return new Promise<string>((resolve, reject) => {
              failedQueue.push({ resolve, reject });
            })
              .then((newAccessToken) => {
                if (newAccessToken && originalRequest.headers) {
                  setAuthToken(newAccessToken);
                  originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                }
                return axiosInstance(originalRequest);
              })
              .catch((err) => {
                return Promise.reject(err);
              });
          }

          originalRequest._retry = true;
          isRefreshing = true;

          try {
            const refreshToken = session?.user?.refreshToken;
            if (!refreshToken) {
              throw new Error("No refresh token available");
            }

            // Call your refresh token endpoint
            const response = await axios.post(
              `${process.env.NEXT_PUBLIC_API_URL}${ENDPOINTS.REFRESH_TOKEN}`,
              {
                refreshToken: refreshToken,
              }
            );

            const newAccessToken = response.data?.newAccessToken;

            if (newAccessToken) {
              // Update the session with the new access token
              await update({
                ...session,
                user: {
                  ...session.user,
                  accessToken: newAccessToken,
                },
              });

              processQueue(null, newAccessToken);

              if (originalRequest.headers) {
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
              }
              return axiosInstance(originalRequest);
            }
          } catch (err: any) {
            processQueue(err, null);
            await signIn(); // Redirects to the login page
            return Promise.reject(err);
          } finally {
            isRefreshing = false;
          }
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [token, session, axiosInstance, update]);

  return axiosInstance;
};

export default useHow3client;
