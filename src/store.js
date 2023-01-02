import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cart/cartSlice";
import modalReducer from "./features/modal/modalSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer, // the name cart can be any name, not necessary to name after some folder or anything
    modal: modalReducer,
  },
});
