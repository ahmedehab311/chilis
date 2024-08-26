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

  import { createSlice } from "@reduxjs/toolkit";

  const cartSlice = createSlice({
    name: "cart",
    initialState: {
      items: [], // يجب أن يحتوي كل عنصر على id و quantity
      totalItems: 0,
    },
    reducers: {
      addItemToCart: (state, action) => {
        const item = action.payload;
        const existingItem = state.items.find((i) => i.id === item.id);

        if (existingItem) {
          existingItem.quantity += item.quantity;
          existingItem.totalPrice = existingItem.price * existingItem.quantity;
        } else {
          state.items.push(item);
        }

        state.totalItems = state.items.reduce(
          (total, i) => total + i.quantity,
          0
        );
      },
      removeItemFromCart: (state, action) => {
        const itemId = action.payload;
        state.items = state.items.filter((item) => item.id !== itemId);
        state.totalItems = state.items.reduce(
          (total, i) => total + i.quantity,
          0
        );
      },
      updateItemQuantity: (state, action) => {
        const { itemId, quantity } = action.payload;
        const item = state.items.find((item) => item.id === itemId);

        if (item) {
          item.quantity = quantity;
          item.totalPrice = item.price * quantity;
          state.totalItems = state.items.reduce(
            (total, i) => total + i.quantity,
            0
          );
        }
      },
      setTotalItems: (state, action) => {
        state.totalItems = action.payload;
      },
    },
  });

  export const {
    addItemToCart,
    removeItemFromCart,
    updateItemQuantity,
    setTotalItems,
  } = cartSlice.actions;

  export default cartSlice.reducer;
