/**
 * Axios client for blog management APIs. Uses the web-user OTP JWT (manage store),
 * separate from dashboard client auth.
 */

import axios, { AxiosError, AxiosResponse } from "axios";
import {
  getManageWebUserToken,
  useManageWebUserAuthStore,
} from "@/src/store/manageWebUserAuthStore";

const MANAGE_LOGIN_PATH = "/manage/login";

export const manageBlogClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_DASHBOARD_API_URL || "",
  headers: { "Content-Type": "application/json" },
});

manageBlogClient.interceptors.request.use((config) => {
  const token = getManageWebUserToken();
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

function isAuthError(status: number, data: unknown): boolean {
  if (status !== 401 && status !== 403) return false;
  const o = data as { message?: string; error?: string; code?: string } | undefined;
  const msg = `${o?.message ?? ""} ${o?.error ?? ""} ${o?.code ?? ""}`.toLowerCase();
  if (
    msg.includes("token") ||
    msg.includes("expired") ||
    msg.includes("unauthorized") ||
    msg.includes("not authorized") ||
    msg.includes("forbidden") ||
    msg.includes("deactivated") ||
    msg.includes("invalid jwt") ||
    msg.includes("jwt")
  ) {
    return true;
  }
  return status === 401;
}

manageBlogClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    const res = error.response;
    if (res && isAuthError(res.status, res.data)) {
      useManageWebUserAuthStore.getState().logout();
      if (typeof window !== "undefined") {
        window.location.href = MANAGE_LOGIN_PATH;
      }
    }
    return Promise.reject(error);
  }
);
