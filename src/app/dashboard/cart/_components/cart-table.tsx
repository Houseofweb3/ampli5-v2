/* eslint-disable indent */
"use client";

import React, { useState } from "react";
import InflucenerTable from "./influencer-table";
import { useRouter } from "next/navigation";
import { useLogCart } from "@/src/context/InfluencersContext";
import { useCart } from "@/src/context/CartContext";
import toast from "react-hot-toast";
import { Button } from "@/src/components";
import { BUTTON_SIZES, BUTTON_TYPES, ENDPOINTS } from "@/src/utils/constants";
import type { CartInfluencer } from "@/src/lib/types";
import { getToken, getClient } from "@/src/store/dashboardAuthStore";
import { DASHBOARD_SIGN_IN } from "@/src/config/dashboardRoutes";
import useHow3client from "@/src/hooks/usehow3client";

function parsePrice(value: string | null | undefined): number {
  if (value == null || value === "") return 0;
  const num = parseFloat(String(value).replace(/[^0-9.-]/g, ""));
  return Number.isFinite(num) ? num : 0;
}

function calcSubtotal(items: CartInfluencer[]): number {
  return items.reduce((sum, item) => sum + parsePrice(item.sellPrice), 0);
}

const CartTable = () => {
  const { Logcart } = useLogCart();
  const { fetchCart } = useCart();
  const router = useRouter();
  const how3 = useHow3client();
  const [loading, setLoading] = useState(false);

  const handleProceedToCheckout = async () => {
    const influencers = Logcart ?? [];
    if (influencers.length === 0) {
      toast.error("Please add influencers to cart to proceed.");
      return;
    }

    if (!getToken()) {
      router.push(DASHBOARD_SIGN_IN);
      return;
    }

    const client = getClient();
    if (!client?.id) {
      toast.error("Please sign in to continue.");
      return;
    }

    setLoading(true);
    try {
      const cartRes = await how3.post<{ id: string }>(ENDPOINTS.CREATE_CART, {
        userId: client.id,
      });
      const cartId = cartRes.data?.id;
      if (!cartId) {
        toast.error("Failed to create cart.");
        setLoading(false);
        return;
      }

      for (const item of influencers) {
        await how3.post(ENDPOINTS.INFLUENCER_CART_ITEM, {
          influencerId: item.id,
          cartId,
        });
      }

      await fetchCart();
      toast.success("Cart created successfully.");
    } catch (error) {
      console.error("Cart create / add items error:", error);
      toast.error("Failed to create cart. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const hasInfluencers = (Logcart?.length ?? 0) > 0;
  const canCheckout = hasInfluencers;
  const influencersForTable: CartInfluencer[] = Logcart ?? [];
  const subtotal = calcSubtotal(influencersForTable);

  return (
    <div className="w-full h-full overflow-x-hidden">
      <div className="rounded-xl bg-black w-full p-4">
        <span className="text-white font-semibold tracking-wider">Influencers</span>
      </div>

      <div className="w-full">
        <InflucenerTable influencers={influencersForTable} />
      </div>

      <div className="w-full flex md:flex-row flex-col justify-between mt-6 gap-6">
        <div className="flex gap-2 items-center">
          <h1 className="font-semibold md:text-lg">Subtotal :</h1>
          <span className="font-bold text-primary md:text-xl">$ {subtotal.toFixed(2)}</span>
        </div>
        <Button
          onClick={handleProceedToCheckout}
          size={BUTTON_SIZES.LARGE}
          type={BUTTON_TYPES.PRIMARY}
          disabled={!canCheckout || loading}
        >
          {loading ? "Creating cart…" : "Proceed to Checkout"}
        </Button>
      </div>
    </div>
  );
};

export default CartTable;
