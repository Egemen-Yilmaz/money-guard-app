import React from 'react';
import { useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FiCalendar } from 'react-icons/fi';
import { updateTransaction, fetchTransactions } from '../../../redux/transactions/operations';
import { refreshCurrentUser } from '../../../features/auth/authOperations';
import { toastError, toastSuccess } from '../../../utils/toast';
import styles from './EditTransactionForm.module.css';

const schema = yup.object().shape({
    amount: yup.number()
        .transform((value) => Number.isNaN(value) ? null : value)
        .nullable()
        .required('Amount is required')
        .positive('Must be positive'),
    date: yup.date().required('Date is required'),
    comment: yup.string().required('Comment is required'),
});

// TransactionsItem bu bileşene transaction objesini prop olarak göndermeli.
// Eğer slice yapısı değişirse sadece bu dosyadaki selector'ı güncellemek yeterli.
const EditTransactionForm = ({ transaction, onClose }) => {
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            amount: transaction?.amount !== undefined ? Math.abs(transaction.amount) : '',
            date: transaction?.transactionDate ? new Date(transaction.transactionDate) : (transaction?.date ? new Date(transaction.date) : new Date()),
            comment: transaction?.comment || '',
        },
    });

    const onSubmit = async (data) => {
        try {
            const isIncome = transaction?.type && transaction.type.toLowerCase() === 'income';

            // Backend-friendly formatting:
            const localDateStr = new Date(data.date.getTime() - (data.date.getTimezoneOffset() * 60000)).toISOString().split('T')[0];

            const payload = {
                id: transaction.id,
                transactionDate: localDateStr,
                type: isIncome ? 'INCOME' : 'EXPENSE',
                categoryId: transaction.categoryId || transaction.category?.id || "063f1132-ba5d-42b4-951d-44011ca46262",
                comment: data.comment,
                amount: isIncome ? Math.abs(data.amount) : -Math.abs(data.amount)
            };

            await dispatch(updateTransaction(payload)).unwrap();

            toastSuccess('Transaction updated successfully!');
            dispatch(fetchTransactions());
            dispatch(refreshCurrentUser());

            onClose();
        } catch (error) {
            console.error('Failed to update transaction:', error);
            toastError(error?.message || 'Error updating transaction');
        }
    };

    const isIncome = transaction?.type && transaction.type.toLowerCase() === 'income';

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Edit transaction</h2>

            <div className={styles.typeIndicator}>
                <span className={isIncome ? styles.activeLabelIncome : styles.inactiveLabel}>Income</span>
                <span className={styles.separator}> / </span>
                <span className={!isIncome ? styles.activeLabelExpense : styles.inactiveLabel}>Expense</span>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <div className={styles.row}>
                    <div className={styles.field}>
                        <input type="number" step="0.01" placeholder="0.00" {...register('amount')} className={`${styles.input} ${styles.amountInput}`} />
                        {errors.amount && <span className={styles.error}>{errors.amount.message}</span>}
                    </div>

                    <div className={styles.field}>
                        <Controller
                            control={control}
                            name="date"
                            render={({ field }) => (
                                <div className={styles.dateWrapper}>
                                    <DatePicker
                                        selected={field.value}
                                        onChange={(date) => field.onChange(date)}
                                        dateFormat="dd.MM.yyyy"
                                        className={`${styles.input} ${styles.dateInput}`}
                                    />
                                    <FiCalendar className={styles.calendarIcon} />
                                </div>
                            )}
                        />
                        {errors.date && <span className={styles.error}>{errors.date.message}</span>}
                    </div>
                </div>

                <div className={styles.field}>
                    <input type="text" placeholder="Comment" {...register('comment')} className={styles.input} />
                    {errors.comment && <span className={styles.error}>{errors.comment.message}</span>}
                </div>

                <div className={styles.actions}>
                    <button type="submit" className={styles.submitButton}>SAVE</button>
                    <button type="button" onClick={onClose} className={styles.cancelButton}>CANCEL</button>
                </div>
            </form>
        </div>
    );
};

export default EditTransactionForm;
