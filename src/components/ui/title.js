import { cn } from '@/lib/utils';
import React from 'react';

export default function Title({ className, children }) {
  return (
    <div className={cn('w-full text-center lg:text-left relative z-[1]', className)}>
      <h1>{children}</h1>
    </div>
  );
}
