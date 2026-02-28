"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthClient } from "@/src/types/dashboardAuth";

const PERSIST_KEY = "dashboard-auth";
const COOKIE_TOKEN = "dashboard_client_token";
const COOKIE_CLIENT = "dashboard_client";
/** Fallback cookie names used by other app auth so dashboard guard can recognize existing session */
// const COOKIE_TOKEN_FALLBACK = "accessToken";
// const COOKIE_CLIENT_FALLBACK = "authUser";
const COOKIE_MAX_AGE_DAYS = 3;
const COOKIE_PATH = "/";

function getCookie(name: string): string | null {
  if (typeof document === "undefined" || !document.cookie) return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length !== 2) return null;
  return parts[1]?.split(";").shift()?.trim() ?? null;
}

function setCookie(name: string, value: string): void {
  if (typeof document === "undefined" || typeof window === "undefined") return;
  if (value == null || value === "") return;
  try {
    const maxAge = COOKIE_MAX_AGE_DAYS * 24 * 60 * 60;
    const secure = window.location?.protocol === "https:";
    const encoded = encodeURIComponent(value);
    if (encoded.length > 4096) return;
    let cookie = `${name}=${encoded}; path=${COOKIE_PATH}; max-age=${maxAge}; SameSite=Lax`;
    if (secure) cookie += "; Secure";
    document.cookie = cookie;
  } catch {
    /* ignore */
  }
}

function deleteCookie(name: string): void {
  if (typeof document === "undefined") return;
  try {
    document.cookie = `${name}=; path=${COOKIE_PATH}; max-age=0`;
  } catch {
    /* ignore */
  }
}

export function getToken(): string | null {
  const raw = getCookie(COOKIE_TOKEN);
  if (raw == null) return null;
  try {
    return decodeURIComponent(raw);
  } catch {
    return raw;
  }
}

export function getClient(): AuthClient | null {
  const raw = getCookie(COOKIE_CLIENT);
  if (raw == null) return null;
  try {
    const decoded = decodeURIComponent(raw);
    const parsed = JSON.parse(decoded) as Record<string, unknown>;
    const id = typeof parsed.id === "string" ? parsed.id : String(parsed.id ?? parsed.userId ?? "");
    const name = typeof parsed.name === "string" ? parsed.name : String(parsed.name ?? parsed.email ?? "");
    const email = typeof parsed.email === "string" ? parsed.email : String(parsed.email ?? "");
    if (id || name || email) {
      return { id, name, email } as AuthClient;
    }
    return null;
  } catch {
    return null;
  }
}

function writeTokenCookie(token: string): void {
  if (token && typeof token === "string") setCookie(COOKIE_TOKEN, token);
}

function writeClientCookie(client: AuthClient): void {
  if (client && typeof client === "object") setCookie(COOKIE_CLIENT, JSON.stringify(client));
}

export function clearAuth(): void {
  deleteCookie(COOKIE_TOKEN);
  deleteCookie(COOKIE_CLIENT);
}

const cookieStorage = {
  getItem: (): string | null => {
    const token = getToken();
    const client = getClient();
    if (!token && !client) return null;
    return JSON.stringify({ state: { client, token }, version: 1 });
  },
  setItem: (_n: string, value: string): void => {
    try {
      const { state } = JSON.parse(value) as { state: { client: AuthClient | null; token: string | null } };
      if (state.token) writeTokenCookie(state.token);
      if (state.client) writeClientCookie(state.client);
    } catch {
      clearAuth();
    }
  },
  removeItem: (): void => {
    clearAuth();
  },
};

interface DashboardAuthState {
  client: AuthClient | null;
  token: string | null;
  isLoading: boolean;
  // eslint-disable-next-line no-unused-vars -- interface method param names are for documentation only
  login: (client: AuthClient, token: string) => void;
  logout: () => void;
}

export const useDashboardAuthStore = create<DashboardAuthState>()(
  persist(
    (set) => ({
      client: null,
      token: null,
      isLoading: true,
      login: (authClient, authToken) => {
        writeTokenCookie(authToken);
        writeClientCookie(authClient);
        set({ client: authClient, token: authToken });
      },
      logout: () => {
        clearAuth();
        set({ client: null, token: null });
      },
    }),
    {
      name: PERSIST_KEY,
      storage: {
        getItem: () => cookieStorage.getItem(),
        setItem: (_n: string, value: unknown) =>
          cookieStorage.setItem(_n, typeof value === "string" ? value : JSON.stringify(value)),
        removeItem: () => cookieStorage.removeItem(),
      },
      partialize: (s: DashboardAuthState) => ({ client: s.client, token: s.token }),
      skipHydration: true,
      onRehydrateStorage: () => () => {
        setTimeout(() => {
          try {
            useDashboardAuthStore.setState({ isLoading: false });
          } catch {
            /* store not ready */
          }
        }, 0);
      },
    // eslint-disable-next-line -- persist custom storage type
    } as any
  )
);

export function rehydrateDashboardAuth(): Promise<void> {
  if (typeof document === "undefined") return Promise.resolve();
  const store = useDashboardAuthStore as unknown as { persist?: { rehydrate?: () => Promise<void> } };
  return store.persist?.rehydrate?.() ?? Promise.resolve();
}

export function useDashboardAuth() {
  const client = useDashboardAuthStore((s) => s.client);
  const token = useDashboardAuthStore((s) => s.token);
  const isLoading = useDashboardAuthStore((s) => s.isLoading);
  const login = useDashboardAuthStore((s) => s.login);
  const logout = useDashboardAuthStore((s) => s.logout);
  return {
    client,
    token,
    isLoggedIn: !!token,
    login,
    logout,
    isLoading,
  };
}

export function useOptionalDashboardAuth() {
  return useDashboardAuth();
}
