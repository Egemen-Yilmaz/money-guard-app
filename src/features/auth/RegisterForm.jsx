import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { toastError, toastSuccess } from '../../utils/toast'; 
import { register as registerAction } from './authOperations';
import PasswordStrengthBar from 'react-password-strength-bar-with-style-item'; 
import styles from './RegisterForm.module.css';

// Doğrulama Şeması (Yup)
const schema = yup.object({
  name: yup.string().required('İsim zorunludur'),
  email: yup.string().email('Geçerli bir e-posta giriniz').required('E-posta zorunludur'),
  password: yup
    .string()
    .min(6, 'Şifre en az 6 karakter olmalı')
    .max(12, 'Şifre en fazla 12 karakter olmalı')
    .required('Şifre zorunludur'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Şifreler eşleşmiyor')
    .required('Şifre tekrarı zorunludur'),
});

export default function RegisterForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(schema) });

  // Şifre alanını izliyoruz (Kütüphaneye prop olarak geçmek için)
  // eslint-disable-next-line react-hooks/incompatible-library
  const passwordValue = watch('password', '');

  const onSubmit = async (data) => {
    try {
      // The backend expects `username` (not `name`). Map `name` -> `username`.
      const { confirmPassword: _confirmPassword, name, ...rest } = data;
      const payload = { username: name, ...rest };

      await dispatch(registerAction(payload));

      toastSuccess('Kayıt başarılı! Yönlendiriliyorsunuz...');
      navigate('/home');
      
    } catch (error) {
      // Try to surface server validation errors (often in error.response.data)
      const serverMessage =
        error?.response?.data?.message ||
        error?.response?.data?.errors ||
        error?.message ||
        'Kayıt işlemi başarısız oldu.';

      // If serverMessage is an array or object, convert to readable string
      const messageText =
        typeof serverMessage === 'string'
          ? serverMessage
          : Array.isArray(serverMessage)
          ? serverMessage.join(', ')
          : JSON.stringify(serverMessage);

      toastError(messageText);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={styles.logo}>Money Guard</h2>

      {/* Name Alanı */}
      <div className={styles.inputWrapper}>
        <span className={styles.icon}>👤</span>
        <input 
          className={styles.input} 
          placeholder="Name" 
          {...register('name')} 
        />
      </div>
      {errors.name && <p className={styles.errorText}>{errors.name.message}</p>}

      {/* Email Alanı */}
      <div className={styles.inputWrapper}>
        <span className={styles.icon}>✉️</span>
        <input 
          className={styles.input} 
          placeholder="E-mail" 
          {...register('email')} 
        />
      </div>
      {errors.email && <p className={styles.errorText}>{errors.email.message}</p>}

      {/* Şifre Alanı */}
      <div className={styles.inputWrapper}>
        <span className={styles.icon}>🔒</span>
        <input 
          type="password" 
          className={styles.input} 
          placeholder="Password" 
          {...register('password')} 
        />
      </div>
      {errors.password && <p className={styles.errorText}>{errors.password.message}</p>}

      {/* Şifre Tekrar Alanı */}
      <div className={styles.inputWrapper}>
        <span className={styles.icon}>🔒</span>
        <input 
          type="password" 
          className={styles.input} 
          placeholder="Confirm password" 
          {...register('confirmPassword')} 
        />
      </div>
      {errors.confirmPassword && <p className={styles.errorText}>{errors.confirmPassword.message}</p>}

      {/* 2. Kütüphane ile Dinamik Şifre Gücü Çubuğu */}
      <div style={{ marginBottom: '20px' }}>
        <PasswordStrengthBar 
          password={passwordValue} 
          minLength={6} 
          scoreWords={['Zayıf', 'İdare Eder', 'İyi', 'Güçlü', 'Çok Güçlü']} // Opsiyonel: Metinleri Türkçeleştirebilirsiniz
          shortScoreWord="Çok Kısa"
        />
      </div>

      {/* Register Butonu */}
      <button 
        type="submit" 
        className={styles.buttonPrimary}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'KAYDEDİLİYOR...' : 'REGISTER'}
      </button>
      
      {/* LOG IN Butonu */}
      <Link 
        to="/login" 
        className={styles.buttonSecondary}
        style={{ textAlign: 'center', textDecoration: 'none', display: 'block', boxSizing: 'border-box' }}
      >
        LOG IN
      </Link>
    </form>
  );
}