import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/orderSlice";
import userReducer from "./slices/userSlice";
import addressReducer from "./slices/adderssSlice"
const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    addresses: addressReducer,
  },
});

export default store;
