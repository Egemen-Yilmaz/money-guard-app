// src/features/transactions/transactionsSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  loading: false,
  error: null,
  isModalOpen: false, // modal açık/kapalı state'i
};

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    setTransactions(state, action) {
      state.items = action.payload;
      state.loading = false;
      state.error = null;
    },
    toggleModal(state) {
      state.isModalOpen = !state.isModalOpen;
    },
    reset(state) {
      state.items = [];
      state.loading = false;
      state.error = null;
      state.isModalOpen = false;
    },
  },
});

export const { setLoading, setError, setTransactions, toggleModal, reset } =
  transactionsSlice.actions;

export default transactionsSlice.reducer;
