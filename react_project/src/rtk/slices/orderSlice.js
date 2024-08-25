  import { createSlice } from "@reduxjs/toolkit";

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
//       localStorage.setItem('totalItems', state.totalItems); 
//     },
//     removeItemFromCart: (state, action) => {
//       const index = action.payload;
//       const itemToRemove = state.items[index];
    
//       if (itemToRemove) {
//         state.totalItems -= itemToRemove.quantity;
//         state.items.splice(index, 1);
//         localStorage.setItem('totalItems', state.totalItems); // تحديث localStorage
//       }
//     },
    
//     setTotalItems: (state, action) => {
//       state.totalItems = action.payload;
//     },
//   },
// });


// export const { addItemToCart, removeItemFromCart, setTotalItems } = cartSlice.actions;
// export default cartSlice.reducer;

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalItems: 0,
  },
  reducers: {
    addItemToCart: (state, action) => {
      const item = action.payload;
      const existingItemIndex = state.items.findIndex(
        (i) => i.name === item.name && JSON.stringify(i.extras) === JSON.stringify(item.extras)
      );

      if (existingItemIndex > -1) {
        // إذا كان العنصر موجود، قم بتحديث الكمية والـ totalPrice
        state.items[existingItemIndex].quantity += item.quantity;
        state.items[existingItemIndex].totalPrice =
          state.items[existingItemIndex].price * state.items[existingItemIndex].quantity +
          state.items[existingItemIndex].extras.reduce((sum, extra) => sum + extra.price, 0);
      } else {
        // إذا كان العنصر غير موجود، أضف العنصر الجديد
        state.items.push(item);
      }

      // تحديث إجمالي العناصر
      state.totalItems = state.items.reduce((total, i) => total + i.quantity, 0);

      // تخزين totalItems في localStorage
      localStorage.setItem('totalItems', state.totalItems);
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