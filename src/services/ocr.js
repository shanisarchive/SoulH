import Tesseract from 'tesseract.js';

export const extractTextFromPDF = async (pdfFile) => {
  const { data: { text } } = await Tesseract.recognize(pdfFile, 'eng');
  return text;
};
