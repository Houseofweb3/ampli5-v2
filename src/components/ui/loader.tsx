// Loader.tsx
import { cn } from "../../lib/utils";
import React from 'react';

interface LoaderProps {
  size?: number;
  loaderColor?: string;
  lineColor?: string;
}

const Loader: React.FC<LoaderProps> = ({ size = 18, loaderColor, lineColor }) => {
  const dimension = `${size}px`;

  return (
    <div
      className={cn('rounded-full animate-spin border-4 hover ', loaderColor, lineColor)}
      style={{
        width: dimension,
        height: dimension,
        borderTopColor: loaderColor ? loaderColor : 'border-black',
        borderColor: lineColor ? lineColor : 'border-gray',
      }}
    />
  );
};

export default Loader;
