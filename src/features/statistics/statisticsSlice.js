import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { instance } from '../../api/axiosConfig';

// fetchStatistics obje parametresi bekler: { month, year }
export const fetchStatistics = createAsyncThunk(
  'statistics/fetchStatistics',
  async ({ month, year } = {}, thunkAPI) => {
    try {
      const params = {};
      if (month !== undefined) params.month = month;
      if (year !== undefined) params.year = year;

      const { data } = await instance.get('/transactions-summary', { params });
      return data;
    } catch (error) {
      // server mesajını tercih et, yoksa genel hata mesajını kullan
      const message = error?.response?.data?.message || error.message || 'Failed to fetch statistics';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const statisticsSlice = createSlice({
  name: 'statistics',
  initialState: {
    data: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    clearStatistics(state) {
      state.data = null;
      state.error = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStatistics.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchStatistics.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchStatistics.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error?.message;
      });
  },
});

export const { clearStatistics } = statisticsSlice.actions;
export default statisticsSlice.reducer;
