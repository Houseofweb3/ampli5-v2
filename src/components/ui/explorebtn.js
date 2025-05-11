import { cn } from '@/lib/utils';
import React from 'react';

export default function ExploreBtn({ className, onClick, children }) {
  return (
    <button
      className={cn(
        'border border-solid rounded-4xl border-black py-8px px-6 bg-white text-black text-14 lg:text-xl font-medium capitalize transition duration-300 ease-in-out flex items-center justify-center shadow-xl hover:bg-black hover:text-white hover:shadow-none cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
