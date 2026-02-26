import React from "react";
import { useSelector } from "react-redux";
import { FiEdit2 } from "react-icons/fi";
import css from "./TransactionsItem.module.css";

const TransactionsItem = ({ transaction, onDelete, onEdit }) => {
  const categories = useSelector(
    (state) => state.transactions?.categories || [],
  );

  const handleEdit = () => {
    if (typeof onEdit === "function") {
      onEdit(transaction);
    }
  };

  const handleDelete = () => {
    if (typeof onDelete === "function") {
      if (
        window.confirm(
          "Bu işlemi kalıcı olarak silmek istediğinize emin misiniz?",
        )
      ) {
        onDelete(transaction.id || transaction._id);
      }
    }
  };

  /* ===============================
     CATEGORY RESOLVE
  =============================== */

  const categoryId = transaction.categoryId || transaction.category?.id;

  const categoryObj =
    categories.find((c) => c.id === categoryId) ||
    categories.find((c) => c.name === transaction.category);

  const categoryName = categoryObj
    ? categoryObj.name
    : transaction.category || "-";

  /* ===============================
     FORMATTING
  =============================== */

  const formattedDate = transaction.transactionDate
    ? new Date(transaction.transactionDate).toLocaleDateString("tr-TR")
    : transaction.date || "-";

  const typeLower = transaction.type?.toLowerCase() || "";

  const amount = transaction.amount ?? transaction.sum ?? 0;

  const formattedAmount = Math.abs(amount).toLocaleString("tr-TR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  /* ===============================
     RENDER
  =============================== */

  return (
    <tr
      className={`${css.tr} ${
        typeLower === "income" ? css.income : css.expense
      }`}
    >
      {/* DATE */}
      <td className={`${css.td} ${css.date}`}>
        <span className={css.mobileLabel}>Date:</span>
        {formattedDate}
      </td>

      {/* TYPE */}
      <td
        className={`${css.td} ${css.type} ${
          typeLower === "income" ? css.typeIncome : css.typeExpense
        }`}
      >
        <span className={css.mobileLabel}>Type:</span>
        {typeLower === "income" ? "+" : "-"}
      </td>

      {/* CATEGORY */}
      <td className={css.td}>
        <span className={css.mobileLabel}>Category:</span>
        {typeLower === "expense" ? categoryName : "Income"}
      </td>

      {/* COMMENT */}
      <td className={`${css.td} ${css.comment}`}>
        <span className={css.mobileLabel}>Comment:</span>
        {transaction.comment || "-"}
      </td>

      {/* AMOUNT */}
      <td
        className={`${css.td} ${css.sum} ${
          typeLower === "income" ? css.sumIncome : css.sumExpense
        }`}
      >
        <span className={css.mobileLabel}>Amount:</span>
        <div className={css.amountContent}></div>
        {formattedAmount}
      </td>

      {/* ACTIONS */}
      <td className={`${css.td} ${css.actionsCell}`}>
        <span className={css.mobileLabel}>Actions:</span>
        <div className={css.actions}>
          <button className={css.iconButton} onClick={handleEdit}>
            <FiEdit2 size={16} />
          </button>

          <button className={css.deleteButton} onClick={handleDelete}>
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
};

export default TransactionsItem;
