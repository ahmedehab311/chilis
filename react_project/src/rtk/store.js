import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/orderSlice";
import userReducer from "./slices/userSlice";
import addressReducer from "./slices/adderssSlice"
import infoReducer from "./slices/InfoSlice";
const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    addresses: addressReducer,
    info: infoReducer,
  },
});

export default store;
