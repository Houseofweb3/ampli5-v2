declare module 'crypto-js' {
  // eslint-disable-next-line no-unused-vars
  export function SHA256(message: string): {
    toString(): string;
  };
} 