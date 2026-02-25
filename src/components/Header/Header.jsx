import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../features/auth/authOperations';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toastError } from '../../utils/toast';
import styles from './Header.module.css';
 

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const email = useSelector((state) => state.auth.user?.email);
  const username = email ? email.split('@')[0] : 'User';

  const handleLogout = async () => {
    try {
  await dispatch(logout());
    } catch (error) {
      toastError(`Çıkış yapılırken bir hata oluştu: ${error}`);
    } finally {
      setOpen(false);
      navigate('/login');
    }
  };

  return (
    <header className={styles.header}>
      {/* Logo ve Marka İsmi */}
      <div className={styles.logoContainer}>
        <div className={styles.logoIcon} style={{ width: '28px', height: '28px', background: '#e0c35c', mask: 'url(#logo-mask)', WebkitMask: 'url(#logo-mask)' }}>
           {/* SVG logonuzu buraya yerleştirebilirsiniz */}
           <span style={{ fontSize: '24px' }}>🛡️</span>
        </div>
        <h2 className={styles.logoText}>Money Guard</h2>
      </div>

      {/* Kullanıcı Adı ve Çıkış */}
      <div className={styles.userSection}>
        <span className={styles.userName}>{username}</span>
        
        <button 
  onClick={() => setOpen(true)}
  className={styles.exitButton}
  aria-label="Exit"
>
  <svg 
    width="18" 
    height="18" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
    <polyline points="16 17 21 12 16 7"></polyline>
    <line x1="21" y1="12" x2="9" y2="12"></line>
  </svg>

  <span className={styles.exitText}>Exit</span>
</button>
      </div>

      {/* Çıkış Onay Modalı */}
     {open && (
        <div className={styles.modalOverlay}>
          <h2 className={styles.modalTitle}>
            Are you sure you want to log out?
          </h2>
          <div className={styles.modalActions}>
            <button onClick={handleLogout} className={styles.confirmBtn}>
              LOGOUT
            </button>
            <button onClick={() => setOpen(false)} className={styles.cancelBtn}>
              CANCEL
            </button>
          </div>
        </div>
      )}
    </header>
  );
}