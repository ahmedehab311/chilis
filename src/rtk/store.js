import { configureStore } from "@reduxjs/toolkit";
import orderReducer from "./slices/orderSlice";
import userReducer from "./slices/userSlice";
import addressReducer from "./slices/adderssSlice";
import infoReducer from "./slices/InfoSlice";
import branchesReducer from "./slices/BranchesSlice";
import myOrderReducer from "./slices/myOrderSlice";
import orderDetailsReducer from "./slices/MyOrderDetailsSlice";
import cartReducer from "./slices/cartSlice";
// import orderReducer from "./orderSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    addresses: addressReducer,
    info: infoReducer,
    branches: branchesReducer,
    orders: myOrderReducer,
    orderDetails: orderDetailsReducer,
    cart: cartReducer,
    order: orderReducer,
  },
});

export default store;
