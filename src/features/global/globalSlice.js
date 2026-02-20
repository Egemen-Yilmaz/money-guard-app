import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  error: null,
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
    setError(state, action) {
      state.error = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
  },
});

export const { setLoading, clearLoading, setError, clearError } = globalSlice.actions;
export default globalSlice.reducer;
