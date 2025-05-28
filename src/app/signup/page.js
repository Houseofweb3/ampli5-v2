import { Suspense } from 'react';
import React from 'react';
import SignupForm from '@/components/SignupForm';

export default function page() {
  return (
    <Suspense>
      <SignupForm></SignupForm>
    </Suspense>
  );
}
