import React from "react";

const Balance = ({ amount = 0 }) => {
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
