import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: JSON.parse(localStorage.getItem("cart")) || [],
  totalItems: (JSON.parse(localStorage.getItem("cart")) || []).reduce(
    (total, item) => total + item.quantity,
    0
  ),
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItemIndex = state.items.findIndex(
        (item) =>
          item.id === newItem.id &&
          JSON.stringify(item.option) === JSON.stringify(newItem.option) &&
          JSON.stringify(item.extras) === JSON.stringify(newItem.extras)
      );

      if (existingItemIndex !== -1) {
        // إذا كان العنصر موجودًا، قم بزيادة الكمية فقط
        state.items[existingItemIndex].quantity += newItem.quantity;
      } else {
        // إذا لم يكن موجودًا، أضف العنصر كعنصر جديد
        state.items.push(newItem);
      }

      state.totalItems = state.items.reduce(
        (total, item) => total + item.quantity,
        0
      );
      localStorage.setItem("cart", JSON.stringify(state.items));
    },

    updateCartItems(state, action) {
      if (Array.isArray(action.payload)) {
        state.items = action.payload;
        state.totalItems = action.payload.reduce(
          (total, item) => total + item.quantity,
          0
        );
      }
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    removeItemFromCart(state, action) {
      state.items.splice(action.payload, 1);
      state.totalItems = state.items.reduce(
        (total, item) => total + item.quantity,
        0
      );
      localStorage.setItem("cart", JSON.stringify(state.items));
    },

    updateItemQuantity: (state, action) => {
      const { itemId, quantity } = action.payload;
      const item = state.items.find((item) => item.id === itemId);
      if (item) {
        item.quantity = quantity;
        state.totalItems = state.items.reduce(
          (total, item) => total + item.quantity,
          0
        );
        console.log("Item updated:", itemId, "Quantity:", quantity);
        localStorage.setItem("cart", JSON.stringify(state.items));
      }
    },

    clearCart(state) {
      state.items = [];
      state.totalItems = 0;

      // إزالة الكارت من localStorage
      localStorage.removeItem("cart");

      // تحقق أن الـ Redux تم تحديثه
      console.log("Redux cleared:", state.items);
      console.log("localStorage cleared:", localStorage.getItem("cart"));
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
