"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { IconBox, IconSearch } from "@tabler/icons-react";
import ProductCard from "../components/ProductCard";
import { Product } from "../types/Products.types";

export default function ShopScreen({
  products,
  total,
  brandId,
  categoryId,
  initialSearch = "",
}: {
  products: Product[];
  total: number;
  brandId?: string;
  categoryId?: string;
  initialSearch?: string;
}) {
  const [search, setSearch] = useState(initialSearch);
  const [sort, setSort] = useState("featured");

  const visibleProducts = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();
    const filtered = products.filter((product) => {
      const matchesSearch =
        !normalizedSearch ||
        product.title.toLowerCase().includes(normalizedSearch) ||
        product.category?.name.toLowerCase().includes(normalizedSearch) ||
        product.brand?.name.toLowerCase().includes(normalizedSearch);
      return matchesSearch;
    });

    if (sort === "price-low") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sort === "price-high") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sort === "rating") {
      filtered.sort((a, b) => b.ratingsAverage - a.ratingsAverage);
    }
    return filtered;
  }, [products, search, sort]);

  return (
    <main className="min-h-screen bg-slate-50/70">
      <section className="bg-linear-to-r from-emerald-600 to-green-400 text-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-2 text-xs text-emerald-50">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <span className="text-white">All Products</span>
          </nav>
          <div className="flex items-center gap-4">
            <div className="grid size-12 place-items-center rounded-xl bg-white/20 shadow-sm">
              <IconBox size={26} />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
                {brandId
                  ? "Brand Products"
                  : categoryId
                    ? "Category Products"
                    : initialSearch
                      ? "Search Results"
                      : "All Products"}
              </h1>
              <p className="mt-1 text-sm text-emerald-50">
                {initialSearch
                  ? `Results for “${initialSearch}”`
                  : brandId
                  ? "Explore products from this brand"
                  : categoryId
                    ? "Explore products in this category"
                    : "Explore our complete product collection"}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-7 sm:px-6 lg:px-8">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-slate-500">
            Showing {visibleProducts.length} of {total} products
          </p>
          <div className="flex flex-col gap-2 sm:flex-row">
            <label className="relative block">
              <span className="sr-only">Search products</span>
              <IconSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search products..."
                className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-3 text-sm outline-none transition focus:border-emerald-500 sm:w-64"
              />
            </label>
            <label>
              <span className="sr-only">Sort products</span>
              <select
                value={sort}
                onChange={(event) => setSort(event.target.value)}
                className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-emerald-500 sm:w-48"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </label>
          </div>
        </div>

        {visibleProducts.length ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5">
            {visibleProducts.map((product) => (
              <ProductCard key={product._id} productInfo={product} />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-slate-200 bg-white px-6 py-16 text-center">
            <h2 className="font-semibold text-slate-900">No products found</h2>
            <p className="mt-1 text-sm text-slate-500">Try another search term.</p>
          </div>
        )}
      </section>
    </main>
  );
}
