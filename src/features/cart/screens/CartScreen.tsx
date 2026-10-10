"use client";
import Link from "next/link";
import {
  IconShoppingCart,
  IconArrowLeft,
  IconTrash,
} from "@tabler/icons-react";
// استورد مكون CartItem الخاص بك
import CartItem from "../components/CartItem";
import { clearCart } from "../server/cart.actions";
import OrderSummary from "../components/CartSummary";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/Store";
import { toast } from "sonner";
import { cartActions, cartInitialValue } from "../slices/cart.slice";

export default function CartScreen() {
  const cartResponse = useSelector(
    (AppState: RootState) => AppState.cartReducer,
  );
  const { setcartInfo } = cartActions;
  const dispatch = useDispatch();

  async function handleClearCart() {
    const response = await clearCart();
    if (response.status === "error" || response.status === "fail") {
      toast.error(response.message);
      return;
    }
    if (response.status === "success") {
      toast.success(response.message);
      dispatch(setcartInfo(cartInitialValue));
    }
  }

  if (cartResponse.status === "fail" || cartResponse.status === "error") {
    return <div>error</div>;
  }
  if (
    cartResponse.status === "success" &&
    cartResponse.data.products.length === 0
  ) {
    return (
      <main className="min-h-screen bg-gray-50/70 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <nav className="mb-8 flex items-center gap-2 text-xs text-gray-500">
            <Link href="/" className="transition-colors hover:text-emerald-600">
              Home
            </Link>
            <span>/</span>
            <span className="font-medium text-gray-800">Shopping Cart</span>
          </nav>

          <section className="mx-auto flex min-h-[460px] max-w-3xl flex-col items-center justify-center rounded-3xl border border-gray-100 bg-white px-6 py-12 text-center shadow-sm sm:px-12">
            <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 ring-8 ring-emerald-50/60">
              <IconShoppingCart className="h-11 w-11" stroke={1.6} />
            </div>
            <span className="mb-3 rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gray-500">
              Your cart is waiting
            </span>
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Your cart is empty
            </h1>
            <p className="mt-3 max-w-md text-sm leading-6 text-gray-500 sm:text-base">
              Looks like you haven’t added anything yet. Explore the store and
              find something you’ll love.
            </p>
            <Link
              href="/shop"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-600/20 transition hover:-translate-y-0.5 hover:bg-emerald-700"
            >
              <span>Start shopping</span>
              <IconArrowLeft className="h-4 w-4 rotate-180" />
            </Link>
            <Link
              href="/"
              className="mt-4 text-sm font-semibold text-gray-500 transition-colors hover:text-emerald-600"
            >
              Back to home
            </Link>
          </section>
        </div>
      </main>
    );
  }
  if (cartResponse.status === "success") {
    return (
      <div className="min-h-screen bg-gray-50/50 py-8 px-4 sm:px-6 lg:px-8 font-sans">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Breadcrumb */}
          <nav className="text-xs text-gray-500 flex items-center gap-2">
            <Link href="/" className="hover:text-emerald-600 transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-gray-800 font-medium">Shopping Cart</span>
          </nav>

          {/* Page Title & Item Count */}
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-600 p-2.5 rounded-xl text-white shadow-sm">
                <IconShoppingCart className="w-7 h-7" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                Shopping Cart
              </h1>
            </div>
            <p className="text-sm text-gray-500 pt-1">
              You have{" "}
              <span className="text-emerald-600 font-bold">
                {cartResponse.numOfCartItems}{" "}
                {cartResponse.numOfCartItems === 1 ? "item" : "items"}
              </span>{" "}
              your cart
            </p>
          </div>

          {/* Main Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-2">
            {/* Left Column: Cart Items List */}
            <div className="lg:col-span-8 space-y-4">
              {/* قائمة العناصر */}
              <div className="space-y-4">
                {cartResponse.data.products.map((product) => (
                  <CartItem key={product._id} productInfo={product} />
                ))}
              </div>

              {/* Bottom Actions Bar */}
              <div className="flex items-center justify-between pt-4">
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
                >
                  <IconArrowLeft className="w-4 h-4" />
                  <span>Continue Shopping</span>
                </Link>

                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-red-500 transition-colors"
                  onClick={handleClearCart}
                >
                  <IconTrash className="w-4 h-4" />
                  <span>Clear all Items</span>
                </button>
              </div>
            </div>

            {/* Right Column: Order Summary */}
            <div className="lg:col-span-4">
              <OrderSummary cartInfo={cartResponse} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
