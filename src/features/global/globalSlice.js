import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
};

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setLoading(state) {
      state.isLoading = true;
    },
    clearLoading(state) {
      state.isLoading = false;
    },
  },
});

export const { setLoading, clearLoading } = globalSlice.actions;
export default globalSlice.reducer;
