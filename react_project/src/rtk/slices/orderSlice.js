import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
    status: null,
    totalItems: 0,
  },
  reducers: {
    addItemToCart: (state, action) => {
      // localStorage.removeItem('itemss', JSON.stringify(state.items));
      state.totalItems = state.items.length; // تحديث العدد
      const item = action.payload;
      const existingItem = state.items.find((i) => i.id === item.id);
      const itemIndex = state.items.findIndex((item) => item.id === item.id);

      if (existingItem) {
        state.items[itemIndex].cartQuantity += 1;
        state.items[itemIndex].selectedExtras = item.selectedExtras;
        state.items[itemIndex].selectedOption = item.selectedOption;
        state.items[itemIndex].idInfo = item.idInfo;  
      } else {
        const tempProduct = {
          ...item,
          cartQuantity: 1,
          idInfo: item.idInfo, 
        };
        state.items.push(tempProduct);
      }

      state.cartTotalQuantity = state.items.reduce(
        (total, i) => total + i.cartQuantity,
        0
      );

      // localStorage.setItem('itemss', JSON.stringify(state.items));
    },
    removeItemFromCart: (state, action) => {
      const itemId = action.payload;
      state.items = state.items.filter((item) => item.id !== itemId);
      state.cartTotalQuantity = state.items.reduce(
        (total, i) => total + i.cartQuantity,
        0
      );
      state.totalItems = state.items.length;  
      // localStorage.setItem('itemss', JSON.stringify(state.items));
    },
    updateItemQuantity: (state, action) => {
      const { itemId, quantity } = action.payload;
      const item = state.items.find((item) => item.id === itemId);

      if (item) {
        item.cartQuantity = quantity;
        item.totalPrice = item.price * quantity;
        state.cartTotalQuantity = state.items.reduce(
          (total, i) => total + i.cartQuantity,
          0
        );
      }
    },
    setTotalItems: (state, action) => {
      state.cartTotalQuantity = action.payload;
    },
    clearCart: (state) => {
      state.cartItems = []; // مسح جميع العناصر من السلة
      state.totalItems = 0;
  },
  },
});

export const {
  addItemToCart,
  removeItemFromCart,
  updateItemQuantity,
  setTotalItems,
  clearCart
} = cartSlice.actions;

export default cartSlice.reducer;
