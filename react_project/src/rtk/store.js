// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/orderSlice";
// import orderHistoryReducer from "./slices/orderHistorySlice";
import userReducer from "./slices/userSlice";
const store = configureStore({
  reducer: {
    user: userReducer,
    // orderHistory: orderHistoryReducer,
    cart: cartReducer, // Include the cart reducer
    
  },
});

export default store;
