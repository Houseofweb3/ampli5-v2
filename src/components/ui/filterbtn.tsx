import { cn } from "../../lib/utils";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value?: string;
  label?: string | null;
  active?: boolean;
  border?: string;
  children?: React.ReactNode;
  className?: string;
}

export default function Button({
  value = "",
  label = null,
  active = false,
  border = "border-gray-bg",
  children,
  className = "",
  ...props
}: ButtonProps): JSX.Element {
  return (
    <button
      value={value}
      onClick={props.onClick}
      className={cn(
        "flex items-center gap-2 px-3.5 py-1.5 rounded-xl font-normal text-white transition-colors text-sm border",
        border,
        active ? "bg-blue-btn border-transparent" : "bg-light-silver-bg ",
        className
      )}
      {...props}
    >
      {label ? label : children}
    </button>
  );
}
