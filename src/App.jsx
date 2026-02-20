import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loader from "./components/Loader/Loader";
import "./App.css";

// Sayfaların Lazy Load ile yüklenmesi (Performans için)
const LoginPage = lazy(() => import("./pages/LoginPage/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage/RegisterPage"));
const DashboardPage = lazy(() => import("./pages/DashboardPage/DashboardPage"));
const HomeTab = lazy(() => import("./pages/HomeTab/HomeTab"));
const StatisticsTab = lazy(() => import("./pages/StatisticsTab/StatisticsTab"));
const CurrencyTab = lazy(() => import("./pages/CurrencyTab/CurrencyTab"));

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Dashboard altındaki sayfalar (Home, Statistics vb.) */}
        <Route path="/dashboard" element={<DashboardPage />}>
          <Route index element={<Navigate to="home" />} />
          <Route path="home" element={<HomeTab />} />
          <Route path="statistics" element={<StatisticsTab />} />
          {/* Diğer alt rotalar buraya gelecek */}

          {/* Sadece Mobil için */}
          <Route path="currency" element={<CurrencyTab />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Suspense>
  );
}

export default App;
