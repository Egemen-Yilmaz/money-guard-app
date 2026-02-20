import styles from './RegisterPage.module.css';
import RegisterForm from '../features/auth/RegisterForm';

export default function RegisterPage() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <RegisterForm />
      </div>
    </div>
  );
}
