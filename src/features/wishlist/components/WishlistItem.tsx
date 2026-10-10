"use client";

import Image from "next/image";
import Link from "next/link";
import { IconShoppingCart, IconTrash } from "@tabler/icons-react";
import { Product } from "@/features/products/types/Products.types";

export default function WishlistItem({
  product,
  isBusy,
  onAddToCart,
  onRemove,
}: {
  product: Product;
  isBusy: boolean;
  onAddToCart: () => void;
  onRemove: () => void;
}) {
  const price = product.priceAfterDiscount ?? product.price;
  const inStock = product.quantity > 0;

  return (
    <li className="grid gap-4 px-4 py-4 sm:grid-cols-[minmax(0,1fr)_130px_130px_220px] sm:items-center sm:px-5">
      <div className="flex min-w-0 items-center gap-3">
        <Link
          href={`/products/${product._id}`}
          className="relative grid size-14 shrink-0 place-items-center overflow-hidden rounded-lg border border-slate-100 bg-slate-50 p-1.5"
        >
          <Image
            src={product.imageCover}
            alt={product.title}
            fill
            sizes="56px"
            className="object-contain p-1"
            unoptimized
          />
        </Link>
        <div className="min-w-0">
          <Link
            href={`/products/${product._id}`}
            className="line-clamp-2 text-sm font-medium text-slate-900 hover:text-primary-700"
          >
            {product.title}
          </Link>
          <p className="mt-1 text-xs text-slate-400">
            {product.category?.name ?? ""}
          </p>
          <p className="mt-2 text-xs font-semibold text-slate-800 sm:hidden">
            {price.toLocaleString()} EGP
          </p>
        </div>
      </div>

      <div className="hidden text-sm font-semibold text-slate-900 sm:block">
        {price.toLocaleString()} EGP
        {product.priceAfterDiscount ? (
          <span className="block text-xs font-normal text-slate-400 line-through">
            {product.price.toLocaleString()} EGP
          </span>
        ) : null}
      </div>

      <div>
        <span
          className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${
            inStock
              ? "bg-emerald-50 text-emerald-700"
              : "bg-slate-100 text-slate-500"
          }`}
        >
          <span
            className={`mr-1 inline-block size-1 rounded-full align-middle ${
              inStock ? "bg-emerald-500" : "bg-slate-400"
            }`}
          />
          {inStock ? "In Stock" : "Out of Stock"}
        </span>
      </div>

      <div className="flex items-center gap-2 sm:justify-center">
        <button
          type="button"
          onClick={onAddToCart}
          disabled={!inStock || isBusy}
          className="inline-flex h-9 items-center gap-1.5 rounded-md bg-primary-600 px-3 text-xs font-semibold text-white transition hover:bg-primary-700 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          <IconShoppingCart size={15} /> Add to Cart
        </button>
        <button
          type="button"
          onClick={onRemove}
          disabled={isBusy}
          aria-label={`Remove ${product.title} from wishlist`}
          className="grid size-9 shrink-0 place-items-center rounded-md border border-slate-200 text-slate-400 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-500 disabled:opacity-50"
        >
          <IconTrash size={16} />
        </button>
      </div>
    </li>
  );
}
