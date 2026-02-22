import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactions } from "../../redux/transactions/operations";
import TransactionsList from "../../components/transactions/TransactionsList/TransactionsList";
import css from "./HomeTab.module.css";

const HomeTab = () => {
  const dispatch = useDispatch();
  const { transactions, isLoading, error } = useSelector(
    (state) => state.finance || {},
  );

  useEffect(() => {
    dispatch(fetchTransactions()); // işlemler çekiliyor
  }, [dispatch]);

  if (isLoading) {
    return <div className={css.loading}>Loading transactions...</div>;
  }

  if (error) {
    return <div className={css.error}>Error: {error}</div>;
  }

  return (
    <div className={css.homeTab}>
      <TransactionsList
        transactions={transactions || []}
        isLoading={isLoading}
      />
    </div>
  );
};

export default HomeTab;
