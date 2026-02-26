import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../api/axiosConfig";

export const fetchTransactions = createAsyncThunk(
  "transactions/fetchAll",
  async (_, thunkAPI) => {
    try {
      const { data } = await instance.get("/transactions");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const addTransaction = createAsyncThunk(
  "transactions/addTransaction",
  async (transactionData, thunkAPI) => {
    try {
      const { data } = await instance.post("/transactions", transactionData);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const updateTransaction = createAsyncThunk(
  "transactions/updateTransaction",
  async ({ id, ...transactionData }, thunkAPI) => {
    try {
      const { data } = await instance.patch(
        `/transactions/${id}`,
        transactionData,
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const fetchTransactionCategories = createAsyncThunk(
  "transactions/fetchCategories",
  async (_, thunkAPI) => {
    try {
      const { data } = await instance.get("/transaction-categories");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const transactionsSummary = createAsyncThunk(
  "transactions/transactionsSummary",
  async (date, thunkApi) => {
    try {
      const response = await instance.get(
        `transactions-summary?month=${date.month}&year=${date.year}`,
      );
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const deleteTransaction = createAsyncThunk(
  "transactions/deleteTransaction",
  async (id, thunkAPI) => {
    try {
      await instance.delete(`/transactions/${id}`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
