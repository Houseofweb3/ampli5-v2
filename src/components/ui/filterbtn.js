import { cn } from '@/lib/utils';
import Image from 'next/image';
import React from 'react';

export default function Button({
  value = null,
  label = null,
  active = false,
  icon = null,
  img = null,
  border = 'border-[#878787]',
  size = 24,
  children,
  className = '',
  ...props
}) {
  return (
    <button
      value={value}
      onClick={props.onClick}
      className={cn(
        'flex items-center gap-2 px-3.5 py-1.5 rounded-xl font-normal text-white transition-colors text-sm border',
        border,
        active ? 'bg-blue-btn border-transparent' : 'bg-[#CDCDCD] ',
        className
      )}
      {...props}
    >
    
      {label ? label : children}
    </button>
  );
}
