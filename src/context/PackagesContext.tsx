/* eslint-disable no-unused-vars */
"use client";
import { createContext, useState, useContext, useEffect } from "react";

interface packageContextType {
  Logpackage: any;
  // eslint-disable-line no-console
  handlePackageChange: (data: any) => void;
}

const LogpackageContext = createContext<packageContextType>({
  Logpackage: [],
  // eslint-disable-line no-console
  handlePackageChange: (data: any) => {},
});

export const useLogpackage = () => useContext(LogpackageContext);

export const LogpackageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [Logpackage, Makepackage] = useState<any>([]);

  useEffect(() => {
    const storedCartData = localStorage.getItem("cartData");
    if (storedCartData) {
      Makepackage(JSON.parse(storedCartData).packages);
    }
  }, []);

  const handlePackageChange = (data: any) => {
    const Id = data.id;
    let isProduct;

    if (Logpackage.length > 0) {
      isProduct = Logpackage.find((data: any) => data.id === Id);
    } else {
      isProduct = false;
    }

    if (isProduct) {
      let storedCartData = localStorage.getItem("cartData");
      if (storedCartData) {
        let parsedCartData = JSON.parse(storedCartData);
        parsedCartData.packages = parsedCartData.packages.filter(
          (item: any) => item.id !== Id
        );
        localStorage.setItem("cartData", JSON.stringify(parsedCartData));
      }
      Makepackage(() => {
        return Logpackage.filter((item: any) => item.id !== Id);
      });
    } else {
      Makepackage((prev: any) => {
        return [data, ...prev];
      });
    }
  };

  return (
    <>
      <LogpackageContext.Provider value={{ Logpackage, handlePackageChange }}>
        {children}
      </LogpackageContext.Provider>
    </>
  );
};
