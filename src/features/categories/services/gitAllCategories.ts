import { AxiosRequestConfig } from "axios";
import apiClient from "@/services/apiCliente";
import { CategoriesResponse } from "../types/categories.types";

export async function getAllCategories(): Promise<CategoriesResponse> {
  const options: AxiosRequestConfig = {
    url: "/categories",
    method: "GET",
  };

  const { data } = await apiClient.request(options);
  return data;
}
