// src/pages/HomeTab/HomeTab.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactions } from "../../redux/transactions/operations";
import TransactionsList from "../../components/transactions/TransactionsList/TransactionsList";
import css from "./HomeTab.module.css";

const HomeTab = () => {
  const dispatch = useDispatch();

  const transactions = useSelector((state) => state.finance?.transactions);
  const isLoading = useSelector((state) => state.finance?.isLoading ?? false);
  const error = useSelector((state) => state.finance?.error ?? null);

  const transactionsList = transactions ?? [];

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  return (
    <div className={css.homeTab}>
      {isLoading && <div className={css.loading}>Loading transactions...</div>}

      {error && <div className={css.error}>Error: {error}</div>}

      {!isLoading && !error && (
        <TransactionsList transactions={transactionsList} />
      )}
    </div>
  );
};

export default HomeTab;
