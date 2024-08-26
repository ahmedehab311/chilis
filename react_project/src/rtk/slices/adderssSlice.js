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

// Add Address
export const addAddress = createAsyncThunk(
  "addresses/addAddress",
  async (newAddress) => {
    const queryParams = new URLSearchParams(newAddress);
    const response = await axios.post(
      `${API_ADD_ADDRESS}?${queryParams.toString()}`
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
    selectedAddress: null, // لإضافة خاصية لتخزين العنوان المختار
    error: null,
  },
  reducers: {
    setSelectedAddress: (state, action) => {
      state.selectedAddress = action.payload;
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
        state.items = state.items.filter(
          (address) => address.id !== action.payload
        );
      });
  },
});

export const { setSelectedAddress } = addressSlice.actions;

export default addressSlice.reducer;
