// controllers/contractController.js
// Business logic for contract analysis and management

import { analyzeContractWithClaude } from '../services/claudeService.js'
import { extractTextFromPDF } from '../services/pdfService.js'
import { extractTextFromImage } from '../services/imageService.js'
import { contractStore } from '../models/contractStore.js'

// ===== Analyze Contract =====

export const analyzeContract = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' })
    }

    let contractText = ''
    const fileType = req.file.mimetype

    // Extract text based on file type
    if (fileType === 'application/pdf') {
      contractText = await extractTextFromPDF(req.file.buffer)
    } else if (fileType.startsWith('image/')) {
      contractText = await extractTextFromImage(req.file.buffer)
    } else if (fileType === 'text/plain') {
      contractText = req.file.buffer.toString('utf-8')
    }

    if (!contractText || contractText.trim().length === 0) {
      return res.status(400).json({ error: 'Could not extract text from file' })
    }

    // Get company settings for context
    // TODO: Get from database based on user
    const companySettings = {
      redLines: [
        'Never accept unlimited liability',
        'Payment terms must be ≤ Net 45',
      ],
      riskTolerance: {
        paymentTerms: { preferred: 30, acceptable: 45, flag: 60 },
      },
    }

    // Analyze with Claude
    const analysis = await analyzeContractWithClaude(contractText, companySettings)

    // Store contract and analysis
    const contractId = contractStore.add({
      filename: req.file.originalname,
      uploadDate: new Date(),
      text: contractText,
      analysis,
    })

    res.json({
      success: true,
      contractId,
      analysis,
    })
  } catch (error) {
    console.error('Error analyzing contract:', error)
    next(error)
  }
}

// ===== Analyze Text Contract =====

export const analyzeTextContract = async (req, res, next) => {
  try {
    const { text } = req.body

    if (!text || text.trim().length === 0) {
      return res.status(400).json({ error: 'Contract text is required' })
    }

    // Get company settings
    const companySettings = {
      redLines: [
        'Never accept unlimited liability',
        'Payment terms must be ≤ Net 45',
      ],
    }

    // Analyze with Claude
    const analysis = await analyzeContractWithClaude(text, companySettings)

    // Store contract and analysis
    const contractId = contractStore.add({
      filename: 'Pasted Text Contract',
      uploadDate: new Date(),
      text,
      analysis,
    })

    res.json({
      success: true,
      contractId,
      analysis,
    })
  } catch (error) {
    console.error('Error analyzing text contract:', error)
    next(error)
  }
}

// ===== Get All Contracts =====

export const getAllContracts = async (req, res, next) => {
  try {
    const contracts = contractStore.getAll()
    res.json({
      success: true,
      count: contracts.length,
      contracts,
    })
  } catch (error) {
    console.error('Error fetching contracts:', error)
    next(error)
  }
}

// ===== Get Contract By ID =====

export const getContractById = async (req, res, next) => {
  try {
    const { id } = req.params
    const contract = contractStore.getById(id)

    if (!contract) {
      return res.status(404).json({ error: 'Contract not found' })
    }

    res.json({
      success: true,
      contract,
    })
  } catch (error) {
    console.error('Error fetching contract:', error)
    next(error)
  }
}

// ===== Delete Contract =====

export const deleteContract = async (req, res, next) => {
  try {
    const { id } = req.params
    const deleted = contractStore.delete(id)

    if (!deleted) {
      return res.status(404).json({ error: 'Contract not found' })
    }

    res.json({
      success: true,
      message: 'Contract deleted successfully',
    })
  } catch (error) {
    console.error('Error deleting contract:', error)
    next(error)
  }
}

// ===== Compare Contracts =====

export const compareContracts = async (req, res, next) => {
  try {
    const { contractIds } = req.body

    if (!contractIds || contractIds.length < 2) {
      return res.status(400).json({ error: 'At least 2 contract IDs are required' })
    }

    // Get contracts
    const contracts = contractIds.map(id => contractStore.getById(id)).filter(Boolean)

    if (contracts.length < 2) {
      return res.status(404).json({ error: 'One or more contracts not found' })
    }

    // TODO: Implement detailed comparison logic with Claude
    const comparison = {
      contracts: contracts.map(c => ({
        id: c.id,
        name: c.filename,
        analysis: c.analysis,
      })),
      // Add comparison matrix here
    }

    res.json({
      success: true,
      comparison,
    })
  } catch (error) {
    console.error('Error comparing contracts:', error)
    next(error)
  }
}

// ===== Get Recommendation =====

export const getRecommendation = async (req, res, next) => {
  try {
    const { contractIds, weights } = req.body

    if (!contractIds || contractIds.length < 2) {
      return res.status(400).json({ error: 'At least 2 contract IDs are required' })
    }

    // Get contracts
    const contracts = contractIds.map(id => contractStore.getById(id)).filter(Boolean)

    if (contracts.length < 2) {
      return res.status(404).json({ error: 'One or more contracts not found' })
    }

    // TODO: Generate AI recommendation using Claude
    const recommendation = {
      bestChoice: contracts[0].id,
      reasoning: [
        'Lowest total risk',
        'Best contract terms',
        'Aligns with company standards',
      ],
      // Add full recommendation logic
    }

    res.json({
      success: true,
      recommendation,
    })
  } catch (error) {
    console.error('Error generating recommendation:', error)
    next(error)
  }
}
