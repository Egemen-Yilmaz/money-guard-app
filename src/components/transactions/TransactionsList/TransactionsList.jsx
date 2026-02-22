import React, { useState } from "react";
import { useSelector } from "react-redux";
import TransactionsItem from "../TransactionsItem/TransactionsItem";
import css from "./TransactionsList.module.css";

const TransactionsList = () => {
  const [sortOrder, setSortOrder] = useState("desc"); // Default: newest first

  const {
    transactionsList = [],
    isLoading = false,
    error = null,
  } = useSelector(
    (state) => state.finance || {}, // finance slice
  );

  if (error) {
    return <div className={css.error}>Error: {error}</div>;
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

  if (transactionsList.length === 0) {
    return (
      <div className={css.emptyState}>
        <p>No transactions yet</p>
      </div>
    );
  }

  // Filter future dates (bugünü dahil et)
  const now = new Date();
  const filteredTransactions = transactionsList.filter((tx) => {
    const txDate = new Date(tx.transactionDate || tx.date);
    return txDate.getTime() <= now.getTime();
  });

  // Sort by date
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
            {sortedTransactions.map((tx) => (
              <TransactionsItem key={tx.id} transaction={tx} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionsList;
