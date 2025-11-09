import React, { useState, useCallback } from 'react';
import { User } from '../../types';
import Button from '../shared/Button';
import Card from '../shared/Card';
import Modal from '../shared/Modal';
import { generateContractPrompt } from '../../services/geminiService';
import { generatePdf } from '../../services/pdfService';

interface NewContractProps {
    user: User;
    onUpgrade: () => void;
}

const contractTypes = [
    "Prestação de Serviços",
    "Parceria Comercial",
    "Freelancer",
    "Consultoria",
    "Acordo de Confidencialidade (NDA)",
    "Contrato Social",
];

const NewContract: React.FC<NewContractProps> = ({ user, onUpgrade }) => {
    const [formData, setFormData] = useState({
        type: contractTypes[0],
        contractor: '',
        contractee: '',
        value: '',
        term: '',
        clauses: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [generatedContract, setGeneratedContract] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleGenerateContract = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        setGeneratedContract(null);

        try {
            const contractText = await generateContractPrompt(formData);
            setGeneratedContract(contractText);
        } catch (err) {
            setError('Falha ao gerar o contrato. Por favor, tente novamente.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, [formData]);

    const handleDownload = useCallback(() => {
        if (user.plan === 'Gratuito') {
            setIsUpgradeModalOpen(true);
        } else {
            if (generatedContract) {
                generatePdf(generatedContract, false);
            }
        }
    }, [user.plan, generatedContract]);
    
    const handlePreviewDownload = useCallback(() => {
        if (generatedContract) {
            generatePdf(generatedContract, true); // true for watermark
        }
    }, [generatedContract]);

    return (
        <div>
            <h1 className="font-display text-3xl font-bold text-brand-dark mb-6">Novo Contrato</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                    <form onSubmit={handleGenerateContract} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Tipo de Contrato</label>
                            <select name="type" value={formData.type} onChange={handleInputChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm rounded-md">
                                {contractTypes.map(type => <option key={type}>{type}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Nome do Contratante</label>
                            <input type="text" name="contractor" value={formData.contractor} onChange={handleInputChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Nome do Contratado</label>
                            <input type="text" name="contractee" value={formData.contractee} onChange={handleInputChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Valor (opcional)</label>
                            <input type="text" name="value" value={formData.value} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Prazo (opcional)</label>
                            <input type="text" name="term" value={formData.term} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Cláusulas Extras (opcional)</label>
                            <textarea name="clauses" value={formData.clauses} onChange={handleInputChange} rows={4} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm" placeholder="Ex: Multa por atraso, condições de pagamento..."></textarea>
                        </div>
                        <Button type="submit" disabled={isLoading} className="w-full">
                            {isLoading ? 'Gerando...' : 'Gerar Contrato'}
                        </Button>
                    </form>
                </Card>
                <Card className="flex flex-col">
                    <h2 className="text-xl font-bold text-brand-dark mb-4">Contrato Gerado</h2>
                    <div className="flex-grow bg-gray-50 p-4 rounded-md border border-gray-200 overflow-y-auto whitespace-pre-wrap font-mono text-sm">
                        {isLoading && <p className="text-gray-500">Aguardando a geração do contrato...</p>}
                        {error && <p className="text-red-500">{error}</p>}
                        {generatedContract ? generatedContract : !isLoading && <p className="text-gray-500">O conteúdo do seu contrato aparecerá aqui.</p>}
                    </div>
                    {generatedContract && (
                        <div className="mt-4 flex flex-col sm:flex-row gap-2">
                             {user.plan === 'Gratuito' && (
                                <Button onClick={handlePreviewDownload} variant="outline" className="w-full">
                                    Baixar com Marca D'água
                                </Button>
                            )}
                            <Button onClick={handleDownload} className="w-full">
                                Baixar Contrato Completo
                            </Button>
                        </div>
                    )}
                </Card>
            </div>
            <Modal isOpen={isUpgradeModalOpen} onClose={() => setIsUpgradeModalOpen(false)} title="Desbloqueie o Download Completo">
                <p className="text-gray-600 mb-6">O download de contratos completos e sem marca d'água está disponível apenas para assinantes.</p>
                <Button onClick={() => { onUpgrade(); setIsUpgradeModalOpen(false); }} className="w-full">
                    Assine o plano Pro por R$59/mês
                </Button>
            </Modal>
        </div>
    );
};

export default NewContract;