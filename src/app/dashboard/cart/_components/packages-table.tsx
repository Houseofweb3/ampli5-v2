"use client";
import React from "react";
import toast from "react-hot-toast";
import { RiDeleteBin6Line } from "react-icons/ri";

import useHow3client from "@/src/hooks/usehow3client";
import { useSession } from "next-auth/react";
import { useCart } from "@/src/context/CartContext";
import { useLogpackage } from "@/src/context/PackagesContext";
import { ENDPOINTS } from "@/src/utils/constants";

const TableRow: React.FC<{ data: any }> = ({ data }) => {
  const { fetchCart, cartId } = useCart();
  const { handlePackageChange } = useLogpackage();
  const { data: session } = useSession();
  const user = session?.user;

  const how3 = useHow3client();

  const RemoveFromCart = async () => {
    try {
      if (cartId) {
        const response = await how3.delete(
          `${ENDPOINTS.PACKAGES_CART_ITEM}/${data.PackageCartId}`
        );
        if (response.data) {
          fetchCart();
          console.log(response.data);
          toast.success("Product removed from cart successfully.");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const ToggleCart = async () => {
    if (!user) {
      handlePackageChange(data);
    } else {
      RemoveFromCart();
    }
  };

  return (
    <div className="flex w-full bg-white rounded-lg p-4 justify-between flex-col md:flex-row gap-4">
      <div className="text-lg">{data.header}</div>
      <div className="flex gap-6 font-semibold w-full md:w-fit justify-between items-center">
        <span className="">$ {data.cost}</span>
        <div
          className="flex items-center text-sm text-error gap-2 cursor-pointer active:scale-95"
          onClick={ToggleCart}
        >
          <RiDeleteBin6Line /> Remove
        </div>
      </div>
    </div>
  );
};
interface TableProps {
  packages: any;
}

const Table: React.FC<TableProps> = ({ packages }) => {
  return (
    <table className="table-auto mt-2 w-full">
      <tbody className="flex flex-col gap-2">
        {packages?.map((item: any, index: any) => (
          <TableRow key={index} data={item} />
        ))}
      </tbody>
    </table>
  );
};

export default Table;
