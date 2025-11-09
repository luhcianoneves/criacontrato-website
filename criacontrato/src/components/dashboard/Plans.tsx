import React from 'react';
import { User } from '../../types';
import Button from '../shared/Button';
import Card from '../shared/Card';
import { CheckCircleIcon } from '../icons';

interface PlansProps {
  user: User;
  onUpgrade: () => void;
}

const Plans: React.FC<PlansProps> = ({ user, onUpgrade }) => {
  const isCurrentPlan = (planName: string) => user.plan === planName;

  return (
    <div>
      <h1 className="font-display text-3xl font-bold text-brand-dark mb-6">Planos e Pagamento</h1>
      <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        <Card className="flex flex-col">
          <h3 className="text-2xl font-bold text-brand-dark">Start</h3>
          <p className="font-display text-4xl font-bold my-4">Grátis</p>
          <ul className="space-y-2 text-gray-700 mb-8 flex-grow">
            <li className="flex items-start"><CheckCircleIcon className="w-5 h-5 text-green-500 mr-2 shrink-0 mt-1" /> 1 Contrato com marca d'água</li>
          </ul>
          <Button variant="outline" className="w-full" disabled>
            Seu plano atual
          </Button>
        </Card>
        <Card highlight={isCurrentPlan('Pro')} className="flex flex-col">
          <h3 className="text-2xl font-bold text-brand-dark">Pro</h3>
          <p className="font-display text-4xl font-bold my-4">R$59<span className="text-lg font-sans font-normal text-gray-500">/mês</span></p>
          <ul className="space-y-2 text-gray-700 mb-8 flex-grow">
            <li className="flex items-start"><CheckCircleIcon className="w-5 h-5 text-green-500 mr-2 shrink-0 mt-1" /> Contratos ilimitados</li>
            <li className="flex items-start"><CheckCircleIcon className="w-5 h-5 text-green-500 mr-2 shrink-0 mt-1" /> Download em PDF sem marca d'água</li>
            <li className="flex items-start"><CheckCircleIcon className="w-5 h-5 text-green-500 mr-2 shrink-0 mt-1" /> Todos os modelos de contrato</li>
          </ul>
          {isCurrentPlan('Pro') ? (
            <Button variant="primary" className="w-full" disabled>Seu plano atual</Button>
          ) : (
            <Button variant="primary" className="w-full" onClick={onUpgrade}>Fazer Upgrade</Button>
          )}
        </Card>
        <Card className="flex flex-col">
          <h3 className="text-2xl font-bold text-brand-dark">Business</h3>
          <p className="font-display text-4xl font-bold my-4">R$129<span className="text-lg font-sans font-normal text-gray-500">/mês</span></p>
          <ul className="space-y-2 text-gray-700 mb-8 flex-grow">
            <li className="flex items-start"><CheckCircleIcon className="w-5 h-5 text-green-500 mr-2 shrink-0 mt-1" /> Tudo do plano Pro</li>
            <li className="flex items-start"><CheckCircleIcon className="w-5 h-5 text-green-500 mr-2 shrink-0 mt-1" /> Múltiplos usuários</li>
            <li className="flex items-start"><CheckCircleIcon className="w-5 h-5 text-green-500 mr-2 shrink-0 mt-1" /> Logo personalizado</li>
          </ul>
           <Button variant="outline" className="w-full">Contate-nos</Button>
        </Card>
      </div>
    </div>
  );
};

export default Plans;