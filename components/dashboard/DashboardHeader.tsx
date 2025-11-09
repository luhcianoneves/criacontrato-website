import React from 'react';
import { User } from '../../types';

interface DashboardHeaderProps {
  user: User;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ user }) => {
  const planColors = {
    'Gratuito': 'bg-gray-200 text-gray-800',
    'Pro': 'bg-green-100 text-green-800',
    'Business': 'bg-purple-100 text-purple-800',
  }
  return (
    <header className="bg-white shadow-sm p-4 flex justify-end items-center">
      <div className="flex items-center space-x-4">
        <div className="text-right">
          <div className="font-semibold">{user.name}</div>
          <div className="text-sm text-gray-500">{user.email}</div>
        </div>
         <span className={`px-2 py-1 text-xs font-semibold rounded-full ${planColors[user.plan]}`}>
            Plano {user.plan}
          </span>
        <div className="w-10 h-10 rounded-full bg-brand-primary text-white flex items-center justify-center font-bold">
          {user.name.charAt(0).toUpperCase()}
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;