import React from "react";
import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleModal } from "../../features/transactions/transactionsSlice";
import Header from "../../components/Header/Header";
import Navigation from "../../components/Navigation/Navigation";
import Balance from "../../components/Balance/Balance";
import ModalAddTransaction from "../../components/transactions/ModalAddTransaction/ModalAddTransaction";
import css from "./DashboardPage.module.css";

const DashboardPage = () => {
  const dispatch = useDispatch();
  const isModalOpen = useSelector(
    (state) => state.transactions?.isModalOpen || false,
  );

  const handleOpenModal = () => {
    dispatch(toggleModal()); // toggleModal() ile çağır (true/false otomatik döner)
  };

  return (
    <div className={css.dashboardPage}>
      <Header />

      <div className={css.container}>
        <aside className={css.leftSidebar}>
          <Navigation />
        </aside>

        <main className={css.main}>
          <Balance />
          <Outlet /> {/* HomeTab buraya render olur */}
        </main>
      </div>

      {/* Sağ alt + butonu */}
      <button
        onClick={handleOpenModal}
        className={css.fabButton}
        aria-label="Add new transaction"
      >
        +
      </button>

      {/* Modal koşullu render */}
      {isModalOpen && <ModalAddTransaction />}
    </div>
  );
};

export default DashboardPage;
