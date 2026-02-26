import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleModal } from "../../redux/transactions/slice";
import Header from "../../components/Header/Header";
import Navigation from "../../components/Navigation/Navigation";
import Balance from "../../components/Balance/Balance";
import CurrencyTab from "../CurrencyTab/CurrencyTab";
import Chart from "../../components/Chart/Chart";
import ModalAddTransaction from "../../components/transactions/ModalAddTransaction/ModalAddTransaction";
import ButtonAddTransactions from "../../components/transactions/ButtonAddTransactions/ButtonAddTransactions";
import css from "./DashboardPage.module.css";

const DashboardPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const isModalOpen = useSelector(
    (state) => state.transactions?.isModalOpen || false,
  );

  const handleOpenModal = () => {
    dispatch(toggleModal()); // toggleModal() ile çağır (true/false otomatik döner)
  };

  // Check if we're on statistics page
  const isStatisticsPage = location.pathname.includes('/statistics');

  return (
    <div className={css.dashboardPage}>
      <Header />

  <div className={`${css.container} ${isStatisticsPage ? css.statisticsMode : ""}`}>
        {/* Left Sidebar: Navigation + Balance + Chart (on Statistics tablet) */}
        <aside className={css.leftSidebar}>
          <div className={css.navSection}>
            <Navigation />
          </div>
          <div className={css.balanceSection}>
            <Balance />
          </div>
          {/* Tablet-only Chart: render inside the left sidebar so on tablet the chart sits under Balance */}
          {isStatisticsPage && (
            <div className={css.chartSectionTablet}>
              <Chart />
            </div>
          )}
          {/* Desktop: Currency inside sidebar (keep sidebar focused on navigation/balance/currency) */}
          <div className={css.currencySectionDesktop}>
            <CurrencyTab />
          </div>
        </aside>

        {/* Tablet: Currency (show on non-statistics pages) */}
        {!isStatisticsPage && (
          <div className={css.currencySectionTablet}>
            <CurrencyTab />
          </div>
        )}

        {/* Transactions / main content */}
        {isStatisticsPage ? (
          // In statistics mode we render the route content into the right-side stats area
          <div className={css.statsArea}>
            <Outlet />
          </div>
        ) : (
          <main className={css.main}>
            <Outlet /> {/* HomeTab buraya render olur */}
          </main>
        )}
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
