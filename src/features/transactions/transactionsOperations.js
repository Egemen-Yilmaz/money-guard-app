import axios from "axios";
import { setLoading, setError, setTransactions } from "./transactionsSlice";

// Tüm işlemleri backend'den çek
export const fetchTransactions = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axios.get("/transactions"); // ← endpoint'i buraya göre değiştir
    dispatch(setTransactions(response.data));
  } catch (error) {
    const message =
      error.response?.data?.message || error.message || "İşlemler yüklenemedi";
    dispatch(setError(message));
    console.error("fetchTransactions error:", error);
  } finally {
    dispatch(setLoading(false));
  }
};

// İşlem silme
export const deleteTransaction = (transactionId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    await axios.delete(`/transactions/${transactionId}`);
    dispatch(fetchTransactions()); // liste yenile
  } catch (error) {
    const message = error.response?.data?.message || "Silme işlemi başarısız";
    dispatch(setError(message));
    console.error("deleteTransaction error:", error);
  } finally {
    dispatch(setLoading(false));
  }
};

// İşlem ekleme
export const addTransaction = (newTransaction) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    await axios.post("/transactions", newTransaction); // ← POST endpoint
    dispatch(fetchTransactions()); // liste yenile
  } catch (error) {
    const message = error.response?.data?.message || "Ekleme başarısız";
    dispatch(setError(message));
    console.error("addTransaction error:", error);
  } finally {
    dispatch(setLoading(false));
  }
};
