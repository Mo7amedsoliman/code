import { IBrand } from "@/features/products/types/Products.types";

export interface BrandsResponse {
  results: number;
  metadata: {
    currentPage: number;
    numberOfPages: number;
    limit: number;
  };
  data: IBrand[];
}
