import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../features/auth/authOperations';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styles from './Header.module.css';

// Logo görselini buraya kendi projenin yapısına göre import etmelisin
// import logoImg from '../../assets/logo.svg'; 

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const email = useSelector((state) => state.auth.user?.email);
  const username = email ? email.split('@')[0] : 'User';

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
    } catch (error) {
      toast.error(`Çıkış yapılırken bir hata oluştu: ${error}`);
    } finally {
      localStorage.clear();
      setOpen(false);
      navigate('/login');
    }
  };

  return (
    <header className={styles.header}>
      {/* Logo ve Marka İsmi */}
      <div className={styles.logoContainer}>
        {/* Kendi logon varsa src içine ekle. Şimdilik div ile yer tutucu yaptım */}
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
          aria-label="Çıkış Yap"
        >
          {/* Sadece Tablet/Desktop'ta görünecek yazı */}
          <span className={styles.exitText}>Exit</span>
          
          {/* Görseldeki Çıkış SVG İkonu */}
          <svg 
            width="24" 
            height="24" 
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
        </button>
      </div>

      {/* Çıkış Onay Modalı */}
      {open && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <p className={styles.modalText}>Gerçekten çıkmak istiyor musun?</p>
            <div className={styles.modalActions}>
              <button onClick={handleLogout} className={styles.confirmBtn}>Evet</button>
              <button onClick={() => setOpen(false)} className={styles.cancelBtn}>Hayır</button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}