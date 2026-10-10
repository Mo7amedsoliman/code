import { Product } from "@/features/products/types/Products.types";

export interface WishlistResponse {
  status: "success";
  message?: string;
  count: number;
  data: Product[];
}

export interface WishlistErrorResponse {
  status: "fail" | "error";
  message: string;
}

export type WishlistActionResponse = WishlistResponse | WishlistErrorResponse;
