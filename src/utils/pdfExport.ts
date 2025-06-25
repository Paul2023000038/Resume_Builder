import html2pdf from 'html2pdf.js';

/**
 * Exports the resume to PDF
 * @param resumeElement - The DOM element containing the resume to export
 * @param fileName - The name to give the exported PDF file
 */
export const exportToPdf = (resumeElement: HTMLElement, fileName: string = 'resume'): void => {
  const opt = {
    margin: 0.5,
    filename: `${fileName}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
  };

  // Add loading state or notification here if needed
  html2pdf().set(opt).from(resumeElement).save();
};