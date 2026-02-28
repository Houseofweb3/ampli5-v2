import { useMemo } from "react";
import { getDashboardClient } from "@/src/lib/dashboardClient";

/**
 * Returns the dashboard Axios instance (Bearer token + 401/403 redirect to sign-in).
 * Use this for all dashboard API calls instead of useHow3client.
 */
export default function useDashboardClient() {
  return useMemo(() => getDashboardClient(), []);
}
