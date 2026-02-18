import React from 'react';

const Balance = ({ amount = 0 }) => {
  return (
    <div className="balance">
      <h3>Balance</h3>
      <p>{amount}</p>
    </div>
  );
};

export default Balance;
