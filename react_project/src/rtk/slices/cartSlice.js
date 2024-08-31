// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   items: [],
//   totalItems: 0,
// };

// const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     addItemToCart(state, action) {
//       state.items.push(action.payload);
//       localStorage.setItem("cart", JSON.stringify(state.items));
//       state.totalItems = state.items.length; // تحديث عدد العناصر
//     },
//     removeItemFromCart(state, action) {
//       state.items.splice(action.payload, 1);
//       state.totalItems = state.items.length; // تحديث عدد العناصر
//     },
//     updateCartItems: (state, action) => {
//       state.totalItems = action.payload;
//     },
//     clearCart(state) {
//       localStorage.removeItem("cart");
//       state.items = [];
//       state.totalItems = 0; // إعادة تعيين عدد العناصر
//     },
//   },
// });

// export const { addItemToCart, removeItemFromCart, clearCart, updateCartItems } =
//   cartSlice.actions;
// export default cartSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: JSON.parse(localStorage.getItem("cart")) || [], // قراءة السلة من localStorage عند التحميل
    totalItems: 0,
  },
  reducers: {
    addItemToCart: (state, action) => {
      state.items.push(action.payload);
      state.totalItems = state.items.length;
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    removeItemFromCart: (state, action) => {
      const index = action.payload;
      if (index >= 0 && index < state.items.length) {
        state.items.splice(index, 1);
        state.totalItems = state.items.length;
        localStorage.setItem("cart", JSON.stringify(state.items));
      }
    },
    updateCartItems: (state, action) => {
      state.totalItems = action.payload;
    },
    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      localStorage.removeItem("cart");
    },
  },
});

export const { addItemToCart, removeItemFromCart, updateCartItems, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
