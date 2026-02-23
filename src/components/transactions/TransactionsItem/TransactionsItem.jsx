import React from "react";
import css from "./TransactionsItem.module.css";
// kalem ikonu eklenecek

const TransactionsItem = ({ transaction }) => {
  const handleEdit = () => {
    console.log("Edit clicked:", transaction.id);
    // dispatch(openEditModal(transaction)); // Kutluhan'ın modal action'ı
    alert("Düzenleme modalı açılacak (Kutluhan'ın görevi)");
  };

  const handleDelete = () => {
    if (
      window.confirm(
        "Bu işlemi kalıcı olarak silmek istediğinize emin misiniz?",
      )
    ) {
      console.log("Delete confirmed:", transaction.id);
      // dispatch(deleteTransactionThunk(transaction.id)); // Kutluhan'ın thunk'ı
      alert("Silindi (placeholder - gerçek silme Kutluhan'da)");
    }
  };

  const formattedDate = transaction.transactionDate
    ? new Date(transaction.transactionDate).toLocaleDateString("tr-TR")
    : transaction.date || "-";

  const typeLower = transaction.type?.toLowerCase() || "";
  const amount = transaction.amount ?? transaction.sum ?? 0;

  return (
    <tr
      className={`${css.tr} ${
        typeLower === "income" ? css.income : css.expense
      }`}
    >
      <td className={`${css.td} ${css.date}`}>
        <span className={css.mobileLabel}>Date:</span>
        {formattedDate}
      </td>

      <td
        className={`${css.td} ${css.type} ${
          typeLower === "income" ? css.typeIncome : css.typeExpense
        }`}
      >
        <span className={css.mobileLabel}>Type:</span>
        {typeLower === "income" ? "+" : "-"}
      </td>

      <td className={css.td}>
        <span className={css.mobileLabel}>Category:</span>
        {typeLower === "expense" ? transaction.category || "-" : null}
        {typeLower === "income" && (
          <div className={css.incomeLabel}>Income</div>
        )}
      </td>

      <td className={`${css.td} ${css.comment}`}>
        <span className={css.mobileLabel}>Comment:</span>
        {transaction.comment || "-"}
      </td>

      <td
        className={`${css.td} ${css.sum} ${
          typeLower === "income" ? css.sumIncome : css.sumExpense
        }`}
      >
        <span className={css.mobileLabel}>Sum:</span>
        {Math.abs(amount).toLocaleString("tr-TR", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </td>

      <td className={`${css.td} ${css.actions}`}>
        <button className={css.iconButton} onClick={handleEdit}>
          {/* <img src={editIcon} alt="Edit" /> */}
          <span className={css.editLabel}>Edit</span>
        </button>

        <button
          className={`form-button ${css.deleteButton}`}
          onClick={handleDelete}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default TransactionsItem;
