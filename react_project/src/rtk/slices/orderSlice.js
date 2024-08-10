  // import { createSlice } from "@reduxjs/toolkit";

  // const cartSlice = createSlice({
  //   name: "cart",
  //   initialState: {
  //     items: [],
  //     totalItems: 0,
  //   },
  //   reducers: {
  //     addItemToCart: (state, action) => {
  //       const item = action.payload;
  //       state.items.push(item);
  //       state.totalItems += item.quantity;
  //       localStorage.setItem('totalItems', state.totalItems); // Store totalItems in localStorage
  //     },
  //     setTotalItems: (state, action) => {
  //       state.totalItems = action.payload;
  //     },
  //   },
  // });

  // export const { addItemToCart, setTotalItems } = cartSlice.actions;
  // export default cartSlice.reducer;

  import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalItems: 0,
  },
  reducers: {
    addItemToCart: (state, action) => {
      const item = action.payload;
      state.items.push(item);
      state.totalItems += item.quantity;
      localStorage.setItem('totalItems', state.totalItems); // Store totalItems in localStorage
    },
    removeItemFromCart: (state, action) => {
      const index = action.payload;
      const itemToRemove = state.items[index];
    
      if (itemToRemove) {
        state.totalItems -= itemToRemove.quantity;
        state.items.splice(index, 1);
        localStorage.setItem('totalItems', state.totalItems); // تحديث localStorage
      }
    },
    
    setTotalItems: (state, action) => {
      state.totalItems = action.payload;
    },
  },
});

export const { addItemToCart, removeItemFromCart, setTotalItems } = cartSlice.actions;
export default cartSlice.reducer;
