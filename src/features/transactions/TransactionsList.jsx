import React from 'react';

const TransactionsList = ({ items = [] }) => (
  <div>
    <h3>Transactions</h3>
    <ul>
      {items.map((t, i) => (
        <li key={i}>{JSON.stringify(t)}</li>
      ))}
    </ul>
  </div>
);

export default TransactionsList;
