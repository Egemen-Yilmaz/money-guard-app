import React from 'react';

const EditTransactionForm = ({ transaction }) => (
  <form>
    <h4>Edit Transaction</h4>
    <input name="amount" defaultValue={transaction?.amount} />
    <input name="desc" defaultValue={transaction?.desc} />
    <button type="submit">Save</button>
  </form>
);

export default EditTransactionForm;
