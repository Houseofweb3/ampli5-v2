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

export const LogCartProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [Logcart, MakeCart] = useState<any>([]);

  useEffect(() => {
    const storedCartData = localStorage.getItem("cartData");
    if (storedCartData) {
      MakeCart(JSON.parse(storedCartData).influencers);
    }
  }, []);

  const handleChange = (data: any) => {
    const Id = data.id;
    let isProduct;

    if (Logcart.length > 0) {
      isProduct = Logcart.find((data: any) => data.id === Id);
    } else {
      isProduct = false;
    }

    if (isProduct) {
      let storedCartData = localStorage.getItem("cartData");
      if (storedCartData) {
        let parsedCartData = JSON.parse(storedCartData);
        parsedCartData.influencers = parsedCartData.influencers.filter(
          (item: any) => item.id !== Id
        );
        localStorage.setItem("cartData", JSON.stringify(parsedCartData));
      }
      MakeCart(() => {
        return Logcart.filter((item: any) => item.id !== Id);
      });
    } else {
      MakeCart((prev: any) => {
        return [data, ...prev];
      });
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
