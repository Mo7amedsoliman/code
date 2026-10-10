import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/features/products/types/Products.types";
import { WishlistResponse } from "../types/wishlist.types";

export type WishlistValueType = {
  status: string;
  message: string;
  count: number;
  data: Product[];
};

export const wishlistInitialValue: WishlistValueType = {
  status: "",
  message: "",
  count: 0,
  data: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: wishlistInitialValue,
  reducers: {
    setWishlistInfo: (state, action: PayloadAction<WishlistResponse>) => {
      state.status = action.payload.status;
      state.message = action.payload.message ?? "";
      state.count = action.payload.count ?? action.payload.data.length;
      state.data = action.payload.data;
    },
  },
});

export const wishlistReducer = wishlistSlice.reducer;
export const wishlistActions = wishlistSlice.actions;
