
import jsPDF from 'jspdf';

export const generatePdf = (text: string, addWatermark: boolean) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 15;
    const maxLineWidth = pageWidth - margin * 2;
    
    // Header
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('criaContrato.com.br', margin, margin);
    doc.setLineWidth(0.5);
    doc.line(margin, margin + 5, pageWidth - margin, margin + 5);

    // Body text
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    const lines = doc.splitTextToSize(text, maxLineWidth);
    doc.text(lines, margin, margin + 15);
    
    if (addWatermark) {
        doc.setFontSize(50);
        doc.setTextColor(200);
        doc.text('VERSÃO DE TESTE', pageWidth / 2, pageHeight / 2, { align: 'center', angle: -45 });
        doc.text('criaContrato.com.br', pageWidth / 2, pageHeight / 2 + 20, { align: 'center', angle: -45 });
        doc.setTextColor(0);
    }
    
    doc.save('contrato-gerado.pdf');
};
