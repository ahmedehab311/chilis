// import { createSlice } from "@reduxjs/toolkit";

// const cartSlice = createSlice({
//   name: "cart",
//   initialState: {
//     items: [], // Initialize items as an empty array
//   },
//   reducers: {
//     addItemToCart: (state, action) => {
//       state.items.push(action.payload);
//     },
//     deleteFromCart:(state,action) => {},
//     clear: (state,action) => {},
//   },
// });
// export const { addItemToCart,deleteFromCart,clear } = cartSlice.actions;
// export default cartSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [], // Initialize items as an empty array
    totalItems: 0, // Initialize totalItems as 0
  },
  reducers: {
    addItemToCart: (state, action) => {
      const item = action.payload;
      state.items.push(item);
      state.totalItems += item.quantity; // Update totalItems based on quantity
    },
    deleteFromCart: (state, action) => {
      const itemId = action.payload;
      const itemIndex = state.items.findIndex(item => item.id === itemId);
      if (itemIndex !== -1) {
        state.totalItems -= state.items[itemIndex].quantity; // Update totalItems
        state.items.splice(itemIndex, 1); // Remove item from cart
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0; // Reset totalItems when cart is cleared
    },
    updateItemQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const itemIndex = state.items.findIndex(item => item.id === id);
      if (itemIndex !== -1) {
        state.totalItems += quantity - state.items[itemIndex].quantity; // Update totalItems
        state.items[itemIndex].quantity = quantity; // Update item quantity
      }
    },
  },
});

export const { addItemToCart, deleteFromCart, clearCart, updateItemQuantity } = cartSlice.actions;
export default cartSlice.reducer;
