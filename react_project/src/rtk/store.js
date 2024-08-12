import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/orderSlice";
import userReducer from "./slices/userSlice";
import addressSlice from "./slices/adderssSlice"
const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    addresses: addressSlice, // تأكد من التسمية
  },
});

export default store;
