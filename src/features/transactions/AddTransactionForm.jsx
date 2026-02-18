import React from 'react';

const AddTransactionForm = () => (
  <form>
    <h4>Add Transaction</h4>
    <input name="amount" placeholder="Amount" />
    <input name="desc" placeholder="Description" />
    <button type="submit">Add</button>
  </form>
);

export default AddTransactionForm;
