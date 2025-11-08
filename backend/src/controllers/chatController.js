// controllers/chatController.js
// Business logic for chat/Q&A about contracts

import { chatWithClaude } from '../services/claudeService.js'
import { contractStore } from '../models/contractStore.js'
import { chatStore } from '../models/chatStore.js'

// ===== Send Message =====

export const sendMessage = async (req, res, next) => {
  try {
    const { contractId, message } = req.body

    if (!contractId || !message) {
      return res.status(400).json({ error: 'Contract ID and message are required' })
    }

    // Get contract
    const contract = contractStore.getById(contractId)
    if (!contract) {
      return res.status(404).json({ error: 'Contract not found' })
    }

    // Get chat history for context
    const history = chatStore.getHistory(contractId) || []

    // Send to Claude with contract context
    const response = await chatWithClaude({
      contractText: contract.text,
      contractAnalysis: contract.analysis,
      message,
      history,
    })

    // Store message and response in chat history
    chatStore.addMessage(contractId, {
      role: 'user',
      content: message,
      timestamp: new Date(),
    })

    chatStore.addMessage(contractId, {
      role: 'assistant',
      content: response,
      timestamp: new Date(),
    })

    res.json({
      success: true,
      response,
    })
  } catch (error) {
    console.error('Error in chat:', error)
    next(error)
  }
}

// ===== Get Chat History =====

export const getChatHistory = async (req, res, next) => {
  try {
    const { contractId } = req.params

    const history = chatStore.getHistory(contractId) || []

    res.json({
      success: true,
      contractId,
      history,
    })
  } catch (error) {
    console.error('Error fetching chat history:', error)
    next(error)
  }
}
