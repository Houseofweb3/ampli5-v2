'use client';
import { useLayoutEffect } from 'react';
import { useAuthStore } from '@/store/auth';
import { useRouter } from 'next/navigation';

export default function RequireAuth({ children }) {
  const { token } = useAuthStore();
  const router = useRouter();

  useLayoutEffect(() => {
    if (!token) {
      router.push('/');
    }
  }, [token, router]);

  return token ? <>{children}</> : null;
}
