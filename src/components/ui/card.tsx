import { cn } from "../../lib/utils";
import Image from "next/image";
import React from "react";

interface CardProps {
  vector?: string;
  className?: string;
  children: React.ReactNode;
}

export default function Card({ vector, className, children }: CardProps): JSX.Element {
  return (
    <div className={cn("p-4 lg:p-9 border-2 rounded-4xl bg-white relative z-1", className)}>
      {vector && (
        <Image
          src={vector}
          alt="curve"
          height={100}
          width={100}
          className="absolute -top-50px -right-50px z-10 hidden lg:block"
        />
      )}
      {children}
    </div>
  );
}
