"use client";

import { useState } from "react";
import Image from "next/image";
import { IconCalendar, IconCash, IconChevronDown, IconClock, IconMapPin, IconPackage, IconPhone } from "@tabler/icons-react";
import { CustomerOrder } from "../types/orders.types";

const money = new Intl.NumberFormat("en-EG", { maximumFractionDigits: 0 });
const formatPrice = (amount: number) => `${money.format(amount)} EGP`;

function orderStatus(order: CustomerOrder) {
  if (order.status) return order.status;
  if (order.isDelivered) return "Delivered";
  return "Processing";
}

function statusStyle(status: string) {
  const normalized = status.toLowerCase();
  if (normalized.includes("deliver")) return "bg-green-100 text-green-700";
  if (normalized.includes("cancel")) return "bg-red-100 text-red-700";
  return "bg-amber-100 text-amber-700";
}

export default function OrderCard({ order, initiallyExpanded = false }: { order: CustomerOrder; initiallyExpanded?: boolean }) {
  const [expanded, setExpanded] = useState(initiallyExpanded);
  const items = order.cartItems ?? [];
  const itemCount = items.reduce((total, item) => total + (Number(item.count) || 0), 0);
  const total = Number(order.totalOrderPrice ?? order.totalPrice ?? items.reduce((sum, item) => sum + (item.price || 0) * item.count, 0));
  const status = orderStatus(order);
  const firstProduct = items[0]?.product;
  const date = order.createdAt ? new Date(order.createdAt) : null;
  const dateLabel = date && !Number.isNaN(date.valueOf())
    ? new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(date)
    : "Date unavailable";

  return (
    <article className={`overflow-hidden rounded-2xl border bg-white shadow-sm transition ${expanded ? "border-green-200" : "border-slate-200 hover:shadow-md"}`}>
      <div className="flex items-start gap-3 p-4 sm:gap-4 sm:p-5">
        <div className="relative grid size-[76px] shrink-0 place-items-center overflow-hidden rounded-xl border border-slate-100 bg-slate-50 p-2 sm:size-20">
          {firstProduct?.imageCover ? <Image src={firstProduct.imageCover} alt={firstProduct.title ?? firstProduct.name ?? "Order item"} fill sizes="80px" className="object-contain p-2" unoptimized /> : <IconPackage size={30} className="text-slate-400" />}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold ${statusStyle(status)}`}><IconClock size={12} />{status}</span>
            {order.paymentMethodType && <span className="ml-auto grid size-8 place-items-center rounded-lg bg-slate-100 text-slate-500" title={order.paymentMethodType}><IconCash size={15} /></span>}
          </div>
          <p className="mt-1.5 font-bold text-slate-900"># {order._id.slice(-4).toUpperCase()}</p>
          <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] text-slate-500 sm:text-xs">
            <span className="inline-flex items-center gap-1"><IconCalendar size={13} />{dateLabel}</span><span>•</span>
            <span className="inline-flex items-center gap-1"><IconPackage size={13} />{itemCount} {itemCount === 1 ? "item" : "items"}</span><span>•</span>
            {order.shippingAddress?.city && <span className="inline-flex items-center gap-1"><IconMapPin size={13} />{order.shippingAddress.city}</span>}
          </div>
          <p className="mt-2 text-lg font-extrabold text-slate-900">{money.format(total)}<span className="ml-1 text-[10px] font-normal text-slate-500">EGP</span></p>
        </div>
        <button type="button" onClick={() => setExpanded((current) => !current)} aria-expanded={expanded} className="mt-auto inline-flex shrink-0 items-center gap-1 rounded-lg bg-slate-100 px-3 py-2 text-xs font-medium text-slate-700 transition hover:bg-slate-200">
          {expanded ? "Hide" : "Details"}<IconChevronDown size={14} className={`transition-transform ${expanded ? "rotate-180" : ""}`} />
        </button>
      </div>

      {expanded && (
        <div className="border-t border-slate-100 bg-slate-50/60 p-4 sm:p-5">
          <h3 className="mb-3 flex items-center gap-2 text-xs font-semibold text-slate-800"><span className="grid size-5 place-items-center rounded-md bg-green-100 text-green-700"><IconPackage size={12} /></span>Order Items</h3>
          <div className="space-y-2">
            {items.length ? items.map((item, index) => {
              const title = item.product?.title ?? item.product?.name ?? "Product";
              return (
                <div key={item._id ?? `${order._id}-${index}`} className="flex items-center gap-3 rounded-xl border border-slate-100 bg-white p-2.5 sm:p-3">
                  <div className="relative grid size-12 shrink-0 place-items-center overflow-hidden rounded-lg bg-slate-50 p-1">
                    {item.product?.imageCover ? <Image src={item.product.imageCover} alt={title} fill sizes="48px" className="object-contain p-1" unoptimized /> : <IconPackage size={20} className="text-slate-400" />}
                  </div>
                  <div className="min-w-0 flex-1"><p className="truncate text-xs font-medium text-slate-800">{title}</p><p className="mt-1 text-[10px] text-slate-500">{item.count} × {formatPrice(item.price)}</p></div>
                  <p className="shrink-0 text-xs font-bold text-slate-900">{money.format(item.price * item.count)}<span className="block text-right text-[9px] font-normal text-slate-500">EGP</span></p>
                </div>
              );
            }) : <p className="rounded-lg bg-white p-3 text-xs text-slate-500">Order item details are unavailable.</p>}
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <section className="rounded-xl border border-slate-200 bg-white p-3.5">
              <h4 className="mb-3 flex items-center gap-2 text-xs font-semibold text-slate-800"><span className="grid size-5 place-items-center rounded-md bg-blue-100 text-blue-600"><IconMapPin size={12} /></span>Delivery Address</h4>
              <div className="space-y-2 text-[11px] text-slate-600">
                <p>{order.shippingAddress?.city ?? "Address unavailable"}</p>
                {order.shippingAddress?.details && <p>{order.shippingAddress.details}</p>}
                {order.shippingAddress?.phone && <p className="flex items-center gap-1.5"><IconPhone size={12} className="text-slate-400" />{order.shippingAddress.phone}</p>}
              </div>
            </section>
            <section className="rounded-xl border border-amber-200 bg-amber-100/80 p-3.5">
              <h4 className="mb-3 flex items-center gap-2 text-xs font-semibold text-slate-900"><span className="grid size-5 place-items-center rounded-md bg-amber-500 text-white"><IconClock size={12} /></span>Order Summary</h4>
              <div className="space-y-2 text-[11px] text-slate-600"><p className="flex justify-between"><span>Subtotal</span><span>{formatPrice(total)}</span></p><p className="flex justify-between"><span>Shipping</span><span className="text-green-700">Free</span></p><p className="flex justify-between border-t border-amber-200 pt-2 font-bold text-slate-900"><span>Total</span><span>{formatPrice(total)}</span></p></div>
            </section>
          </div>
        </div>
      )}
    </article>
  );
}
