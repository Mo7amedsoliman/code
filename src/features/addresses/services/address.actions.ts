"use server";

import apiClient from "@/services/apiCliente";
import { AxiosError } from "axios";
import { cookies } from "next/headers";
import { AddressActionResult, AddressFields, ShippingAddress } from "../types/address.types";

async function getAuthToken() {
  const token = (await cookies()).get("token")?.value;
  if (!token) throw new Error("Please sign in to manage your addresses.");
  return token;
}

function errorMessage(error: unknown, fallback: string) {
  if (error instanceof AxiosError) {
    return error.response?.data?.errors?.[0]?.msg ?? error.response?.data?.message ?? fallback;
  }
  return error instanceof Error ? error.message : fallback;
}

export async function getMyAddresses(): Promise<AddressActionResult> {
  try {
    const { data } = await apiClient.get("/addresses", { headers: { token: await getAuthToken() } });
    const addressData = data?.data?.addresses ?? data?.addresses ?? data?.data;
    const addresses = Array.isArray(addressData) ? addressData : addressData ? [addressData] : [];
    return { success: true, message: data?.message ?? "", addresses: addresses as ShippingAddress[] };
  } catch (error) {
    return { success: false, message: errorMessage(error, "Could not load your saved addresses.") };
  }
}

export async function addAddress(values: AddressFields): Promise<AddressActionResult> {
  try {
    const { data } = await apiClient.post("/addresses", values, { headers: { token: await getAuthToken() } });
    const created = data?.data?.address ?? data?.data ?? data?.address;
    return {
      success: data?.status === "success" || Boolean(created),
      message: data?.message ?? "Address saved successfully.",
      address: created && typeof created === "object" ? created as ShippingAddress : undefined,
    };
  } catch (error) {
    return { success: false, message: errorMessage(error, "Could not save this address. Please try again.") };
  }
}

export async function removeAddress(addressId: string): Promise<AddressActionResult> {
  try {
    const { data } = await apiClient.delete(`/addresses/${encodeURIComponent(addressId)}`, {
      headers: { token: await getAuthToken() },
    });
    return { success: data?.status === "success" || !data?.status, message: data?.message ?? "Address removed." };
  } catch (error) {
    return { success: false, message: errorMessage(error, "Could not remove this address. Please try again.") };
  }
}
