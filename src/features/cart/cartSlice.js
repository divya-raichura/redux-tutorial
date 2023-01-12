import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import cartItems from "../../cartItems";
import axios from "axios";

const url = "https://course-api.com/react-useReducer-cart-project";

const initialState = {
  cartItems: [],
  amount: 0,
  total: 0,
  isLoading: true,
};

// name 'cart/getCartItems' need to match with function name
export const getCartItems = createAsyncThunk(
  "cart/getCartItems",
  async (someVar, thunkAPI) => {
    // while calling 'getCartItems()' we can pass some args inside it
    // which we can access in this function
    // also, we have special arg which is commonly named 'thunkAPI'
    // this is an object which bunch of features and we can access state
    // of any component using this
    // we can even use thunkAPI.dispatch()
    try {
      // console.log(someVar);
      // console.log(thunkAPI);
      // console.log(thunkAPI.getState());
      // thunkAPI.dispatch(openModal());
      const resp = await axios(url);
      // axios resp is an obj that has data property which holds our data
      return resp.data;
    } catch (error) {
      console.log(error);
      console.log(error.code);
      return thunkAPI.rejectWithValue({
        status: error.response.status,
        message: error.response.data,
      });
      // return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);
console.log("cart", getCartItems)

// name 'cart/getCartItems' need to match with function name
// export const getCartItems = createAsyncThunk("cart/getCartItems", () => {
//   return fetch(url)
//     .then((res) => res.json())
//     .catch((err) => console.log(err));
// });

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
  // for every function that we will create we'll get 3 life cycle actions
  // three life cycle actions -> pending, fulfilled, rejected
  extraReducers: {
    [getCartItems.pending]: (state) => {
      state.isLoading = true;
    },
    [getCartItems.fulfilled]: (state, action) => {
      // console.log(action);
      // action : {type: 'cart/getCartItems/fulfilled', payload: Array(4), meta: {…}}
      state.isLoading = false;
      state.cartItems = action.payload;
    },
    [getCartItems.rejected]: (state, action) => {
      // when axios get error, we go in error block in that thunk
      // there we returned 'thunkAPI.rejectWithValue()'. This is what we get
      // here in action
      console.log(action); // action.payload contains the object
      // that we returned in error block of async thunk above
      state.isLoading = false;
    },
  },
});

// the slice is an obj which contains
// actions, caseReducers, getInitialState, name, reducer function that has state and action
// console.log(cartSlice);

export const { clearCart, removeItem, toggle, calculateTotal } =
  cartSlice.actions;

// reducer is a function that controls the state
export default cartSlice.reducer;
