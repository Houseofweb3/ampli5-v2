"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";

import { DiscountIcon, SuccessBadge } from "@/public/icons";
import Input from "@/src/components/ui/input";
import { ENDPOINTS, INPUT_VARIANTS } from "@/src/utils/constants";
import useHow3client from "@/src/hooks/usehow3client";
import { useCart } from "@/src/context/CartContext";
import { DISCOUNT_MESSAGE } from "@/src/utils/constants";

interface DiscountProps {
  coupon: string;
  setCoupon: React.Dispatch<React.SetStateAction<string>>;
  setCouponSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  couponSuccess: boolean;
  setAmount: React.Dispatch<any>;
}

const Discount: React.FC<DiscountProps> = ({
  setCoupon,
  coupon,
  setCouponSuccess,
  couponSuccess,
  setAmount,
}) => {
  const [couponError, setCouponError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const how3 = useHow3client();
  const { cart, fetchCartAfterCouponApplied } = useCart();

  const handleRemoveCoupon = () => {
    setCouponSuccess(false);
    setCouponError(false);
    setCoupon("");
    setAmount(Math.round(cart?.cutAmount!));
    setErrorMessage("");
  };

  const handleApplyClick = async () => {
    setErrorMessage("");
    if (coupon === "") {
      toast.error("Please enter a coupon code");
      return;
    }

    try {
      const res = await how3.get(ENDPOINTS.APPLY_COUPON);
      if (
        res.status === 200 &&
        res.data.data[0].name === coupon.toUpperCase() &&
        res.data.data[0].minimumOrderValue <= cart?.cutAmount!
      ) {
        const response = await fetchCartAfterCouponApplied(true, res.data.data[0].id);

        if (response?.discountMessage === DISCOUNT_MESSAGE.ALREADY_APPLIED) {
          setCouponError(true);

          setErrorMessage("Coupon already used!");
          return;
        }
        setCouponSuccess(true);
        setCouponError(false);
        setAmount(response?.total);
      } else if (
        res.status === 200 &&
        res.data.data[0].name === coupon.toUpperCase() &&
        res.data.data[0].minimumOrderValue > cart?.cutAmount!
      ) {
        setErrorMessage("Order total must be at least 2000 to use this coupon.");
        setCouponSuccess(false);
        setCouponError(true);
      } else {
        setCouponSuccess(false);
        setCouponError(true);
      }
    } catch (error) {}
  };

  return (
    <div className="py-4 border-t border-dashed font-Jakarta">
      <div className="flex gap-2 w-full md:items-center justify-between flex-col md:flex-row">
        <div className="flex gap-2 items-center ">
          <DiscountIcon />
          <span className="font-semibold md:text-lg">Referral Discount Code</span>
        </div>
        {couponSuccess === true && (
          <span className="text-success text-xs md:text-sm font-semibold">Coupon Applied</span>
        )}
      </div>

      {couponError === false && couponSuccess === true ? (
        <div className="border border-secondary-text rounded-xl bg-primary-light p-4 mt-4 flex justify-between items-center">
          <span className="font-semibold flex items-center gap-2 uppercase">
            <SuccessBadge />
            {coupon}
          </span>
          <div className="cursor-pointer text-2xl" onClick={handleRemoveCoupon}>
            <RxCross2 />
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <div
            className={`flex w-full border uppercase ${
              couponError ? "border-red-300" : "border-grey-300"
            } rounded-md justify-between items-center items-center mt-4`}
          >
            <Input
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              type="text"
              placeholder="Enter Coupon Code"
              className="uppercase"
              variant={INPUT_VARIANTS.TRANSPARENT}
              name="coupon"
            />

            <div
              onClick={handleApplyClick}
              className="text-primary hover:bg-primary hover:text-white cursor-pointer p-4 rounded-md h-full font-semibold transition-all text-sm flex items-cemter justify-center"
            >
              Apply
            </div>
          </div>

          {couponError && (
            <span className="font-Poppins font-semibold text-red-500 text-sm">
              {errorMessage !== "" ? errorMessage : "This Coupon code is invalid"}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default Discount;
