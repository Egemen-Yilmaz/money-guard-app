import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import TransactionsItem from "../TransactionsItem/TransactionsItem";
import NoTransactions from "../NoTransactions/NoTransactions";
import ModalEditTransaction from "../ModalEditTransaction/ModalEditTransaction";
import { deleteTransaction } from "../../../redux/transactions/operations";
import css from "./TransactionsList.module.css";

const TransactionsList = () => {
  const [sortOrder, setSortOrder] = useState("desc"); // "desc" = newest first
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const dispatch = useDispatch();

  const transactions = useSelector((state) => state.transactions?.items || []);
  const isLoading = useSelector(
    (state) => state.transactions?.loading || false,
  );
  const error = useSelector((state) => state.transactions?.error || null);

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

  // Sort transactions by date
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

  const handleEditOpen = (transaction) => {
    setSelectedTransaction(transaction);
    setIsEditModalOpen(true);
  };

  const handleEditClose = () => {
    setSelectedTransaction(null);
    setIsEditModalOpen(false);
  };

  const handleSortClick = () => {
    toggleSortOrder();
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
