import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const api_token = localStorage.getItem('token');
const API_HISTORY = `http://myres.me/chilis-dev/api/user/history?api_token=${api_token}`;


export const fetchOrderHistory = createAsyncThunk('orders/fetchHistory', async () => {
  const response = await axios.get(API_HISTORY);
  return response.data.data.details;
});

const myOrderSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    // Add any additional reducers if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderHistory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOrderHistory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.orders = action.payload;
      })
      .addCase(fetchOrderHistory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default myOrderSlice.reducer;
