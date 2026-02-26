// src/components/LeftSideBar/LeftSideBar.jsx
import React from "react";
import Navigation from "../Navigation/Navigation";
import Balance from "../Balance/Balance";
import CurrencyTab from "../../pages/CurrencyTab/CurrencyTab";
import css from "./LeftSideBar.module.css";

const LeftSideBar = () => {
  return (
    <aside className={css.leftSideBar}>
      {/* Navigation her zaman en üstte */}
      <Navigation />

      {/* Balance her zaman sidebar içinde */}
      <div className={css.balanceSection}>
        <Balance />
      </div>

      {/* Currency sadece tablet ve desktop'ta sidebar içinde görünür */}
      <div className={css.currencySection}>
        <CurrencyTab />
      </div>
    </aside>
  );
};

export default LeftSideBar;
