'use client';

import dynamic from 'next/dynamic';
import React, { Suspense } from 'react';
const SignupForm = dynamic(() => import('@/components/SignupForm'), {
  ssr: false,
});
export default function SignupFormWrapper() {
  return (
    <Suspense>
    </Suspense>
  );
}
