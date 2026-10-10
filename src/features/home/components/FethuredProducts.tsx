import ProductCard from "@/features/products/components/ProductCard";
import getAllProducts from "@/features/products/services/getAllProducts";
import React from "react";

export default async function FethuredProducts() {
  const productsResponse = await getAllProducts();

  return (
    <>
      <section className="categories-section py-8">
        <div className="container space-y-8">
          <div className="title">
            <h2 className="relative ps-4 text-3xl font-bold text-gray-900 before:absolute before:start-0 before:top-1/2 before:-translate-y-1/2 before:h-6 before:w-1.5 before:rounded-full before:bg-primary-600">
              Featured <span className="text-primary-600">Products</span>
            </h2>
          </div>
          <div className="categories grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
            {productsResponse.data.map((product) => (
              <ProductCard key={product._id} productInfo={product} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
