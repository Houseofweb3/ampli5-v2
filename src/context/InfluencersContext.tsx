/* eslint-disable no-unused-vars */
"use client";

import { createContext, useState, useContext, useEffect } from "react";

interface CartContextType {
  Logcart: any;
  // eslint-disable-line no-console
  handleChange: (data: any) => void;
}

const LogCartContext = createContext<CartContextType>({
  Logcart: [],
  // eslint-disable-line no-console
  handleChange: (data: any) => {},
});

export const useLogCart = () => useContext(LogCartContext);

export const LogCartProvider = ({ children }: { children: React.ReactNode }) => {
  const [Logcart, MakeCart] = useState<any>([]);

  useEffect(() => {
    const storedCartData = localStorage.getItem("cartData");
    if (storedCartData) {
      MakeCart(JSON.parse(storedCartData).influencers);
    }
  }, []);

  const persistToStorage = (influencers: any[]) => {
    try {
      const raw = localStorage.getItem("cartData");
      const parsed = raw ? JSON.parse(raw) : { influencers: []};
      parsed.influencers = influencers;
      localStorage.setItem("cartData", JSON.stringify(parsed));
    } catch {
      /* ignore */
    }
  };

  const handleChange = (data: any) => {
    const Id = data.id;
    let isProduct;

    if (Logcart.length > 0) {
      isProduct = Logcart.find((d: any) => d.id === Id);
    } else {
      isProduct = false;
    }

    if (isProduct) {
      const next = Logcart.filter((item: any) => item.id !== Id);
      MakeCart(next);
      persistToStorage(next);
    } else {
      const next = [data, ...Logcart];
      MakeCart(next);
      persistToStorage(next);
    }
  };

  return (
    <>
      <LogCartContext.Provider value={{ Logcart, handleChange }}>
        {children}
      </LogCartContext.Provider>
    </>
  );
};
