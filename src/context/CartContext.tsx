/* eslint-disable no-unused-vars */
"use client";

import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import { useSession } from "next-auth/react";
import useHow3client from "../hooks/usehow3client";
import { ENDPOINTS } from "../utils/constants";
import { Cart } from "../services/types/servicesTypes";

interface CartContextType {
  cart: Cart | null;
  fetchCart: () => Promise<void>;
  cartId: string | null;
  emptyCart: () => void;
  fetchCartAfterCouponApplied: (
    applyCoupon: boolean,
    couponId: string
  ) => Promise<Cart | undefined>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const how3 = useHow3client();
  const { data: session } = useSession();
  const user = session?.user;

  const [cart, setCart] = useState<Cart | null>(null);
  const [cartId, setCartId] = useState<string | null>(null);



  const getCartId = async (): Promise<void> => {
    if (!user?.id) return;

    try {
      const res = await how3.post<{ id: string }>("/api/v1/cart", {
        userId: user.id,
      });
      setCartId(res.data.id);
      await fetchCart();
    } catch (error) {
      console.error("Error getting cart ID:", error);
    }
  };

  const fetchCart = async (): Promise<void> => {
    if (!user?.id) return;

    try {
      const response = await how3.get<Cart[]>(ENDPOINTS.FETCH_CART, {
        params: { userId: user.id },
      });

      if (response.data.length > 0) {
        const sortedCarts = response.data.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );

        const latestCart = sortedCarts[sortedCarts.length - 1];
        if (!latestCart.checkout) {
          setCartId(latestCart.id);
          setCart(latestCart);
        } else {
          await getCartId();
        }
      } else {
        await getCartId();
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };
  useEffect(() => {
    if (user) {
      fetchCart();
    }
    // eslint-disable-next-line no-unused-vars
  }, [user]);
  const fetchCartAfterCouponApplied = async (
    applyCoupon: boolean,
    couponId: string
  ) => {
    if (!user?.id) return;

    try {
      const response = await how3.get<Cart[]>(ENDPOINTS.FETCH_CART, {
        params: {
          userId: user.id,
          applyCoupon: applyCoupon,
          couponId: couponId,
        },
      });

      if (response.data.length > 0) {
        const sortedCarts = response.data.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );

        const latestCart = sortedCarts[sortedCarts.length - 1];

        if (!latestCart.checkout) {
          setCartId(latestCart.id);
          setCart(latestCart);
          return latestCart;
        } else {
          await getCartId();
          return;
        }
      } else {
        await getCartId();
        return;
      }
    } catch (error) {
      console.error("Error fetching cart after coupon applied:", error);
    }
  };

  const emptyCart = (): void => {
    setCart(null);
    setCartId(null);
  };

  const value: CartContextType = {
    cart,
    fetchCart,
    cartId,
    emptyCart,
    fetchCartAfterCouponApplied,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
