import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../components/setting';
// API call to fetch order details
export const fetchOrderDetails = createAsyncThunk(
  'orderDetails/fetchOrderDetails',
  async ({ order_id, api_token }) => {
  const response = await axios.get(`${BASE_URL}/order/details/${order_id}?api_token=${api_token}`);
    console.log("Fetched Data:", response.data.data.order[0]);  
    return response.data.data.order[0];
  }
);



const orderDetailsSlice = createSlice({
  name: 'orderDetails',
  initialState: {
    orderDetails: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    clearOrderDetails: (state) => {
      state.orderDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOrderDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.orderDetails = action.payload;
      })
      .addCase(fetchOrderDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { clearOrderDetails } = orderDetailsSlice.actions;

export default orderDetailsSlice.reducer;
