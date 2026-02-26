import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { FiEdit2 } from "react-icons/fi";
import css from "./TransactionsItem.module.css";
import { toggleModal } from "../../../redux/transactions/slice";

const TransactionsItem = ({ transaction, onDelete, onEdit }) => {
  const dispatch = useDispatch();

  const handleEdit = () => {
    // Pass transaction details upstream or to redux to populate edit modal
    if (typeof onEdit === 'function') return onEdit(transaction);
  };

  const handleDelete = () => {
    if (typeof onDelete === 'function') {
      if (window.confirm('Bu işlemi kalıcı olarak silmek istediğinize emin misiniz?')) {
        return onDelete(transaction.id);
      }
    }
  };

  const categories = useSelector((state) => state.transactions?.categories || []);
  const categoryId = transaction.categoryId || transaction.category?.id;
  const categoryObj = categories.find(c => c.id === categoryId) || categories.find(c => c.name === transaction.category);
  const categoryName = categoryObj ? categoryObj.name : (transaction.category || "-");

  const formattedDate = transaction.transactionDate
    ? new Date(transaction.transactionDate).toLocaleDateString("tr-TR")
    : transaction.date || "-";

  const typeLower = transaction.type?.toLowerCase() || "";
  const amount = transaction.amount ?? transaction.sum ?? 0;

  return (
    <tr
      className={`${css.tr} ${typeLower === "income" ? css.income : css.expense
        }`}
    >
      <td className={`${css.td} ${css.date}`}>
        <span className={css.mobileLabel}>Date:</span>
        {formattedDate}
      </td>

      <td
        className={`${css.td} ${css.type} ${typeLower === "income" ? css.typeIncome : css.typeExpense
          }`}
      >
        <span className={css.mobileLabel}>Type:</span>
        {typeLower === "income" ? "+" : "-"}
      </td>

      <td className={css.td}>
        <span className={css.mobileLabel}>Category:</span>
        {typeLower === "expense" ? categoryName : null}
        {typeLower === "income" && (
          <div className={css.incomeLabel}>Income</div>
        )}
      </td>

      <td className={`${css.td} ${css.comment}`}>
        <span className={css.mobileLabel}>Comment:</span>
        {transaction.comment || "-"}
      </td>

      <td
        className={`${css.td} ${css.sum} ${typeLower === "income" ? css.sumIncome : css.sumExpense
          }`}
      >
        <span className={css.mobileLabel}>Sum:</span>
        <div className={css.sumContent}>
          <span>
            {Math.abs(amount).toLocaleString("tr-TR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
          <div className={css.actions}>
            <button className={css.iconButton} onClick={handleEdit}>
              <FiEdit2 size={16} />
            </button>

            <button
              className={css.deleteButton}
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </td>
    </tr>
  );
};

export default TransactionsItem;
