import { cn } from "../../lib/utils";
import React from "react";

interface SecondaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
}

export default function SecondaryButton({
  disabled,
  className,
  onClick,
  children,
}: SecondaryButtonProps) {
  return (
    <button
      disabled={disabled}
      className={cn(
        "w-full border border-solid rounded-4xl border-black py-3 lg:py-4 px-14 bg-white text-black text-14 lg:text-xl font-medium capitalize transition duration-300 ease-in-out flex items-center justify-center shadow-xl hover:bg-black hover:text-white hover:shadow-none cursor-pointer disabled:opacity-50 disabled:pointer-events-none",
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
