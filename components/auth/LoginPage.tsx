import React from 'react';
import { View } from '../../types';
import Button from '../shared/Button';
import { Logo } from '../icons';

interface LoginPageProps {
  onNavigate: (view: View) => void;
  onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onNavigate, onLogin }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-light">
      <div className="w-full max-w-md p-8 space-y-8 bg-white shadow-lg rounded-xl">
        <div className="text-center">
            <div onClick={() => onNavigate(View.LANDING)} className="cursor-pointer text-brand-dark inline-block">
                <Logo />
            </div>
          <h2 className="mt-6 font-display text-3xl font-extrabold text-brand-dark">
            Acessar minha conta
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">Email</label>
              <input id="email-address" name="email" type="email" autoComplete="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-brand-primary focus:border-brand-primary focus:z-10 sm:text-sm" placeholder="Email" />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Senha</label>
              <input id="password" name="password" type="password" autoComplete="current-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-brand-primary focus:border-brand-primary focus:z-10 sm:text-sm" placeholder="Senha" />
            </div>
          </div>
          
          <div>
            <Button type="submit" className="w-full" size="md">
              Entrar
            </Button>
          </div>
        </form>
        <p className="mt-2 text-center text-sm text-gray-600">
          Não tem uma conta?{' '}
          <button onClick={() => onNavigate(View.REGISTER)} className="font-medium text-brand-primary hover:text-blue-700">
            Crie uma agora
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;