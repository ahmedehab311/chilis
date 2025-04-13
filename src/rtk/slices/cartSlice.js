import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';
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
      const newItem = {
        ...action.payload,
        uniqueId: uuidv4(),  
      };
    
      state.items.push(newItem);
    
      // تحديث إجمالي العناصر بناءً على الكمية
      state.totalItems = state.items.reduce(
        (total, item) => total + item.quantity,
        0
      );
    
      // تحديث localStorage
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
      const { uniqueId, quantity } = action.payload;
    
      // البحث عن العنصر باستخدام uniqueId
      const item = state.items.find((item) => item.uniqueId === uniqueId);
    
      if (item) {
        // التأكد من أن الكمية الجديدة أكثر من الصفر
        if (quantity > 0) {
          item.quantity = quantity;
        } else {
          // إذا كانت الكمية صفر أو أقل، يمكن إزالة العنصر من السلة (حسب المنطق المتبع)
          state.items = state.items.filter((item) => item.uniqueId !== uniqueId);
        }
    
        // تحديث إجمالي العناصر
        state.totalItems = state.items.reduce(
          (total, item) => total + item.quantity,
          0
        );
    
        // تحديث localStorage
        localStorage.setItem("cart", JSON.stringify(state.items));
      }
    },
    
    

    clearCart(state) {
      state.items = [];
      state.totalItems = 0;
      localStorage.removeItem("cart");
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
