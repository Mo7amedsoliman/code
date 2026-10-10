"use client";

import { IconCheck, IconLock, IconShieldCheck, IconTruck } from "@tabler/icons-react";
import { CartValueType } from "@/features/cart/slices/cart.slice";
import Image from "next/image";

const money = new Intl.NumberFormat("en-EG", { maximumFractionDigits: 0 });
const formatPrice = (amount: number) => `${money.format(amount)} EGP`;

export default function OrderSummary({
  cart,
  isSubmitting,
  onPlaceOrder,
}: {
  cart: CartValueType;
  isSubmitting: boolean;
  onPlaceOrder: () => void;
}) {
  const products = cart.data.products;
  const total = cart.data.totalCartPrice;
  const count = products.reduce((sum, item) => sum + item.count, 0);

  return (
    <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <header className="bg-gradient-to-r from-green-600 to-green-700 px-4 py-3 text-white">
        <h2 className="flex items-center gap-2 text-sm font-bold"><IconLock size={15} />Order Summary</h2>
        <p className="mt-1 text-[10px] text-green-50">{count} {count === 1 ? "item" : "items"}</p>
      </header>
      <div className="p-3">
        <div className="max-h-64 space-y-2 overflow-y-auto pr-1">
          {products.map((item) => (
            <div key={item._id} className="flex items-center gap-2.5 rounded-lg bg-slate-50 p-2.5">
              <div className="relative size-10 shrink-0 overflow-hidden rounded-md border border-slate-100 bg-white p-1">
                <Image src={item.product.imageCover} alt={item.product.title} width={40} height={40} unoptimized className="size-full object-contain" />
              </div>
              <div className="min-w-0 flex-1"><p className="line-clamp-1 text-[10px] font-medium text-slate-800">{item.product.title}</p><p className="mt-0.5 text-[9px] text-slate-500">{item.count} × {formatPrice(item.price)}</p></div>
              <span className="shrink-0 text-[10px] font-bold text-slate-800">{money.format(item.price * item.count)}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 space-y-2 border-t border-slate-100 pt-3 text-xs">
          <div className="flex justify-between text-slate-600"><span>Subtotal</span><span>{formatPrice(total)}</span></div>
          <div className="flex justify-between text-slate-600"><span className="flex items-center gap-1"><IconTruck size={14} className="text-slate-400" />Shipping</span><span className="font-semibold text-green-600">FREE</span></div>
          <div className="flex items-baseline justify-between border-t border-slate-100 pt-2 font-bold text-slate-900"><span>Total</span><span className="text-base text-green-600">{money.format(total)} <span className="text-[9px] font-normal text-slate-500">EGP</span></span></div>
        </div>
        <button type="button" onClick={onPlaceOrder} disabled={isSubmitting || products.length === 0} className="mt-3 flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-green-600 to-green-700 text-xs font-bold text-white shadow-md shadow-green-600/15 transition hover:from-green-700 hover:to-green-800 disabled:cursor-not-allowed disabled:opacity-60">
          {isSubmitting ? <span className="size-4 animate-spin rounded-full border-2 border-white/40 border-t-white" /> : <IconLock size={14} />}
          {isSubmitting ? "Processing..." : "Place Order"}
        </button>
        <div className="mt-2.5 flex items-center justify-center gap-2 border-t border-slate-100 pt-2.5 text-[8px] text-slate-500 sm:gap-3">
          <span className="flex items-center gap-1"><IconShieldCheck size={11} className="text-green-600" />Secure</span><span className="h-3 border-l border-slate-200" /><span className="flex items-center gap-1"><IconTruck size={11} className="text-blue-500" />Fast Delivery</span><span className="h-3 border-l border-slate-200" /><span className="flex items-center gap-1"><IconCheck size={11} className="text-orange-500" />Easy Returns</span>
        </div>
      </div>
    </section>
  );
}
