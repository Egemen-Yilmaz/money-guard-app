// src/components/transactions/TransactionsList.jsx
import React, { useState } from "react";
import { useSelector } from "react-redux";
import TransactionsItem from "../TransactionsItem/TransactionsItem";
import NoTransactions from "../NoTransactions/NoTransactions";
import css from "./TransactionsList.module.css";

const TransactionsList = () => {
  const [sortOrder, setSortOrder] = useState("desc"); // "desc" = newest first

  const {
    items = [],
    isLoading = false,
    error = null,
  } = useSelector((state) => state.transactions || {});

  if (error) {
    return <div className={css.error}>Error loading transactions: {error}</div>;
  }

  if (isLoading) {
    return (
      <div className={css.tableWrapper}>
        <div className={css.tableOverlay}>
          <div className={css.loadingText}>Loading transactions...</div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return <NoTransactions />;
  }

  // Filter out future transactions (include today)
  const now = new Date();
  const filteredTransactions = items.filter((transaction) => {
    const transDate = new Date(transaction.transactionDate || transaction.date);
    return transDate.getTime() <= now.getTime();
  });

  // Sort transactions by date
  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    const dateA = new Date(a.transactionDate || a.date);
    const dateB = new Date(b.transactionDate || b.date);
    return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
  });

  const handleSortClick = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  return (
    <div className={css.tableContainer}>
      <div className={css.tableWrapper}>
        <table className={css.table}>
          <thead>
            <tr className={css.theadRow}>
              <th
                className={css.th}
                onClick={handleSortClick}
                style={{ cursor: "pointer" }}
              >
                Date
                <span className={css.sortIcon}>
                  {sortOrder === "asc" ? "▲" : "▼"}
                </span>
              </th>
              <th className={css.th}>Type</th>
              <th className={css.th}>Category</th>
              <th className={css.th}>Comment</th>
              <th className={css.th}>Sum</th>
              <th className={`${css.th} ${css.thCenter}`}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedTransactions.map((transaction) => (
              <TransactionsItem
                key={transaction.id}
                transaction={transaction}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionsList;
