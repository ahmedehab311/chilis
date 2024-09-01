import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../components/setting";
const API_BRANCHES = `${BASE_URL}/branches/1`;

// const API_BRANCHES = `https://myres.me/chilis-dev/api/branches/1`;

// إنشاء asyncThunk لجلب البيانات
export const fetchBranches = createAsyncThunk(
  "branches/fetchBranches",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_BRANCHES);
      return response.data.data?.branches;
    } catch (error) {
      return rejectWithValue(error.response.data.message || "Failed to fetch branches");
    }
  }
);

export const branchesSlice = createSlice({
  name: 'branches',
  initialState: {
    branches: [],
    selectedBranchId: null, 
    loading: false,
    error: null,
  },
  reducers: {
    setSelectedBranch: (state, action) => {
      state.selectedBranchId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBranches.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBranches.fulfilled, (state, action) => {
        state.branches = action.payload;
        state.loading = false;
      })
      .addCase(fetchBranches.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { setSelectedBranch } = branchesSlice.actions;

export default branchesSlice.reducer;
