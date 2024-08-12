// addressSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  API_ADDRESS,
  API_ADD_ADDRESS,
  API_DELETE_ADDRESS,
} from "../../components/Menu/order/adderess/apiAdderss.jsx";

// Fetch Addresses
export const fetchAddresses = createAsyncThunk(
  "addresses/fetchAddresses",
  async () => {
    const response = await axios.get(API_ADDRESS);
    return response.data.data.address;
  }
);

// Add Address/
export const addAddress = createAsyncThunk(
  "addresses/addAddress",
  async (newAddress) => {
    const queryParams = new URLSearchParams(newAddress);
    const response = await axios.post(
      `${API_ADD_ADDRESS}${queryParams.toString()}`
    );
    if (response.data.response) {
      return response.data.data;
    }
    throw new Error(response.data.message || "Error adding address");
  }
);

// Delete Address
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
    error: null,
  },
  reducers: {},
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
        state.items = state.items.filter(
          (address) => address.id !== action.payload
        );
      });
  },
});

export default addressSlice.reducer;

// // addressSlice.js
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// // الحصول على التوكين من localStorage
// const token = localStorage.getItem('token');

// // إنشاء مثيل لـ axios مع التوكين
// const instance = axios.create({
//   baseURL: 'https://myres.me/chilis/api', // استبدل بعنوان الـ API الخاص بك
//   headers: {
//     Authorization: `Bearer ${token}`,
//   },
// });

// // Fetch Addresses
// export const fetchAddresses = createAsyncThunk(
//   "addresses/fetchAddresses",
//   async () => {
//     const response = await instance.get('/addresses');
//     return response.data.data.address;
//   }
// );

// // Add Address
// export const addAddress = createAsyncThunk(
//   "addresses/addAddress",
//   async (newAddress) => {
//     const response = await instance.post('/add-address', newAddress);
//     if (response.data.response) {
//       return response.data.data;
//     }
//     throw new Error(response.data.message || "Error adding address");
//   }
// );

// // Delete Address
// export const deleteAddress = createAsyncThunk(
//   "addresses/deleteAddress",
//   async (id) => {
//     await instance.post(`/delete-address/${id}`);
//     return id;
//   }
// );

// const addressSlice = createSlice({
//   name: "addresses",
//   initialState: {
//     items: [],
//     status: "idle",
//     error: null,
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchAddresses.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(fetchAddresses.fulfilled, (state, action) => {
//         state.items = action.payload;
//         state.status = "succeeded";
//       })
//       .addCase(fetchAddresses.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.error.message;
//       })
//       .addCase(addAddress.fulfilled, (state, action) => {
//         state.items.push(action.payload);
//       })
//       .addCase(deleteAddress.fulfilled, (state, action) => {
//         state.items = state.items.filter(
//           (address) => address.id !== action.payload
//         );
//       });
//   },
// });

// export default addressSlice.reducer;
// // addressSlice.js
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// // Get the API token from localStorage
// const api_token = localStorage.getItem("token");

// // Define the API endpoints
// const API_CITIES = "https://myres.me/chilis/api/cities";
// const API_AREAS = "https://myres.me/chilis/api/areas?city=";
// const API_ADDRESS = `https://myres.me/chilis/api/profile/address?api_token=${api_token}`;
// const API_ADD_ADDRESS = `https://myres.me/chilis/api/profile/address/add?api_token=${api_token}`;
// const API_DELETE_ADDRESS = (id) =>
//   `https://myres.me/chilis/api/profile/address/delete/${id}?api_token=${api_token}`;

// // Thunks
// export const fetchCities = createAsyncThunk('address/fetchCities', async () => {
//   const response = await axios.get(API_CITIES);
//   return response.data;
// });

// export const fetchAreas = createAsyncThunk('address/fetchAreas', async (cityId) => {
//   const response = await axios.get(`${API_AREAS}${cityId}`);
//   return response.data;
// });

// export const fetchAddresses = createAsyncThunk('address/fetchAddresses', async () => {
//   const response = await axios.get(API_ADDRESS);
//   return response.data;
// });

// export const addAddress = createAsyncThunk('address/addAddress', async (address) => {
//   const response = await axios.post(API_ADD_ADDRESS, address);
//   return response.data;
//   console.log("resoinseee",response.data);
// });

// export const deleteAddress = createAsyncThunk('address/deleteAddress', async (id) => {
//   await axios.post(API_DELETE_ADDRESS(id));
//   return id;
// });

// // Slice
// const addressSlice = createSlice({
//   name: 'address',
//   initialState: {
//     items: [], // هنا يتم تخزين العناوين
//     cities: [],
//     areas: [],
//     status: 'idle',
//     error: null,
//   },
//   reducers: {
//     // يمكنك إضافة أي reducers أخرى هنا إذا لزم الأمر
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchCities.fulfilled, (state, action) => {
//         state.cities = action.payload;
//       })
//       .addCase(fetchAreas.fulfilled, (state, action) => {
//         state.areas = action.payload;
//       })
//       .addCase(fetchAddresses.fulfilled, (state, action) => {
//         state.items = action.payload; // تحديث قائمة العناوين
//       })
//       .addCase(addAddress.fulfilled, (state, action) => {
//         state.items.push(action.payload); // إضافة العنوان الجديد إلى القائمة
//       })
//       .addCase(deleteAddress.fulfilled, (state, action) => {
//         state.items = state.items.filter(item => item.id !== action.payload); // حذف العنوان من القائمة
//       })
//       .addCase(fetchCities.rejected, (state, action) => {
//         state.error = action.error.message;
//       })
//       .addCase(fetchAreas.rejected, (state, action) => {
//         state.error = action.error.message;
//       })
//       .addCase(fetchAddresses.rejected, (state, action) => {
//         state.error = action.error.message;
//       })
//       .addCase(addAddress.rejected, (state, action) => {
//         state.error = action.error.message;
//       })
//       .addCase(deleteAddress.rejected, (state, action) => {
//         state.error = action.error.message;
//       });
//   },
// });

// export default addressSlice.reducer;
