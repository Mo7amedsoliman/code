"use client";
import {
  IconArrowLeft,
  IconArrowRight,
  IconBolt,
  IconCheck,
  IconHeart,
  IconHome,
  IconRefresh,
  IconShare,
  IconShieldCheck,
  IconShoppingCart,
  IconStarFilled,
  IconTruck,
} from "@tabler/icons-react";

import { ProductDetails } from "../../types/productDetails.type";

import ImageGallery from "react-image-gallery";
import Link from "next/link";
import Image from "next/image";
import "react-image-gallery/styles/image-gallery.css";

function Stars({ rating }: { rating: number }) {
  return (
    <span
      className="flex items-center gap-0.5 text-amber-400"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }, (_, index) => (
        <IconStarFilled
          key={index}
          size={15}
          className={index < Math.round(rating) ? "" : "text-slate-200"}
        />
      ))}
    </span>
  );
}

export default function ProductInfo({
  productInfo,
}: {
  productInfo: ProductDetails;
}) {
  const {
    title,
    imageCover,
    images,
    price,
    priceAfterDiscount,
    quantity,
    ratingsAverage,
    ratingsQuantity,
    description,
    category,
    subcategory,
    brand,
    sold,
  } = productInfo;
  const currentPrice = priceAfterDiscount ?? price;
  const discount = priceAfterDiscount
    ? Math.round(((price - priceAfterDiscount) / price) * 100)
    : 0;
  const gallery = [...new Set([imageCover, ...images].filter(Boolean))];

  return (
    <main className="container mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <nav
        aria-label="Breadcrumb"
        className="mb-5 flex flex-wrap items-center gap-2 text-xs text-slate-400"
      >
        <Link
          href="/"
          className="inline-flex items-center gap-1 hover:text-primary-600"
        >
          <IconHome size={13} /> Home
        </Link>
        <span>/</span>
        <span>{category.name}</span>
        <span>/</span>
        <span>{subcategory[0]?.name ?? category.name}</span>
        <span>/</span>
        <span className="max-w-64 truncate font-medium text-slate-600">
          {title}
        </span>
      </nav>

      <section className="grid gap-5 lg:grid-cols-[minmax(260px,0.72fr)_minmax(0,2fr)]">
        <div className="rounded-xl border border-slate-200 bg-white p-3">
          <div id="product-images" className="w-full">
            <ImageGallery
              items={gallery.map((image) => ({
                original: image,
                thumbnail: image,
                originalAlt: title,
                thumbnailAlt: `${title} thumbnail`,
                renderItem: () => (
                  <Image
                    src={image}
                    alt={title}
                    width={800}
                    height={800}
                    unoptimized
                    className="h-[340px] w-full rounded-lg bg-slate-50 object-contain sm:h-[400px]"
                  />
                ),
              }))}
              showNav={false}
              showPlayButton={false}
              showFullscreenButton={false}
              showThumbnails={gallery.length > 1}
              thumbnailPosition="bottom"
              lazyLoad
            />
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-7">
          <div className="mb-3 flex flex-wrap gap-2">
            <span className="rounded-full bg-primary-50 px-3 py-1 text-xs font-medium text-primary-700">
              {category.name}
            </span>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
              {brand.name}
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            {title}
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
            <Stars rating={ratingsAverage} />
            <span className="font-medium text-slate-700">
              {ratingsAverage.toFixed(1)}
            </span>
            <span className="text-slate-400">({ratingsQuantity} reviews)</span>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <span className="text-3xl font-bold text-slate-900">
              {currentPrice} EGP
            </span>
            {discount > 0 && (
              <>
                <span className="text-sm text-slate-400 line-through">
                  {price} EGP
                </span>
                <span className="rounded-full bg-rose-500 px-2.5 py-1 text-xs font-semibold text-white">
                  Save {discount}%
                </span>
              </>
            )}
          </div>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary-50 px-3 py-1.5 text-xs font-medium text-primary-700">
            <span
              className={`size-2 rounded-full ${quantity > 0 ? "bg-primary-500" : "bg-rose-500"}`}
            />
            {quantity > 0 ? "In Stock" : "Out of Stock"}
          </div>
          <div className="my-5 border-t border-slate-100" />
          <p className="text-sm leading-6 text-slate-600">{description}</p>

          <div className="mt-5">
            <label className="mb-2 block text-xs font-medium text-slate-600">
              Quantity
            </label>
            <div className="flex items-center gap-3">
              <div className="inline-flex h-10 items-center overflow-hidden rounded-md border border-slate-200 text-sm">
                <button
                  className="px-3 text-slate-500 hover:bg-slate-50"
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="min-w-10 text-center font-medium text-slate-800">
                  1
                </span>
                <button
                  className="px-3 text-slate-500 hover:bg-slate-50"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
              <span className="text-xs text-slate-500">
                {quantity} available
              </span>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between rounded-lg bg-slate-50 px-4 py-3 text-sm">
            <span className="text-slate-600">Total Price</span>
            <strong className="text-lg text-primary-600">
              {currentPrice.toFixed(2)} EGP
            </strong>
          </div>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            <button className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary-600 text-sm font-semibold text-white transition hover:bg-primary-700">
              <IconShoppingCart size={17} /> Add to Cart
            </button>
            <button className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-slate-900 text-sm font-semibold text-white transition hover:bg-slate-800">
              <IconBolt size={16} /> Buy Now
            </button>
          </div>
          <div className="mt-3 flex gap-2">
            <button className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-lg border border-slate-200 text-sm text-slate-700 transition hover:border-primary-500 hover:text-primary-700">
              <IconHeart size={16} /> Add to Wishlist
            </button>
            <button
              aria-label="Share product"
              className="grid size-10 place-items-center rounded-lg border border-slate-200 text-slate-600 hover:text-primary-700"
            >
              <IconShare size={16} />
            </button>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-3 border-t border-slate-100 pt-4 sm:grid-cols-3">
            <Benefit
              icon={<IconTruck size={17} />}
              title="Free Delivery"
              detail="Orders over $50"
            />
            <Benefit
              icon={<IconRefresh size={17} />}
              title="30 Days Return"
              detail="Money back"
            />
            <Benefit
              icon={<IconShieldCheck size={17} />}
              title="Secure Payment"
              detail="100% Protected"
            />
          </div>
        </div>
      </section>

      <section className="mt-8 overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="flex gap-7 border-b border-slate-200 px-5">
          <button className="border-b-2 border-primary-600 py-4 text-sm font-semibold text-primary-700">
            Product Details
          </button>
          <button className="py-4 text-sm text-slate-500">
            ★ Reviews ({ratingsQuantity})
          </button>
          <button className="py-4 text-sm text-slate-500">
            ▣ Shipping &amp; Returns
          </button>
        </div>
        <div className="p-5 sm:p-6">
          <h2 className="text-sm font-semibold text-slate-800">
            About this Product
          </h2>
          <p className="mt-2 text-sm text-slate-500">{description}</p>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            <div className="rounded-lg bg-slate-50 p-4">
              <h3 className="mb-3 text-sm font-semibold text-slate-800">
                Product Information
              </h3>
              <InfoRow label="Category" value={category.name} />
              <InfoRow
                label="Subcategory"
                value={subcategory[0]?.name ?? "—"}
              />
              <InfoRow label="Brand" value={brand.name} />
              <InfoRow label="Items Sold" value={`${sold}+ sold`} />
            </div>
            <div className="rounded-lg bg-slate-50 p-4">
              <h3 className="mb-3 text-sm font-semibold text-slate-800">
                Key Features
              </h3>
              {[
                "Premium Quality Product",
                "100% Authentic Guarantee",
                "Fast & Secure Packaging",
                "Quality Tested",
              ].map((feature) => (
                <p
                  key={feature}
                  className="mb-2 flex items-center gap-2 text-xs text-slate-600"
                >
                  <IconCheck size={14} className="text-primary-600" />
                  {feature}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="border-l-4 border-primary-600 pl-3 text-lg font-bold text-slate-900">
            You May Also Like
          </h2>
          <div className="flex gap-2">
            <button
              aria-label="Previous products"
              className="grid size-8 place-items-center rounded-full bg-slate-100 text-slate-600"
            >
              <IconArrowLeft size={16} />
            </button>
            <button
              aria-label="Next products"
              className="grid size-8 place-items-center rounded-full bg-slate-100 text-slate-600"
            >
              <IconArrowRight size={16} />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {Array.from({ length: 5 }, (_, index) => (
            <article
              key={index}
              className="overflow-hidden rounded-lg border border-slate-200 bg-white p-2.5"
            >
              <div className="relative flex h-36 items-center justify-center rounded-md bg-slate-50 sm:h-44">
                <Image
                  src={gallery[index % gallery.length]}
                  alt=""
                  width={220}
                  height={180}
                  unoptimized
                  className="h-full w-full object-contain"
                />
                <button
                  aria-label="Add to wishlist"
                  className="absolute right-2 top-2 grid size-7 place-items-center rounded-full bg-white text-slate-600 shadow"
                >
                  <IconHeart size={15} />
                </button>
              </div>
              <p className="mt-3 text-[11px] text-slate-400">{category.name}</p>
              <p className="mt-1 line-clamp-1 text-xs font-medium text-slate-800">
                {title}
              </p>
              <div className="mt-1 flex items-center gap-1">
                <Stars rating={ratingsAverage} />
                <span className="text-[10px] text-slate-400">
                  ({ratingsQuantity})
                </span>
              </div>
              <div className="mt-2 flex items-center justify-between text-xs font-bold text-slate-800">
                {currentPrice} EGP
                <button
                  aria-label="Add to cart"
                  className="grid size-7 place-items-center rounded-full bg-primary-600 text-lg text-white"
                >
                  +
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
      <div className="mt-8 grid gap-4 rounded-xl bg-primary-50 px-5 py-4 text-xs sm:grid-cols-4">
        <Benefit
          icon={<IconTruck size={16} />}
          title="Free Shipping"
          detail="On orders over $50"
        />
        <Benefit
          icon={<IconRefresh size={16} />}
          title="Easy Returns"
          detail="14-day return policy"
        />
        <Benefit
          icon={<IconShieldCheck size={16} />}
          title="Secure Payment"
          detail="100% secure checkout"
        />
        <Benefit
          icon={<IconCheck size={16} />}
          title="24/7 Support"
          detail="Contact us anytime"
        />
      </div>
    </main>
  );
}

function Benefit({
  icon,
  title,
  detail,
}: {
  icon: React.ReactNode;
  title: string;
  detail: string;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="grid size-8 shrink-0 place-items-center rounded-full bg-primary-100 text-primary-700">
        {icon}
      </span>
      <span>
        <strong className="block text-xs text-slate-800">{title}</strong>
        <small className="mt-0.5 block text-[10px] text-slate-500">
          {detail}
        </small>
      </span>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="mb-2 flex justify-between gap-3 text-xs">
      <span className="text-slate-500">{label}</span>
      <span className="font-medium text-slate-700">{value}</span>
    </div>
  );
}
