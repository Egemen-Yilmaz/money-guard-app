import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom'; // Link eklendi
import { toast } from 'react-toastify'; // Bildirimler için eklendi
import { registerUser } from './authOperations';
import styles from './RegisterForm.module.css';

// 1. Doğrulama Şeması (Yup)
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

  // 2. React Hook Form Kurulumu (isSubmitting eklendi)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(schema) });

  // 3. Şifre Gücü Hesaplama (Derived State)
  const passwordValue = watch('password', '');
  
  const calculateStrength = (val) => {
    let s = 0;
    if (val.length > 5) s += 30;
    if (/[A-Z]/.test(val)) s += 30;
    if (/[0-9]/.test(val)) s += 40;
    return s;
  };

  const strength = calculateStrength(passwordValue);

  // 4. Form Gönderimi (Güncellendi)
  const onSubmit = async (data) => {
    try {
      const { confirmPassword, ...submitData } = data;
      
      // await ve unwrap() ile işlemin bitmesini bekliyoruz
      await dispatch(registerUser(submitData)).unwrap();
      
      // İşlem başarılıysa bildirim göster ve yönlendir
      toast.success('Kayıt başarılı! Yönlendiriliyorsunuz...');
      navigate('/home'); 
      
    } catch (error) {
      // Backend bir hata döndürdüyse (örneğin e-posta kullanımda)
      toast.error(error || 'Kayıt işlemi başarısız oldu.');
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

      {/* Dinamik Şifre Gücü Çubuğu */}
      <div className={styles.progress}>
        <div 
          className={styles.progressBar}
          style={{ 
            width: `${strength}%`, 
            background: strength === 0 ? 'transparent' : strength < 50 ? '#ff6b6b' : strength < 80 ? '#ffb347' : '#4caf50' 
          }} 
        />
      </div>

      {/* Register Butonu (isSubmitting ile güncellendi) */}
      <button 
        type="submit" 
        className={styles.buttonPrimary}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'KAYDEDİLİYOR...' : 'REGISTER'}
      </button>
      
      {/* Yönlendirme eklenmiş LOG IN butonu (Link'e çevrildi) */}
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