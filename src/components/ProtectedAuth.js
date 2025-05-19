'use client';
import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/auth';
import { useRouter } from 'next/navigation';

export default function RequireAuth({ children }) {
  const { token } = useAuthStore();
  const router = useRouter();

  const hasHydrated = useAuthStore.persist.hasHydrated();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!hasHydrated) return;

    if (!token) {
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
}
