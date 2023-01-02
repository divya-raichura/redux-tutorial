import { createSlice } from "@reduxjs/toolkit";
import cartItems from "../../cartItems";

const initialState = {
  cartItems: cartItems,
  amount: 0,
  total: 0,
  isLoading: true,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = []; // note here we don't need to send a new state or don't care about
      // mutation, all the other state properties remain as it is, cause
      // of the work done under the hood by the immer library that comes with redux toolkit
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
    },
    toggle: (state, { payload }) => {
      const { actionType, id } = payload;
      const item = state.cartItems.find((item) => item.id === id);
      actionType === "increase" ? (item.amount += 1) : (item.amount -= 1);
    },
    calculateTotal: (state) => {
      let cartAmount = 0,
        total = 0;

      state.cartItems.forEach((item) => {
        cartAmount += item.amount;
        total += item.amount * item.price;
      });

      state.amount = cartAmount;
      state.total = total;
    },
  },
});

// the slice is an obj which contains
// actions, caseReducers, getInitialState, name, reducer function that has state and action
console.log(cartSlice);

export const { clearCart, removeItem, toggle, calculateTotal } =
  cartSlice.actions;

// reducer is a function that controls the state
export default cartSlice.reducer;
