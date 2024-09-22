// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
// import {
//   API_ADDRESS,
//   API_ADD_ADDRESS,
//   API_DELETE_ADDRESS,
// } from "../../components/Menu/order/adderess/apiAdderss.jsx";

// export const fetchAddresses = createAsyncThunk(
//   "addresses/fetchAddresses",
//   async () => {
//     try {
//       const response = await axios.get(API_ADDRESS());
//       // console.log("API response:", response.data.data.address);

//       // تأكد من أن كائن العنوان يحتوي على الخصائص المطلوبة
//       if (response.data.data.address) {
//         return response.data.data.address;
//       } else {
//         throw new Error("Address data is missing in the API response");
//       }
//     } catch (error) {
//       console.error("Error in fetchAddresses thunk:", error);
//       throw error;
//     }
//   }
// );
// export const addAddress = createAsyncThunk(
//   "addresses/addAddress",
//   async (newAddress) => {
//     const queryParams = new URLSearchParams(newAddress);
//     const response = await axios.post(
//       `${API_ADD_ADDRESS}?${queryParams.toString()}`
//     );
//     if (response.data.response) {
//       return response.data.data;
//     }
//     throw new Error(response.data.message || "Error adding address");
//   }
// );

// export const deleteAddress = createAsyncThunk(
//   "addresses/deleteAddress",
//   async (id) => {
//     await axios.post(API_DELETE_ADDRESS(id));
//     return id;
//   }
// );

// const addressSlice = createSlice({
//   name: "addresses",
//   initialState: {
//     items: [],
//     status: "idle",
//     selectedAddress: null, // يجب أن يكون الكائن الكامل هنا وليس الـ id
//     error: null,
//     unavailableAddresses: [],
//   },
//   reducers: {
//     // setSelectedAddress: (state, action) => {
//     //   const payload = action.payload;

//     //   // طباعة الـ payload للتحقق
//     //   // console.log("Payload being set  in Redux:", payload);

//     //   // تحقق من أن الكائن يحتوي على id وباقي الخصائص المطلوبة
//     //   if (payload && typeof payload === "object" && payload.id) {
//     //     state.selectedAddress = payload;
//     //     console.log("Selected address stored in Redux:", state.selectedAddress);
//     //   } else {
//     //     state.selectedAddress = null;
//     //     console.error(
//     //       "Payload is not an object or is missing required properties."
//     //     );
//     //   }
//     // },
//     setSelectedAddress: (state, action) => {
//       const payload = action.payload;
//       console.log("Payload being set in Redux:", payload);
    
//       // تحقق من أن الكائن يحتوي على id وباقي الخصائص المطلوبة
//       if (payload && typeof payload === "object" && payload.id) {
//         state.selectedAddress = payload;
//         console.log("Selected address stored in Redux:", state.selectedAddress);
//       } else {
//         state.selectedAddress = null;
//         console.error(
//           "Payload is not an object or is missing required properties."
//         );
//       }
//     },
    

//     setUnavailableAddresses: (state, action) => {
//       state.unavailableAddresses = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchAddresses.fulfilled, (state, action) => {
//         state.items = action.payload;
//         state.status = "succeeded";
//       })
//       .addCase(addAddress.fulfilled, (state, action) => {
//         state.items.push(action.payload);
//       })
//       .addCase(deleteAddress.fulfilled, (state, action) => {
//         state.items = state.items.filter(
//           (address) => address.id !== action.payload
//         );
//       })
//       .addCase(fetchAddresses.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.error.message;
//       });
//   },
// });

// export const { setSelectedAddress, setUnavailableAddresses } =
//   addressSlice.actions;

// export default addressSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_ADDRESS, API_ADD_ADDRESS, API_DELETE_ADDRESS } from "../../components/Menu/order/adderess/apiAdderss.jsx";

export const fetchAddresses = createAsyncThunk(
  "addresses/fetchAddresses",
  async () => {
    try {
      const response = await axios.get(API_ADDRESS());
      if (response.data.data.address) {
        return response.data.data.address;
      } else {
        throw new Error("Address data is missing in the API response");
      }
    } catch (error) {
      console.error("Error in fetchAddresses thunk:", error);
      throw error;
    }
  }
);

export const addAddress = createAsyncThunk(
  "addresses/addAddress",
  async (newAddress) => {
    const queryParams = new URLSearchParams(newAddress);
    const response = await axios.post(`${API_ADD_ADDRESS}?${queryParams.toString()}`);
    console.log("response",response)
    if (response.data.response) {
      return response.data.data;
    }
    throw new Error(response.data.message || "Error adding address");
  }
);

export const deleteAddress = createAsyncThunk(
  "addresses/deleteAddress",
  async (id) => {
    await axios.post(API_DELETE_ADDRESS(id));
    return id;
  }
);

const addressSlice = createSlice({
  name: "addresses",
  initialState: {
    items: [],
    status: "idle",
    selectedAddress: JSON.parse(localStorage.getItem("selectedAddress")) || null, // استرجاع العنوان من localStorage
    error: null,
    unavailableAddresses: [],
  },
  reducers: {
    setSelectedAddress: (state, action) => {
      const payload = action.payload;
      if (payload && typeof payload === "object" && payload.id) {
        state.selectedAddress = payload;
        localStorage.setItem("selectedAddress", JSON.stringify(payload)); // تخزين العنوان في localStorage
      } else {
        state.selectedAddress = null;
        // console.error("Payload is not an object or is missing required properties.");
      }
    },
    clearSelectedAddress: (state) => {
      state.selectedAddress = null;
      localStorage.removeItem("selectedAddress"); 
    },
    setUnavailableAddresses: (state, action) => {
      state.unavailableAddresses = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddresses.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = "succeeded";
      })
      .addCase(addAddress.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.items = state.items.filter((address) => address.id !== action.payload);
      })
      .addCase(fetchAddresses.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setSelectedAddress, setUnavailableAddresses,clearSelectedAddress } = addressSlice.actions;

export default addressSlice.reducer;
