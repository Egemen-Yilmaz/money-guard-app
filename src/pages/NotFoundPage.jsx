import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './NotFoundPage.module.css';

const NotFoundPage = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth?.isLoggedIn);

  const handleBack = () => {
    if (isLoggedIn) {
      navigate('/home');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>404</h1>
        <p className={styles.message}>Aradığınız sayfa bulunamadı.</p>
        <button className={styles.button} onClick={handleBack}>
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
