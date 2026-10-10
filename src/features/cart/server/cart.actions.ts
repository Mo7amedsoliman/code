"use server";
import { cookies } from "next/headers";
import axios, { AxiosRequestConfig } from "axios";
import { CartErrorResponse, CartResponse } from "../types/cart.types";

export async function getCartItems(): Promise<
  CartResponse | CartErrorResponse
> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  if (!token) {
    return {
      status: "fail",
      message: "you are not logged in. Please log in to get access",
    };
  }
  try {
    const option: AxiosRequestConfig = {
      url: "https://ecommerce.routemisr.com/api/v2/cart",
      method: "GET",
      headers: {
        token: token?.value,
      },
    };
    const { data } = await axios(option);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return {
      status: "fail",
      message: "something went wrong. try again later.",
    };
  }
}
export async function addProductToCart(
  id: string,
): Promise<CartResponse | CartErrorResponse> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  if (!token) {
    return {
      status: "fail",
      message: "you are not logged in. Please log in to get access",
    };
  }

  try {
    const options: AxiosRequestConfig = {
      url: `https://ecommerce.routemisr.com/api/v2/cart`,
      method: "POST",
      headers: {
        token: token.value,
      },
      data: {
        productId: id,
      },
    };

    const { data } = await axios.request(options);
    return data;
  } catch (error) {
    console.log(error);
    return {
      status: "fail",
      message: "something went wrong. try again later.",
    };
  }
}

export async function removeProductFromCart(
  id: string,
): Promise<CartResponse | CartErrorResponse> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  if (!token) {
    return {
      status: "fail",
      message: "you are not logged in. Please log in to get access",
    };
  }

  try {
    const options: AxiosRequestConfig = {
      url: `https://ecommerce.routemisr.com/api/v2/cart/${id}`,
      method: "DELETE",
      headers: {
        token: token.value,
      },
    };

    const { data } = await axios.request(options);
    return data;
  } catch (error) {
    console.log(error);
    return {
      status: "fail",
      message: "something went wrong. try again later.",
    };
  }
}

export async function updateProductInCart(
  id: string,
  count: number,
): Promise<CartResponse | CartErrorResponse> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  if (!token) {
    return {
      status: "fail",
      message: "you are not logged in. Please log in to get access",
    };
  }

  try {
    const options: AxiosRequestConfig = {
      url: `https://ecommerce.routemisr.com/api/v2/cart/${id}`,
      method: "PUT",
      headers: {
        token: token.value,
      },
      data: {
        count,
      },
    };

    const { data } = await axios.request(options);
    return data;
  } catch (error) {
    console.log(error);
    return {
      status: "fail",
      message: "something went wrong. try again later.",
    };
  }
}

export async function clearCart(): Promise<CartResponse | CartErrorResponse> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  if (!token) {
    return {
      status: "fail",
      message: "you are not logged in. Please log in to get access",
    };
  }

  try {
    const options: AxiosRequestConfig = {
      url: `https://ecommerce.routemisr.com/api/v2/cart`,
      method: "DELETE",
      headers: {
        token: token.value,
      },
    };

    const { data } = await axios.request(options);
    return data;
  } catch (error) {
    console.log(error);
    return {
      status: "fail",
      message: "something went wrong. try again later.",
    };
  }
}
