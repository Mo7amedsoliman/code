// --- Subcategory Interface ---
export interface ISubcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

// --- Category Interface ---
export interface ICategory {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

// --- Brand Interface ---
export interface IBrand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

// --- Product Item Interface ---
export interface Product {
  _id: string;
  id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  price: number;
  priceAfterDiscount?: number; // اختياري لأنه قد لا يتوفر في كل المنتجات
  sold: number;
  ratingsAverage: number;
  ratingsQuantity: number;
  imageCover: string;
  images: string[];
  category: ICategory;
  subcategory: ISubcategory[];
  brand: IBrand;
  createdAt: string;
  updatedAt: string;
}

// --- Pagination Metadata Interface ---
export interface IPaginationMetadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
  nextPage?: number; // اختياري في حال الوصول لآخر صفحة
  prevPage?: number; // اختياري في حال التواجد بالصفحة الأولى
}

// --- Main API Response Interface ---
export interface ProductsResponse {
  results: number;
  metadata: IPaginationMetadata;
  data: Product[];
}
