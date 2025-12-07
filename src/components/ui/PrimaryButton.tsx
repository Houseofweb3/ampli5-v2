import { cn } from '../../lib/utils';
import React from 'react';

interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  children: React.ReactNode;
}

export default function PrimaryButton({ 
  disabled = false, 
  className, 
  type = 'button', 
  onClick, 
  children 
}: PrimaryButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={cn(
        "border border-solid rounded-4xl border-black  px-6 lg:px-12  py-2 lg:py-4 bg-dark-purple1-bg text-white text-14 lg:text-xl font-medium capitalize transition duration-300 ease-in-out flex items-center justify-center shadow-xl hover:bg-black hover:text-white hover:shadow-none cursor-pointer disabled:opacity-50 disabled:pointer-events-none",
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
} 