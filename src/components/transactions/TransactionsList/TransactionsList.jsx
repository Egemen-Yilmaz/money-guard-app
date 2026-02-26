// src/components/transactions/TransactionsList.jsx
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import TransactionsItem from "../TransactionsItem/TransactionsItem";
import NoTransactions from "../NoTransactions/NoTransactions";
import ModalEditTransaction from "../ModalEditTransaction/ModalEditTransaction";
import { deleteTransaction, fetchTransactions } from "../../../redux/transactions/operations";
import { refreshCurrentUser } from "../../../features/auth/authOperations";
import { toastSuccess, toastError } from "../../../utils/toast";
import css from "./TransactionsList.module.css";

const TransactionsList = () => {
  const [sortOrder, setSortOrder] = useState("desc"); // "desc" = newest first
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const dispatch = useDispatch();

  const items = useSelector((state) => state.transactions?.items);
  const isLoading = useSelector((state) => state.transactions?.isLoading ?? false);
  const error = useSelector((state) => state.transactions?.error ?? null);

  const itemsList = items ?? [];

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

  // Filter out future transactions (include today)
  // Ensure we round 'now' to the end of the current local day to prevent timezone offsets filtering out today's additions
  const endOfToday = new Date();
  endOfToday.setHours(23, 59, 59, 999);

  const filteredTransactions = itemsList.filter((transaction) => {
    const transDate = new Date(transaction.transactionDate || transaction.date);
    return transDate.getTime() <= endOfToday.getTime();
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

  const handleEditOpen = (transaction) => {
    setSelectedTransaction(transaction);
    setIsEditModalOpen(true);
  };

  const handleEditClose = () => {
    setSelectedTransaction(null);
    setIsEditModalOpen(false);
  };

  if (sortedTransactions.length === 0) {
    return <NoTransactions />;
  }

  return (
    <div className={css.tableContainer}>
      {isEditModalOpen && selectedTransaction && (
        <ModalEditTransaction
          isOpen={isEditModalOpen}
          onClose={handleEditClose}
          transaction={selectedTransaction}
        />
      )}
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
            </tr>
          </thead>
          <tbody>
            {sortedTransactions.map((transaction) => (
              <TransactionsItem
                key={transaction.id}
                transaction={transaction}
                onDelete={() => handleDelete(transaction.id)}
                onEdit={() => handleEditOpen(transaction)}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionsList;
