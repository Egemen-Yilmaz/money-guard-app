// src/components/TransactionsItem/TransactionsItem.jsx
import React from "react";
import css from "./TransactionsItem.module.css";

const TransactionsItem = ({ transaction }) => {
  const { date, type, category, comment, amount } = transaction;
  const isExpense = amount < 0 || type === "expense";

  return (
    <tr className={`${css.row} ${isExpense ? css.expense : css.income}`}>
      <td className={css.td} data-label="Date">
        {date}
      </td>
      <td className={css.td} data-label="Type">
        {isExpense ? "Expense" : "Income"}
      </td>
      <td className={css.td} data-label="Category">
        {category || "-"}
      </td>
      <td className={css.td} data-label="Comment">
        {comment || ""}
      </td>
      <td className={css.td} data-label="Sum">
        {Math.abs(amount).toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </td>
      <td className={`${css.td} ${css.actions}`}>
        <button className={css.editBtn}>Edit</button>
        <button className={css.deleteBtn}>Delete</button>
      </td>
    </tr>
  );
};

export default TransactionsItem;
