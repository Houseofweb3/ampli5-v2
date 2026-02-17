import React from "react";
import { cn } from "../../lib/utils";

type ButtonProps = {
  size?: string;
  type?: string;
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  size = "sm",
  type = "primary",
  className,
  children,
  onClick,
  disabled = false,
}) => {
  const baseStyles =
    " text-white text-sm p-3 cursor-pointer justify-center focus:outline-none focus:ring-2 flex font-Jakarta items-center gap-2 transition-all";

  const sizeStyles =
    size === "lg" ? "px-10 py-4 text-lg rounded-xl" : "rounded-xl px-6 py-3 text-sm";

  const typeStyles = cn(
    type === "primary" && "bg-primary hover:bg-primary-dark focus:ring-primary",
    type === "secondary" && "bg-secondary hover:bg-secondary-dark focus:ring-secondary",
    type === "outline" &&
      "bg-transparent border-2 border-gray-500 text-black hover:bg-gray-100 focus:ring-gray-500 hover:bg-black hover:text-white",
    type === "text" && "bg-transparent text-primary hover:bg-primary-light focus:ring-primary/30"
  );

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={cn(
        baseStyles,
        sizeStyles,
        typeStyles,
        { "bg-dark-purple1-bg cursor-not-allowed": disabled },
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
