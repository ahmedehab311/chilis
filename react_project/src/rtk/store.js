import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/orderSlice";
import userReducer from "./slices/userSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
  },
});

export default store;
