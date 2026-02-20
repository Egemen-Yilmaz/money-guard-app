import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";
import Navigation from "../../components/Navigation/Navigation";
import Balance from "../../components/Balance/Balance";
import css from "./DashboardPage.module.css";

const DashboardPage = () => {
  return (
    <div className={css.dashboardPage}>
      <Header />
      <div className={css.container}>
        {/* Sidebar: mobil üstte, tablet+ solda */}
        <aside className={css.leftSidebar}>
          <Navigation />
        </aside>

        {/* Ana içerik */}
        <main className={css.main}>
          <Balance />
          <Outlet /> {/* HomeTab, StatisticsTab, CurrencyTab buraya gelir */}
        </main>
      </div>
    </div>
  );
};
export default DashboardPage;
