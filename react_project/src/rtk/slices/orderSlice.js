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

// import { createSlice } from "@reduxjs/toolkit";

// const cartSlice = createSlice({
//   name: "cart",
//   initialState: {
//     items: [], // يجب أن يحتوي كل عنصر على id و quantity
//     // totalItems: 0,
//     cartTotalQuantity: 0,
//     cartTotalAmount: 0,
//     status: null,
//   },
//   reducers: {
//     addItemToCart: (state, action) => {
//       const item = action.payload;
//       const existingItem = state.items.find((i) => i.id === item.id);
//       const itemIndex = state.items.findIndex((item) => item.id === item.id);
//       // if (existingItem) {
//       //   existingItem.quantity += item.quantity;
//       //   existingItem.totalPrice = existingItem.price * existingItem.quantity;
//       // } else {
//       //   state.items.push(item);
//       // }
//       if (itemIndex >= 0) {
//         // state.items[itemIndex].cartTotalQuantity += 1
//         state.items[itemIndex].cartQuantity += 1
//       }else {
//         const tempProduct = {...action.payload,cartQuantity : 1}
//         state.items.push(tempProduct);
//       }

//       state.totalItems = state.items.reduce(
//         (total, i) => total + i.quantity,
//         0
//       );
//             localStorage.setItem('itemss', JSON.stringify(state.items));
//     },
//     removeItemFromCart: (state, action) => {
//       const itemId = action.payload;
//       state.items = state.items.filter((item) => item.id !== itemId);
//       state.totalItems = state.items.reduce(
//         (total, i) => total + i.quantity,
//         0
//       );
//         localStorage.setItem('itemss', JSON.stringify(state.items)); // تحديث localStorage

//     },
//     updateItemQuantity: (state, action) => {
//       const { itemId, quantity } = action.payload;
//       const item = state.items.find((item) => item.id === itemId);

//       if (item) {
//         item.quantity = quantity;
//         item.totalPrice = item.price * quantity;
//         state.totalItems = state.items.reduce(
//           (total, i) => total + i.quantity,
//           0
//         );
//       }
//     },
//     setTotalItems: (state, action) => {
//       state.totalItems = action.payload;
//     },
//   },
// });

// export const {
//   addItemToCart,
//   removeItemFromCart,
//   updateItemQuantity,
//   setTotalItems,
// } = cartSlice.actions;

// export default cartSlice.reducer;

// import { createSlice } from "@reduxjs/toolkit";
// const cartSlice = createSlice({
//   name: "cart",
//   initialState: {
//     items: [], // يحتوي كل عنصر على id و cartQuantity
//     cartTotalQuantity: 0,
//     cartTotalAmount: 0,

//     status: null,
//   },
//   reducers: {
//     addItemToCart: (state, action) => {
//       const item = action.payload;

//       // إنشاء نسخة جديدة من العنصر مع كمية ابتدائية تساوي 1
//       const newItem = { ...item, cartQuantity: 1 };
      
//       // إضافة العنصر الجديد إلى السلة
//       state.items.push(newItem);

//       // تحديث الكمية الإجمالية للعناصر في السلة
//       state.cartTotalQuantity = state.items.reduce(
//         (total, i) => total + i.cartQuantity,
//         0
//       );

//       // تحديث localStorage
//       localStorage.setItem("itemss", JSON.stringify(state.items));
//     },
//     removeItemFromCart: (state, action) => {
//       const itemId = action.payload;
//       state.items = state.items.filter((item) => item.id !== itemId);

//       // تحديث الكمية الإجمالية للعناصر في السلة
//       state.cartTotalQuantity = state.items.reduce(
//         (total, i) => total + i.cartQuantity,
//         0
//       );
      
//       // تحديث localStorage
//       localStorage.setItem("itemss", JSON.stringify(state.items));
//       // localStorage.removeItem("itemss", JSON.stringify(state.items));
//     },
//     updateItemQuantity: (state, action) => {
//       const { itemId, quantity } = action.payload;
//       const item = state.items.find((item) => item.id === itemId);

//       if (item) {
//         item.cartQuantity = quantity;

//         // تحديث الكمية الإجمالية للعناصر في السلة
//         state.cartTotalQuantity = state.items.reduce(
//           (total, i) => total + i.cartQuantity,
//           0
//         );

//         // تحديث localStorage
//         localStorage.setItem("itemss", JSON.stringify(state.items));
//       }
//     },
//     setTotalItems: (state, action) => {
//       state.cartTotalQuantity = action.payload;
//     },
//   },
// });

// export const {
//   addItemToCart,
//   removeItemFromCart,
//   updateItemQuantity,
//   setTotalItems,
// } = cartSlice.actions;

// export default cartSlice.reducer;


// import { createSlice } from "@reduxjs/toolkit";

// const cartSlice = createSlice({
//   name: "cart",
//   initialState: {
//     items: [],
//     cartTotalQuantity: 0,
//     cartTotalAmount: 0,
//     status: null,
//   },
//   reducers: {
//     addItemToCart: (state, action) => {
//       const item = action.payload;
//       const existingItem = state.items.find((i) => i.id === item.id);
//       const itemIndex = state.items.findIndex((item) => item.id === item.id);

//       if (existingItem) {
//         state.items[itemIndex].cartQuantity += 1;
//         state.items[itemIndex].selectedExtras = item.selectedExtras;
//         state.items[itemIndex].selectedOption = item.selectedOption;
//       } else {
//         const tempProduct = {
//           ...action.payload,
//           cartQuantity: 1,
//         };
//         state.items.push(tempProduct);
//       }

//       state.cartTotalQuantity = state.items.reduce(
//         (total, i) => total + i.cartQuantity,
//         0
//       );

//       localStorage.setItem('itemss', JSON.stringify(state.items));
//     },
//     removeItemFromCart: (state, action) => {
//       const itemId = action.payload;
//       state.items = state.items.filter((item) => item.id !== itemId);
//       state.cartTotalQuantity = state.items.reduce(
//         (total, i) => total + i.cartQuantity,
//         0
//       );
//       localStorage.setItem('itemss', JSON.stringify(state.items));
//     },
//     updateItemQuantity: (state, action) => {
//       const { itemId, quantity } = action.payload;
//       const item = state.items.find((item) => item.id === itemId);

//       if (item) {
//         item.cartQuantity = quantity;
//         item.totalPrice = item.price * quantity;
//         state.cartTotalQuantity = state.items.reduce(
//           (total, i) => total + i.cartQuantity,
//           0
//         );
//       }
//     },
//     setTotalItems: (state, action) => {
//       state.cartTotalQuantity = action.payload;
//     },
//   },
// });

// export const {
//   addItemToCart,
//   removeItemFromCart,
//   updateItemQuantity,
//   setTotalItems,
// } = cartSlice.actions;

// export default cartSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
    status: null,
  },
  reducers: {
    addItemToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find((i) => i.id === item.id);
      const itemIndex = state.items.findIndex((item) => item.id === item.id);

      if (existingItem) {
        state.items[itemIndex].cartQuantity += 1;
        state.items[itemIndex].selectedExtras = item.selectedExtras;
        state.items[itemIndex].selectedOption = item.selectedOption;
        state.items[itemIndex].idInfo = item.idInfo;  // إضافة idInfo إلى العنصر الموجود
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

      localStorage.setItem('itemss', JSON.stringify(state.items));
    },
    removeItemFromCart: (state, action) => {
      const itemId = action.payload;
      state.items = state.items.filter((item) => item.id !== itemId);
      state.cartTotalQuantity = state.items.reduce(
        (total, i) => total + i.cartQuantity,
        0
      );
      localStorage.setItem('itemss', JSON.stringify(state.items));
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
  },
});

export const {
  addItemToCart,
  removeItemFromCart,
  updateItemQuantity,
  setTotalItems,
} = cartSlice.actions;

export default cartSlice.reducer;
