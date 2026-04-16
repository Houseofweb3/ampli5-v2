"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { WebUserPrincipal } from "@/src/types/manageWebUserAuth";

const PERSIST_KEY = "manage-web-user-auth";

interface ManageWebUserAuthState {
  token: string | null;
  user: WebUserPrincipal | null;
  isLoading: boolean;
  // eslint-disable-next-line no-unused-vars -- store action signatures
  login: (user: WebUserPrincipal, token: string) => void;
  logout: () => void;
}

export const useManageWebUserAuthStore = create<ManageWebUserAuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isLoading: true,
      login: (user, token) => set({ user, token }),
      logout: () => set({ user: null, token: null }),
    }),
    {
      name: PERSIST_KEY,
      partialize: (s) => ({ token: s.token, user: s.user }),
      skipHydration: true,
      onRehydrateStorage: () => () => {
        setTimeout(() => {
          try {
            useManageWebUserAuthStore.setState({ isLoading: false });
          } catch {
            /* noop */
          }
        }, 0);
      },
    }
  )
);

export function getManageWebUserToken(): string | null {
  return useManageWebUserAuthStore.getState().token;
}

export function rehydrateManageWebUserAuth(): Promise<void> {
  if (typeof document === "undefined") return Promise.resolve();
  const store = useManageWebUserAuthStore as unknown as {
    persist?: { rehydrate?: () => Promise<void> };
  };
  return store.persist?.rehydrate?.() ?? Promise.resolve();
}
