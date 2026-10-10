import apiClient from "@/services/apiCliente";
import { AxiosRequestConfig } from "axios";
import { BrandsResponse } from "../types/brands.types";

export default async function getAllBrands(): Promise<BrandsResponse> {
  const options: AxiosRequestConfig = {
    url: "/brands",
    method: "GET",
    params: { limit: 100 },
  };

  const { data } = await apiClient.request(options);
  return data;
}
