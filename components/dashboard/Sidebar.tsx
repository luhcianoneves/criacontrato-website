import React from 'react';
import { Logo } from '../icons';

interface SidebarProps {
  currentView: string;
  setCurrentView: (view: 'my-contracts' | 'new-contract' | 'plans') => void;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView, onLogout }) => {
  const navItems = [
    { id: 'my-contracts', label: 'Meus Contratos' },
    { id: 'new-contract', label: 'Novo Contrato' },
    { id: 'plans', label: 'Planos e Pagamento' },
  ];

  return (
    <aside className="w-64 bg-white text-gray-800 flex flex-col border-r border-gray-200">
      <div className="p-4 border-b border-gray-200 text-brand-dark">
        <Logo/>
      </div>
      <nav className="flex-1 px-2 py-4 space-y-2">
        {navItems.map(item => (
          <a
            key={item.id}
            href="#"
            onClick={(e) => { e.preventDefault(); setCurrentView(item.id as any); }}
            className={`flex items-center px-4 py-2 text-base font-medium rounded-lg transition-colors duration-200 ${
              currentView === item.id ? 'bg-indigo-100 text-brand-secondary' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {item.label}
          </a>
        ))}
      </nav>
      <div className="p-4 border-t border-gray-200">
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); onLogout(); }}
          className="flex items-center px-4 py-2 text-base font-medium rounded-lg text-gray-600 hover:bg-gray-100"
        >
          Sair
        </a>
      </div>
    </aside>
  );
};

export default Sidebar;