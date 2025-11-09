
import React from 'react';
import { User, Contract } from '../../types';
import Button from '../shared/Button';
import Card from '../shared/Card';

interface MyContractsProps {
  user: User;
  onUpgrade: () => void;
}

const mockContracts: Contract[] = [
  { id: '1', title: 'Contrato de Prestação de Serviços', createdAt: '2023-10-26', status: 'Pro', parties: 'Empresa A & Empresa B' },
  { id: '2', title: 'Acordo de Parceria Comercial', createdAt: '2023-10-24', status: 'Pro', parties: 'Startup X & Investidor Y' },
  { id: '3', title: 'Contrato de Freelancer (Teste)', createdAt: '2023-10-22', status: 'Gratuito', parties: 'Joana Silva & Cliente Z' },
];

const MyContracts: React.FC<MyContractsProps> = ({ user }) => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-brand-dark-blue mb-6">Meus Contratos</h1>
      <Card className="!p-0">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Título</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data de Criação</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Ações</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockContracts.map((contract) => (
                <tr key={contract.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{contract.title}</div>
                    <div className="text-sm text-gray-500">{contract.parties}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{contract.createdAt}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${contract.status === 'Gratuito' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                      {contract.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                    <Button size="sm" variant="outline">Visualizar</Button>
                    <Button size="sm">Baixar</Button>
                    <Button size="sm" variant="secondary" className="!bg-red-600 hover:!bg-red-700">Excluir</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default MyContracts;
