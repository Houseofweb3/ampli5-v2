'use client';
import React, { useEffect, useState, ReactNode } from 'react';
import { useAuthStore } from '../store/auth';
import { useRouter } from 'next/navigation';

interface PubliceAuthProps {
  children: ReactNode;
}

const PubliceAuth: React.FC<PubliceAuthProps> = ({ children }) => {
  const { token } = useAuthStore();
  const router = useRouter();

  const hasHydrated = useAuthStore?.persist?.hasHydrated() || true;

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!hasHydrated) return;

    if (token) {
      router.push('/');
    } else {
      setLoading(false);
    }
  }, [token, hasHydrated, router]);

  if (!hasHydrated || loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return <>{children}</>;
};

export default PubliceAuth;
