/* eslint-disable indent */
"use client";
import React from "react";
import InflucenerTable from "./influencer-table";
import { useRouter } from "next/navigation";
import { useCart } from "@/src/context/CartContext";
import PackagesTable from "./packages-table";
import { useLogCart } from "@/src/context/InfluencersContext";
import { useLogpackage } from "@/src/context/PackagesContext";
import { signIn, useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { Button } from "@/src/components";
import { ALLROUTES, BUTTON_SIZES, BUTTON_TYPES } from "@/src/utils/constants";

const CartTable = () => {
  const { cart } = useCart();
  const { data: session } = useSession();
  const user = session?.user;
  const { Logpackage } = useLogpackage();
  const { Logcart } = useLogCart();

  const router = useRouter();

  const handleCheckout = async () => {
    if (user) {
      const influencers = cart?.influencerCartItems.map((data) => {
        data.influencer.InfluencerCartId = data.id;
        return data.influencer;
      });
      const packages = cart?.packageCartItems.map((data) => {
        data.package.PackageCartId = data.id;
        return data.package;
      });

      const Main = {
        influencers: influencers,
        packages: packages,
      };

      if (influencers?.length === 0 && packages?.length === 0) {
        toast.error("Please add influencers or packages to cart to proceed to checkout");
        return;
      }

      localStorage.setItem("CheckoutData", JSON.stringify(Main));

      router.push(ALLROUTES.CHECKOUT);
    } else {
      const Main = {
        influencers: Logcart,
        packages: Logpackage,
      };

      if (Main.influencers.length === 0 && Main.packages.length === 0) {
        toast.error("Please add influencers or packages to cart to proceed to checkout");
        return;
      }

      localStorage.setItem("CheckoutData", JSON.stringify(Main));

      signIn("google", { callbackUrl: ALLROUTES.REDIRECT_TO_CHECKOUT });
    }
  };

  return (
    <div className="w-full h-full overflow-x-hidden">
      <div className="rounded-xl bg-black w-full p-4">
        <span className="text-white font-semibold tracking-wider">Influencers</span>
      </div>

      <div className="w-full">
        <InflucenerTable
          influencers={
            user
              ? cart?.influencerCartItems.map((data: any) => {
                  data.influencer.InfluencerCartId = data.id;
                  return data.influencer;
                })
              : Logcart
          }
        />
      </div>

      <div className="rounded-xl bg-black w-full p-4 mt-8">
        <span className="text-white font-semibold tracking-wider">PR Packages</span>
      </div>

      <PackagesTable
        packages={
          user
            ? cart?.packageCartItems.map((data: any) => {
                data.package.PackageCartId = data.id;
                return data.package;
              })
            : Logpackage
        }
      />

      <div className="w-full flex md:flex-row flex-col justify-between mt-6 gap-6">
        <div className=" flex gap-2 items-center">
          <h1 className="font-semibold md:text-lg ">Subtotal : </h1>
          <span className="font-bold text-primary md:text-xl">$ {cart?.subtotal}</span>
        </div>
        <Button onClick={handleCheckout} size={BUTTON_SIZES.LARGE} type={BUTTON_TYPES.PRIMARY}>
          Reserve your KOLs
        </Button>
      </div>
    </div>
  );
};

export default CartTable;
