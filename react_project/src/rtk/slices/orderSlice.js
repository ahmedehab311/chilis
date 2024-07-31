import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    addItemToCart: (state, action) => {
      state.items.push(action.payload);
    },
  },
});
export const { addItemToCart } = cartSlice.actions;
export default cartSlice.reducer;
