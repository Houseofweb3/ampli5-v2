"use client";
import React, { useEffect, useState, ReactNode } from "react";
import { useAuthStore } from "../store/auth";
import { useRouter } from "next/navigation";

interface RequireAuthProps {
  isLoading?: boolean;
  children: ReactNode;
}

const RequireAuth: React.FC<RequireAuthProps> = ({ isLoading = false, children }) => {
  const { token } = useAuthStore();
  const router = useRouter();
  const [hasHydrated, setHasHydrated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const checkHydration = useAuthStore.persist?.hasHydrated?.() ?? true;
      setHasHydrated(checkHydration);
    }
  }, []);

  useEffect(() => {
    if (!hasHydrated) return;

    if (!token) {
      router.push("/");
    } else {
      setLoading(false);
    }
  }, [token, hasHydrated, router]);

  if (!hasHydrated || loading || isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return <>{children}</>;
};

export default RequireAuth;
