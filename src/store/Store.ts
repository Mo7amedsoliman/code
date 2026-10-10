import { configureStore } from "@reduxjs/toolkit";
import { AuthReducer, AuthState } from "@/features/auth/slices/auth.slices";
import { cartReducer, CartValueType } from "@/features/cart/slices/cart.slice";
import {
  wishlistReducer,
  WishlistValueType,
} from "@/features/wishlist/slices/wishlist.slice";

export type preloadedState = {
  AuthReducer: AuthState;
  cartReducer: CartValueType;
  wishlistReducer: WishlistValueType;
};

export function createStore(preloadedState: preloadedState) {
  const store = configureStore({
    reducer: {
      AuthReducer,
      cartReducer,
      wishlistReducer,
    },
    preloadedState,
  });

  return store;
}
export type AppStore = ReturnType<typeof createStore>;

export type RootState = ReturnType<AppStore["getState"]>;
