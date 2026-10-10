import { getAllCategories } from "@/features/categories/services/gitAllCategories";
import React from "react";
import Image from "next/image";

export default async function Homecategories() {
  const catogeriesResponse = await getAllCategories();

  return (
    <>
      <section className="categories-section py-8">
        <div className="container space-y-8">
          <div className="title">
            <h2 className="relative ps-4 text-3xl font-bold text-gray-900 before:absolute before:start-0 before:top-1/2 before:-translate-y-1/2 before:h-6 before:w-1.5 before:rounded-full before:bg-primary-600">
              Shop By <span className="text-primary-600">Categories</span>
            </h2>
          </div>
          <div className="categories grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-6">
            {catogeriesResponse.data.map((category) => (
              <div
                key={category._id}
                className=" cursor-pointer  shadow-md  px-8 py-4 rounded-xl flex flex-col items-center gap-2"
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  width={80}
                  height={80}
                  unoptimized
                  className="size-20 rounded-full object-cover object-center"
                />

                <h2 className="text-sm font-medium text-gray-900">
                  {category.name}
                </h2>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
