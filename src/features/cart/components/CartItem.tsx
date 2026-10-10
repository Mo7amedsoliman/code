"use client";
import {
  IconMinus,
  IconPlus,
  IconTrash,
  IconCircleCheckFilled,
} from "@tabler/icons-react";
import { useState } from "react";
import { CartProductItem } from "../types/cart.types";
import {
  removeProductFromCart,
  updateProductInCart,
} from "../server/cart.actions";
import { toast } from "sonner";
import { cartActions } from "../slices/cart.slice";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import Image from "next/image";

const { setcartInfo } = cartActions;

export default function CartItem({
  productInfo,
}: {
  productInfo: CartProductItem;
}) {
  const dispatch = useDispatch();
  const [isUpdating, setIsUpdating] = useState(false);
  const { product, price, count } = productInfo;
  const id = product?._id || product?.id || "";
  const category = product?.category;
  const imageCover = product?.imageCover;
  const quantity = product?.quantity ?? 0;
  const title = product?.title;

  async function handleQuantityChange(nextCount: number) {
    if (!id || isUpdating || nextCount < 1 || nextCount > quantity) return;

    setIsUpdating(true);
    try {
      const response = await updateProductInCart(id, nextCount);
      if (response.status !== "success") {
        toast.error(response.message);
        return;
      }

      dispatch(setcartInfo(response));
      toast.success(response.message);
    } catch {
      toast.error("Failed to update product quantity. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  }

  async function handleRemoveFromCart() {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await removeProductFromCart(id);
        if (response.status === "error" || response.status === "fail") {
          toast.error(response.message);
          return;
        }
        if (response.status === "success") {
          dispatch(setcartInfo(response));
          toast.success(response.message);
        }

        Swal.fire({
          title: "Deleted!",
          text: "Your product has been removed from the cart!",
          icon: "success",
        });
      }
    });
  }

  return (
    <div className="relative bg-white rounded-2xl shadow-sm hover:shadow-md border border-gray-100 transition-all duration-300 max-w-4xl mx-auto my-4">
      <div className="p-4 sm:p-5">
        <div className="flex gap-4 sm:gap-6">
          {/* Product Image & Stock Badge */}
          <div className="relative shrink-0 group">
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-xl bg-linear-to-br from-gray-50 via-white to-gray-100 p-3 border border-gray-100 flex items-center justify-center overflow-hidden">
              <Image
                src={imageCover}
                alt="Product image"
                width={128}
                height={128}
                unoptimized
                className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
              />
            </div>

            {/* Stock Badge */}
            {quantity > 0 ? (
              <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                <IconCircleCheckFilled className="size-3" />
                <span>In Stock</span>
              </div>
            ) : (
              <div className="absolute -bottom-1 -right-1 bg-red-500 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                <IconCircleCheckFilled className="size-3" />
                <span>Out Of Stock</span>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex-1 min-w-0 flex flex-col justify-between">
            {/* Top Section: Title & Category / SKU */}
            <div className="mb-3">
              <a href="#" className="group/title block">
                <h3 className="font-semibold text-gray-900 group-hover/title:text-emerald-600 transition-colors leading-relaxed line-clamp-2 text-sm sm:text-base">
                  {title}
                </h3>
              </a>

              <div className="flex items-center gap-2 mt-2">
                <span className="inline-block px-2.5 py-1 bg-linear-to-r from-emerald-50 to-teal-50 text-emerald-700 font-medium text-xs rounded-md">
                  {category?.name}
                </span>
                <span className="text-xs text-gray-400">•</span>
                <span className="text-xs text-gray-500 font-mono">
                  SKU: {id.slice(-6)}
                </span>
              </div>
            </div>

            {/* Price Section */}
            <div className="mb-4">
              <div className="flex items-baseline gap-2">
                <span className="text-emerald-600 font-bold text-lg">
                  {price} EGP
                </span>
                <span className="text-xs text-gray-400">per unit</span>
              </div>
            </div>

            {/* Bottom Section: Quantity Controls & Actions */}
            <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-2">
              {/* Quantity Selector */}
              <div className="flex items-center">
                <div className="flex items-center bg-gray-50 rounded-xl p-1 border border-gray-200">
                  <button
                    type="button"
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-600 hover:bg-white hover:shadow-sm transition-all disabled:opacity-50"
                    onClick={() => handleQuantityChange(count - 1)}
                    disabled={isUpdating || count <= 1}
                    aria-label="Decrease quantity"
                  >
                    <IconMinus className="w-3.5 h-3.5" />
                  </button>

                  <span className="w-10 text-center font-bold text-gray-900 text-sm">
                    {count}
                  </span>

                  <button
                    type="button"
                    className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center hover:bg-emerald-700 transition-colors shadow-sm disabled:opacity-50"
                    onClick={() => handleQuantityChange(count + 1)}
                    disabled={isUpdating || count >= quantity}
                    aria-label="Increase quantity"
                  >
                    <IconPlus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Total & Delete Button */}
              <div className="flex items-center gap-4 ml-auto">
                <div className="text-right">
                  <span className="block text-[10px] text-gray-400 uppercase tracking-wider font-semibold">
                    Total
                  </span>
                  <span className="text-base font-bold text-gray-900">
                    {price * count}{" "}
                    <span className="text-xs font-normal text-gray-500">
                      EGP
                    </span>
                  </span>
                </div>

                <button
                  type="button"
                  className="p-2.5 rounded-xl bg-red-50 text-red-500 hover:bg-red-100 transition-colors"
                  title="Remove item"
                  onClick={handleRemoveFromCart}
                >
                  <IconTrash className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
