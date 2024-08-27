// infoSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchIdInfo = createAsyncThunk(
  'info/fetchIdInfo',
  async (itemId) => {
    const response = await axios.get(`https://myres.me/chilis-dev/api/item/${itemId}/1`);
    return response.data.info[0].id;
  }
);

const infoSlice = createSlice({
  name: 'info',
  initialState: {
    idInfo: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchIdInfo.fulfilled, (state, action) => {
      state.idInfo = action.payload;
    });
  },
});

export default infoSlice.reducer;
