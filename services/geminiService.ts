
import { GoogleGenAI } from "@google/genai";

// Assume API_KEY is set in the environment.
if (!process.env.API_KEY) {
    // In a real app, you would have a more robust way to handle this,
    // but for this example, we'll throw an error if the key is missing.
    throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

interface ContractData {
    type: string;
    contractor: string;
    contractee: string;
    value: string;
    term: string;
    clauses: string;
}

export const generateContractPrompt = async (data: ContractData): Promise<string> => {
    const prompt = `
        Você é um especialista em direito contratual brasileiro. Crie um contrato profissional e juridicamente sólido com base nos seguintes detalhes.
        A saída deve ser um texto corrido, formatado de forma clara e profissional, sem usar Markdown.

        **Tipo de Contrato:** ${data.type}
        **Contratante:** ${data.contractor} (doravante denominado CONTRATANTE)
        **Contratado:** ${data.contractee} (doravante denominado CONTRATADO)
        **Objeto do Contrato:** Prestação de serviços relacionados a ${data.type}.
        **Valor:** ${data.value || 'A ser definido entre as partes.'}
        **Prazo de Vigência:** ${data.term || 'Indeterminado, podendo ser rescindido com aviso prévio de 30 dias.'}
        **Cláusulas Adicionais Solicitadas pelo Usuário:** ${data.clauses || 'Nenhuma.'}

        O contrato deve ser claro, completo e seguir as melhores práticas legais do Brasil.
        Inclua cláusulas padrão obrigatórias como:
        1.  **DO OBJETO:** Detalhe os serviços a serem prestados.
        2.  **DAS OBRIGAÇÕES DO CONTRATANTE:** Especifique as responsabilidades do contratante.
        3.  **DAS OBRIGAÇÕES DO CONTRATADO:** Especifique as responsabilidades do contratado.
        4.  **DO PREÇO E DA FORMA DE PAGAMENTO:** Detalhe os valores e como serão pagos.
        5.  **DA VIGÊNCIA E RESCISÃO:** Condições de início, término e quebra de contrato.
        6.  **DA CONFIDENCIALIDADE:** Acordo de não divulgação de informações.
        7.  **DO FORO:** Defina a comarca para resolver disputas judiciais.

        No final, adicione os campos para assinatura:
        _________________________
        ${data.contractor}
        CONTRATANTE

        _________________________
        ${data.contractee}
        CONTRATADO
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        return response.text;
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Failed to generate contract from AI service.");
    }
};
