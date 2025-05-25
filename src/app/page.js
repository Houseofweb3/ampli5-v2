import Hero from '@/components/Hero';
import { Suspense } from 'react';

export default function Home() {
  return (
      <Suspense fallback={<div>Loading...</div>}>
        <Hero></Hero>
      </Suspense>
  );
}
