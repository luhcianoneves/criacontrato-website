
import React, { useState, useCallback } from 'react';
import LandingPage from './components/landing/LandingPage';
import LoginPage from './components/auth/LoginPage';
import RegisterPage from './components/auth/RegisterPage';
import Dashboard from './components/dashboard/Dashboard';
import { View } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.LANDING);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<{ name: string; email: string; plan: 'Gratuito' | 'Pro' | 'Business' } | null>(null);

  const navigate = useCallback((view: View) => {
    setCurrentView(view);
  }, []);

  const handleLogin = useCallback(() => {
    setIsAuthenticated(true);
    setUser({ name: 'Usuário Teste', email: 'teste@email.com', plan: 'Gratuito' });
    navigate(View.DASHBOARD);
  }, [navigate]);

  const handleLogout = useCallback(() => {
    setIsAuthenticated(false);
    setUser(null);
    navigate(View.LANDING);
  }, [navigate]);
  
  const handleUpgradePlan = useCallback(() => {
    if(user) {
        setUser({...user, plan: 'Pro'});
    }
  }, [user]);

  const renderView = () => {
    if (isAuthenticated && user) {
      return <Dashboard user={user} onLogout={handleLogout} onUpgrade={handleUpgradePlan} />;
    }
    
    switch (currentView) {
      case View.LOGIN:
        return <LoginPage onNavigate={navigate} onLogin={handleLogin} />;
      case View.REGISTER:
        return <RegisterPage onNavigate={navigate} onLogin={handleLogin} />;
      case View.LANDING:
      default:
        return <LandingPage onNavigate={navigate} />;
    }
  };

  return (
    <div className="bg-white font-sans text-gray-800">
      {renderView()}
    </div>
  );
};

export default App;
