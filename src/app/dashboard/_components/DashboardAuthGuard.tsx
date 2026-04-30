"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getToken } from "@/src/store/dashboardAuthStore";
import { rehydrateDashboardAuth } from "@/src/store/dashboardAuthStore";
import { isPrivateDashboardPath, DASHBOARD_SIGN_IN } from "@/src/config/dashboardRoutes";

export default function DashboardAuthGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [hasRehydrated, setHasRehydrated] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const markReady = () => {
      if (!cancelled) setHasRehydrated(true);
    };
    rehydrateDashboardAuth().then(markReady);
    const timeout = setTimeout(markReady, 800);
    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    if (!hasRehydrated) return;
    if (!isPrivateDashboardPath(pathname)) return;
    const token = getToken();
    if (!token) {
      router.replace(DASHBOARD_SIGN_IN);
    }
  }, [pathname, hasRehydrated, router]);

  const isPrivate = isPrivateDashboardPath(pathname);
  const token = hasRehydrated && typeof window !== "undefined" ? getToken() : null;
  const canAccessPrivate = !!token;

  if (isPrivate && !hasRehydrated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (isPrivate && !canAccessPrivate) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <p className="text-gray-500">Redirecting to sign in...</p>
      </div>
    );
  }

  return <>{children}</>;
}
