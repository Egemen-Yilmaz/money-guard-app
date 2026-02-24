import { createSlice } from "@reduxjs/toolkit";
import {
    fetchTransactions,
    addTransaction,
    updateTransaction,
    fetchTransactionCategories,
    deleteTransaction,
} from './operations';

const initialState = {
  items: [],
  categories: [],
  isLoading: false,
  error: null,
  date: {},
  transactionsSummary: {
    categoriesSummary: [],
    incomeSummary: 0,
    expenseSummary: 0,
    periodTotal: 0,
    year: 0,
    month: 0,
  },
};

const handlePending = (state) => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const transactionsSlice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // İşlemleri getir
            .addCase(fetchTransactions.pending, handlePending)
            .addCase(fetchTransactions.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.items = action.payload;
            })
            .addCase(fetchTransactions.rejected, handleRejected)
            // İşlem ekle
            .addCase(addTransaction.pending, handlePending)
            .addCase(addTransaction.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.items.push(action.payload);
            })
            .addCase(addTransaction.rejected, handleRejected)
            // İşlem güncelle
            .addCase(updateTransaction.pending, handlePending)
            .addCase(updateTransaction.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                const index = state.items.findIndex((item) => item.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })
            .addCase(updateTransaction.rejected, handleRejected)
            .addCase(deleteTransaction.pending, handlePending)
            .addCase(deleteTransaction.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = state.items.filter(item => item.id !== action.payload);
                state.error = null;
            })
            .addCase(deleteTransaction.rejected, handleRejected)
            // Kategorileri getir
            .addCase(fetchTransactionCategories.pending, handlePending)
            .addCase(fetchTransactionCategories.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.categories = action.payload;
            })
            .addCase(fetchTransactionCategories.rejected, handleRejected);
    },
  },
  extraReducers: (builder) => {
    builder
      // İşlemleri getir
      .addCase(fetchTransactions.pending, handlePending)
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(fetchTransactions.rejected, handleRejected)
      // İşlem ekle
      .addCase(addTransaction.pending, handlePending)
      .addCase(addTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items.push(action.payload);
      })
      .addCase(addTransaction.rejected, handleRejected)
      // İşlem güncelle
      .addCase(updateTransaction.pending, handlePending)
      .addCase(updateTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id,
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateTransaction.rejected, handleRejected)
      // Kategorileri getir
      .addCase(fetchTransactionCategories.pending, handlePending)
      .addCase(fetchTransactionCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.categories = action.payload;
      })
      .addCase(fetchTransactionCategories.rejected, handleRejected);
  },
});

export const transactionsReducer = transactionsSlice.reducer;
export const { changeDate } = transactionsSlice.actions;
export default transactionsSlice.reducer;
