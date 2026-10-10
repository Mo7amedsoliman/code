"use client";

import Link from "next/link";
import { IconArrowRight, IconClipboardList, IconPackage } from "@tabler/icons-react";
import OrderCard from "../components/OrderCard";
import { CustomerOrder } from "../types/orders.types";

export default function OrdersScreen({ orders, error, isAuthenticated }: { orders: CustomerOrder[]; error?: string; isAuthenticated: boolean }) {
  return (
    <main className="min-h-[70vh] bg-slate-50/50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <nav className="mb-5 flex items-center gap-2 text-xs text-slate-500"><Link href="/" className="hover:text-green-700">Home</Link><span>/</span><span className="font-medium text-slate-800">My Orders</span></nav>
        <div className="mb-6 flex items-center gap-3">
          <span className="grid size-12 place-items-center rounded-xl bg-green-600 text-white shadow-lg shadow-green-600/20"><IconClipboardList size={24} /></span>
          <div><h1 className="text-2xl font-extrabold tracking-tight text-slate-900">My Orders</h1><p className="text-xs text-slate-500">Track and manage your {orders.length} {orders.length === 1 ? "order" : "orders"}</p></div>
        </div>

        {error && <div role="alert" className="mb-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-800">{error}</div>}
        {orders.length ? (
          <div className="space-y-3.5">{orders.map((order, index) => <OrderCard key={order._id} order={order} initiallyExpanded={index === 0} />)}</div>
        ) : (
          <section className="flex min-h-80 flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 py-12 text-center shadow-sm">
            <span className="grid size-16 place-items-center rounded-full bg-green-50 text-green-600"><IconPackage size={30} /></span>
            <h2 className="mt-4 text-lg font-bold text-slate-900">{isAuthenticated ? "No orders yet" : "Sign in to view your orders"}</h2>
            <p className="mt-1 max-w-sm text-sm text-slate-500">{isAuthenticated ? "Your orders will appear here after you complete a purchase." : "Sign in to see your order history and delivery updates."}</p>
            <Link href={isAuthenticated ? "/shop" : "/login"} className="mt-5 inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-green-700">{isAuthenticated ? "Start Shopping" : "Sign In"}<IconArrowRight size={14} /></Link>
          </section>
        )}
      </div>
    </main>
  );
}
