import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: JSON.parse(localStorage.getItem('cart') || '{}'),
  },
  reducers: {
    updateItemCount: (state, action) => {
      const { id, count } = action.payload;
      state.items[id] = count;
    },
  },
});

export const { updateItemCount } = cartSlice.actions;
export default cartSlice.reducer;
