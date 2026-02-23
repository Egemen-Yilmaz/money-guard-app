import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteTransaction, fetchTransactions } from '../../redux/transactions/operations';
import { refreshCurrentUser } from '../auth/authOperations';
import { toastSuccess, toastError } from '../../utils/toast';
import ButtonAddTransactions from '../../components/transactions/ButtonAddTransactions/ButtonAddTransactions';
import ModalAddTransaction from '../../components/transactions/ModalAddTransaction/ModalAddTransaction';

const TransactionsList = ({ items = [] }) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      <ButtonAddTransactions onClick={() => setIsModalOpen(true)} />
      <ModalAddTransaction isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default TransactionsList;
