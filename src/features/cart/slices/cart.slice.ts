import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartProductItem } from "../types/cart.types";

export type CartValueType = {
  status: string;
  message: string;
  numOfCartItems: number;
  cartId: null | string;
  data: {
    products: CartProductItem[];
    totalCartPrice: number;
  };
};

export const cartInitialValue: CartValueType = {
  status: "",
  message: "",
  numOfCartItems: 3,
  cartId: null,
  data: {
    products: [],
    totalCartPrice: 0,
  },
};

const cartSlice = createSlice({
  name: "cart",
  initialState: cartInitialValue,
  reducers: {
    setcartInfo: (state, action: PayloadAction<CartValueType>) => {
      state.status = action.payload.status;
      state.message = action.payload.message;
      state.numOfCartItems = action.payload.numOfCartItems;
      state.cartId = action.payload.cartId;
      state.data = action.payload.data;
    },
  },
});
export const cartReducer = cartSlice.reducer;
export const cartActions = cartSlice.actions;
