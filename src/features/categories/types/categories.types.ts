export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaginationMetadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
  nextPage?: number;
  prevPage?: number;
}

export interface ApiResponse<T> {
  results: number;
  metadata: PaginationMetadata;
  data: T[];
}

// Specific response type for categories
export type CategoriesResponse = ApiResponse<Category>;
