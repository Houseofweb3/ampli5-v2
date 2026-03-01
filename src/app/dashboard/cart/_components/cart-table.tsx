/* eslint-disable indent */
"use client";

import React, { useState } from "react";
import Link from "next/link";
import InflucenerTable from "./influencer-table";
import { useRouter } from "next/navigation";
import { useCart } from "@/src/context/CartContext";
import toast from "react-hot-toast";
import { Button } from "@/src/components";
import { BUTTON_SIZES, BUTTON_TYPES } from "@/src/utils/constants";
import type { CartInfluencer } from "@/src/lib/types";
import { getToken, getClient } from "@/src/store/dashboardAuthStore";
import { DASHBOARD_SIGN_IN, CART_SUCCESS, DASHBOARD_HOME } from "@/src/config/dashboardRoutes";
import { createWebCart } from "@/src/services/dashboardCart";

function parsePrice(value: string | null | undefined): number {
  if (value == null || value === "") return 0;
  const num = parseFloat(String(value).replace(/[^0-9.-]/g, ""));
  return Number.isFinite(num) ? num : 0;
}

function calcSubtotal(items: CartInfluencer[]): number {
  return items.reduce((sum, item) => sum + parsePrice(item.sellPrice), 0);
}

const CartTable = () => {
  const { logCart, clearCart } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleProceedToCheckout = async () => {
    const influencers = logCart ?? [];
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
      const items = influencers.map((item) => ({
        influencerId: String(item.id),
        quantity: 1,
      }));
      await createWebCart(items);
      toast.success("Proposal submitted successfully.");
      router.push(CART_SUCCESS);
      clearCart();
    } catch (error: unknown) {
      const message =
        error && typeof error === "object" && "response" in error
          ? (error as { response?: { data?: { error?: string } } }).response?.data?.error
          : null;
      console.error("Cart create error:", error);
      toast.error(message ?? "Failed to create cart. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const hasInfluencers = (logCart?.length ?? 0) > 0;
  const influencersForTable = (logCart ?? []) as CartInfluencer[];
  const subtotal = calcSubtotal(influencersForTable);

  if (!hasInfluencers) {
    return (
      <div className="w-full flex flex-col items-center justify-center rounded-2xl bg-white border border-gray-200/60 shadow-sm p-8 md:p-12 min-h-[320px]">
        <div className="rounded-full bg-primary-light w-16 h-16 md:w-20 md:h-20 flex items-center justify-center mb-5">
          <svg
            className="w-8 h-8 md:w-10 md:h-10 text-primary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </div>
        <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-2 text-center">
          Your cart is empty
        </h2>
        <p className="text-secondary-text text-sm md:text-base text-center mb-6 max-w-sm">
          Add influencers from the list to create your proposal.
        </p>
        <Link href={DASHBOARD_HOME}>
          <Button size={BUTTON_SIZES.LARGE} type={BUTTON_TYPES.PRIMARY}>
            Browse influencers
          </Button>
        </Link>
      </div>
    );
  }

  const handleClearCart = () => {
    clearCart();
    toast.success("Cart cleared.");
  };

  return (
    <div className="w-full h-full overflow-x-hidden flex flex-col gap-6">
      <div className="rounded-lg border border-gray-200 bg-white w-full p-4 flex flex-row items-center justify-between gap-4">
        <span className="text-black font-semibold tracking-wider">
          Influencers {hasInfluencers ? `(${influencersForTable.length})` : ""}
        </span>
        <button
          type="button"
          onClick={handleClearCart}
          className="text-red-600 text-sm font-medium py-1.5 px-3 rounded-lg hover:text-red-700 transition-colors"
        >
          Clear cart
        </button>
      </div>
      <div className="w-full">
        <InflucenerTable influencers={influencersForTable} />
      </div>
      <div className="w-full flex md:flex-row flex-col justify-between items-center mt-2 gap-6 pt-4 border-t border-gray-200">
        <div className="flex gap-2 items-center">
          <span className="font-semibold text-gray-700 md:text-lg">Subtotal</span>
          <span className="font-bold text-primary md:text-xl">$ {subtotal.toFixed(2)}</span>
        </div>
        <Button
          onClick={handleProceedToCheckout}
          size={BUTTON_SIZES.LARGE}
          type={BUTTON_TYPES.PRIMARY}
          disabled={loading}
        >
          {loading ? "Creating proposal…" : "Create proposal"}
        </Button>
      </div>
    </div>
  );
};

export default CartTable;
