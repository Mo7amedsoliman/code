"use client";

import Link from "next/link";
import {
  IconShoppingBag,
  IconTruck,
  IconTag,
  IconLock,
  IconShieldCheck,
  IconArrowLeft,
  IconTruckDelivery,
} from "@tabler/icons-react";

import { CartValueType } from "../slices/cart.slice";

export default function OrderSummary({
  cartInfo,
}: {
  cartInfo: CartValueType;
}) {
  const { data, numOfCartItems } = cartInfo;
  const { products, totalCartPrice } = data;
  return (
    <div className="max-w-md mx-auto bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden font-sans">
      {/* Header */}
      <div className="bg-emerald-600 text-white p-5 rounded-t-3xl">
        <div className="flex items-center gap-2">
          <IconShoppingBag className="w-6 h-6" />
          <h2 className="text-xl font-bold tracking-wide">Order Summary</h2>
        </div>
        <p className="text-emerald-100 text-sm mt-1">
          {" "}
          {numOfCartItems} {numOfCartItems === 1 ? "item" : "items"} in your
          cart
        </p>
      </div>

      <div className="p-5 space-y-5">
        {/* Free Shipping Banner */}
        {totalCartPrice > 500 ? (
          <div className="bg-linear-to-r from-green-50 to-emerald-50 rounded-xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0">
              <IconTruckDelivery stroke={2} className="text-green-600" />
            </div>
            <div>
              <p className="font-semibold text-green-700">Free Shipping!</p>
              <p className="text-sm text-green-600">
                You qualify for free delivery
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-linear-to-r from-orange-50 to-amber-50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <IconTruckDelivery
                stroke={2}
                className="text-orange-500 shrink-0"
              />
              <span className="text-sm font-medium text-gray-700">
                Add {500 - totalCartPrice} EGP for free shipping
              </span>
            </div>
            <div className="h-2 bg-orange-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-linear-to-r from-orange-400 to-amber-400 rounded-full transition-all duration-300"
                style={{ width: `${totalCartPrice - 500}%` }}
              />
            </div>
          </div>
        )}

        {/* Pricing Breakdown */}
        <div className="space-y-3 text-sm">
          <div className="flex justify-between items-center text-gray-500 font-medium">
            <span>Subtotal</span>
            <span className="font-semibold text-gray-800">
              {totalCartPrice} EGP
            </span>
          </div>
          <div className="flex justify-between text-gray-600 text-sm font-medium">
            <span className="font-semibold text-gray-600">Shipping</span>

            {totalCartPrice >= 500 ? (
              <span className="font-medium text-green-600">FREE</span>
            ) : (
              <span className="font-medium text-gray-900">{50} EGP</span>
            )}
          </div>

          <hr className="border-dashed border-gray-200 my-2" />

          <div className="flex justify-between items-baseline pt-1">
            <span className="text-base font-bold text-gray-900">Total</span>
            <div className="text-right">
              <span className="text-2xl font-black text-emerald-600">
                {totalCartPrice + (totalCartPrice >= 500 ? 0 : 50)}
              </span>
              <span className="text-xs font-bold text-gray-400 ml-1">EGP</span>
            </div>
          </div>
        </div>

        {/* Apply Promo Code Button */}
        <button
          type="button"
          className="w-full py-3 px-4 rounded-xl border-2 border-dashed border-emerald-300 text-emerald-600 font-semibold hover:bg-emerald-50 transition-colors duration-200 flex items-center justify-center gap-2 text-sm"
        >
          <IconTag className="w-5 h-5" />
          <span>Apply Promo Code</span>
        </button>

        {/* Secure Checkout Button */}
        <Link
          href="/checkout"
          aria-disabled={products.length === 0}
          className={`w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md shadow-emerald-600/20 active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-2 ${products.length === 0 ? "pointer-events-none opacity-60" : ""}`}
        >
          <IconLock className="w-5 h-5" />
          <span>Secure Checkout</span>
        </Link>

        {/* Trust Badges */}
        <div className="flex items-center justify-center gap-4 text-xs font-medium text-gray-400 pt-1">
          <div className="flex items-center gap-1">
            <IconShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Secure Payment</span>
          </div>
          <span className="text-gray-300">|</span>
          <div className="flex items-center gap-1">
            <IconTruck className="w-4 h-4 text-blue-500" />
            <span>Fast Delivery</span>
          </div>
        </div>

        {/* Continue Shopping Link */}
        <div className="text-center pt-1">
          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-600 hover:text-emerald-700 hover:underline transition-all"
          >
            <IconArrowLeft className="w-4 h-4" />
            <span>Continue Shopping</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
