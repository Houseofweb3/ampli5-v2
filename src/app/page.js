import Hero from '@/components/Hero';
import { Suspense } from 'react';

export default function Home() {
  return (
      <Suspense>
        <Hero></Hero>
      </Suspense>
  );
}
