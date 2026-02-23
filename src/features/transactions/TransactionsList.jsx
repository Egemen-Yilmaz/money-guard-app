import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteTransaction, fetchTransactions } from '../../redux/transactions/operations';
import { refreshCurrentUser } from '../auth/authOperations';
import { toastSuccess, toastError } from '../../utils/toast';

const TransactionsList = ({ items = [] }) => {
  const dispatch = useDispatch();

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteTransaction(id)).unwrap();
      toastSuccess('Transaction deleted successfully!');
      dispatch(fetchTransactions());
      dispatch(refreshCurrentUser());
    } catch (error) {
      console.error('Failed to delete transaction:', error);
      toastError(error?.message || 'Error deleting transaction');
    }
  };

  return (
    <div>
      <h3>Transactions</h3>
      <ul>
        {items.map((t, i) => (
          <li key={t.id || i}>
            {JSON.stringify(t)}
            {t.id && (
              <button
                onClick={() => handleDelete(t.id)}
                style={{ marginLeft: '10px', color: 'red' }}
              >
                Delete
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionsList;
