import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleModal } from "../../features/transactions/transactionsSlice";
import css from "./NoTransactions.module.css";

const NoTransactions = () => {
  const dispatch = useDispatch();
  const isModalOpen = useSelector(
    (state) => state.transactions?.isModalOpen || false,
  );

  return (
    <section
      className={`${css.noTransactionsContainer} ${
        isModalOpen ? css.inactive : ""
      }`}
      aria-live="polite"
    >
      <div className={css.inner}>
        <h3 className={css.title} aria-hidden={isModalOpen}>
          No transactions available yet.
        </h3>
        <p className={css.subtitle} aria-hidden={isModalOpen}>
          Let's add your first transaction:
        </p>
        <button
          type="button"
          onClick={() => dispatch(toggleModal())}
          className={`form-button ${css.addButton}`}
          aria-hidden={isModalOpen}
        >
          ADD TRANSACTION
        </button>
      </div>
    </section>
  );
};

export default NoTransactions;
