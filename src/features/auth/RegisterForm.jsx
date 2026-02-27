import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { toastError, toastSuccess } from '../../utils/toast'; 
import { register as registerAction } from './authOperations';
import { useMemo } from 'react';
import Icon from '../../components/Icon/Icon';
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

  // Şifre alanını izliyoruz (PasswordStrengthBar için)
  const passwordValue = watch('password', '');

  // Small inline password strength estimator to avoid a heavy dependency.
  // Score: 0..4 based on length and character categories.
  function PasswordStrength({ password, minLength = 6, scoreWords = ['Weak', 'Okay', 'Good', 'Strong', 'Very Strong'], shortScoreWord = 'Too short' }) {
    const score = useMemo(() => {
      if (!password) return 0;
      let points = 0;
      if (password.length >= minLength) points += 1;
      if (/[a-z]/.test(password)) points += 1;
      if (/[A-Z]/.test(password)) points += 1;
      if (/[0-9]/.test(password)) points += 1;
      if (/[^A-Za-z0-9]/.test(password)) points += 1;
      // normalize to 0..4
      const normalized = Math.min(4, Math.max(0, points - 1));
      return normalized;
    }, [password, minLength]);

    const label = password.length < minLength ? shortScoreWord : scoreWords[Math.max(0, Math.min(score, scoreWords.length - 1))];
    const pct = ((score / 4) * 100) || 0;
    const getColor = () => {
      if (!password) return '#e0e0e0';
      if (score <= 1) return '#ef4444'; // red
      if (score === 2) return '#f59e0b'; // amber
      if (score === 3) return '#84cc16'; // yellow-green
      return '#16a34a'; // green
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{ height: 8, background: '#f3f4f6', borderRadius: 4, overflow: 'hidden' }}>
          <div style={{ width: `${pct}%`, height: '100%', background: getColor(), transition: 'width 160ms ease' }} />
        </div>
        <div style={{ fontSize: 12, color: '#374151' }}>{label}</div>
      </div>
    );
  }

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
      <div className={styles.logoContainer}>
        <Icon name="icon-icon-logo" width={28} height={28} />
        <h2 className={styles.logoText}>Money Guard</h2>
      </div>

      {/* Name Alanı */}
      <div className={styles.inputWrapper}>
        <Icon name="icon-icon-user" width={24} height={24} className={styles.icon} />
        <input 
          className={styles.input} 
          placeholder="Name"
          autoComplete="name"
          {...register('name')} 
        />
      </div>
      {errors.name && <p className={styles.errorText}>{errors.name.message}</p>}

      {/* Email Alanı */}
      <div className={styles.inputWrapper}>
        <Icon name="icon-icon-email" width={24} height={24} className={styles.icon} />
        <input 
          className={styles.input} 
          placeholder="E-mail"
          type="email"
          autoComplete="email"
          {...register('email')} 
        />
      </div>
      {errors.email && <p className={styles.errorText}>{errors.email.message}</p>}

      {/* Şifre Alanı */}
      <div className={styles.inputWrapper}>
        <Icon name="icon-icon-lock" width={24} height={24} className={styles.icon} />
          <input 
          type="password" 
          className={styles.input} 
          placeholder="Password"
          autoComplete="new-password"
            {...register('password')}
        />
      </div>
      {errors.password && <p className={styles.errorText}>{errors.password.message}</p>}

      {/* Şifre Tekrar Alanı */}
      <div className={styles.inputWrapper}>
        <Icon name="icon-icon-lock" width={24} height={24} className={styles.icon} />
        <input 
          type="password" 
          className={styles.input} 
          placeholder="Confirm password"
          autoComplete="new-password"
          {...register('confirmPassword')} 
        />
      </div>
      {errors.confirmPassword && <p className={styles.errorText}>{errors.confirmPassword.message}</p>}

      {/* Password Strength Bar */}
      <div className={styles.passwordStrengthWrapper}>
        <PasswordStrength
          password={passwordValue}
          minLength={6}
          scoreWords={["Weak", "Okay", "Good", "Strong", "Very Strong"]}
          shortScoreWord="Too short"
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
      >
        LOG IN
      </Link>
    </form>
  );
}