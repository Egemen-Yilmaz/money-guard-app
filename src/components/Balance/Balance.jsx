// src/components/Balance/Balance.jsx
import React from "react";
import { useSelector } from "react-redux";
import css from "./Balance.module.css";

const Balance = () => {
  const totalBalance = useSelector((state) => state.finance?.totalBalance || 0);
  const isLoading = useSelector((state) => state.global?.isLoading || false);

  if (isLoading) {
    return <div className={css.loading}>Balance is loading...</div>;
  }

  const isNegative = totalBalance < 0;
  const formattedBalance = Math.abs(totalBalance).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <div className={css.balanceCard}>
      <h3 className={css.title}>Balance</h3>
      <div className={`${css.value} ${isNegative ? css.negative : ""}`}>
        {isNegative ? "-" : ""}
        {formattedBalance} €
      </div>
    </div>
  );
};

export default Balance;
