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
        state.items.splice(index, 1); // حذف العنصر المحدد فقط
        state.totalItems = state.items.length;
        localStorage.setItem("cart", JSON.stringify(state.items)); // تحديث localStorage
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
    

    updateItemQuantity: (state, action) => {
      const { index, quantity } = action.payload;
      if (index >= 0 && index < state.items.length) {
        state.items[index].quantity = quantity;
        state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
        localStorage.setItem("cart", JSON.stringify(state.items));
      }
    },
    
  },
});

export const { addItemToCart, removeItemFromCart, updateCartItems, clearCart,updateItemQuantity } = cartSlice.actions;
export default cartSlice.reducer;


// import { createSlice } from "@reduxjs/toolkit";

// const cartSlice = createSlice({
//   name: "cart",
//   initialState: {
//     items: JSON.parse(localStorage.getItem("cart")) || [], 
//     totalItems: 0,
//   },
//   reducers: {
//     addItemToCart: (state, action) => {
//       state.items.push(action.payload);
//       state.totalItems = state.items.length;
//       localStorage.setItem("cart", JSON.stringify(state.items));
//     },
//     addItem: (state, action) => {
//       const existingItem = state.items.find(item => item.id === action.payload.id);
//       if (existingItem) {
//         existingItem.quantity += action.payload.quantity;
//       } else {
//         state.items.push(action.payload);
//       }
//       state.totalItems += action.payload.quantity;
//     },
//     removeItemFromCart: (state, action) => {
//       const index = action.payload;
//       if (index >= 0 && index < state.items.length) {
//         state.items.splice(index, 1);
//         state.totalItems = state.items.length;
//         localStorage.setItem("cart", JSON.stringify(state.items));
//       }
//     },
//     removeItem: (state, action) => {
//       const itemIndex = state.items.findIndex(item => item.id === action.payload.itemId);
//       if (itemIndex > -1) {
//         state.totalItems -= state.items[itemIndex].quantity;
//         state.items.splice(itemIndex, 1);
//       }
//     },
//     updateCartItems: (state, action) => {
//             state.totalItems = action.payload;
//           },
//     updateItemQuantity: (state, action) => {
//       const item = state.items.find(item => item.id === action.payload.itemId);
//       if (item) {
//         state.totalItems -= item.quantity;
//         item.quantity = action.payload.quantity;
//         state.totalItems += action.payload.quantity;
//       }
//     },
//     updateItem: (state, action) => {
//       const item = state.items.find(item => item.id === action.payload.itemId);
//       if (item) {
//         state.totalItems -= item.quantity;
//         item.quantity = action.payload.quantity;
//         state.totalItems += action.payload.quantity;
//       }
//     },
//     clearCart: (state) => {
//       state.items = [];
//       state.totalItems = 0;
//       localStorage.removeItem("cart");
//     },
//   },
// });

// export const { addItemToCart, removeItemFromCart, updateCartItems, clearCart,removeItem ,updateItem,addItem} = cartSlice.actions;
// export default cartSlice.reducer;
