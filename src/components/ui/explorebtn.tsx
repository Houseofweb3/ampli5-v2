import { cn } from "../../lib/utils";
import React from "react";

interface ExploreBtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
}

export default function ExploreBtn({ disabled, className, onClick, children }: ExploreBtnProps) {
  return (
    <button
      className={cn(
        "border border-solid rounded-4xl border-black py-8px px-6 bg-white text-black text-14 lg:text-xl font-medium capitalize transition duration-300 ease-in-out flex items-center justify-center shadow-xl hover:bg-black hover:text-white hover:shadow-none cursor-pointer",
        className,
        disabled && "opacity-40 pointer-events-none"
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
} 