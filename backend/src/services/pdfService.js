// services/pdfService.js
// Service for extracting text from PDF files

import pdfParse from 'pdf-parse'

export const extractTextFromPDF = async (buffer) => {
  try {
    const data = await pdfParse(buffer)
    return data.text
  } catch (error) {
    console.error('Error parsing PDF:', error)
    throw new Error('Failed to extract text from PDF')
  }
}

export default {
  extractTextFromPDF,
}
