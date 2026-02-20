import { Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Loader from './components/Loader/Loader';
import HomeTab from './pages/HomeTab';
import StatisticsTab from './pages/StatisticsTab';
import CurrencyTab from './pages/CurrencyTab';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Sayfaların Lazy Load ile yüklenmesi (Performans için)
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));

function App() {
  return (
    <>
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        {/* Dashboard altındaki sayfalar (Home, Statistics vb.) */}
        <Route path="/" element={<DashboardPage />}>
          <Route index element={<Navigate to="/home" />} />
          <Route path="home" element={<HomeTab />} />
          <Route path="statistics" element={<StatisticsTab />} />
          {/* Diğer alt rotalar buraya gelecek */}

          {/* Sadece Mobil için */}
          <Route path="currency" element={<CurrencyTab />} />
        </Route>
        
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Suspense>

    {/* 2. Açılır mesajların ekranda görünmesini sağlayan bileşen */}
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    </>
  );
}

export default App;