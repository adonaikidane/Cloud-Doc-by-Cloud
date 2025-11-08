// services/imageService.js
// Service for extracting text from images (OCR)

import sharp from 'sharp'

export const extractTextFromImage = async (buffer) => {
  try {
    // TODO: Implement OCR using Tesseract.js or cloud OCR service
    // For hackathon MVP, you can:
    // 1. Use Tesseract.js for local OCR
    // 2. Use Google Cloud Vision API
    // 3. Use AWS Textract
    // 4. Send image directly to Claude API (which can read images)

    // Placeholder implementation - send to Claude with vision
    console.log('Image OCR not yet implemented - returning placeholder')
    return '[Image text extraction not implemented - please use PDF or paste text]'
  } catch (error) {
    console.error('Error extracting text from image:', error)
    throw new Error('Failed to extract text from image')
  }
}

// Alternative: Use Claude's vision capability directly
export const analyzeImageWithClaude = async (buffer) => {
  // Convert image to base64
  const base64Image = buffer.toString('base64')
  
  // TODO: Send to Claude with vision
  // This would allow Claude to read the contract image directly
  // without needing separate OCR
  
  return '[Claude vision integration - to be implemented]'
}

export default {
  extractTextFromImage,
  analyzeImageWithClaude,
}
