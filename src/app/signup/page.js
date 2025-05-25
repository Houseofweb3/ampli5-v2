import { Suspense } from 'react';
import React from 'react';
import SignupForm from '@/components/SignupForm';

export default function page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignupForm></SignupForm>
    </Suspense>
  );
}
