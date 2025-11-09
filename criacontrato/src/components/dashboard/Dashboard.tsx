import React, { useState } from 'react';
import { User } from '../../types';
import Sidebar from './Sidebar';
import DashboardHeader from './DashboardHeader';
import MyContracts from './MyContracts';
import NewContract from './NewContract';
import Plans from './Plans';

interface DashboardProps {
  user: User;
  onLogout: () => void;
  onUpgrade: () => void;
}

type DashboardView = 'my-contracts' | 'new-contract' | 'plans';

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout, onUpgrade }) => {
  const [currentView, setCurrentView] = useState<DashboardView>('my-contracts');

  const renderContent = () => {
    switch (currentView) {
      case 'new-contract':
        return <NewContract user={user} onUpgrade={onUpgrade} />;
      case 'plans':
        return <Plans user={user} onUpgrade={onUpgrade} />;
      case 'my-contracts':
      default:
        return <MyContracts user={user} onUpgrade={onUpgrade} />;
    }
  };

  return (
    <div className="flex h-screen bg-brand-light">
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} onLogout={onLogout} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader user={user} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-brand-light p-4 md:p-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;