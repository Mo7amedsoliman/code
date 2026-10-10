"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { IconArrowLeft, IconReceipt } from "@tabler/icons-react";
import { toast } from "sonner";
import { RootState } from "@/store/Store";
import { cartActions } from "@/features/cart/slices/cart.slice";
import ShippingAddressForm from "../components/ShippingAddressForm";
import PaymentMethod, { PaymentMethodValue } from "../components/PaymentMethod";
import OrderSummary from "../components/OrderSummary";
import { createCashOrder, createOnlineCheckout } from "../services/checkout.actions";
import { ShippingAddress } from "../types/checkout.types";
import { useState } from "react";

export default function CheckoutScreen() {
  const cart = useSelector((state: RootState) => state.cartReducer);
  const user = useSelector((state: RootState) => state.AuthReducer.userInfo);
  const dispatch = useDispatch();
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodValue>("cash");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(address: ShippingAddress) {
    if (!cart.cartId) {
      toast.error("Your cart could not be found. Please return to your cart and try again.");
      return;
    }
    setIsSubmitting(true);
    try {
      if (paymentMethod === "cash") {
        const result = await createCashOrder(cart.cartId, address);
        if (!result.success) {
          toast.error(result.message);
          return;
        }
        dispatch(cartActions.setcartInfo({
          status: "success",
          message: "Order placed successfully",
          numOfCartItems: 0,
          cartId: null,
          data: { products: [], totalCartPrice: 0 },
        }));
        toast.success(result.message);
        router.push("/orders");
        return;
      }

      const returnUrl = `${window.location.origin}/orders`;
      const result = await createOnlineCheckout(cart.cartId, address, returnUrl);
      if (!result.success || !result.checkoutUrl) {
        toast.error(result.message);
        return;
      }
      window.location.assign(result.checkoutUrl);
    } catch {
      toast.error("Something went wrong while processing your order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function requestOrder() {
    const form = document.getElementById("checkout-form") as HTMLFormElement | null;
    if (!form) {
      toast.error("Please refresh the page and try again.");
      return;
    }
    form.requestSubmit();
  }

  const hasItems = cart.status === "success" && cart.data.products.length > 0;

  return (
    <main className="min-h-[70vh] bg-slate-50/70 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <nav className="mb-5 flex items-center gap-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-green-700">Home</Link><span>/</span>
          <Link href="/cart" className="hover:text-green-700">Cart</Link><span>/</span>
          <span className="font-medium text-slate-800">Checkout</span>
        </nav>

        <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="grid size-10 place-items-center rounded-lg bg-green-600 text-white shadow-sm"><IconReceipt size={22} /></span>
              <h1 className="text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">Complete Your Order</h1>
            </div>
            <p className="mt-1 text-xs text-slate-500">Review your items and complete your purchase</p>
          </div>
          <Link href="/cart" className="inline-flex items-center gap-2 text-xs font-medium text-green-700 transition hover:text-green-800"><IconArrowLeft size={15} />Back to Cart</Link>
        </div>

        {!hasItems ? (
          <section className="rounded-xl border border-slate-200 bg-white px-5 py-12 text-center shadow-sm">
            <h2 className="text-base font-bold text-slate-900">Your cart is empty</h2>
            <p className="mt-1 text-sm text-slate-500">Add an item to your cart before checking out.</p>
            <Link href="/shop" className="mt-4 inline-flex rounded-lg bg-green-600 px-4 py-2.5 text-xs font-semibold text-white hover:bg-green-700">Continue Shopping</Link>
          </section>
        ) : (
          <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)]">
            <div className="space-y-4">
              <ShippingAddressForm defaultPhone={user?.phone ?? ""} onSubmit={handleSubmit} />
              <PaymentMethod value={paymentMethod} onChange={setPaymentMethod} />
            </div>
            <div className="lg:sticky lg:top-5">
              <OrderSummary cart={cart} isSubmitting={isSubmitting} onPlaceOrder={requestOrder} />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
