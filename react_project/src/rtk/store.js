// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/orderSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer, // Include the cart reducer
  },
});

export default store;
