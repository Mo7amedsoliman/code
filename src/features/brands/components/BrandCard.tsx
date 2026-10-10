import Image from "next/image";
import Link from "next/link";
import { IBrand } from "@/features/products/types/Products.types";

export default function BrandCard({ brand }: { brand: IBrand }) {
  return (
    <Link
      href={`/shop?brand=${brand._id}`}
      aria-label={`Shop ${brand.name} products`}
      className="group flex min-h-36 flex-col items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-violet-200 hover:shadow-lg"
    >
      <div className="relative grid h-20 w-full place-items-center overflow-hidden rounded-lg bg-slate-50 p-3">
        {brand.image ? (
          <Image
            src={brand.image}
            alt={`${brand.name} logo`}
            fill
            sizes="140px"
            unoptimized
            className="object-contain p-3 transition-transform duration-200 group-hover:scale-105"
          />
        ) : (
          <span className="text-3xl font-black text-slate-400">
            {brand.name.slice(0, 1).toUpperCase()}
          </span>
        )}
      </div>
      <span className="text-center text-sm font-semibold text-slate-800 group-hover:text-violet-700">
        {brand.name}
      </span>
    </Link>
  );
}
