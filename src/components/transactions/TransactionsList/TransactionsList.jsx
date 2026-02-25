import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import TransactionsItem from "../TransactionsItem/TransactionsItem";
import NoTransactions from "../NoTransactions/NoTransactions";
import { deleteTransaction } from "../../../features/transactions/transactionsOperations";
import css from "./TransactionsList.module.css";

const TransactionsList = () => {
  const dispatch = useDispatch();

  const transactions = useSelector((state) => state.transactions?.items || []);
  const isLoading = useSelector(
    (state) => state.transactions?.loading || false,
  );
  const error = useSelector((state) => state.transactions?.error || null);

  const [sortOrder, setSortOrder] = useState("desc");

  const sortedTransactions = [...transactions].sort((a, b) => {
    const dateA = new Date(a.transactionDate || a.date || 0);
    const dateB = new Date(b.transactionDate || b.date || 0);
    return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
  });

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const handleDelete = (id) => {
    if (
      !window.confirm(
        "Are you sure you want to permanently delete this transaction?",
      )
    ) {
      return;
    }
    dispatch(deleteTransaction(id));
  };

  return (
    <div className={css.container}>
      {isLoading && <div className={css.loading}>Loading transactions...</div>}

      {error && <div className={css.error}>Error: {error}</div>}

      {!isLoading && !error && sortedTransactions.length === 0 && (
        <NoTransactions />
      )}

      {!isLoading && !error && sortedTransactions.length > 0 && (
        <>
          <div className={css.controls}>
            <button onClick={toggleSortOrder} className={css.sortButton}>
              Sort by date {sortOrder === "desc" ? "↓" : "↑"}
            </button>
          </div>

          <div className={css.tableWrapper}>
            <table className={css.table}>
              <thead>
                <tr className={css.theadRow}>
                  <th
                    className={css.th}
                    onClick={toggleSortOrder}
                    style={{ cursor: "pointer" }}
                  >
                    Date {sortOrder === "asc" ? "▲" : "▼"}
                  </th>
                  <th className={css.th}>Type</th>
                  <th className={css.th}>Category</th>
                  <th className={css.th}>Comment</th>
                  <th className={css.th}>Amount</th>
                  <th className={css.th}>Actions</th>
                </tr>
              </thead>

              <tbody>
                {sortedTransactions.map((transaction) => (
                  <TransactionsItem
                    key={transaction.id || transaction._id}
                    transaction={transaction}
                    onDelete={() =>
                      handleDelete(transaction.id || transaction._id)
                    }
                    onEdit={() => alert("Edit modal - not implemented yet")}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default TransactionsList;
