"use client";

import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
  ReactNode,
} from "react";

const STORAGE_KEY = "cartData";

interface CartContextType {
  /** Local list of influencers (persisted in localStorage). Only API call is create cart on checkout. */
  logCart: { id: string; [key: string]: unknown }[];
  // eslint-disable-next-line no-unused-vars -- param name is for type documentation only
  handleChange: (payload: { id: string; [key: string]: unknown }) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [logCart, setLogCart] = useState<{ id: string; [key: string]: unknown }[]>([]);

  useEffect(() => {
    try {
      const raw = typeof document !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
      if (raw) {
        const parsed = JSON.parse(raw) as { influencers?: { id: string; [key: string]: unknown }[] };
        if (Array.isArray(parsed?.influencers)) {
          setLogCart(parsed.influencers);
        }
      }
    } catch {
      /* ignore */
    }
  }, []);

  const persistLogCart = useCallback((influencers: { id: string; [key: string]: unknown }[]) => {
    try {
      const raw = typeof document !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
      const parsed = raw ? JSON.parse(raw) : { influencers: [] };
      parsed.influencers = influencers;
      if (typeof document !== "undefined") {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
      }
    } catch {
      /* ignore */
    }
  }, []);

  const handleChange = useCallback(
    (data: { id: string; [key: string]: unknown }) => {
      const id = data.id;
      const isProduct = logCart.length > 0 ? logCart.find((d) => String(d.id) === String(id)) : false;
      const next = isProduct
        ? logCart.filter((item) => String(item.id) !== String(id))
        : [data, ...logCart];
      setLogCart(next);
      persistLogCart(next);
    },
    [logCart, persistLogCart]
  );

  const clearCart = useCallback(() => {
    setLogCart([]);
    persistLogCart([]);
  }, [persistLogCart]);

  const value: CartContextType = {
    logCart,
    handleChange,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
