// src/features/transactions/transactionsSlice.js
import { createSlice, createAction } from "@reduxjs/toolkit";

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
    // loading/error state'leri için örnek reducer'lar (daha sonra genişletebilirsin)
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
    // Modal toggle reducer'ı
    toggleModal(state) {
      state.isModalOpen = !state.isModalOpen;
    },
  },
});

// Ek action export'ları (createAction ile)
export const toggleModal = createAction("transactions/toggleModal");

export const { setLoading, setError, setTransactions } =
  transactionsSlice.actions;
export default transactionsSlice.reducer;
