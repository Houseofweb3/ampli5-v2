import { dashboardClient } from "@/src/lib/dashboardClient";

export interface CreateCartItemInput {
  influencerId: string;
  quantity: number;
}

export interface CartItemDTO {
  id: string;
  influencerId: string;
  quantity: number;
  price: string;
}

export interface CartDTO {
  id: string;
  clientId: string;
  status: string;
  items: CartItemDTO[];
}

export async function createWebCart(items: CreateCartItemInput[]): Promise<CartDTO> {
  const res = await dashboardClient.post<CartDTO>("/web/cart/create", { items });
  return res.data;
}
