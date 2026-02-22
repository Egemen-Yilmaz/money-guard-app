import styles from './LoginPage.module.css';
import LoginForm from '../../features/auth/LoginForm';

export default function LoginPage() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <LoginForm />
      </div>
    </div>
  );
}
