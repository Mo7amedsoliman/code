import apiClient from "@/services/apiCliente";
import { AxiosRequestConfig } from "axios";
import { ProductsResponse } from "../types/Products.types";

export default async function getAllProducts(params?: {
  brand?: string;
  category?: string;
  keyword?: string;
  limit?: number;
  page?: number;
}): Promise<ProductsResponse> {
  const options: AxiosRequestConfig = {
    url: "/products",
    method: "GET",
    params: {
      limit: params?.limit ?? 40,
      page: params?.page ?? 1,
      ...(params?.brand ? { brand: params.brand } : {}),
      ...(params?.category ? { "category[in]": params.category } : {}),
      ...(params?.keyword ? { keyword: params.keyword } : {}),
    },
  };

  const { data } = await apiClient.request(options);
  return data;
}
