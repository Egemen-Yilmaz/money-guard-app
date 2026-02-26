import styles from './LoginPage.module.css';
import LoginForm from '../../features/auth/LoginForm';

export default function LoginPage() {
  return (
    <div className={styles.wrapper}>
      {/* Background Glow Effects */}
      <div className={`${styles.bgGlow} ${styles.bgGlow1}`} aria-hidden="true"></div>
      <div className={`${styles.bgGlow} ${styles.bgGlow2}`} aria-hidden="true"></div>
      <div className={`${styles.bgGlow} ${styles.bgGlow3}`} aria-hidden="true"></div>
      <div className={`${styles.bgGlow} ${styles.bgGlow4}`} aria-hidden="true"></div>
      <div className={`${styles.bgGlow} ${styles.bgGlow5}`} aria-hidden="true"></div>
      
      {/* Glassmorphism Card */}
      <div className={styles.card}>
        <LoginForm />
      </div>
    </div>
  );
}
