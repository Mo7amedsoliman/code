"use server";

import apiClient from "@/services/apiCliente";
import { cookies } from "next/headers";
import { CustomerOrder, OrdersResult } from "../types/orders.types";

export async function getUserOrders(userId: string): Promise<OrdersResult> {
  const token = (await cookies()).get("token")?.value;
  if (!token) return { orders: [], error: "Sign in to view your orders." };

  try {
    const { data } = await apiClient.get(`/orders/user/${encodeURIComponent(userId)}`, {
      headers: { token },
    });
    const rows = Array.isArray(data)
      ? data
      : Array.isArray(data?.data)
        ? data.data
        : Array.isArray(data?.data?.orders)
          ? data.data.orders
        : Array.isArray(data?.orders)
          ? data.orders
          : [];

    return { orders: rows as CustomerOrder[] };
  } catch (error) {
    const message =
      typeof error === "object" && error !== null && "response" in error
        ? (error as { response?: { data?: { message?: string } } }).response?.data?.message
        : undefined;
    return { orders: [], error: message ?? "Could not load your orders. Please try again." };
  }
}
