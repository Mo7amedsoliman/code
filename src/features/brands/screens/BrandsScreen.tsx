import Link from "next/link";
import { IconArrowRight, IconTag } from "@tabler/icons-react";
import { IBrand } from "@/features/products/types/Products.types";
import BrandCard from "../components/BrandCard";

export default function BrandsScreen({ brands }: { brands: IBrand[] }) {
  const sortedBrands = [...brands].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <main className="min-h-screen bg-slate-50/70">
      <section className="bg-linear-to-r from-violet-600 to-purple-500 text-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-2 text-xs text-violet-100">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <span className="text-white">Brands</span>
          </nav>
          <div className="flex items-center gap-4">
            <div className="grid size-12 place-items-center rounded-xl bg-white/20 shadow-sm">
              <IconTag size={25} />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">Top Brands</h1>
              <p className="mt-1 text-sm text-violet-100">Shop products from your favorite brands</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-5 flex items-center justify-between">
          <p className="text-sm text-slate-500">{brands.length} brands to explore</p>
          <Link href="/shop" className="inline-flex items-center gap-1 text-sm font-semibold text-violet-700 hover:text-violet-900">
            Browse all products <IconArrowRight size={16} />
          </Link>
        </div>

        {sortedBrands.length ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {sortedBrands.map((brand) => (
              <BrandCard key={brand._id} brand={brand} />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-slate-200 bg-white px-6 py-14 text-center text-sm text-slate-500">
            No brands are available right now.
          </div>
        )}
      </section>
    </main>
  );
}
