"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  IconArrowLeft,
  IconHeartFilled,
} from "@tabler/icons-react";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/Store";
import { addProductToCart } from "@/features/cart/server/cart.actions";
import { cartActions } from "@/features/cart/slices/cart.slice";
import { wishlistActions } from "../slices/wishlist.slice";
import WishlistItem from "../components/WishlistItem";
import {
  getWishlist,
  removeProductFromWishlist,
} from "../server/wishlist.actions";

export default function WishlistScreen() {
  const wishlist = useSelector((state: RootState) => state.wishlistReducer);
  const isAuthenticated = useSelector(
    (state: RootState) => state.AuthReducer.isAuthenticated,
  );
  const dispatch = useDispatch();
  const [busyProductId, setBusyProductId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(isAuthenticated && wishlist.status !== "success");
  const products = wishlist.data;

  useEffect(() => {
    if (!isAuthenticated || wishlist.status === "success") return;

    let isActive = true;
    getWishlist()
      .then((response) => {
        if (!isActive) return;
        if (response.status === "success") {
          dispatch(wishlistActions.setWishlistInfo(response));
        } else {
          toast.error(response.message);
        }
      })
      .catch(() => {
        if (isActive) toast.error("Could not load your wishlist.");
      })
      .finally(() => {
        if (isActive) setIsLoading(false);
      });

    return () => {
      isActive = false;
    };
  }, [dispatch, isAuthenticated, wishlist.status]);

  async function removeProduct(productId: string) {
    setBusyProductId(productId);
    try {
      const response = await removeProductFromWishlist(productId);
      if (response.status !== "success") {
        toast.error(response.message);
        return;
      }
      dispatch(wishlistActions.setWishlistInfo(response));
      toast.success(response.message || "Removed from your wishlist");
    } catch {
      toast.error("Could not update your wishlist. Please try again.");
    } finally {
      setBusyProductId(null);
    }
  }

  async function addToCart(productId: string) {
    setBusyProductId(productId);
    try {
      const response = await addProductToCart(productId);
      if (response.status !== "success") {
        toast.error(response.message);
        return;
      }
      dispatch(cartActions.setcartInfo(response));
      toast.success(response.message);
    } catch {
      toast.error("Could not add this product to your cart.");
    } finally {
      setBusyProductId(null);
    }
  }

  return (
    <main className="min-h-[65vh] bg-slate-50/60 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <nav aria-label="Breadcrumb" className="mb-4 flex gap-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-primary-600">Home</Link>
          <span>/</span>
          <span className="text-slate-800">Wishlist</span>
        </nav>

        <div className="mb-6 flex items-center gap-3">
          <div className="grid size-11 place-items-center rounded-xl bg-rose-50 text-rose-500">
            <IconHeartFilled size={22} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">My Wishlist</h1>
            <p className="text-xs text-slate-500">
              {wishlist.count} {wishlist.count === 1 ? "item" : "items"} saved
            </p>
          </div>
        </div>

        {isLoading ? (
          <section className="rounded-xl border border-slate-200 bg-white px-6 py-14 text-center text-sm text-slate-500">
            Loading your wishlist...
          </section>
        ) : !isAuthenticated ? (
          <section className="rounded-xl border border-slate-200 bg-white px-6 py-12 text-center">
            <h2 className="font-semibold text-slate-900">Sign in to view your wishlist</h2>
            <p className="mt-2 text-sm text-slate-500">{wishlist.message}</p>
            <Link href="/login" className="mt-5 inline-flex rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-700">
              Sign in
            </Link>
          </section>
        ) : wishlist.status === "fail" || wishlist.status === "error" ? (
          <section className="rounded-xl border border-slate-200 bg-white px-6 py-12 text-center">
            <h2 className="font-semibold text-slate-900">We couldn’t load your wishlist</h2>
            <p className="mt-2 text-sm text-slate-500">{wishlist.message}</p>
          </section>
        ) : products.length === 0 ? (
          <section className="rounded-xl border border-slate-200 bg-white px-6 py-14 text-center">
            <div className="mx-auto mb-3 grid size-12 place-items-center rounded-full bg-rose-50 text-rose-400">
              <IconHeartFilled size={22} />
            </div>
            <h2 className="font-semibold text-slate-900">Your wishlist is empty</h2>
            <p className="mt-1 text-sm text-slate-500">Save products you love and find them here later.</p>
            <Link href="/shop" className="mt-5 inline-flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-700">
              <IconArrowLeft size={16} /> Continue Shopping
            </Link>
          </section>
        ) : (
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
            <div className="hidden grid-cols-[minmax(0,1fr)_130px_130px_220px] items-center bg-slate-50 px-4 py-3 text-xs font-medium text-slate-500 sm:grid sm:px-5">
              <span>Product</span><span>Price</span><span>Status</span><span className="text-center">Actions</span>
            </div>
            <ul className="divide-y divide-slate-100">
              {products.map((product) => (
                <WishlistItem
                  key={product._id}
                  product={product}
                  isBusy={busyProductId === product._id}
                  onAddToCart={() => addToCart(product._id)}
                  onRemove={() => removeProduct(product._id)}
                />
              ))}
            </ul>
          </div>
        )}

        {products.length > 0 && (
          <Link href="/shop" className="mt-5 inline-flex items-center gap-1 text-xs text-slate-600 hover:text-primary-700">
            <IconArrowLeft size={14} /> Continue Shopping
          </Link>
        )}
      </div>
    </main>
  );
}
