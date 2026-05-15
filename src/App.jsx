import { useState, useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import SplashScreen from "./components/pages/splash";
import DashboardLayout from "./components/layouts/dashboard";
import DashboardPage from "./components/pages/dashboard";
import BudgetPage from "./components/pages/budgets";
import InsightsPage from "./components/pages/insights";
import TransactionsPage from "./components/pages/transactions";
import GoalsPage from "./components/pages/goals";
import CardsPage from "./components/pages/cards";
import ProfilePage from "./components/pages/profile";
import SettingsPage from "./components/pages/settings";
import NotFoundPage from "./components/pages/not-found";

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    setTimeout(() => setShowSplash(false), 3000);
  }, []);

  if (showSplash) return <SplashScreen />;

  return (
    <Routes>
      {/* Dashboard routes — all share DashboardLayout */}
      <Route element={<DashboardLayout />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/budget" element={<BudgetPage />} />
        <Route path="/insights" element={<InsightsPage />} />
        <Route path="/transactions" element={<TransactionsPage />} />
        <Route path="/goals" element={<GoalsPage />} />
        <Route path="/cards" element={<CardsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>

      {/* 404 catch-all */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
