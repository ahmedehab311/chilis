import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalItems: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart(state, action) {
      state.items.push(action.payload);
      localStorage.setItem("cart", JSON.stringify(state.items));
      state.totalItems = state.items.length; // تحديث عدد العناصر
    },
    removeItemFromCart(state, action) {
      state.items.splice(action.payload, 1);
      state.totalItems = state.items.length; // تحديث عدد العناصر
    },
    clearCart(state) {
      localStorage.removeItem("cart");
      state.items = [];
      state.totalItems = 0; // إعادة تعيين عدد العناصر
    },
  },
});

export const { addItemToCart, removeItemFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
