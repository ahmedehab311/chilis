import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../components/setting";
const API_HISTORY = `${BASE_URL}/user/history`;

export const fetchOrderHistory = createAsyncThunk(
  "orders/fetchHistory",

  async () => {
    const getApiToken = () => localStorage.getItem("token");
    // console.log(getApiToken());
    try {
      const apiToken = getApiToken();
      if (!apiToken) {
        throw new Error("No token found. Please log in again.");
      }
      const response = await axios.get(`${API_HISTORY}?api_token=${apiToken}`);
      console.log("API Response:", response.data);
      if (response.data.data.details) {
        return response.data.data.details;
      } else {
        throw new Error("Invalid response structure");
      }
    } catch (error) {
      console.error("Error in fetchOrderHistory:", error.message);
      throw error;
    }
  }
);

const myOrderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    status: "idle",
    error: null,
  },
  reducers: {
    // Add any additional reducers if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderHistory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrderHistory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders = action.payload;
      })
      .addCase(fetchOrderHistory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default myOrderSlice.reducer;
