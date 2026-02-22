import React from "react";
import TransactionsItem from "../TransactionsItem/TransactionsItem";
import css from "./TransactionsList.module.css";

const TransactionsList = ({ transactions = [], isLoading = false }) => {
  if (isLoading) {
    return (
      <div className={css.tableWrapper}>
        <div className={css.tableOverlay}>
          <div className={css.loadingText}>Loading transactions...</div>
          {/* İstersen react-loader-spinner ekle */}
        </div>
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className={css.emptyState}>
        <p>No transactions yet</p>
      </div>
    );
  }

  return (
    <div className={css.tableContainer}>
      <div className={css.tableWrapper}>
        <table className={css.table}>
          <thead>
            <tr className={css.theadRow}>
              <th className={css.th}>Date</th>
              <th className={css.th}>Type</th>
              <th className={css.th}>Category</th>
              <th className={css.th}>Comment</th>
              <th className={css.th}>Sum</th>
              <th className={`${css.th} ${css.thCenter}`}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <TransactionsItem key={tx.id} transaction={tx} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionsList;
