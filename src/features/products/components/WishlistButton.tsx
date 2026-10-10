"use client";

import { IconHeart, IconHeartFilled } from "@tabler/icons-react";
import { useState } from "react";
import { Product } from "../types/Products.types";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/Store";
import { wishlistActions } from "@/features/wishlist/slices/wishlist.slice";
import {
  addProductToWishlist,
  removeProductFromWishlist,
} from "@/features/wishlist/server/wishlist.actions";

export default function WishlistButton({ product }: { product: Product }) {
  const dispatch = useDispatch();
  const [isUpdating, setIsUpdating] = useState(false);
  const wishlist = useSelector((state: RootState) => state.wishlistReducer);
  const saved = wishlist.data.some((item) => item._id === product._id);

  async function toggle() {
    if (isUpdating) return;
    setIsUpdating(true);
    try {
      const response = saved
        ? await removeProductFromWishlist(product._id)
        : await addProductToWishlist(product._id);
      if (response.status !== "success") {
        toast.error(response.message);
        return;
      }
      dispatch(wishlistActions.setWishlistInfo(response));
      toast.success(response.message || (saved ? "Removed from wishlist" : "Added to your wishlist"));
    } catch {
      toast.error("Could not update your wishlist. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={isUpdating}
      aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
      aria-pressed={saved}
      className={`shadow-md size-8 flex justify-around items-center rounded-full transition-colors duration-300 hover:bg-primary-500 hover:text-white disabled:opacity-50 ${saved ? "text-rose-500" : ""}`}
    >
      {saved ? <IconHeartFilled size={18} /> : <IconHeart size={18} />}
    </button>
  );
}
