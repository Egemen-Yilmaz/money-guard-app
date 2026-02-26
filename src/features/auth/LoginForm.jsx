import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { toastError, toastSuccess } from '../../utils/toast';
import { login } from './authOperations';
import Icon from '../../components/Icon/Icon';
import styles from './LoginForm.module.css';

// 1. Doğrulama Şeması (Yup)
const schema = yup.object({
  email: yup
    .string()
    .email('Lütfen geçerli bir e-posta adresi giriniz')
    .required('E-posta alanı zorunludur'),
  password: yup
    .string()
    .min(6, 'Şifre en az 6 karakter olmalıdır')
    .max(12, 'Şifre en fazla 12 karakter olmalıdır')
    .required('Şifre alanı zorunludur'),
});

export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 2. React Hook Form Kurulumu
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(schema) });

  // 3. Form Gönderimi (Submit)
  const onSubmit = async (data) => {
    try {
      // Backend'e istek atılır. unwrap() ile dönen sonucu veya hatayı anında yakalarız
  await dispatch(login(data));
      
  // İstek başarılıysa:
  toastSuccess('Başarıyla giriş yapıldı!');
      
      // Kullanıcıyı özel DashboardPage (veya altındaki home) sayfasına yönlendir
      navigate('/home'); 
      
    } catch (error) {
      // Backend bir hata döndürdüyse (örneğin "Şifre yanlış"):
  toastError(error || 'Giriş yapılamadı. Lütfen bilgilerinizi kontrol edin.');
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.logoContainer}>
        <Icon name="icon-icon-logo" width={28} height={28} /> 
        <h2 className={styles.logoText}>Money Guard</h2>
      </div>

      {/* Email Alanı */}
      <div className={styles.inputWrapper}>
        <Icon name="icon-icon-email" width={24} height={24} className={styles.inputIcon} aria-hidden="true" />
        <input 
          className={styles.input} 
          type="email"
          placeholder="E-mail"
          autoComplete="email"
          aria-label="Email address"
          {...register('email')} 
        />
      </div>
      {errors.email && <p className={styles.errorText}>{errors.email.message}</p>}

      {/* Şifre Alanı */}
      <div className={styles.inputWrapper}>
        <Icon name="icon-icon-lock" width={24} height={24} className={styles.inputIcon} aria-hidden="true" />
        <input 
          type="password" 
          className={styles.input} 
          placeholder="Password"
          autoComplete="current-password"
          aria-label="Password"
          {...register('password')} 
        />
      </div>
      {errors.password && <p className={styles.errorText}>{errors.password.message}</p>}

      {/* Butonlar */}
      <button 
        type="submit" 
        className={styles.buttonPrimary} 
        disabled={isSubmitting}
      >
        {isSubmitting ? 'GİRİŞ YAPILIYOR...' : 'LOG IN'}
      </button>
      
      {/* Kayıt Ol Sayfasına Yönlendirme */}
      <Link 
        to="/register" 
        className={styles.buttonSecondary}
      >
        REGISTER
      </Link>
    </form>
  );
}
