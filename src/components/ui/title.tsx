import { cn } from '../../lib/utils';
import React from 'react';

interface TitleProps {
  className?: string;
  children: React.ReactNode;
}

export default function Title({ className, children }: TitleProps): JSX.Element {
  return (
    <div className={cn('w-full text-center lg:text-left relative z-1', className)}>
      <h1 className="text-inherit">{children}</h1>
    </div>
  );
}
