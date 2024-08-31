import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchItemDetails = createAsyncThunk(
  "info/fetchItemDetails",
  async (itemId) => {
    const response = await axios.get(
      `https://myres.me/chilis-dev/api/item/${itemId}/1`
    );
    return response.data;
  }
);

const infoSlice = createSlice({
  name: "info",
  initialState: {
    itemDetails: null,
    idInfo: null,
    price: null,
    itemExtras: [],
    dataOptions: [],
    selectedExtras: [],
    selectedOption: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchItemDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchItemDetails.fulfilled, (state, action) => {
        const data = action.payload;
        console.log("Fetched data:", data); 
        state.itemDetails = data;
        state.idInfo = data.info[0]?.id || null;
        state.price = data.info[0]?.price?.price || null;
        state.itemExtras = data.item_extras[0]?.data || [];
        state.dataOptions = data.info[0]?.item_extras[0]?.data || [];
        console.log("state.itemExtras", state.itemExtras);
        console.log("state.dataOptions", state.dataOptions);
        state.status = "succeeded";
      })

      .addCase(fetchItemDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default infoSlice.reducer;
