/**
 * Dashboard Axios instance: Bearer token from auth store (cookies).
 * On 401/403 or auth-related errors: clear auth and redirect to /dashboard/sign-in.
 */

import axios, { AxiosError, AxiosResponse } from "axios";
import { getToken, clearAuth } from "@/src/store/dashboardAuthStore";
import { ALLROUTES } from "@/src/utils/constants";

function isAuthError(response: { status: number; data?: unknown }): boolean {
  if (response.status !== 401 && response.status !== 403) return false;
  const data = response.data as { success?: boolean; message?: string } | undefined;
  if (data?.success === false) return true;
  const msg = (data?.message ?? (data as { error?: string })?.error ?? "").toLowerCase();
  return (
    msg.includes("token") ||
    msg.includes("not provided") ||
    msg.includes("expired") ||
    msg.includes("not valid") ||
    msg.includes("invalid token") ||
    msg.includes("not found") ||
    msg.includes("deactivated")
  );
}

export const dashboardClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_DASHBOARD_API_URL,
  headers: { "Content-Type": "application/json" },
});

dashboardClient.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => Promise.reject(err)
);

function isAuthFlowRequest(config: { url?: string } | undefined): boolean {
  const url = config?.url ?? "";
  return (
    url.includes("/web/client/auth/verify-otp") ||
    url.includes("/web/client/auth/send-otp") ||
    url.includes("/web/client/auth/signup")
  );
}

dashboardClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    const res = error.response;
    const isAuthFlow = isAuthFlowRequest(error.config);
    if (res && isAuthError(res) && !isAuthFlow) {
      clearAuth();
      if (typeof window !== "undefined") {
        window.location.href = ALLROUTES.SIGN_IN;
      }
    }
    return Promise.reject(error);
  }
);

export function getDashboardClient() {
  return dashboardClient;
}
