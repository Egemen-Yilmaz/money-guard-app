// src/pages/HomeTab/HomeTab.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactions, fetchTransactionCategories } from "../../redux/transactions/operations";
import TransactionsList from "../../components/transactions/TransactionsList/TransactionsList";
import css from "./HomeTab.module.css";

const HomeTab = () => {
  const dispatch = useDispatch();

  // Trigger transactions fetch here; the TransactionsList reads items from `state.transactions.items`.
  const isLoading = useSelector((state) => state.transactions?.isLoading ?? false);
  const error = useSelector((state) => state.transactions?.error ?? null);

  useEffect(() => {
    dispatch(fetchTransactions());
    dispatch(fetchTransactionCategories());
  }, [dispatch]);

  return (
    <div className={css.homeTab}>
      {isLoading && <div className={css.loading}>Loading transactions...</div>}

      {error && <div className={css.error}>Error: {error}</div>}

      {!isLoading && !error && <TransactionsList />}
    </div>
  );
};

export default HomeTab;
