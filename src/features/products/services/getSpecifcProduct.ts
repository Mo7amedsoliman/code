import apiClient from "@/services/apiCliente";
import { AxiosRequestConfig } from "axios";
import { ProductDetailsResponse } from "../types/productDetails.type";

export default async function getSpecifcProduct(
  id: string,
): Promise<ProductDetailsResponse> {
  const options: AxiosRequestConfig = {
    url: `/products/${id}`,
    method: "GET",
  };

  const { data } = await apiClient.request(options);
  return data;
}
