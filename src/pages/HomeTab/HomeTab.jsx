// src/pages/HomeTab/HomeTab.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactions } from "../../redux/transactions/operations";
import TransactionsList from "../../components/transactions/TransactionsList/TransactionsList";
import css from "./HomeTab.module.css";

const HomeTab = () => {
  const dispatch = useDispatch();

  const {
    transactions = [],
    isLoading = false,
    error = null,
  } = useSelector((state) => state.finance || {});

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  return (
    <div className={css.homeTab}>
      {isLoading && <div className={css.loading}>Loading transactions...</div>}

      {error && <div className={css.error}>Error: {error}</div>}

      {!isLoading && !error && <TransactionsList transactions={transactions} />}
    </div>
  );
};

export default HomeTab;
