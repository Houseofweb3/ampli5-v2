"use client";

import type { ReactNode } from "react";
import { useDashboardAuth, useOptionalDashboardAuth } from "@/src/store/dashboardAuthStore";

// Re-export hooks so existing imports from @/src/context/DashboardAuthContext keep working.
export { useDashboardAuth, useOptionalDashboardAuth };

/** No-op wrapper – auth is in Zustand; keep for layout compatibility if needed. */
export function DashboardAuthProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
