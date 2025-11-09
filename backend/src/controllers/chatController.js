// controllers/chatController.js
// Business logic for chat/Q&A about contracts

import { chatWithClaude } from '../services/claudeService.js'
import { contractStore } from '../models/contractStore.js'
import { chatStore } from '../models/chatStore.js'

// ===== Send Message =====

export const sendMessage = async (req, res, next) => {
  try {
    const { contractId, message } = req.body

    if (!message) {
      return res.status(400).json({ error: 'Message is required' })
    }

    // For demo purposes, if no contract exists, use mock contract
    const mockContract = {
      text: `SaaS Service Agreement between YourCo and AWS. 
      Term: 12 months. Value: $50,000/year. Auto-renews: Yes.
      Payment terms: Net 60. Unlimited liability clause in Section 8.2.
      90-day auto-renewal notice required in Section 12.1.`,
      analysis: {
        contractType: 'SaaS Service Agreement',
        parties: 'YourCo ↔ AWS',
        criticalIssues: ['Unlimited Liability', '90-day Auto-Renewal']
      }
    }

    const contract = contractId ? contractStore.getById(contractId) : null
    const contextContract = contract || mockContract

    // Get chat history for context
    const history = chatStore.getHistory(contractId || 'demo') || []

    // Send to Claude with contract context
    const response = await chatWithClaude({
      contractText: contextContract.text,
      contractAnalysis: contextContract.analysis,
      message,
      history,
    })

    // Store message and response in chat history
    chatStore.addMessage(contractId || 'demo', {
      role: 'user',
      content: message,
      timestamp: new Date(),
    })

    chatStore.addMessage(contractId || 'demo', {
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
    res.status(500).json({ 
      error: 'Failed to get response from AI',
      message: error.message 
    })
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
