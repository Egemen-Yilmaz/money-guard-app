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
        <aside className={css.leftSidebar}>
          <Navigation />
        </aside>
        <main>
          <Balance />
          <Outlet />
        </main>
      </div>
    </div>
  );
};
export default DashboardPage;
