"use client";

import React, { useState, Dispatch, SetStateAction, useEffect } from "react";

import Image from "next/image";
import { RiDeleteBin6Line } from "react-icons/ri";
import toast from "react-hot-toast";

import { Verified } from "@/public/icons";
import ApplyDiscount from "./applyDiscount";
import Info from "./managementInfo";
import { useCart } from "@/src/context/CartContext";
import Button from "@/src/components/ui/button";
import { BUTTON_SIZES, ENDPOINTS } from "@/src/utils/constants";
import { getHiddenPrice } from "@/src/utils/helpers";
import useHow3client from "@/src/hooks/usehow3client";

interface OrderSummaryProps {
  CheckoutUserDetails: () => void;
  setCoupon: Dispatch<SetStateAction<string>>;
  coupon: string;
  setAmount: Dispatch<any>;
  disable: boolean;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  CheckoutUserDetails,
  setCoupon,
  coupon,
  setAmount,
  disable,
}) => {
  const { fetchCart, cart } = useCart();
  const [couponSuccess, setCouponSuccess] = useState(false);
  const how3 = useHow3client();

  const removeInflucenerFromCart = async (id: string) => {
    try {
      const response = await how3.delete(
        `${ENDPOINTS.INFLUENCER_CART_ITEM}/${id}`
      );
      if (response.data) {
        await fetchCart();

        toast.success("Influencer removed from cart successfully.");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const removePackageFromCart = async (id: string) => {
    try {
      const response = await how3.delete(
        `${ENDPOINTS.PACKAGES_CART_ITEM}/${id}`
      );
      if (response.data) {
        await fetchCart();

        toast.success("Product removed from cart successfully.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setAmount(cart?.total);
  }, [cart, setAmount]);

  return (
    <div className="w-full p-4 md:p-5 bg-white rounded-xl h-fit">
      <div className="font-Jakarta font-semibold md:text-xl">Order Summary</div>

      <div className="pt-8">
        <div className="font-semibold text-lg">Influencers</div>
        <div className="flex flex-col gap-4 py-6">
          {cart &&
            cart.influencerCartItems.map((data: any) => {
              return (
                <>
                  <div className="w-full flex justify-between">
                    <div className="flex gap-2 justify-center items-center">
                      <div className="w-8 h-8 rounded-full">
                        <Image
                          src={data.influencer.dpLink}
                          width={50}
                          height={50}
                          alt="img"
                          className="w-full h-full object-cover rounded-full"
                        />
                      </div>
                      <div className="flex flex-col gap-0 ">
                        <div className="font-Jakarta font-[600] flex gap-1 text-[12px]">
                          <div>{data.influencer.influencer}</div>
                          <div>
                            <Verified />
                          </div>
                        </div>
                        <div className="font-Jakarta font-[400] text-[12px] text-gray-300 ">
                          <div>{data.influencer.categoryName}</div>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-4 items-center">
                      <div className="cursor-pointer text-primary font-semibold flex justify-center items-center">
                        {data ? getHiddenPrice(data.influencer.price) : "$$"}
                      </div>
                      <div
                        className="text-error cursor-pointer hover:scale-105 active:scale-95"
                        onClick={() => removeInflucenerFromCart(data.id)}
                      >
                        <RiDeleteBin6Line />
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
        </div>

        <div className="font-semibold text-lg">Packages</div>

        <div className="flex flex-col gap-4 py-6">
          {cart &&
            cart.packageCartItems.map((data: any) => {
              return (
                <>
                  <div className="w-full flex justify-between">
                    <div className="flex gap-2 justify-center items-center">
                      <div className="flex flex-col gap-0 ">
                        <div className="font-Jakarta font-[600] flex gap-1 text-[12px]">
                          <div>{data.package.header}</div>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-4 font-bold items-center">
                      <span className=""> ${data.package.cost}</span>
                      <div
                        className="text-error cursor-pointer hover:scale-105 active:scale-95"
                        onClick={() => removePackageFromCart(data.id)}
                      >
                        <RiDeleteBin6Line />
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
        </div>

        <ApplyDiscount
          setCoupon={setCoupon}
          coupon={coupon}
          setCouponSuccess={setCouponSuccess}
          couponSuccess={couponSuccess}
          setAmount={setAmount}
        />

        <div className="h-1 border-b pt-4 border-gray-200 border-dashed"></div>

        <div className="flex flex-col gap-4 py-3 font-Jakarta">
          <div className="flex justify-between">
            <div>Subtotal</div>
            <div className="flex gap-1 font-semibold">$ {cart?.subtotal}</div>
          </div>
        </div>
        <div className="flex flex-col gap-4 py-3 font-Jakarta">
          <div className="flex justify-between">
            <div className="flex gap-2 items-center">
              Management Fee <Info />
            </div>
            <div className="flex gap-1 font-semibold">
              ${cart?.managementFee && Math.floor(cart?.managementFee!)}
            </div>
          </div>
        </div>
        {couponSuccess && (
          <div className="flex flex-col gap-4 py-3 font-Jakarta">
            <div className="flex justify-between">
              <div className="flex gap-2 items-center">Discount</div>
              <div className="flex gap-1 font-semibold text-success">
                -$
                {cart?.cutAmount && Math.floor(cart?.cutAmount! - cart?.total!)}
              </div>
            </div>
          </div>
        )}

        <div className="h-1 border-b pt-4 border-gra-200 border-dashed"></div>

        <div className="flex font-[700] pt-4 font-Jakarta justify-between">
          <div>Total</div>
          <div className="flex flex-col items-end">
            {couponSuccess && (
              <div className="font-semibold relative text-xl">
                $ {Math.floor(cart?.total!)}
              </div>
            )}
            <div
              className={`flex gap-1 font-semibold relative w-fit ${
                couponSuccess ? "text-secondary-text" : "text-black"
              }`}
            >
              $ {cart?.cutAmount && Math.floor(cart?.cutAmount!)}
              <p
                className={`${
                  couponSuccess ? "flex" : "hidden"
                } border-t-2 border-black absolute top-3 w-full -rotate-12`}
              />
            </div>
          </div>
        </div>

        <div className="pt-6 w-full ">
          <Button
            onClick={CheckoutUserDetails}
            className="w-full"
            size={BUTTON_SIZES.LARGE}
            disabled={disable}
          >
            Checkout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
