import React from "react";
import CartTable from "./_components/cart-table";
import WhatNext from "./_components/what-next";

const page = () => {
  return (
    <div className="bg-background-color flex gap-8 flex-col min-h-screen h-full w-full px-4 md:px-12 py-8 font-Jakarta">
      <span className="text-2xl md:text-4xl font-semibold">My Cart</span>
      <CartTable />
      <WhatNext />
    </div>
  );
};

export default page;
