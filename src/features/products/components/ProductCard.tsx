"use client";
import {
  IconEye,
  IconGitCompare,
  IconPlus,
  IconStarFilled,
  IconStarHalfFilled,
} from "@tabler/icons-react";
import { Product } from "../types/Products.types";
import Link from "next/link";
import WishlistButton from "./WishlistButton";
import { addProductToCart } from "@/features/cart/server/cart.actions";
import { toast } from "sonner";
import { cartActions } from "@/features/cart/slices/cart.slice";
import { useDispatch } from "react-redux";
import Image from "next/image";

export default function ProductCard({ productInfo }: { productInfo: Product }) {
  const {
    _id,
    category,
    imageCover,
    price,
    priceAfterDiscount,
    ratingsAverage,
    ratingsQuantity,
    title,
  } = productInfo;
  const { setcartInfo } = cartActions;
  const dispatch = useDispatch();

  async function handleAddToCart() {
    const response = await addProductToCart(_id);
    if (response.status === "error" || response.status === "fail") {
      toast.error(response.message);
      return;
    }
    if (response.status === "success") {
      dispatch(setcartInfo(response));
      toast.success(response.message);
    }
  }

  return (
    <>
      <div className="card shadow rounded-lg ">
        <div className="inner">
          <div className="image-box bg-white h-64 relative  ">
            <Image
              src={imageCover}
              alt=""
              width={320}
              height={320}
              unoptimized
              className="mx-auto h-full  object-cover"
            />
            <div className="action-btuns space-y-4 absolute right-4 top-4 ">
              <WishlistButton product={productInfo} />
              <button className="shadow-md size-8 flex justify-around items-center rounded-full hover:bg-primary-500 hover:text-white transition-colors duration-300 ">
                <IconGitCompare stroke={2} />
              </button>
              <button className="shadow-md size-8 flex justify-around items-center rounded-full hover:bg-primary-500 hover:text-white transition-colors duration-300 ">
                <Link href={`/products/${_id}`}>
                  <IconEye stroke={2} />
                </Link>
              </button>
            </div>
          </div>

          <div className="card-body p-4 ">
            <h4 className="text-sm bg-primary-50 mb-2 px-2 py-1 rounded-md w-fit ">
              {category.name}
            </h4>
            <h3 className="text-lg font-semibold line-clamp-2">{title}</h3>
            <div className="rating flex gap-2 items-center">
              <div className="stars flex items-center text-yellow-400">
                <IconStarFilled size={19} />
                <IconStarFilled size={19} />
                <IconStarFilled size={19} />
                <IconStarFilled size={19} />
                <IconStarHalfFilled size={19} />
              </div>
              <span>
                {ratingsAverage} ({ratingsQuantity} reviews)
              </span>
            </div>
            <div className="price flex justify-between items-center mt-4">
              <span className="text-xl font-bold text-gray-900">
                {priceAfterDiscount || price} EGP
              </span>
              <button
                className="bg-primary-500 text-white flex justify-center items-center size-10 rounded-full"
                onClick={handleAddToCart}
              >
                <IconPlus stroke={2} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
