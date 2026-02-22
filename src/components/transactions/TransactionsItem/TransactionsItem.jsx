import React from "react";
import css from "./TransactionsItem.module.css";

const TransactionsItem = ({ transaction }) => {
  const { date, type, category, comment, amount } = transaction;
  const isExpense = amount < 0 || type === "expense";

  const handleEdit = () => {
    // TODO: Open edit modal
    console.log("Edit clicked for transaction:", transaction.id);
  };

  const handleDelete = () => {
    // TODO: Dispatch delete thunk
    console.log("Delete clicked for transaction:", transaction.id);
  };

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
        <button className={css.editBtn} onClick={handleEdit}>
          Edit
        </button>
        <button className={css.deleteBtn} onClick={handleDelete}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default TransactionsItem;
