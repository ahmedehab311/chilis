import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalItems: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart(state, action) {
      state.items.push(action.payload);
      localStorage.setItem("cart", JSON.stringify(state.items));
      state.totalItems = state.items.length;
    },
    removeItemFromCart(state, action) {
      state.items.splice(action.payload, 1);
      state.totalItems = state.items.length;
    },
    // updateCartItems: (state, action) => {
    //   state.totalItems = action.payload;
    // },
    updateCartItems: (state, action) => {
      if (Array.isArray(action.payload)) {
        state.items = action.payload;
        state.totalItems = action.payload.reduce(
          (total, item) => total + item.quantity,
          0
        );
      } else {
        // console.error("Payload is not an array:", action.payload);
      }
    },
    clearCart(state) {
      localStorage.removeItem("cart");
      state.items = [];
      state.totalItems = 0;
    },
    updateItemQuantity: (state, action) => {
      const { index, quantity } = action.payload;
      if (index >= 0 && index < state.items.length) {
        state.items[index].quantity = quantity;
        state.totalItems = state.items.reduce(
          (total, item) => total + item.quantity,
          0
        );
        localStorage.setItem("cart", JSON.stringify(state.items));
      }
    },
    
  },
});

export const {
  addItemToCart,
  removeItemFromCart,
  clearCart,
  updateCartItems,
  updateItemQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
