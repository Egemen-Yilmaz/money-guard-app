import React from "react";
import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleModal } from "../../features/transactions/transactionsSlice"; // slice'ın adını projene göre düzelt
import Header from "../../components/Header/Header";
import Navigation from "../../components/Navigation/Navigation";
import Balance from "../../components/Balance/Balance";
import ModalAddTransaction from "../../components/transactions/ModalAddTransaction/ModalAddTransaction"; // Kutluhan'ın modalı
import css from "./DashboardPage.module.css";

const DashboardPage = () => {
  const dispatch = useDispatch();
  const isModalOpen = useSelector(
    (state) => state.transactions?.isModalOpen || false,
  );

  const handleOpenModal = () => {
    dispatch(toggleModal(true));
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
          <Outlet /> {/* HomeTab, StatisticsTab vs. buraya gelir */}
        </main>
      </div>

      {/* Sağ alt + butonu */}
      <button onClick={handleOpenModal} className={css.fabButton}>
        +
      </button>

      {/* Modal koşullu render */}
      {isModalOpen && <ModalAddTransaction />}
    </div>
  );
};

export default DashboardPage;
