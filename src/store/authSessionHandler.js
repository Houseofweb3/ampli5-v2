'use client';

import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useAuthStore } from '@/store/auth';

export default function SessionHandler() {
  const data = useAuthStore();
  const { data: session } = useSession();
  useEffect(() => {
    if (session?.apiToken && session?.apiUser) {
      data.login({ user: session.apiUser, token: session.apiToken });
    }
  }, [session]);

  return null;
}
