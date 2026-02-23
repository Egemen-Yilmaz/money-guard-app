// src/components/transactions/TransactionsList.jsx
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import TransactionsItem from "../TransactionsItem/TransactionsItem";
import NoTransactions from "../NoTransactions/NoTransactions";
import ButtonAddTransactions from "../ButtonAddTransactions/ButtonAddTransactions";
import ModalAddTransaction from "../ModalAddTransaction/ModalAddTransaction";
import { deleteTransaction, fetchTransactions } from "../../../redux/transactions/operations";
import { refreshCurrentUser } from "../../../features/auth/authOperations";
import { toastSuccess, toastError } from "../../../utils/toast";
import css from "./TransactionsList.module.css";

const TransactionsList = () => {
  const [sortOrder, setSortOrder] = useState("desc"); // "desc" = newest first

  const dispatch = useDispatch();

  const items = useSelector((state) => state.transactions?.items);
  const isLoading = useSelector((state) => state.transactions?.isLoading ?? false);
  const error = useSelector((state) => state.transactions?.error ?? null);

  const itemsList = items ?? [];

  const [isModalOpen, setIsModalOpen] = useState(false);

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

  if (itemsList.length === 0) {
    return <NoTransactions />;
  }

  // Filter out future transactions (include today)
  const now = new Date();
  const filteredTransactions = itemsList.filter((transaction) => {
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

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteTransaction(id)).unwrap();
      toastSuccess("Transaction deleted successfully!");
      // Refresh transactions and user balance
      dispatch(fetchTransactions());
      dispatch(refreshCurrentUser());
    } catch (err) {
      console.error("Failed to delete transaction:", err);
      toastError(err?.message || "Error deleting transaction");
    }
  };

  return (
    <div className={css.tableContainer}>
      <div className={css.controlsRow} style={{ display: 'flex', justifyContent: 'flex-end', padding: '8px' }}>
        <ButtonAddTransactions onClick={() => setIsModalOpen(true)} />
      </div>

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
                onDelete={() => handleDelete(transaction.id)}
                onEdit={() => alert('Edit not implemented yet')}
              />
            ))}
          </tbody>
        </table>
      </div>
      <ModalAddTransaction isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default TransactionsList;
