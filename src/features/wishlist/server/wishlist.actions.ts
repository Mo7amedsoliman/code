"use server";

import { cookies } from "next/headers";
import axios, { AxiosRequestConfig } from "axios";
import { WishlistActionResponse } from "../types/wishlist.types";

const WISHLIST_URL = "https://ecommerce.routemisr.com/api/v1/wishlist";

async function getToken() {
  const cookieStore = await cookies();
  return cookieStore.get("token")?.value;
}

function authError(): WishlistActionResponse {
  return {
    status: "fail",
    message: "Please log in to access your wishlist.",
  };
}

export async function getWishlist(): Promise<WishlistActionResponse> {
  const token = await getToken();
  if (!token) return authError();

  try {
    const options: AxiosRequestConfig = {
      url: WISHLIST_URL,
      method: "GET",
      headers: { token },
    };
    const { data } = await axios.request(options);
    return data;
  } catch {
    return { status: "error", message: "Could not load your wishlist." };
  }
}

export async function addProductToWishlist(
  productId: string,
): Promise<WishlistActionResponse> {
  const token = await getToken();
  if (!token) return authError();

  try {
    const options: AxiosRequestConfig = {
      url: WISHLIST_URL,
      method: "POST",
      headers: { token },
      data: { productId },
    };
    const { data } = await axios.request(options);
    if (data.status !== "success") return data;
    return getWishlist();
  } catch {
    return { status: "error", message: "Could not update your wishlist." };
  }
}

export async function removeProductFromWishlist(
  productId: string,
): Promise<WishlistActionResponse> {
  const token = await getToken();
  if (!token) return authError();

  try {
    const options: AxiosRequestConfig = {
      url: `${WISHLIST_URL}/${productId}`,
      method: "DELETE",
      headers: { token },
    };
    const { data } = await axios.request(options);
    if (data.status !== "success") return data;
    return getWishlist();
  } catch {
    return { status: "error", message: "Could not update your wishlist." };
  }
}
