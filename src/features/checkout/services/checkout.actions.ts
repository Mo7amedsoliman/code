"use server";

import apiClient from "@/services/apiCliente";
import { AxiosError } from "axios";
import { cookies } from "next/headers";
import { CheckoutResult, ShippingAddress } from "../types/checkout.types";

async function getToken() {
  const token = (await cookies()).get("token")?.value;
  if (!token) throw new Error("Please sign in before placing your order.");
  return token;
}

function getErrorMessage(error: unknown, fallback: string) {
  if (error instanceof AxiosError) {
    return error.response?.data?.message ?? error.response?.data?.errors?.[0]?.msg ?? fallback;
  }
  return error instanceof Error ? error.message : fallback;
}

export async function createCashOrder(
  cartId: string,
  shippingAddress: ShippingAddress,
): Promise<CheckoutResult> {
  try {
    const { data } = await apiClient.post(`/orders/${cartId}`, { shippingAddress }, {
      headers: { token: await getToken() },
    });
    return {
      success: data?.status === "success",
      message: data?.message ?? "Your order has been placed.",
      orderId: data?.data?._id ?? data?.order?._id,
    };
  } catch (error) {
    return { success: false, message: getErrorMessage(error, "Could not place your order. Please try again.") };
  }
}

export async function createOnlineCheckout(
  cartId: string,
  shippingAddress: ShippingAddress,
  returnUrl: string,
): Promise<CheckoutResult> {
  try {
    const { data } = await apiClient.post(
      `/orders/checkout-session/${cartId}`,
      { shippingAddress },
      {
        headers: { token: await getToken() },
        params: { url: returnUrl },
      },
    );
    const checkoutUrl = data?.session?.url ?? data?.sessionUrl ?? data?.url;
    if (typeof checkoutUrl !== "string") {
      return { success: false, message: data?.message ?? "Could not start online payment. Please try again." };
    }
    return { success: true, message: data?.message ?? "Redirecting to secure payment...", checkoutUrl };
  } catch (error) {
    return { success: false, message: getErrorMessage(error, "Could not start online payment. Please try again.") };
  }
}
