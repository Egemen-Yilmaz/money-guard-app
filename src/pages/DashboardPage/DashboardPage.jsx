import React from "react";
import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleModal } from "../../redux/transactions/slice";
import Header from "../../components/Header/Header";
import Navigation from "../../components/Navigation/Navigation";
import Balance from "../../components/Balance/Balance";
import CurrencyTab from "../CurrencyTab/CurrencyTab";
import ModalAddTransaction from "../../components/transactions/ModalAddTransaction/ModalAddTransaction";
import ButtonAddTransactions from "../../components/transactions/ButtonAddTransactions/ButtonAddTransactions";
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
        {/* Left Sidebar: Navigation + Balance + Currency (vertical on desktop) */}
        <aside className={css.leftSidebar}>
          <div className={css.navSection}>
            <Navigation />
          </div>
          <div className={css.balanceSection}>
            <Balance />
          </div>
          {/* Currency Panel - inside sidebar on desktop, separate on tablet */}
          <div className={css.currencySection}>
            <CurrencyTab />
          </div>
        </aside>

        {/* Transactions / main content */}
        <main className={css.main}>
          <Outlet /> {/* HomeTab buraya render olur */}
        </main>
      </div>

      {/* düzeltme yapılmıştır (kutluhan) redux state çakışmasından dolayı tek bir global artı butonu yapısına geçildi */}
      <ButtonAddTransactions onClick={handleOpenModal} />

      {/* düzeltme yapılmıştır (kutluhan) modal açma/kapama global transactions state üzerinden sağlanıyor */}
      <ModalAddTransaction
        isOpen={isModalOpen}
        onClose={() => dispatch(toggleModal())}
      />
    </div>
  );
};

export default DashboardPage;
