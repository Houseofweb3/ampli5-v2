"use client";

import React from "react";
import CartTable from "./_components/cart-table";
import WhatNext from "./_components/what-next";
import { useCart } from "@/src/context/CartContext";

const CartPage = () => {
  const { logCart } = useCart();
  const hasItems = (logCart?.length ?? 0) > 0;

  return (
    <div className="bg-white flex gap-8 flex-col min-h-screen h-full w-full px-4 md:px-12 py-8 font-Jakarta">
      <h1 className="text-2xl md:text-4xl font-semibold text-gray-900">My Cart</h1>
      <CartTable />
      {hasItems && <WhatNext />}
    </div>
  );
};

export default CartPage;
