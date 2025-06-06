import { cn } from '@/lib/utils';
import React from 'react';
import GoBackButton from './goBackBtn';

export default function Title({ className, children }) {
  return (
    <div className={cn('w-full text-center lg:text-left relative z-1', className)}>
      <h1 className="text-inherit">{children}</h1>
    </div>
  );
}
